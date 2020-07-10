import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import commentsReducer from '../reducers/comments';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';
import guessingReducer from '../reducers/guessing'
import ReduxThunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () =>{
    const store = createStore(
        combineReducers({
            comments: commentsReducer,
            filters: filtersReducer,
            auth: authReducer,
            guessing:guessingReducer
        }),
        composeEnhancers(applyMiddleware(ReduxThunk))
    );
    return store;
};

