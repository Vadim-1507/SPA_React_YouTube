import React, {Component} from "react";
import './order.css';
import {AddEdit, DeleteTheOrder, EditTheOrder, VideoSearch, UseSearch} from "../../redux/action";
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import VideoService from "../../service/service";

class Order extends Component {
    videoService = new VideoService;

    state = {
        item: null,
        search: ''
    }

    componentDidUpdate() {
        this.LocalStore();
    }

    EditOrder = (order, i) => {
        let add = {...this.props.addOrder};
        add = {...add, addOrder: false};
        let editOrder = {...order};
        editOrder = {...editOrder, id: i};

        this.props.TakeId(editOrder);
        this.props.EditOrder(add);
        this.props.history.push('/modal');
    }

    LocalStore = () => {
        const orders = {...this.props.orders};
        localStorage.setItem(this.props.user.token, JSON.stringify(orders));
    }

    DeleteOrder = (id) => {
        this.props.DeleteOrder(id);
    }

    UseOrder = (order) => {
        let {search, maxRes, select} = order;
        maxRes = +maxRes;
        this.videoService.SearchVideo(search, maxRes, select)
            .then(res => this.setState({item: res}))
            .catch(error => console.log(error));
        const videos = this.state.item;

        this.props.UseSerOrder(search);
        this.props.UseOrder(videos);
    }

    render() {
        return (
            <div className="orders">
                {this.props.orders.map((order, i) => {
                    return (
                        <div className="order_wr" key={i}>
                            <button className="order_title" onClick={() => this.UseOrder(order)}>{order.name}</button>

                            <div className="order-btn_wr">
                                <button className="order-btn edit" onClick={() => this.EditOrder(order, i)}>Изменить
                                </button>
                                <button className="order-btn delete" onClick={() => this.DeleteOrder(i)}>Удалить
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        addOrder: state.addOrder,
        orders: state.orders,
        search: state.search,
        videos: state.videos
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        EditOrder: (data) => dispatch(AddEdit(data)),
        TakeId: (data) => dispatch(EditTheOrder(data)),
        DeleteOrder: (data) => dispatch(DeleteTheOrder(data)),
        UseOrder: (data) => dispatch(VideoSearch(data)),
        UseSerOrder: (data) => dispatch(UseSearch(data))
    };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Order));
