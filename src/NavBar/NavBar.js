import React from 'react'
import styles from './NavBar.module.css'
import QuoteFetcher from '../FetchRandomQuotes'

const NavBar = () => {
    return (
        <nav className={styles.navbar}>
            <ul>
                
                <li>About</li>
                <li>Contact</li>
                <li>sign out</li>
                
            </ul>
            <div> <QuoteFetcher /></div>
        </nav>
    )
}

export default NavBar
