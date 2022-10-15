import type { NextPage } from 'next';
import Head from 'next/head';

import { Navbar } from '@root/components/navbar';

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>Boladão T3</title>
        <meta
          name="description"
          content="Reimaginação do Projeto Boladão utilizando create T3 app"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar title="Início" />
      <main className="container mx-auto flex flex-1 flex-col items-center justify-center p-4">
        <h1 className="text-5xl font-extrabold leading-normal md:text-[5rem]">
          Projeto Boladão T3 App
        </h1>
      </main>
    </div>
  );
};

export default Home;
