import React from "react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { Urbanist } from "next/font/google";

const urbanist = Urbanist({ subsets: ["latin"] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <main className={urbanist.className}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
    </Provider>
  );
}

export default MyApp;
