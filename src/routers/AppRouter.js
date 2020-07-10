import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from '../components/Header';
import HomePage from '../components/HomePage';
import GuessingGame from '../components/GuessingGame';
import NotFound from '../components/404Page';
import LoginPage from '../components/LoginPage';



const AppRouter = ()=>(
    <BrowserRouter>
        <Header/>
        <Switch>
            <Route path="/" component={HomePage} exact={true}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/guessing/:id" component={GuessingGame}/>
            <Route component={NotFound}/>
        </Switch>
    </BrowserRouter>
);


export default AppRouter;