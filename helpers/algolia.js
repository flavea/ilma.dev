import algoliasearch from 'algoliasearch'
import _renderToString from 'vue-server-renderer/basic'

export const renderToString = (app) => {
  return new Promise((resolve, reject) => {
    _renderToString(app, (err, res) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

export const searchClient = algoliasearch(
  process.env.ALGOLIA_ID,
  process.env.ALGOLIA_KEY
)
