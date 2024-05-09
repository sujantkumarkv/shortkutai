import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="description"
          content="Shortkut is a browser extension for creating smart AI powered shortcuts that automate repetitive work."
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="title" content="Shortkut AI" />
      </Head>
      <body>
        <Main />

        <NextScript />
      </body>
    </Html>
  );
}
