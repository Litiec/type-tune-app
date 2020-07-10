import React from 'react';
import {connect} from 'react-redux';
import LogForm from '../components/LogForm';
import {startLogin, startCreateAccount,setUsername} from '../actions/auth';

export class LoginPage extends React.Component{
    constructor(props){
        super(props)
        this.state={
            error:''
        }
    }
    onLogin=(dataUser)=>{
        if(!dataUser.username||!dataUser.password){
            this.setState(()=>({
                error: 'Please provide an username and a password.'
            }));
        }else{
            startLogin(dataUser,(res)=>{
                if(res.code==='auth/user-not-found'){
                    this.setState(()=>({
                        error: 'There is no user record corresponding to this identifier. Please create an account if you do not have one yet.'
                    }))
                }else if(res.code==='auth/wrong-password'){
                    this.setState(()=>({
                        error: 'The password is invalid!'
                    }))
                }else{
                    const username = res.user.email.split('@',1)
                    this.props.dispatch(setUsername({username:username[0]}))
                    this.setState(()=>({
                        error:''
                    }))
                    this.props.history.push('/');
                }
            });
        }
    }
    onCreateAccount=(dataUser)=>{
        if(!dataUser.username||!dataUser.password){
            this.setState(()=>({
                error: 'Please provide an username and a password.'
            }))
        }
        else{
            startCreateAccount(dataUser, (res)=>{
                if(res.code==='auth/email-already-in-use'){
                    this.setState(()=>({
                        error: 'The username is already in use by another account.'
                    }))
                }else if(res.code==='auth/weak-password'){
                    this.setState(()=>({
                        error:res.message
                    }))
    
                }else{
                    const username = res.user.email.split('@',1)
                    this.props.dispatch(setUsername({username:username[0]}))
                    this.setState(()=>({
                        error:''
                    }))
                    this.props.history.push('/');
                }
            })
        }
    }
    render(){
        return(
           
            <div>
                <div className="logMessage">
                    {this.state.error&& <p className="logMessage-text">{this.state.error}</p>}
                </div>
                <LogForm
                onLogin={(dataUser)=>{this.onLogin(dataUser)}}
                onCreateAccount={(dataUser)=>{this.onCreateAccount(dataUser)}}
                />
            </div>
        );
    }
}


export default connect()(LoginPage)

