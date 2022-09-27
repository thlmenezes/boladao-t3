import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useSession } from 'next-auth/react';

import { Message } from '@root/components/message';
import { Navbar } from '@root/components/navbar';
import { trpc } from '@root/utils/trpc';

function CreatePostModal({
  isOpen,
  createCB,
  closeCB,
}: {
  isOpen: boolean;
  createCB: ({ description }: { description: string }) => void;
  closeCB: () => void;
}) {
  const [description, setDescription] = useState('');

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeCB}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden p-6 text-left align-middle card card-bordered bg-neutral text-neutral-content shadow-xl transition-all">
                <div className="card-body">
                  <Dialog.Title as="h3" className="card-title">
                    Criar Novo Post
                  </Dialog.Title>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (description.trim().length > 0) {
                        createCB({ description });
                      }
                    }}
                  >
                    <textarea
                      placeholder="Digite algo..."
                      className="textarea textarea-bordered bg-neutral text-neutral-content w-full rounded px-2 py-1 text-center text-lg"
                      name="description"
                      onChange={({ target }) => setDescription(target.value)}
                      rows={5}
                      cols={50}
                      value={description}
                    />
                    <div className="mt-4 card-actions">
                      <input
                        disabled={description.trim().length === 0}
                        className="btn btn-primary"
                        type="submit"
                      />
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={closeCB}
                      >
                        Fechar
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

function formatFeedback(feedback: string) {
  if (!feedback) return <></>;
  if (feedback.startsWith('ERRO'))
    return (
      <Message variant="error">
        <span>{feedback}</span>
      </Message>
    );
  return (
    <Message variant="success">
      <span>{feedback}</span>
    </Message>
  );
}

function copyTextToClipboard(text: string) {
  return () => {
    if (typeof window === 'undefined') return;
    navigator.clipboard.writeText(text);
  };
}

const Posts: NextPage = () => {
  const postsData = trpc.post.getAllPosts.useQuery();
  const { data } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [feedbacks, setFeedbacks] = useState([] as string[]);
  const { mutate: createPost } = trpc.post.createPost.useMutation({
    onSuccess: (post) => {
      setFeedbacks((old) => [...old, `post ${post.id} criado`]);
      setIsOpen(false);
      postsData.refetch();
    },
    onError: (error) =>
      setFeedbacks((old) => [...old, `ERRO: ${error.message}`]),
  });

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
            <div className="card-title">
              <picture>
                <img
                  className="rounded-full"
                  src={post.user.image ?? ''}
                  alt={`Foto de Perfil do usuário ${post.user.name}`}
                  width={25}
                  height={25}
                />
              </picture>
              <p>{post.user.name}</p>
            </div>
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

  const addSymbolSVG = (
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

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Posts</title>
        <meta name="description" content="Lista de Publicações" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar title="Posts" />
      <main className="container flex flex-1 flex-col items-center justify-center p-4 mx-auto">
        {!data ? (
          <h1>Deslogado</h1>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {formatPostsData(postsData.data)}
          </div>
        )}
        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-circle fixed bottom-8 right-8"
        >
          {addSymbolSVG}
        </button>
        <CreatePostModal
          isOpen={isOpen}
          createCB={createPost}
          closeCB={() => setIsOpen(false)}
        />
        <div className="toast">
          {feedbacks.map((feedback) => formatFeedback(feedback))}
        </div>
      </main>
    </div>
  );
};

export default Posts;
