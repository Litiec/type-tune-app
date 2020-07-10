import database from '../firebase/firebase';

//ADD_COMMENT
export const addComment=(comment)=>({
    type:'ADD_COMMENT',
    comment
})
export const startAddComment = (commentData = {})=>{
    return (dispatch)=>{
        const{
            text='', 
            username='', 
            events=[], 
            createAt=0, 
            rate=[]

        } = commentData;
        const comment = {text, username, events, createAt, rate};
        database.ref('comments').push(comment).then((ref)=>{
            dispatch(addComment({
                id:ref.key,
                ...comment
            }));
        });

    };
};
//ADD_RATE
export const addRate =(id='', username='')=>({
    type:'ADD_RATE',
    id,
    username
});
export const startAddRate =(id, userVoted, userTarget,rate)=>{
    const lowUserVoted = userVoted.toLowerCase();
    const lowUserTarget = userTarget.toLowerCase();
    return(dispatch)=>{
        if(lowUserVoted!==lowUserTarget){
            const find = rate.find(user=>user.toLowerCase()===lowUserVoted);
            if(!find){
                database.ref(`comments/${id}/rate`).set(
                    rate.concat([lowUserVoted])
                ).then(()=>{
                    dispatch(addRate(id,lowUserVoted));
                })
            }
        }
    }
}


//SET_COMMENTS
export const setComments =(comments)=>({
    type: 'SET_COMMENTS',
    comments
});

export const startSetComments =()=>{
    return(dispatch)=>{

        return database.ref('comments').once('value').then((snapshot)=>{
            const comments = [];
            snapshot.forEach((childSnapshot)=>{
                comments.push({
                    id:childSnapshot.key,
                    ...childSnapshot.val()
                })
            })
            dispatch(setComments(comments));
        });
    };
};

