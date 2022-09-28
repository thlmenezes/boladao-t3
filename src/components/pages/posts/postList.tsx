/* eslint-disable i18next/no-literal-string */
import { PostCard } from './postCard';

export type Post = {
  id: string;
  description: string;
  user: { image: string | null; name: string | null };
  tags: { name: string }[];
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
        className="mt-3 text-sm underline text-violet-500 decoration-dotted underline-offset-2"
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
