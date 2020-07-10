import React from 'react';
import {connect} from 'react-redux';
import CommentListItem from './CommentListItem';
import selectComments from '../selectors/comments';


const CommentsList =(props)=>{
    
    return(
        <div>
            {props.comments.map((comment)=>{
                return <CommentListItem  key={comment.id} {...comment} />
            })}
        </div>
    )
};


const mapStateToProps = (state)=>{
    return {
        comments : selectComments(state.comments, state.filters),
    };
};
export default connect(mapStateToProps)(CommentsList);

