import React from "react";
    
const Pagination = (props) => {
    const {page, totalPages, onLeftClick, onRightClick} = props
    return (
        <div className="pagination-container">
             <button style={{cursor: 'pointer'}} onClick={onLeftClick}><div>⏮️</div></button>
             <div>{page} de {totalPages}</div>
             <button style={{cursor: 'pointer'}} onClick={onRightClick}><div>⏭️</div></button>
             
        </div>
    )
}

export default Pagination;