import React from 'react'
import styles from './NavBar.module.css'

const NavBar = () => {
    return (
        <nav className={styles.navbar}>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
                <li>Search</li>
            </ul>
        </nav>
    )
}

export default NavBar
