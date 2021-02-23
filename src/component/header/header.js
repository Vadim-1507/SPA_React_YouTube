import React from "react";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import './header.css'
import {ExitUser} from "../../redux/action";
import {withRouter} from 'react-router-dom';

function Header({history, exitApp}) {
    function exit() {
        history.replace('/')
        localStorage.removeItem('token');
        exitApp();
    }

    return (
        <header>
            <div className="container">
                <div className="header_content">
                    <div className="left">
                        <div className="header_logo_wr">
                        </div>

                        <NavLink exact to="/" className="header_link">Поиск</NavLink>
                        <NavLink to="/favorite" className="header_link">Избранное</NavLink>
                    </div>
                    <div className="right">
                        <button className="exit" onClick={exit}>Выход</button>
                    </div>
                </div>
            </div>
        </header>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        exitApp: () => dispatch(ExitUser())
    };
}

export default withRouter(connect(null, mapDispatchToProps)(Header));
