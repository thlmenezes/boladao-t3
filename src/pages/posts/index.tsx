import type { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { transformDocument } from "@prisma/client/runtime";

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
  return <>
      <Head>
        <title>Posts</title>
        <meta name="description" content="Lista de Publicações" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container flex flex-col items-center justify-center min-h-screen p-4 mx-auto">
        {!data ?
          <h1>Deslogado</h1>
          : <>
            <h1>Posts</h1>
            {
              formatPostsData(postsData.data)
            }
          </>
        }
      </main>
  </>
}

export default Posts;