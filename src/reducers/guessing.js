
export default (state={}, action)=>{
    switch(action.type){
        default:
            return state;
        case 'SET_GUESSING_COMMENT':
            return action.comment
    }
}
