import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
      <meta name="google-site-verification" content="1C3Q60sZO7f-WqIIopFn5802Is_u9D7e9Ul_vAcZDE4" />
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