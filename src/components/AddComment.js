import React from 'react';
import {connect} from 'react-redux';
import {startAddComment} from '../actions/comments';
import{addGuessingComment} from '../actions/guessing';
import CommentForm from './CommentForm';
import GuessingLink from './GuessingLink';

class AddComment extends React.Component{
    constructor(props){
        super(props)
        this.state={
            modalLink:undefined
        }
    }
    onLinkShare=(id)=>{
        this.setState(()=>({
            modalLink: window.location.href+'guessing/'+id
        }))
    }
    onCloseModal=()=>{
        this.setState(()=>({
            modalLink:undefined
        }))
    }
    render(){
        return(
            <div className="comment">
                <CommentForm
                onSubmit={(comment)=>{
                    this.props.dispatch(startAddComment(comment));
                }}
                onShare ={(comment)=>{
                    this.props.dispatch(addGuessingComment(comment));
                    this.onLinkShare(comment.id);
                }}
                />
                <GuessingLink
                modalLink={this.state.modalLink}
                onCloseModal={this.onCloseModal}
                appElementId ={'app'}
                />
        </div>
        )
    }
};
const mapStateToProps =(state,props)=>{
    return{
        auth:state.auth
    }
}
export default connect(mapStateToProps)(AddComment);