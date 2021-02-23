import React from "react";
import Order from "../order/order";
import './favorite-order.css';

function FavoriteOrder() {
    return (
        <div className="container">
            <h3 className="like-title">Избранное</h3>
            <Order/>
        </div>
    )
}

export default FavoriteOrder;
