//Auth Reducer

export default (username='', action)=>{
    switch(action.type){
        default:
            return username;
        case 'SET_USERNAME':
            return action.username;
    }
}