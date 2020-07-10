//Get visible Comments

export default (comments, {username, sortBy})=>{
    return comments.filter((comment)=>{
        const usernameMatch = comment.username.toLowerCase().includes(username.toLowerCase());
        return usernameMatch;
    }).sort((a,b)=>{
        if(sortBy ==='date'){
            return a.createAt < b.createAt ? 1 : -1;
        }else if(sortBy ==='rate'){
            return a.rate < b.rate ? 1 : -1;
        }
    });
};