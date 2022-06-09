import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Banner from '../components/banner'
import Card from '../components/card'

import useTrackLocation from '../hooks/use-track-location'

import coffeeStores from '../data/coffee-stores.json'
import { fetchCoffeeStores } from '../lib/coffee-stores'

export async function getStaticProps(context) {
  console.log('getStaticProps')

  const coffeeStores = await fetchCoffeeStores()

  console.log(coffeeStores)

  return {
    props: {
      coffeeStores: coffeeStores || null,
    }, // will be passed to the page component as props
  }
}

export default function Home(props) {
  const { handleTrackLocation, locationErrorMsg, isFindingLocation } =
    useTrackLocation()

  console.log('props', props)

  const handleOnBannerBtnClick = () => {
    console.log('Hi banner button')
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText={'view stores nearby'}
          handleOnClick={handleOnBannerBtnClick}
        />
        <div className={styles.heroImage}>
          <Image src="/static/hero-image.png" height={400} width={700} />
        </div>
        {coffeeStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>Toronto stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores?.map((coffeStore) => {
                return (
                  <Card
                    key={coffeStore.fsq_id}
                    name={coffeStore.name}
                    imgUrl={
                      coffeStore.imgUrl ||
                      'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
                    }
                    href={`/coffee-store/${coffeStore.fsq_id}`}
                  />
                )
              })}
            </div>
          </>
        )}
      </main>
      <footer className={styles.footer}> </footer>
    </div>
  )
}
