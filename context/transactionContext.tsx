import { useState, useEffect, createContext } from "react";

import { ethers } from "ethers";
import { contractAbi, contractAddress } from "../utils/constants";

export const TransactionContext = createContext<any>(undefined);

export const TransactionProvider = ({ children }: any) => {
  const { currentAccount, connectWallet, checkIfWalletIsConnected } =
    useConnectWallet();

  const { isLoading, sendTransaction, formData, handleChange } =
    useTransactions();

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  return (
    <TransactionContext.Provider
      value={{
        currentAccount,
        connectWallet,
        isLoading,
        sendTransaction,
        formData,
        handleChange,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

const useTransactions = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { metamask, getEthereumContract } = useConnectWallet();
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
  });

  const handleChange = (e: any) => {
    e.preventDefault();

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendTransaction = async () => {
    try {
      if (!metamask) return alert("Please install metamask");
      const transactionContract = getEthereumContract();
      const { addressTo, amount } = formData;

      const parsedAmount = ethers.utils.parseEther(amount);

      const signer = metamask.getSigner();

      signer.sendTransaction({
        to: addressTo,
        value: parsedAmount._hex,
      });

      setIsLoading(true);

      const transactionHash = await transactionContract.publishTransaction(
        addressTo,
        parsedAmount,
        `Transferring ETH ${parsedAmount} to ${addressTo}`,
        "TRANSFER"
      );

      await transactionHash.wait();

      //await saveTransaction(transactionHash.hash, amount, currentAccount, addressTo)

      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return { isLoading, sendTransaction, formData, handleChange };
};

const useConnectWallet = () => {
  const [currentAccount, setCurrentAccount] = useState<string>();

  const metamask =
    typeof window !== "undefined"
      ? new ethers.providers.Web3Provider(window.ethereum)
      : null;

  const connectWallet = async () => {
    try {
      if (!metamask) return alert("Please install Metamask!");
      await metamask.send("eth_requestAccounts", []);
      const accounts = await metamask.getSigner().getAddress();
      setCurrentAccount(accounts);
    } catch (err) {
      console.error(err);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!metamask) return alert("Please install Metamask!");

      const accounts = await metamask.getSigner().getAddress();

      if (!!accounts) {
        setCurrentAccount(accounts);
        console.log("Wallet is already connected");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getEthereumContract = () => {
    const transactionContract = new ethers.Contract(
      contractAddress,
      contractAbi,
      metamask?.getSigner()
    );

    return transactionContract;
  };

  return {
    currentAccount,
    connectWallet,
    checkIfWalletIsConnected,
    metamask,
    getEthereumContract,
  };
};
