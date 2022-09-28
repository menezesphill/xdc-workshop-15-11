import type { NextPage } from "next";
import Head from "next/head";
import Router from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  useEffect(() => {
    Router.push("/staking");
  });

  return (

      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

  );
};

export default Home;
