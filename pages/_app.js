import '../styles/globals.css'
// import Header from '../components/layout/header'
import Layout from '../components/layout'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      {/* <Header /> */}
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp


