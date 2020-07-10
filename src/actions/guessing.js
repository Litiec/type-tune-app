import database from '../firebase/firebase';

//GUESSING_ADDCOMMENT
export const addGuessingComment=(commentData={})=>{
    return()=>{
        const{
            id='',
            text='',
            username='',
            events=[]
        } = commentData;
        const comment = {id, text,username, events} ;
        database.ref(`guessing/${comment.id}`).set({
            text: comment.text,
            username:comment.username,
            events:comment.events
        })
    }
}
export const startGetGuessingComment=(id='')=>{
    return(dispatch)=>{
        return database.ref(`guessing/${id}`).once('value').then((snapshot)=>{
            if(snapshot.val()){
                dispatch(setGuessingComment(snapshot.val()));
            }
        })
    }
}
export const setGuessingComment =(comment)=>({
    type: 'SET_GUESSING_COMMENT',
    comment
})

export const deletingGuessingComment =(id='')=>{
    return(dispatch)=>{
        database.ref(`guessing/${id}`).remove().then(()=>{
            dispatch(setGuessingComment({}))
        })
    } 
}