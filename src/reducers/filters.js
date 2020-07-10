//FILTERS REDUCER
const filtersReducerDefualtState = {
    username:'',
    sortBy:'date'
};
export default (state=filtersReducerDefualtState, action)=>{
    switch(action.type){
        default:
            return state;
        case 'SET_USERNAME_FILTER':
            return{
                ...state,
                username:action.username
            };
        case 'SORT_BY_DATE':
            return{
                ...state,
                sortBy:'date'
            };
        case 'SORT_BY_RATE':
            return{
                ...state,
                sortBy:'rate'
            };
    };
};