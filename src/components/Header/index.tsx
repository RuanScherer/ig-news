import Image from 'next/image'
import { SignInButton } from '../SignInButton'
import { FiMenu, FiX } from 'react-icons/fi'
import styles from './styles.module.scss'
import { useState } from 'react'
import { ActiveLink } from "../ActiveLink"

export function Header() {
  const [isMenuOpened, setIsMenuOpened] = useState(false)

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image
          src="/images/logo.svg"
          width={100}
          height={100}
          alt="Ig.news logo"
        />

        <nav className={isMenuOpened ? styles.menuOpened : styles.menuClosed}>
          <ActiveLink activeClassName={styles.active} href="/">
            <a>Home</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/posts">
            <a>Posts</a>
          </ActiveLink>
          <a className={styles.closeMenuButton} onClick={() => setIsMenuOpened(!isMenuOpened)}>
            <FiX />
          </a>
        </nav>

        <SignInButton />

        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setIsMenuOpened(!isMenuOpened)}
        >
          <FiMenu color="#FFF"/>
        </button>
      </div>
    </header>
  )
}