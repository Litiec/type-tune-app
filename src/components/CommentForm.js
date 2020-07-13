import React from 'react';
import {NavLink} from 'react-router-dom';
import moment from 'moment';
import SoundManager from '../SoundManager/SoundManager'
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';


export class CommentForm extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            text:'',
            error : ''
        };
        this.soundManager= new SoundManager();
    }
    
    onTextChange = (e)=>{ 
        const text = e.target.value;
        const char = text[text.length-1].toLowerCase();
        const reg =/[a-z]|\d/;
        if(char.match(reg)||char ===" "){
            if(this.state.text.length<text.length){
                this.soundManager.regEvents(char.charCodeAt(0))
                this.setState(()=>({
                    text
                }))
            }
        }
    }
    onSubmit =(e)=>{
        e.preventDefault();
        const username = this.props.auth.username;
        if(!this.state.text){
            const error = 'Please provide a comment!'
            this.setState(()=>({error}));
        }else if(this.state.text && !username){
            const error = 'Currently there is no user login. If you dont have an account please create one or just login with your username and password';
            this.setState(()=>({error}));
        }else{
            if(e.target.name =='submit'){
                this.props.onSubmit({
                    text:this.state.text,
                    username:username,
                    events: this.soundManager.getEvents(),
                    createAt:moment().valueOf(),
                    rate:[username]
                });
            }
            else{
                this.props.onShare({
                    id: uuidv4(),
                    text:this.state.text,
                    username:username,
                    events: this.soundManager.getEvents(),
                })

            }
            this.setState(()=>({
                error:'',
                text:''
            }));
        }

    }
    onReset=(e)=>{
        this.soundManager.deleteRegEvent();
        this.setState(()=>({text:''}));
    }
    askForLogin=()=>{
        let bol = false;
        if(this.state.error && this.state.error!== 'Please provide a comment!'){
            bol = true
        }
        return bol;
    }
    render(){
        return(
            <div className="comment__form">
                <form onSubmit={this.onSubmit} onReset={this.onReset}>
                <div className="u-margin-bottom-small">
                <h2 className="heading-secondary">Comment</h2>
                </div>
                <div className="comment__share">
                    <button name="share" title="Share the comment as a Guessing game" className="btn  btn--blue " onClick={this.onSubmit}>
                    <svg x="0px" y="0px" viewBox="0 0 64 64" enableBackground="new 0 0 64 64"  stroke="#594389">
                    <circle fill="none"  strokeWidth="3" strokeMiterlimit="10" cx="51" cy="13" r="12"/>
                    <circle fill="none"  strokeWidth="3" strokeMiterlimit="10" cx="11" cy="42" r="10"/>
                    <circle fill="none"  strokeWidth="3" strokeMiterlimit="10" cx="48" cy="55" r="8"/>
                    <line fill="none"  strokeWidth="3" strokeMiterlimit="10" x1="40" y1="54" x2="20" y2="46"/>
                    <line fill="none"  strokeWidth="3" strokeMiterlimit="10" x1="19" y1="35" x2="41" y2="21"/>
                    </svg>
                    </button>
                </div>
                <div className="row">
                    <div className="col-3-of-4">
                        <div className="comment__box-container">
                            <div className="comment__box-container-layout"></div>
                            <textarea  
                            maxLength="100" cols="30" rows="3" 
                            className="comment-box" 
                            autoFocus 
                            placeholder="Comment"
                            value={this.state.text}
                            onChange={this.onTextChange}></textarea>
                        </div>
                    </div>
                    <div className="col-1-of-4">
                        <input type="reset" className="btn  btn--blue form__button"></input>
                        <button 
                        name="submit"
                        className="btn btn--purple form__button"
                        onClick ={this.onSubmit}>submit</button>
                    </div>
                </div>
                </form>
                <div className="comment__msg u-margin-bottom-small">
                    {this.state.error && <p className="comment__msg-text">{this.state.error}</p>}
                </div>
                <div className="u-margin-bottom-medium">
                    {this.askForLogin() && <NavLink className=" btn btn--purple comment__login" to="/login" activeClassName="is-active"> Login | Create Account &crarr;</NavLink>}
                </div>
            </div>
        );
    }
}
const mapStateToProps =(state,props)=>{
    return{
        auth:state.auth
    }
}
export default connect(mapStateToProps)(CommentForm);