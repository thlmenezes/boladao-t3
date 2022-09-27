import type { NextPage } from 'next';
import Head from 'next/head';
import { useSession } from 'next-auth/react';

import { Navbar } from '@root/components/navbar';
import { PostCard } from '@root/components/postCard';
import { trpc } from '@root/utils/trpc';

const Posts: NextPage = () => {
  const postsData = trpc.post.getMyPosts.useQuery();
  const { data } = useSession();
  const { mutate: deletePost } = trpc.post.deletePost.useMutation({
    onSuccess: () => {
      postsData.refetch();
    },
  });

  function PostList(posts: { id: string; description: string }[] | undefined) {
    if (!posts || posts.length === 0)
      return (
        <a
          className="mt-3 text-sm underline text-violet-500 decoration-dotted underline-offset-2"
          href={'/posts/new'}
        >
          Criar Novo Post
        </a>
      );
    return posts.map((post) => (
      <PostCard
        data={post}
        deleteCB={() => deletePost({ id: post.id })}
        editCB={() => alert('oi')}
      />
    ));
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
            {PostList(postsData.data)}
          </div>
        )}
      </main>
    </div>
  );
};

export default Posts;
