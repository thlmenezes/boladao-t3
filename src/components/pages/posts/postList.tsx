/* eslint-disable i18next/no-literal-string */
import type { Post as PrismaPost, Tag, User } from '@prisma/client';

import { PostCard } from './postCard';

export type Post = PrismaPost & {
  user: User;
  tags: Tag[];
};

export function PostList({
  posts,
  deleteCB,
  editCB,
}: {
  posts: Post[] | undefined;
  deleteCB: (post: Post) => () => void;
  editCB: (post: Post) => () => void;
}) {
  if (!posts || posts.length === 0)
    return (
      <a
        className="mt-3 text-sm text-violet-500 underline decoration-dotted underline-offset-2"
        href={'/posts/new'}
      >
        Criar Novo Post
      </a>
    );
  return (
    <>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          data={post}
          deleteCB={deleteCB(post)}
          editCB={editCB(post)}
        />
      ))}
    </>
  );
}
