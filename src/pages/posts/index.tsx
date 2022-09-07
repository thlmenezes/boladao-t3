import type { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { Navbar } from "../../components/navbar";

const Posts: NextPage = () => {
  const postsData = trpc.post.getAllPosts.useQuery();
  const { data } = useSession();

  function formatPostsData(posts: typeof postsData.data) {
    if (!posts || posts.length === 0)
      return <a className="mt-3 text-sm underline text-violet-500 decoration-dotted underline-offset-2"
            href={"/posts/new"}
          >
            Criar Novo Post
          </a>
    return posts.map((post) => {
      return <p key={post.id}>{post.description}</p>
    })
  }
  return <div className="flex flex-col min-h-screen">
      <Head>
        <title>Posts</title>
        <meta name="description" content="Lista de Publicações" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar title="Posts"/>
      <main className="container flex flex-1 flex-col items-center justify-center p-4 mx-auto">
        {!data ?
          <h1>Deslogado</h1>
          : <>
            {
              formatPostsData(postsData.data)
            }
          </>
        }
      </main>
  </div>
}

export default Posts;