import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Header, Main } from "../components";

const style = {
  wrapper:
    "h-screen max-h-screen h-min-screen w-screen bg-[#2d242F] text-white select-none flex flex-col justify-between",
};

const Home: NextPage = () => {
  return (
    <div className={style.wrapper}>
      <Header />
      <Main />
      <div />
    </div>
  );
};

export default Home;
