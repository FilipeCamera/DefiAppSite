import { useState, useEffect, createContext } from "react";

export const TransactionContext = createContext<any>(undefined);

export const TransactionProvider = ({ children }: any) => {
  const { currentAccount, connectWallet, checkIfWalletIsConnected } =
    useConnectWallet();

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  return (
    <TransactionContext.Provider value={{ currentAccount, connectWallet }}>
      {children}
    </TransactionContext.Provider>
  );
};

const useConnectWallet = () => {
  const [currentAccount, setCurrentAccount] = useState();

  const metamask = typeof window !== undefined ? window.ethereum : null;

  const connectWallet = async () => {
    try {
      if (!metamask) return alert("Please install Metamask!");
      const accounts = await metamask.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.error(err);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!metamask) return alert("Please install Metamask!");

      const accounts = await metamask.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        console.log("Wallet is already connected");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return { currentAccount, connectWallet, checkIfWalletIsConnected };
};
