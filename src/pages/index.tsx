import type { NextPage } from "next";
import Head from "next/head";
import { Navbar } from "../components/navbar";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Boladão T3</title>
        <meta name="description" content="Reimaginação do Projeto Boladão utilizando create T3 app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>
      <main className="container flex flex-1 flex-col items-center justify-center p-4 mx-auto">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold">
          Projeto Boladão T3 App
        </h1>
      </main>
    </div>
  );
};

export default Home;