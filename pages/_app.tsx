import "../styles/globals.css";
import type { AppProps } from "next/app";
import { TransactionProvider } from "../context/transactionContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TransactionProvider>
      <Component {...pageProps} />
    </TransactionProvider>
  );
}

export default MyApp;
