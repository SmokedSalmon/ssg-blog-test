// @ts-ignore
import Document, { Html, Head, Main, NextScript } from 'next/document'
import type { DocumentProps } from 'next/document'

// Dynamically sets body attributes such as classes by page properties
// The class is defined in the global css. I cannot find a way to define <body> style in page's module CSS so far
// refer to: https://smnh.me/add-class-to-body-tag-in-nextjs
// Might not be the best solution
// export default class MyDocument extends Document {
//   render() {
//     const pageProps = this.props?.__NEXT_DATA__?.props?.pageProps;
//     return (
//       <Html lang="en">
//         <Head />
//         <body className={pageProps.bodyClass}>
//           <Main />
//           <NextScript />
//         </body>
//       </Html>
//     );
//   }
// }

// non-class version of passing document props to assign dynamic values on build time
export default function Document(props: DocumentProps) {
  const pageProps = props?.__NEXT_DATA__?.props?.pageProps;
  return (
    <Html lang="en">
      <Head />
      <body className={pageProps.bodyClass}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
