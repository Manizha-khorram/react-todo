import React, { useState, useEffect } from 'react'
import styles from './NavBar.module.css'
import QuoteFetcher from '../../FetchRandomQuotes'
import Modal from 'react-modal'

Modal.setAppElement('#root')

const NavBar = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [isMenuOpen, setMenuOpen] = useState(false)

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setMenuOpen(false)
    }

    const openModal = () => {
        setModalIsOpen(true)
    }

    const closeModal = () => {
        setModalIsOpen(false)
    }

    useEffect(() => {
        openModal()
    }, [])

    return (
        <>
            <nav className={styles.navbar}>
                <ul>
                    <div>
                        <img
                            src={'/images/7537048.svg'}
                            alt="SVG"
                            className={styles['logoImage']}
                        />
                    </div>
                    <div
                        className={
                            isMenuOpen ? styles['open-menu'] : styles['links']
                        }
                    >
                        <li>
                            <a
                                href="/About"
                                className={styles['links-content']}
                                onClick={closeMenu}
                            >
                                About
                            </a>
                        </li>
                        <li>
                            <a
                                href="/Contact"
                                className={styles['links-content']}
                            >
                                Contact
                            </a>
                        </li>
                        <li>
                            <a
                                href="/sign out"
                                className={styles['links-content']}
                            >
                                sign out
                            </a>
                        </li>
                    </div>
                    <div
                        className={`${styles['hamburger-menu']} ${
                            isMenuOpen ? 'open' : ''
                        }`}
                        onClick={toggleMenu}
                    >
                        <img src="/images/hamburger Menu.svg" alt="menu"></img>
                    </div>
                </ul>

                <div className={styles.videoWrapper}>
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={styles.video}
                    >
                        <source
                            src="/images/vecteezy_technology-background-with-abstract-digital-code-motion_27492287_426.mp4"
                            type="video/mp4"
                        />
                        Your browser doesn't support video!
                    </video>
                </div>

                <div>
                    <div>
                        <div className={`${styles['welcomeText']}`}>
                            <h1 className={styles['appTitle']}>
                                Welcom To My Todo App Manager..!
                            </h1>
                            <p className={styles['description']}>
                                Organize Your Tasks, Stay Productive, and
                                Achieve Your Goals!
                            </p>
                        </div>
                        <img
                            src={'/images/3686779.svg'}
                            alt="SVG"
                            className={styles.svgImage}
                        />
                    </div>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Quote Modal"
                        className={styles['quoteModal']}
                    >
                        <QuoteFetcher />
                        <button onClick={closeModal}>Close Modal</button>
                    </Modal>
                </div>
            </nav>
        </>
    )
}

export default NavBar
