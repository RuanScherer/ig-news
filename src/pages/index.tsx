import { GetStaticProps } from 'next'
import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'
import styles from './home.module.scss'

interface HomeProps {
  product: {
    priceId: string
    amount: number
  }
}

export default function Home(props: HomeProps) {
  return (
    <>
      <Head>
        <title>ig.news</title>
      </Head>
      
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br/>
            <span>for {props.product.amount} month</span>
          </p>
          <SubscribeButton priceId={props.product.priceId} />
        </section>
        
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // const subscriptionPrice = await stripe.prices.retrieve('price_1KXUdMCGcS2L5lkaeVpqLNM1')

  const product = {
    priceId: '', // subscriptionPrice.id
    amount: new Intl
      .NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      })
      .format(9.99) // subscriptionPrice.unit_amount / 100
  }
  
  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}
