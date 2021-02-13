import React, {Component} from "react";
import SearchBar from "../search_bar/search-bar";
import VideoService from "../../service/service";
import {AddEdit, AddNewSearch, LocalStoreOrder, UseSearch, VideoSearch} from "../../redux/action";
import {connect} from 'react-redux';
import FilterPanel from "../filter_panel/filter-panel";
import Video from "../video/video";

import './search-def.css';

class SearchDef extends Component {
    videoService = new VideoService;

    state = {
        search: '',
        content: 'list-video',
        item: null,
    }

    componentDidMount() {
        const order = this.props.orders.length;
        if (order === 0) {
            if (localStorage.getItem(this.props.user.token)) {
                let orders = JSON.parse(localStorage.getItem(this.props.user.token));
                orders = Object.values(orders);
                this.props.LocalStore(orders);
            }
        }
        const video = this.props.videos,
            search = this.props.useSearch;

        if (video) {
            this.setState({item: video});
            this.setState({search});
        }
    }


    HandlerSearch = e => {
        let search = e.target.value;
        this.setState({search});
    }

    HandlerCont = e => {
        const content = e.target.value;
        this.setState({content});
    }

    RequestVideo = () => {
        const search = this.state.search;

        this.videoService.SearchVideo(search)
            .then(res => this.setState({item: res}))
            .catch(error => console.log(error));
        const videos = this.state.item;

        this.props.UseSerOrder(search);
        this.props.RequestTheVideo(videos);
    }

    BtnLike = () => {
        let add = {...this.props.addOrder},
            search = {...this.props.search};
        add = {...add, addOrder: true};
        search = {...search, search: this.state.search};

        this.props.NewSearch(search);
        this.props.BtnLike(add);
        this.props.history.push('/modal');
    }

    render() {
        const items = this.state.item
        let ClassWr = 'search-block';
        if (items) {
            ClassWr = 'container';
        }
        const classList = `video_content ${this.state.content}`;
        const VideoPage = items ? <>
            <FilterPanel actBtn={this.state.content} Cont={this.HandlerCont} GenOrders={this.state.item.pageInfo}
                         SearchPanel={this.state.search}/>
            <div className={classList}>
                {Object.values(this.state.item.items).map((info, i) => {
                    return (
                        <Video key={i} Info={info}/>
                    )
                })}
            </div>
        </> : undefined;

        return (
            <div className={ClassWr}>
                <SearchBar Search={e => this.HandlerSearch(e)} Val={this.state.search} BtnSearch={this.RequestVideo}
                           Like={this.BtnLike} Add/>
                {VideoPage}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        videos: state.videos,
        search: state.search,
        addOrder: state.addOrder,
        orders: state.orders,
        useSearch: state.useSearch
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        LocalStore: (data) => dispatch(LocalStoreOrder(data)),
        RequestTheVideo: (data) => dispatch(VideoSearch(data)),
        NewSearch: (data) => dispatch(AddNewSearch(data)),
        BtnLike: (data) => dispatch(AddEdit(data)),
        UseSerOrder: (data) => dispatch(UseSearch(data))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchDef)
