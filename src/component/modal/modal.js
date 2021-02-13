import React, {Component} from 'react';
import {connect} from 'react-redux';
import './modal.css';
import {AddFavOrder, EditFavOrder} from "../../redux/action";

class Modal extends Component {
    state = {
        error: false,
        search: '',
        name: '',
        select: 'relevance',
        maxRes: 25,
        id: ''
    }

    componentDidMount() {
        if (this.props.addOrder.addOrder) {
            const search = {...this.props.search};
            this.setState({search: search.search});
        } else {
            this.setState({add: false});
            const order = {...this.props.order};
            const {id, search, name, select, maxRes} = order;
            let state = {...this.state};
            state = {...state, search, name, select, maxRes, id};
            this.setState(state);
        }
    }

    Routing = () => {
        let path = this.props.addOrder.addOrder ? '/' : '/favorite';
        this.props.history.replace(path);
    }

    HandlerCancel = () => {
        this.Routing();
    }

    HandlerMaxRes = e => {
        const maxRes = e.target.value;
        this.setState({maxRes});
    }

    HandlerSearch = e => {
        const search = e.target.value;
        this.setState({search});
    }

    HandlerNameS = e => {
        const name = e.target.value;
        this.setState({name});
    }

    HandlerSelect = e => {
        const select = e.target.value;
        this.setState({select})
    }

    LocalStore = () => {
        const orders = {...this.props.orders};
        localStorage.setItem(this.props.user.token, JSON.stringify(orders));
    }

    HandlerSave = () => {
        const {search, name, select, maxRes, id} = this.state;
        if (this.state.name.length > 0) {
            const order = {search, name, select, maxRes};
            if(this.props.addOrder.addOrder) {
                this.props.HandlerSave(order);
            } else {
                this.props.HandlerEdit(order, id)
            }
            this.props.history.replace('/favorite');
            this.Routing();
            this.setState({error: false});
        } else {
            this.setState({error: true})
        }
    }

    render() {
        const title = this.props.addOrder.addOrder ? 'Сохранить' : 'Изменить',
            cancel = this.props.addOrder.addOrder ? 'сохранять' : 'изменять',
            act_name = this.props.addOrder.addOrder ? 'disabled' : '',
            error = this.state.error ? 'block' : 'none';


        return (
            <div className="modal">
                <div className="modal_window">
                    <h3 className="title_modal">{title} запрос</h3>

                    <div className="input_wr search_wrapper">
                        <label className='modal_label'>Запрос</label>
                        <input type="text" className="modal_input search_inp" disabled={act_name}
                               value={this.state.search} onChange={e => this.HandlerSearch(e)}/>

                    </div>

                    <div className="input_wr name_wrapper">
                        <label className='modal_label'>Название</label>
                        <input type="text" className="modal_input name_inp" placeholder='Укажите название'
                               value={this.state.name} onChange={e => this.HandlerNameS(e)}/>
                        <span style={{display: error}}>Ведите название запроса</span>
                    </div>

                    <div className="input_wr sort_wrapper">
                        <label className='modal_label'>Сортировать по:</label>
                        <select className='modal_input select_inp' id="select_sort" value={this.state.select}
                                onChange={e => this.HandlerSelect(e)}>
                            <option value="relevance">Без сортировки</option>
                            <option value="date">По дате</option>
                            <option value="rating">По рейтингу</option>
                            <option value="title">По названию</option>
                            <option value="viewCount">По просмотрам</option>
                        </select>
                    </div>

                    <div className="input_wr maxResult_wrapper">
                        <label className='modal_label'>Максимальное количество</label>
                        <input type="range" className="maxres_range" min="0" max="50" step='1' value={this.state.maxRes}
                               onChange={e => this.HandlerMaxRes(e)}/>
                        <input type="text" className="modal_input maxres_inp" value={this.state.maxRes}
                               onChange={e => this.HandlerMaxRes(e)}/>
                    </div>

                    <div className="btn_wrapper">
                        <button className="btn_modal cancel" onClick={this.HandlerCancel}>Не {cancel}</button>
                        <button className="btn_modal save" onClick={this.HandlerSave}>{title}</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        addOrder: state.addOrder,
        search: state.search,
        orders: state.orders,
        order: state.order
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        HandlerSave: (data) => dispatch(AddFavOrder(data)),
        HandlerEdit: (data, id) => dispatch(EditFavOrder(data, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
