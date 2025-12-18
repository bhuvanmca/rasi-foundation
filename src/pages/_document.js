import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#dc2626" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="author" content="Rasi Foundation" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Rasi Foundation" />
        <meta property="og:locale" content="en_IN" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
