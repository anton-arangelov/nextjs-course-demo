import '../styles/globals.css'
import Layout from '../components/layout/layout.js'

function MyApp({ Component, pageProps }) {
  return <Layout><Component {...pageProps} /></Layout>
}

export default MyApp
