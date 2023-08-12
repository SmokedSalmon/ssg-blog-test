import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* might not be the right way to edit the <head>. Should use export metadata instead */}
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>Jerry J Su / Creative Technologist / WebXR / React Developer</title>

        <meta name="description" content="Jerry J Su / Creative Technologist / WebXR / React Developer" />

        <meta property="og:title" content="Jerry J Su / Creative Technologist / WebXR / React Developer" />
        <meta property="og:description" content="Jerry J Su / Creative Technologist / WebXR / React Developer based in London." />
        <meta property="og:type"  content="website" /> 
        <meta property="og:image" content="http://jerry.ninja/assets/fb2.jpg" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1230" />
        <meta property="og:image:height" content="600" />
        <meta property="og:site_name" content="Jerry J Su / Creative Technologist / WebXR / React Developer" />
        <meta property="og:url" content="http://jerry.ninja" />

        <meta itemProp="name" content="Jerry J Su / Creative Technologist / WebXR / React Developer" />
        <meta itemProp="description" content="Jerry J Su / Creative Technologist / WebXR / React Developer" />
        <meta itemProp="image" content="http://jerry.ninja/assets/fb2.jpg" />

        <link rel="shortcut icon" href="assets/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="180x180" href="assets/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="assets/favicon-16x16.png" />
        {/* TODO site manifest */}
        {/* <link rel="manifest" href="assets/site.webmanifest"> */}

        <meta name="author" content="Jerry" />
        
        <link rel="stylesheet" href="style.css?version=0.1.0" />

    </head>

      <body className={inter.className}>{children}</body>
    </html>
  )
}
