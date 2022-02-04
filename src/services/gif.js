import { GiphyFetch } from "@giphy/js-fetch-api"

const API_KEY = "igoGAnk3G8HAONTJyhckH7N0KaSRhiTD"
const client = new GiphyFetch(API_KEY)

export const random = (query = "", rating = "") =>
  client.random({
    type: "gifs",
    tag: query,
    rating: rating,
  })

export const search = (query = "", results = [], callback) =>
  client
    .search(query, {
      type: "gifs",
      offset: results.length,
    })
    .then(response => {
      const results = response.data.map(result => ({
        url: result.images.fixed_width.url,
        originalUrl: result.images.original.url,
        width: result.images.fixed_width.width,
        height: result.images.fixed_width.height,
      }))
      callback(results)
    })

export default client
