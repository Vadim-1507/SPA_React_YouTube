import React, {Component} from "react";
import Order from "../order/order";
import './favorite-order.css';

class FavoriteOrder extends Component {
    render() {
        return (
            <div className="container">
                <h3 className="like-title">Избранное</h3>
                <Order/>
            </div>
        )
    }
}

export default FavoriteOrder;
