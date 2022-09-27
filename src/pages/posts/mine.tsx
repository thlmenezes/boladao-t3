import type { NextPage } from 'next';
import Head from 'next/head';
import { useSession } from 'next-auth/react';

import { Navbar } from '@root/components/navbar';
import { trpc } from '@root/utils/trpc';

function copyTextToClipboard(text: string) {
  return () => {
    if (typeof window === 'undefined') return;
    navigator.clipboard.writeText(text);
  };
}

const Posts: NextPage = () => {
  const postsData = trpc.post.getMyPosts.useQuery();
  const { data } = useSession();

  function formatPostsData(posts: typeof postsData.data) {
    if (!posts || posts.length === 0)
      return (
        <a
          className="mt-3 text-sm underline text-violet-500 decoration-dotted underline-offset-2"
          href={'/posts/new'}
        >
          Criar Novo Post
        </a>
      );
    return posts.map((post) => {
      return (
        <div
          key={post.id}
          className="card card-bordered w-96 bg-neutral text-neutral-content shadow-xl"
        >
          <div className="card-body">
            <p>{post.description}</p>
            <div className="card-actions justify-end">
              <button
                onClick={copyTextToClipboard(
                  post.description + '\nCopiado de projeto boladão <3'
                )}
                className="btn btn-primary"
              >
                Copiar
              </button>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Posts</title>
        <meta name="description" content="Lista de Publicações" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar title="Meus Posts" />
      <main className="container flex flex-1 flex-col items-center justify-center p-4 mx-auto">
        {!data ? (
          <h1>Deslogado</h1>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {formatPostsData(postsData.data)}
          </div>
        )}
      </main>
    </div>
  );
};

export default Posts;
