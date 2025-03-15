import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  const title = pageProps.metaTitle || 'Title'
  const desc = pageProps.metaDesc
  const descMeta = <meta property="og:description" content={desc} />
  const image = pageProps.metaImage
  const imageMeta = <meta property="og:image" content={image} />
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="title" />
        {desc && descMeta}
        {image && imageMeta}
      </Head>
      <Component {...pageProps} />
    </>
  )
}
