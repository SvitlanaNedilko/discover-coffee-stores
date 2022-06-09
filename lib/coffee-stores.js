// //initialize unsplash

import { createApi } from 'unsplash-js'
import nodeFetch from 'node-fetch'

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
  fetch: nodeFetch,
})

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`
}

export const fetchCoffeeStores = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: 'cat',
    page: 1,
    perPage: 10,
    color: 'green',
    orientation: 'portrait',
  })
  const response = await fetch(
    getUrlForCoffeeStores('49.843646,24.026509', 'coffee', 6),
    {
      headers: {
        Accept: 'application/json',
        Authorization: process.env.FOURSQUERE_API_KEY,
      },
    }
  )

  const data = await response.json()
  console.log(data)
  return data.results
}
