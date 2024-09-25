import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* ICO for best compatibility */}
        <link rel="icon" href="/favicon.svg" sizes="any" />
        {/* SVG for modern browsers */}
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
