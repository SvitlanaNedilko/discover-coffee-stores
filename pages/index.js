import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Banner from '../components/banner'
import Card from '../components/card'
import { fetchCoffeeStores } from '../lib/coffee-stores'

import useTrackLocation from '../hooks/use-track-location'
import { useEffect, useState, useContext } from 'react'
import { ACTION_TYPES, StoreContext } from '../store/store-context'

export async function getStaticProps(context) {
  const coffeeStores = await fetchCoffeeStores()
  return {
    props: {
      coffeeStores,
    }, // will be passed to the page component as props
  }
}

export default function Home(props) {
  const { handleTrackLocation, locationErrorMsg, isFindingLocation } =
    useTrackLocation()

  // const [coffeeStores, setCoffeeStores] = useState("");

  const [coffeeStoresError, setCoffeeStoresError] = useState(null)

  const { dispatch, state } = useContext(StoreContext)

  const { coffeeStores, latLong } = state

  useEffect(() => {
    const setCoffeeStoresByLocation = async () => {
      if (latLong) {
        try {
          const response = await fetch(
            `/api/getCoffeeStoresByLocation?latLong=${latLong}&limit=30`
          )

          const coffeeStores = await response.json()

          // setCoffeeStores(fetchedCoffeeStores);
          dispatch({
            type: ACTION_TYPES.SET_COFFEE_STORES,
            payload: {
              coffeeStores,
            },
          })
          setCoffeeStoresError('')
          //set coffee stores
        } catch (error) {
          //set error
          setCoffeeStoresError(error.message)
        }
      }
    }
    setCoffeeStoresByLocation()
  }, [latLong, dispatch])

  const handleOnBannerBtnClick = () => {
    console.log('Hi banner button')
    handleTrackLocation()
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
      </main>
      <footer className={styles.footer}> </footer>
    </div>
  )
}
