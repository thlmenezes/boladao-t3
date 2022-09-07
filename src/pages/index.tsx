import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { signIn, signOut } from "next-auth/react"
import Link from 'next/link'

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });
  const session = trpc.auth.getSession.useQuery();
  const posts = trpc.post.getAllPosts.useQuery();

  function sessionButton(){
    if(!session.data)
      return <button className="btn btn-primary" onClick={() => signIn("twitch")}>Login</button>
    return <button className="btn btn-primary" onClick={() => signOut()}>Log out</button>
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Boladão T3</title>
        <meta name="description" content="Reimaginação do Projeto Boladão utilizando create T3 app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="container flex justify-end p-4 mx-auto space-x-5">
        <nav className="space-x-5">
          <Link href="/">
            <button className="btn btn-primary" >Início</button>
          </Link>
          {
            session.data &&
            <>
              <Link href="/posts">
                <button className="btn btn-primary" >Posts</button>
              </Link>
              <Link href="/posts/new">
                <button className="btn btn-primary" >Novo Post</button>
              </Link>
            </>
          }
          {sessionButton()}
        </nav>
        {
          session.data && 
          <div className="flex flex-col items-center">
            <picture>
              <img
                className="rounded-full"
                src={session.data.user?.image ?? ''}
                alt={`Foto de Perfil do usuário ${session.data.user?.name}`}
                width={50}
                height={50}
                />
            </picture>
            <p>{session.data.user?.name}</p>
          </div>
        }
      </header>
      <main className="container flex flex-1 flex-col items-center justify-center p-4 mx-auto">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold">
          Projeto Boladão T3 App
        </h1>
      </main>
    </div>
  );
};

export default Home;