import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

import styles from '../../styles/coffee-store.module.css'
import cls from 'classnames'

import coffeeStoresData from '../../data/coffee-stores.json'
import { fetchCoffeeStores } from '../../lib/coffee-stores'

export async function getStaticProps(staticProps) {
  const params = staticProps.params

  console.log('params', params)
  const coffeeStores = await fetchCoffeeStores()

  return {
    props: {
      coffeeStore: coffeeStores.find((coffeeStore) => {
        return coffeeStore.fsq_id === params.id
      }),
    },
  }
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores()

  const paths = coffeeStores.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.fsq_id,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

const CoffeeStore = (props) => {
  const router = useRouter()
  console.log('router', router)
  console.log('props', props)
  // const id = router.query.id

  if (router.isFallback) {
    return <div>Loading....</div>
  }

  const { location, name, imgUrl, neighbourhood } = props.coffeeStore

  const handleUpvoute = () => {
    console.log('you click on button voute ')
  }
  return (
    <div className={styles.layout}>
      <Head>
        <title>
          <h1>{name}</h1>
        </title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}></h1>
          </div>
          <Image
            src={
              imgUrl ||
              'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
            }
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}
          ></Image>
        </div>

        <div className={cls('glass', styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/places.svg"
              width="24"
              height="24"
              alt="places icon"
            />
            <p className={styles.text}>{location.address}</p>
          </div>

          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/nearMe.svg"
              width="24"
              height="24"
              alt="near me icon"
            />
            <p className={styles.text}>{neighbourhood}</p>
          </div>

          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/star.svg"
              width="24"
              height="24"
              alt="star icon"
            />
            <p className={styles.text}>1</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpvoute}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  )
}

export default CoffeeStore
