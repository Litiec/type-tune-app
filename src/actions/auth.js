import {firebase} from '../firebase/firebase'
//SET_USERNAME

export const setUsername = (username)=>({
    type:'SET_USERNAME',
    username
})
export const startLogin =({username, password}, callback)=>{
    firebase.auth().signInWithEmailAndPassword(username, password)
    .then(user=>{
        callback(user);
    }).catch(error=>{
        callback(error);
    })
}
export const startCreateAccount =({username, password}, callback)=>{
    firebase.auth().createUserWithEmailAndPassword(username, password)
    .then(user=>{
        console.log(user)
        callback(user);
    }).catch(error=>{
        console.log(error)
        callback(error);
    })
    
}
export const startLogout = ()=>{
    return(dispatch)=>{
        dispatch(setUsername({username:''}))
        return firebase.auth().signOut();
    }
}