import React, { useState } from "react";

import { FaMagnifyingGlass } from "react-icons/fa6";

const Searchbar = (props) => {
    const [search, setSearch] = useState("dito")
    const { onSearch } = props
    const onChangeHandler = (e) => {
        setSearch(e.target.value)
        if (e.target.value.length === 0) {
            onSearch(undefined)
        }
    }

    const onButtonClickHandler = () => {
        onSearch(search)
    }
    <FaMagnifyingGlass />
    return (
        <div className="searchbar-container">
            
            <div className="searchbar">
                <div>                   
                    <input placeholder="Buscar pokemon" onChange={onChangeHandler} />
                </div>
            </div>
            <div className="searchbar-btn">
                <button onClick={onButtonClickHandler} >Buscar</button>
            </div>
              {/* <a href="https://www.google.com">Acessar o Google</a> */}
        </div>
        
    )
}

export default Searchbar;