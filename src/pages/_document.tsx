import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          <meta charSet="UTF-8" />

          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />

          <meta name="theme-color" content="#000000" />
          <meta name="description" content="NextJS Start Project" />

          <meta property="og:type" content="website" />
          <meta property="og:locale" content="pt_BR" />
          <meta property="og:site_name" content="NextJS Start Project" />

          <link rel="apple-touch-icon" href="/logo192.png" />
          <link rel="manifest" href="/manifest.json" />

          <meta property="og:url" content="https://localhost:3000/" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="NextJS Start Project" />
          <meta property="og:description" content="NextJS Start Project" />
          <meta property="og:image" content="http://localhost:3000/react.png" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content="https://localhost:3000/" />
          <meta property="twitter:url" content="https://localhost:3000/" />
          <meta name="twitter:title" content="NextJS Start Project" />
          <meta name="twitter:description" content="NextJS Start Project" />
          <meta
            name="twitter:image"
            content="https://localhost:3000/react.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
