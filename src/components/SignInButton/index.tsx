import Image from 'next/image'
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import { signIn, signOut, useSession } from 'next-auth/react'
import styles from './styles.module.scss'

export function SignInButton() {
  const { data: session } = useSession()

  return session ? (
    <button
      type="button"
      onClick={() => signOut()}
      className={styles.signInButton}
    >
      {session.user?.image 
        ? <img
            src={session.user?.image}
            className={styles.userAvatar}
            alt='User avatar'
          />
        : <FaGithub color='#04b361' />
      }
      <span>{session.user?.name || ''}</span>
      <FiX color='#737380' className={styles.closeIcon} />
    </button>
  ) : (
    <button
      type='button'
      onClick={() => signIn('github')}
      className={styles.signInButton}
    >
      <FaGithub color='#eba417' />
      <span>Sign in with Github</span>
    </button>
  );
}
