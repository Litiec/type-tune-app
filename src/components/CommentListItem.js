import React from 'react';
import {connect} from 'react-redux';
import SoundManager from '../SoundManager/SoundManager';
import {startAddRate} from '../actions/comments';
import moment from 'moment';

class CommentListItem extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            isPlaying:false
        };
        this.soundmanager = new SoundManager();
        
    }
    wasLiked=()=>{
        let liked;
        if(this.props.auth.username){
            const username = this.props.auth.username.toLowerCase();
            const find = this.props.rate.find(user=>user.toLowerCase()===username);
            if(find){
                liked = true;
            }else{
                liked = false;
            }
        }else{
            liked = true;
        }
        return liked;
    }
    handlePlayer=(e)=>{
        if(!this.state.isPlaying){
            this.soundmanager.playEvents(this.props.events,()=>{
                this.setState(()=>({isPlaying:false}))
            });
            this.setState(()=>({isPlaying:true}));
        }else{
            this.soundmanager.stopEvents();
            this.setState(()=>({isPlaying:false}));
        }
    }
    render(){
        return(
            <div className="dashboard">
                <div className="row">
                    <div className="col-3-of-4">
                        <div className="dashboard__comment">
                            <p className="dashboard__comment-text headind-3rd u-margin-bottom-small"><strong>{this.props.text}</strong></p>
                            <p className="dashboard__comment-signature headind-4th">create by: <strong>{this.props.username}</strong> | {moment(this.props.createAt).fromNow()} | like: {this.props.rate.length-1}</p>
                        </div>
                    </div>
                    <div className="col-1-of-4">
                        <div className="dashboard__func">
                            <button className="btn  btn--blue u-margin-bottom-small" onClick={this.handlePlayer}>{this.state.isPlaying ? 'Stop':'Play'}</button>
                            <button  className="btn btn--purple" disabled={this.wasLiked()} onClick={()=>{
                                this.props.dispatch(startAddRate(this.props.id, this.props.auth.username, this.props.username, this.props.rate));//this.props.id
                            }}>Like</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state)=>{
    return{
        auth:state.auth
    }
}
export default connect(mapStateToProps)(CommentListItem);