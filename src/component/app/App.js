import React, {useEffect} from "react";
import LogIn from "../logIn/log-in";
import {BrowserRouter as Router, Route} from "react-router-dom";
import './app.css';
import Header from "../header/header";
import SearchDef from "../search_def/search-def";
import FavoriteOrder from "../favorite_order/favorite-order";
import {connect} from "react-redux";
import {EnterUserAction} from "../../redux/action";
import Modal from "../modal/modal";

function App({user, logIn}) {
    useEffect(() => {
        let userInfo = {...user};
        const token = localStorage.getItem('token');

        if (token) {
            userInfo = {...userInfo, token}
        }
        logIn(userInfo);
    }, [])

    const page = user.token ?
        <Router>
            <Header/>

            <Route exact path='/' component={SearchDef}/>
            <Route path='/favorite' component={FavoriteOrder}/>
            <Route path='/modal' component={Modal}/>
        </Router> :
        <LogIn/>

    return (
        <>
            {page}
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        logIn: (data) => dispatch(EnterUserAction(data))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
