import React from "react";
    
const Pagination = (props) => {
    const {page, totalPages, onLeftClick, onRightClick} = props
    return (
        <div className="pagination-container">
             <button style={{cursor: 'pointer',margin:'10px',padding:' 05px' }} onClick={onLeftClick}><div> ⏮️ </div></button>
             <div>{page} de {totalPages}</div>
             <button style={{cursor: 'pointer',margin:'10px',padding:' 05px'}} onClick={onRightClick}><div> ⏭️ </div></button>
             
        </div>
    )
}

export default Pagination;