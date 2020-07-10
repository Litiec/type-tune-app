import React from 'react';
import CommentsDashboard from './CommentsDashboard';
import AddComment from './AddComment';
const HomePage =(props)=>{
    return(
    <div>
        <AddComment/>
        <CommentsDashboard/>
    </div>
)};

export default HomePage;