/* eslint-disable i18next/no-literal-string */
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useSession } from 'next-auth/react';

import { Message } from '@root/components/message';
import { Navbar } from '@root/components/navbar';
import { PostCard } from '@root/components/postCard';
import { trpc } from '@root/utils/trpc';

function CreatePostModal({
  isOpen,
  createCB,
  closeCB,
}: {
  isOpen: boolean;
  createCB: ({
    description,
    tags,
  }: {
    description: string;
    tags: string[];
  }) => void;
  closeCB: () => void;
}) {
  const [tags, setTags] = useState([] as string[]);
  const [description, setDescription] = useState('');

  function handleCheckbox({
    checked,
    value,
  }: {
    checked: boolean;
    value: string;
  }) {
    if (checked) {
      setTags((old) => [...old, value]);
    } else {
      setTags((old) => old.filter((tag) => tag !== value));
    }
  }

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
                        createCB({
                          description,
                          tags: Array.from(new Set(tags)),
                        });
                      }
                    }}
                  >
                    <ul className="flex gap-2">
                      <li>
                        <label className="label cursor-pointer">
                          <input
                            type="checkbox"
                            className="checkbox mr-2"
                            onClick={(e) =>
                              handleCheckbox({
                                checked: e.target?.checked,
                                value: 'furto',
                              })
                            }
                          />
                          <span className="label-text">Furto</span>
                        </label>
                      </li>
                      <li>
                        <label className="label cursor-pointer">
                          <input
                            type="checkbox"
                            className="checkbox mr-2"
                            onClick={(e) =>
                              handleCheckbox({
                                checked: e.target?.checked,
                                value: 'roubo',
                              })
                            }
                          />
                          <span className="label-text">Roubo</span>
                        </label>
                      </li>
                      <li>
                        <label className="label cursor-pointer">
                          <input
                            type="checkbox"
                            className="checkbox mr-2"
                            onClick={(e) =>
                              handleCheckbox({
                                checked: e.target?.checked,
                                value: 'assédio',
                              })
                            }
                          />
                          <span className="label-text">Assédio</span>
                        </label>
                      </li>
                    </ul>
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
                        // disabled={description.trim().length === 0}
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

function EditPostModal({
  isOpen,
  editCB,
  closeCB,
  description: initialDescription,
  tags: initialTags,
}: {
  isOpen: boolean;
  editCB: ({
    description,
    tags,
  }: {
    description: string;
    tags: string[];
  }) => void;
  closeCB: () => void;
  description: string;
  tags: string[];
}) {
  const [tags, setTags] = useState(initialTags);
  const [description, setDescription] = useState(initialDescription);
  useEffect(() => {
    setDescription(initialDescription);
  }, [initialDescription]);

  useEffect(() => {
    setTags(initialTags);
  }, [initialTags]);

  function handleCheckbox({
    checked,
    value,
  }: {
    checked: boolean;
    value: string;
  }) {
    if (checked) {
      setTags((old) => [...old, value]);
    } else {
      setTags((old) => old.filter((tag) => tag !== value));
    }
  }

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
                    Editar Post
                  </Dialog.Title>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (description.trim().length > 0) {
                        editCB({
                          description,
                          tags: Array.from(new Set(tags)),
                        });
                      }
                    }}
                  >
                    <ul className="flex gap-2">
                      <li>
                        <label className="label cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked={tags.includes('furto')}
                            className="checkbox mr-2"
                            onClick={(e) =>
                              handleCheckbox({
                                checked: e.target?.checked,
                                value: 'furto',
                              })
                            }
                          />
                          <span className="label-text">Furto</span>
                        </label>
                      </li>
                      <li>
                        <label className="label cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked={tags.includes('roubo')}
                            className="checkbox mr-2"
                            onClick={(e) =>
                              handleCheckbox({
                                checked: e.target?.checked,
                                value: 'roubo',
                              })
                            }
                          />
                          <span className="label-text">Roubo</span>
                        </label>
                      </li>
                      <li>
                        <label className="label cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked={tags.includes('assédio')}
                            className="checkbox mr-2"
                            onClick={(e) =>
                              handleCheckbox({
                                checked: e.target?.checked,
                                value: 'assédio',
                              })
                            }
                          />
                          <span className="label-text">Assédio</span>
                        </label>
                      </li>
                    </ul>
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

function useCreatePostModal({
  callback,
  setFeedbacks,
}: {
  callback: () => void;
  setFeedbacks: (feedback: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: createPost } = trpc.post.createPost.useMutation({
    onSuccess: (post) => {
      setFeedbacks(`post ${post.id} criado`);
      setIsOpen(false);
      callback();
    },
    onError: (error) => setFeedbacks(`ERRO: ${error.message}`),
  });

  return { isOpen, setIsOpen, createPost };
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
  const postsData = trpc.post.getAllPosts.useQuery();
  const { data } = useSession();
  const [feedbacks, setFeedbacks] = useState([] as string[]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editPostInfo, setEditPostInfo] = useState(
    {} as { id: string; description: string; tags: { name: string }[] }
  );

  const { isOpen, setIsOpen, createPost } = useCreatePostModal({
    callback: () => postsData.refetch(),
    setFeedbacks: (feedback: string) =>
      setFeedbacks((old) => [...old, feedback]),
  });

  const { mutate: deletePost } = trpc.post.deletePost.useMutation({
    onSuccess: () => {
      postsData.refetch();
    },
  });
  const { mutate: editPost } = trpc.post.editPost.useMutation({
    onSuccess: () => {
      postsData.refetch();
      setIsEditOpen(false);
    },
  });

  function PostList(
    posts:
      | {
          id: string;
          description: string;
          user: { image: string | null; name: string | null };
          tags: { name: string }[];
        }[]
      | undefined
  ) {
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
        key={post.id}
        data={post}
        deleteCB={() => deletePost({ id: post.id })}
        editCB={() => {
          setIsEditOpen(true);
          setEditPostInfo({ ...post });
        }}
      />
    ));
  }

  const createEditCB =
    (id: string) =>
    ({ description, tags }: { description: string; tags: string[] }) =>
      editPost({ id, description, tags });

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
            {PostList(postsData.data)}
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
        <EditPostModal
          isOpen={isEditOpen}
          editCB={createEditCB(editPostInfo.id)}
          description={editPostInfo.description ?? ''}
          tags={editPostInfo.tags.map(({ name }) => name)}
          closeCB={() => setIsEditOpen(false)}
        />
        <div className="toast">
          {feedbacks.map((feedback) => formatFeedback(feedback))}
        </div>
      </main>
    </div>
  );
};

export default Posts;
