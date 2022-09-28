import type { NextPage } from "next";

import Head from "next/head";
import Header from "../components/Header";
import Popup from "../components/Popup";
import Content from "../components/Staking";

const Staking: NextPage = () => {
  return (
    <>
      <Head>
        <title>XDC Staking</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Popup />
      <Header />
      <Content />
    </>
  );
};

export default Staking;
