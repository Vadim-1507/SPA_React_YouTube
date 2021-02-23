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

    componentDidMount() {
        this.localStore();
    }

    componentDidUpdate() {
        this.localStore();
    }

    editOrder = (order, i) => {
        let add = {...this.props.addOrder},
            editOrder = {...order};
        add = {...add, addOrder: false};
        editOrder = {...editOrder, id: i};

        this.props.takeId(editOrder);
        this.props.editOrder(add);
        this.props.history.push('/modal');
    }

    localStore = () => {
        const orders = {...this.props.orders};
        localStorage.setItem(this.props.user.token, JSON.stringify(orders));
    }

    deleteOrder = (id) => {
        this.props.deleteOrder(id);
    }

    useOrder = (order) => {
        let {searching, maxResult, select} = order;
        maxResult = +maxResult;
        this.videoService.SearchVideo(searching, maxResult, select)
            .then(res => this.setState({item: res}))
            .catch(error => console.log(error));
        const videos = this.state.item;

        this.props.useSerOrder(searching);
        this.props.useOrder(videos);

        if (videos) {
            this.props.history.replace('/');
        }

    }

    render() {
        return (
            <div className="orders">
                {this.props.orders.map((order, i) => {
                    return (
                        <div className="order_wr" key={i}>
                            <button className="order_title" onClick={() => this.useOrder(order)}>{order.name}</button>

                            <div className="order-btn_wr">
                                <button className="order-btn edit" onClick={() => this.editOrder(order, i)}>Изменить
                                </button>
                                <button className="order-btn delete" onClick={() => this.deleteOrder(i)}>Удалить
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
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        editOrder: (data) => dispatch(AddEdit(data)),
        takeId: (data) => dispatch(EditTheOrder(data)),
        deleteOrder: (data) => dispatch(DeleteTheOrder(data)),
        useOrder: (data) => dispatch(VideoSearch(data)),
        useSerOrder: (data) => dispatch(UseSearch(data))
    };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Order));
