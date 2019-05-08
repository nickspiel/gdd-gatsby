import GiphyApiClient from 'giphy-js-sdk-core'

const client = GiphyApiClient('igoGAnk3G8HAONTJyhckH7N0KaSRhiTD')

export const random = (query = '', rating = '') => client.random('gifs', {
  'q': query,
  'rating': rating,
})

export const search = (query = '', results = [], callback) => client.search('gifs', {
  "q": query,
  "offset": results.length,
})
.then((response) => {
  const results = response.data.map((result) => ({
    url: result.images.fixed_width.url,
    originalUrl: result.images.original.url,
    width: result.images.fixed_width.width,
    height: result.images.fixed_width.height,
  }))
  callback(results)
})

export default client



