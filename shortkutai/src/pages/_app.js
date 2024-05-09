import "@/styles/globals.css";
import Head from "next/head";
import { useEffect } from "react";
import TagManager from "react-gtm-module";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize({ gtmId: "G-HXKER9V4ZT" });
  }, []);

  return (
    <>
      <Head>
        <title>Shortkut AI</title>
        <meta
          name="description"
          content="Shortkut is a browser extension for creating smart AI powered shortcuts that automate repetitive work."
        />

        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="index,follow" />
        <meta property="og:title" content="Shortkut AI" />
        <meta
          property="og:description"
          content="Shortkut is a browser extension for creating smart AI powered shortcuts that automate repetitive work."
        />
        <meta property="og:image" content="/android.png" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}
