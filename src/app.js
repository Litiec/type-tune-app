import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import {startSetComments} from './actions/comments';
import{setUsername} from './actions/auth';
import './styles/main.scss';
import {loadSamples} from './SoundManager/loadSamples';
import{createSampler} from './SoundManager/soundMap'
import {firebase} from './firebase/firebase';


const store = configureStore();
let hasRendered = false;
let hasLoadedSamples=false;

const renderApp =()=>{
    if(!hasRendered){
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered=true;
    }
}
const onLogIn =(user) =>{
    const username = user.email.split('@',1)
    store.dispatch(setUsername({username:username[0]}))
    store.dispatch(startSetComments()).then(()=>{
        renderApp();
    });
    console.log('login')
}
const onLogOut = ()=>{
    store.dispatch(setUsername({username:''}))
    store.dispatch(startSetComments()).then(()=>{
        renderApp();
    });
    console.log('Log out')
}
const jsx =(
    <Provider store={store}>
        <AppRouter/>
    </Provider>
);
ReactDOM.render(<p className="loading">Loading....</p>, document.getElementById('app'));


firebase.auth().onAuthStateChanged((user)=>{
    if(user){
        if(!hasLoadedSamples){
            loadSamples(()=>{
                createSampler(()=>{
                    onLogIn(user);
                })
                //onLogIn(user);
            });
            hasLoadedSamples=true
        }else{
            onLogIn(user);
            console.log('login without load samples');
        }
    }else{
        if(!hasLoadedSamples){
            loadSamples(()=>{
                console.log('load')
                createSampler(()=>{
                    onLogOut();
                })
                //onLogOut();
            })
            hasLoadedSamples=true
        }else{
            onLogOut();
            console.log('logout without load samples');
        }
    }
});



