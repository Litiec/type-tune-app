import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {startLogout} from '../actions/auth';


export const Header = ({startLogout})=>(
    <header className="header">
        <div className="header__logo">
            <svg className="header__logo-triangle"viewBox="0 0 279 201" fill="none">
                    <path opacity="0.1" d="M249 100.5L10.5 186.67V14.3305L249 100.5Z" stroke="#7000FF" strokeWidth="20"/>
            </svg>
            <div className="header__logo-rectangle"></div>
        </div>
        <div className="header__container">
            <div className="header__container-text-box">
                <Link className="heading-primary" to="/">TypeTune</Link>
            </div>
        </div>
        <button className="btn  btn--blue header__logout-btn" onClick={startLogout}>Logout</button>
    </header>
);
const mapDispatchToProps =(dispatch)=>({
    startLogout: ()=> dispatch(startLogout())
})
export default connect(undefined,mapDispatchToProps)(Header);
