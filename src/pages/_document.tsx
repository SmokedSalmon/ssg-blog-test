import { Html, Head, Main, NextScript, DocumentProps } from 'next/document'

export default function Document(props: DocumentProps) {
  const { ['__NEXT_DATA__']: { page }} = props
  const parts = (page && page.split('/')) || []
  const bodyClassName = (parts.filter(Boolean)).join('-')
  return (
    <Html lang="en">
      <Head />
      <body className={bodyClassName}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
