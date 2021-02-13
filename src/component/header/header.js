import React, {Component} from "react";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import './header.css'
import {ExitUser} from "../../redux/action";
import {withRouter} from 'react-router-dom';

class Header extends Component {
    Exit = () => {
        let user = {...this.props.user};
        this.props.history.replace('/')
        localStorage.removeItem('token');

        user = {...user, token: ''}
        this.props.Exit(user)
    }

    render() {
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
                            <button className="exit" onClick={this.Exit}>Выход</button>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state: state,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        Exit: (data) => dispatch(ExitUser(data))
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
