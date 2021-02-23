import React from "react";
import './search-bar.css';

function SearchBar({Val, Search, BtnSearch, Like}) {

    return (
        <>
            <h3 className="title">Поиск видео</h3>

            <div className="search_input_wr">
                <input type="text" className='search_input' placeholder='Что хотите посмотреть?'
                       value={Val} onChange={e => Search(e)}/>
                <button className="like" onClick={Like}></button>
                <button className="search_btn" onClick={BtnSearch}>Найти</button>
            </div>
        </>
    )
}

export default SearchBar;
