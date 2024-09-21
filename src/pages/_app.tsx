import React, { useEffect } from "react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { Urbanist } from "next/font/google";
import { initializeCart } from "../store/cartSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const urbanist = Urbanist({ subsets: ["latin"] });

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    store.dispatch(initializeCart());
  }, []);

  return (
    <Provider store={store}>
      <main className={urbanist.className}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ToastContainer />
      </main>
    </Provider>
  );
}

export default MyApp;
