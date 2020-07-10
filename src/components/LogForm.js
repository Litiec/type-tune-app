import React from 'react';


export default class LogForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:'',
        }
    }
    onUsernameChange =(e)=>{
        const username = e.target.value;
        if(username.charCodeAt(username.length-1)!==32){
            this.setState(()=>({
                username
            }));
        }
    }
    onPasswordChange = (e)=>{
        const password = e.target.value;
        if(password.charCodeAt(password.length-1)!==32){
            this.setState(()=>({
                password
            }));
        }
    }
    onSubmit = (e, action)=>{
        e.preventDefault();
        if(!this.state.username || !this.state.password){

            this.props.onLogin({
                username:'',
                password:''
            })

        }else{
            if(action==='login'){
                if(!this.state.username || !this.state.password){
                    this.props.onLogin({
                        username:'',
                        password:''
                    })
                }else{
                    this.props.onLogin({
                        username: this.state.username+'@encrypted-tones.com',
                        password: this.state.password
                    });
                }
            }else if(action==='createAccount'){
                if(!this.state.username || !this.state.password){
                    this.props.onCreateAccount({
                        username:'',
                        password:''
                    })
                }else{
                    this.props.onCreateAccount({
                        username: this.state.username+'@encrypted-tones.com',
                        password: this.state.password
                    });
                }
            }
            this.setState(()=>({
                username:'',
                password:''
            }))
        }
    }
    render(){
        return(
            <div className="logform">
                <h2 className="heading-secondary">Login | Create Account</h2>
                <form className="logform__form" onSubmit={this.onSubmit}>
                    <input className="logform__form-input"
                    type='text'
                    placeholder='username'
                    value={this.state.username}
                    onChange={this.onUsernameChange}
                    ></input>
                    <input  className="logform__form-input"
                    type='password'
                    placeholder='password'
                    value={this.state.password}
                    onChange={this.onPasswordChange}
                    ></input>
                    <button  className="btn btn--blue logform__form-button" onClick={(e)=>{
                        this.onSubmit(e,'login');
                    }}>Login</button>
                    <button className="btn btn--purple" onClick={(e)=>{
                        this.onSubmit(e,'createAccount');
                    }}>Create account</button>
                </form>
            </div>
        );
    }
}