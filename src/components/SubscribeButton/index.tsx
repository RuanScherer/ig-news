import { signIn, useSession } from 'next-auth/react'
import { useRouter } from "next/router"
import { api } from '../../services/api'
import { getStripJs } from '../../services/stripe-js'
import styles from './styles.module.scss'

interface SubscribeButtonProps {
  priceId: string
}

export function SubscribeButton(props: SubscribeButtonProps) {
  const { data: session } = useSession()
  const router = useRouter()

  async function handleSubscribe() {
    if (!session) {
      signIn()
      return
    }

    if (session.activeSubscription) {
      return router.push("/posts")
    }

    try {
      const response = await api.post('/subscribe')
      const { sessionId } = response.data

      const stripe = await getStripJs()
      await stripe.redirectToCheckout({ sessionId })
    } catch (error) {
      alert(error.message) // adicionar toast
    }
  }

  return(
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  )
}
