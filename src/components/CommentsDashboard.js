import React from 'react'
import CommentsList from './CommentsList';
import CommentListFilters from './CommentListFilters'
const CommentsDashboard =()=>(
    <div>
        <CommentListFilters/>
        <CommentsList/>
    </div>
);

export default CommentsDashboard;