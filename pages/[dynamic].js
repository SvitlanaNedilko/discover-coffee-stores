import Head from 'next/head'
import { useRouter } from 'next/router'

const DynamicRoute = () => {
  const router = useRouter()
  const query = router.query.dynamic

  return (
    <>
      <Head>
        <title>{query}</title>
      </Head>
      <div>Hi I dynamic Route:{query}</div>
    </>
  )
}

export default DynamicRoute
