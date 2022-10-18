/* eslint-disable i18next/no-literal-string */
/* eslint-disable abcsize/abcsize */
import { useState } from 'react';
import type { Post as PrismaPost } from '@prisma/client';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useSession } from 'next-auth/react';

import type { Post } from '@root/components';
import {
  CheckboxHeader,
  Message,
  MutationPostModal,
  Navbar,
  PostList,
  tagCheckboxHandler,
} from '@root/components';
import { trpc } from '@root/utils/trpc';

type TCreatePostData = {
  description: string;
  tags: string[];
  visible: boolean;
};

export type THandleCreatePost = (
  data: TCreatePostData,
  { onSuccess }: { onSuccess: (post: PrismaPost) => void }
) => void;

function AddSymbolSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <line
        x1="4"
        y1="12"
        x2="20"
        y2="12"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      ></line>
      <line
        x1="12"
        y1="4"
        x2="12"
        y2="20"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      ></line>
    </svg>
  );
}

function useMutationsPostModal({
  callback,
  setFeedbacks,
}: {
  callback: () => void;
  setFeedbacks: (feedback: string) => void;
}) {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const { mutate: createPost } = trpc.post.createPost.useMutation({
    onSuccess: (post) => {
      setFeedbacks(`post ${post.id} criado`);
      setOpenCreateModal(false);
      callback();
    },
    onError: (error) => setFeedbacks(`ERRO: ${error.message}`),
  });
  const [openEditModal, setOpenEditModal] = useState(false);
  const { mutate: deletePost } = trpc.post.deletePost.useMutation({
    onSuccess: () => {
      callback();
    },
  });
  const { mutate: editPost } = trpc.post.editPost.useMutation({
    onSuccess: () => {
      setOpenEditModal(false);
      callback();
    },
  });

  return {
    openCreateModal,
    setOpenCreateModal,
    openEditModal,
    setOpenEditModal,
    editPost,
    deletePost,
    createPost,
  };
}

function formatFeedback(feedback: string) {
  if (!feedback) return <></>;
  if (feedback.startsWith('ERRO'))
    return (
      <Message key={feedback} variant="error">
        <span>{feedback}</span>
      </Message>
    );
  return (
    <Message key={feedback} variant="success">
      <span>{feedback}</span>
    </Message>
  );
}

const Posts: NextPage = () => {
  const [tags, setTags] = useState([] as string[]);
  const [page, setPage] = useState(0);
  const [take, setTake] = useState(6);
  const [filterMyPosts, setFilterMyPosts] = useState(false);
  const { data } = useSession();
  const postsData = trpc.post.getAllPosts.useQuery({
    tags,
    mine: filterMyPosts,
    skip: page * take,
    take,
  });

  const {
    openCreateModal,
    setOpenCreateModal,
    createPost,
    openEditModal,
    setOpenEditModal,
    editPost,
    deletePost,
  } = useMutationsPostModal({
    callback: () => postsData.refetch(),
    setFeedbacks: (feedback: string) =>
      setFeedbacks((old) => [...old, feedback]),
  });
  const [feedbacks, setFeedbacks] = useState([] as string[]);
  const [editPostInfo, setEditPostInfo] = useState(
    {} as { id: string; description: string; tags: { name: string }[] }
  );

  const createEditCB =
    (id: string) =>
    ({
      description,
      tags,
      visible,
    }: {
      description: string;
      tags: string[];
      visible: boolean;
    }) =>
      editPost({ id, description, tags, visible });
  const handleCheckbox = (args: { checked: boolean; value: string }) =>
    setTags((old) => tagCheckboxHandler(args)(old));

  if (!data) {
    return (
      <div className="flex min-h-screen flex-col">
        <Head>
          <title>Posts</title>
          <meta name="description" content="Lista de Publicações" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar title="Posts" />
        <main className="container mx-auto flex flex-1 flex-col items-center justify-center p-4">
          <h1>Deslogado</h1>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>Posts</title>
        <meta name="description" content="Lista de Publicações" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar title="Posts" />
      <main className="container mx-auto flex flex-1 flex-col items-center justify-center p-4">
        <CheckboxHeader
          {...{
            handleCheckbox,
            filterMyPostsCB: (filter: boolean) => setFilterMyPosts(filter),
            isFiltered: filterMyPosts,
            tags,
          }}
        />

        <div className="grid gap-5 p-0 sm:p-4 lg:grid-cols-2 xl:grid-cols-3">
          <PostList
            {...{
              posts: postsData.data,
              deleteCB: (post: Post) => () => deletePost({ id: post.id }),
              editCB: (post: Post) => () => {
                setOpenEditModal(true);
                setEditPostInfo({ ...post });
              },
            }}
          />
        </div>

        <input
          type="number"
          className="input"
          onChange={(e) => {
            const docsPerPage = Number(e.target.value);
            if (!docsPerPage) return;
            setTake(docsPerPage);
            setPage(0);
          }}
        />

        <div className="btn-group">
          <button
            className="btn"
            disabled={page === 0}
            onClick={() => setPage((old) => Math.max(old - 1, 0))}
          >
            «
          </button>
          <button className="btn">Página {page + 1}</button>
          <button className="btn" onClick={() => setPage((old) => old + 1)}>
            »
          </button>
        </div>

        <button
          onClick={() => setOpenCreateModal(true)}
          className="btn btn-circle fixed bottom-8 right-8"
        >
          <AddSymbolSVG />
        </button>
        <MutationPostModal
          title={'Criar Novo Post'}
          openModal={openCreateModal}
          callback={createPost}
          tags={[] as string[]}
          description={''}
          onClose={() => setOpenCreateModal(false)}
        />
        <MutationPostModal
          title={'Editar Post'}
          openModal={openEditModal}
          callback={createEditCB(editPostInfo.id)}
          description={editPostInfo.description ?? ''}
          tags={editPostInfo.tags?.map(({ name }) => name) ?? []}
          onClose={() => setOpenEditModal(false)}
        />
        <div className="toast">
          {feedbacks.map((feedback) => formatFeedback(feedback))}
        </div>
      </main>
    </div>
  );
};

export default Posts;
