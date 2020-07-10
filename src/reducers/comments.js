//COMMENT REDUCER
const commentsReducerDefaultState=[];

export default (state=commentsReducerDefaultState, action)=>{
    switch (action.type){
        default:
            return state;
        case 'ADD_COMMENT':
            return [
                action.comment,
                ...state
            ];
        case 'ADD_RATE':
          return state.map((comment)=>{
              if(comment.id===action.id){
                  return{
                      ...comment,
                      rate: comment.rate.concat([action.username])
                  };
              }else{
                  return comment;
              };
          });
        case 'SET_COMMENTS': 
          return action.comments;
    }
};