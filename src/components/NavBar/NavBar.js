import React, { useState, useEffect } from 'react'
import styles from './NavBar.module.css'
import QuoteFetcher from '../../FetchRandomQuotes'
import Modal from 'react-modal'

Modal.setAppElement('#root')

const NavBar = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false)

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
                <div className={styles.videoWrapper}>
                    <ul>
                        <div></div>
                        <div className={styles['links']}>
                            <li><a href="/About" className={styles['links-content']}>About</a></li>
                            <li><a href="/Contact" className={styles['links-content']}>Contact</a></li>
                            <li><a href="/sign out" className={styles['links-content']}>sign out</a></li>
                        </div>
                    </ul>
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
                        <img
                            src={'/images/7537048.svg'}
                            alt="SVG"
                            className={styles['logoImage']}
                        />
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
