import React from 'react';
import {connect} from 'react-redux';
import {setUsernameFilter, sortByDate, sortByRate} from '../actions/filters'

const CommentListFilters = (props)=>(
    
    <div className="row filter">
        <div className="col-1-of-4">
            <input className="comment-box" placeholder="search:username" type="text" value={props.filters.username} onChange={(e)=>{
                props.dispatch(setUsernameFilter(e.target.value));
            }}/>
        </div>
        <div className="col-1-of-4">
            <select className="btn btn--purple" value={props.filters.sortBy} onChange={(e)=>{
                if(e.target.value==='date'){
                    props.dispatch(sortByDate());
                }else if(e.target.value==='rate'){
                    props.dispatch(sortByRate());
                }
            }}>
                <option value="date">Date</option>
                <option value="rate">Rate</option>
            </select>
        </div>  
    </div>
);
const mapStateToProps = (state)=>{
    return{
        filters :state.filters
    };
};
export default connect(mapStateToProps)(CommentListFilters);