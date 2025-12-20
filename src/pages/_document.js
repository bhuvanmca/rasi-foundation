import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#dc2626" />
        <meta name="msapplication-TileColor" content="#dc2626" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon */}
        <link rel="icon" href="/logo.jpeg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.jpeg" />
        <link rel="icon" type="image/jpeg" sizes="32x32" href="/logo.jpeg" />
        <link rel="icon" type="image/jpeg" sizes="16x16" href="/logo.jpeg" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Base SEO */}
        <meta name="author" content="RASI FOUNDATION" />
        <meta name="publisher" content="RASI FOUNDATION" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
        
        {/* Open Graph Base */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="RASI FOUNDATION" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Verification tags - Add your verification codes here */}
        {/* <meta name="google-site-verification" content="your-google-verification-code" /> */}
        {/* <meta name="msvalidate.01" content="your-bing-verification-code" /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
