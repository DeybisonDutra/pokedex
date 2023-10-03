import { Link } from "react-router-dom"

import styles from "./LinkButton.module.css"

import { FaHome } from "react-icons/fa"

function LinkButton({ to,text }) {
    return (
        
        <Link className={styles.btn} to={to}>
            <FaHome className={styles.iconehome}/>
            {text}
        </Link>
        
    )
}

export default LinkButton