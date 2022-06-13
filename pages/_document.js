import { Html, Head, Main, NextScript } from 'next/document';
import Script from "next/script";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="stylesheet" href="/static/css/main.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Raleway:wght@800&family=VT323&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Source+Code+Pro:400,700&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}