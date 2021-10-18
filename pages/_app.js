import '../styles/globals.css'
import Layout from '../components/layout'
import GoogleAnalytics from '../components/GoogleAnalytics' //https://panda-program.com/posts/nextjs-google-analytics
import usePageView from '../hooks/usePageView'

import { useRouter } from "next/router";
import React, { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  usePageView()
  return (
    <>
      <GoogleAnalytics />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp


