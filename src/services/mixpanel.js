import mixpanel from 'mixpanel-browser'

const client = () => {
  mixpanel.init('f5ed93a10204fbbdd68fbfba32898951')

  return mixpanel
}

export default client()