//Action
//SET_USERNAME_FILTER
export const setUsernameFilter =(username='')=>({
    type:'SET_USERNAME_FILTER',
    username
});
//SORT_BY_DATE
export const sortByDate =()=>({
    type:'SORT_BY_DATE',
});
//SORT_BY_RATE
export const sortByRate =()=>({
    type:'SORT_BY_RATE',
});