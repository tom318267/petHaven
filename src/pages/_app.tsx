import React, { useEffect } from "react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { Urbanist } from "@next/font/google";
import { initializeCart } from "../store/cartSlice";
import GlobalToaster from "../components/GlobalToaster";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

const urbanist = Urbanist({ subsets: ["latin"] });

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    store.dispatch(initializeCart());
  }, []);

  return (
    <Provider store={store}>
      <Head>
        <title>PetHaven</title>
        <meta
          name="description"
          content="PetHaven: Your one-stop shop for premium pet supplies, food, and accessories. Find everything your furry friend needs for a happy, healthy life."
        />
        <meta
          name="keywords"
          content="pet supplies, pet food, pet accessories, dog, cat, PetHaven"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        {/* You can add other default meta tags here */}
      </Head>
      <main className={urbanist.className}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <GlobalToaster />
      </main>
    </Provider>
  );
}

export default MyApp;
