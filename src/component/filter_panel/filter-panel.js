import React from "react";
import './filter-panel.css';

const FilterPanel = ({actBtn, SearchPanel, GenOrders, Cont}) => {
    let grid = 'form-style grid',
        list = 'form-style list';
    if (actBtn === 'list-video') {
        list += ' active';
        grid = 'form-style grid';
    } else if (actBtn === 'table-video') {
        list = 'form-style list';
        grid += ' active';
    }

    return (
        <>
            <div className="content_filter">
                <div className="right-block">
                    <span className="block_text general-text">Видео по запросу</span>
                    <span className="block_text search-text">"{SearchPanel}"</span>
                    <span className="block_text quantity">{GenOrders.totalResults}</span>
                </div>

                <div className="left-block">
                    <button className={list} value='list-video' onClick={Cont}/>
                    <button className={grid} value='table-video' onClick={Cont}/>
                </div>
            </div>
        </>
    )
}

export default FilterPanel
