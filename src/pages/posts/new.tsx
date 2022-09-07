import type { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { transformDocument } from "@prisma/client/runtime";
import { useState } from "react";

const Posts: NextPage = () => {
  const { data } = useSession();
  const [description, setDescription] = useState('');
  const [feedback, setFeedback] = useState('')
  const { mutate: createPost } = trpc.post.createPost.useMutation({
    onSuccess: (post) => setFeedback(`post ${post.id} criado`),
    onError: (error) => setFeedback(`ERRO: ${error.message}`)
  });

  function formatFeedback(feedback: string): JSX.Element {
    if(!feedback) return <></>
    if(feedback.startsWith('ERRO')) return <p className='bg-red-600'>{feedback}</p>
    return <p className="bg-green-600">{feedback}</p>
  }

  return <>
      <Head>
        <title>Criar Post</title>
        <meta name="description" content="Criar nova publicação" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container flex flex-col items-center justify-center min-h-screen p-4 mx-auto">
        {!data ?
          <h1>Deslogado</h1> :
          <>
          <h1>Criar Novo</h1>
          <form onSubmit={(e) => {
            e.preventDefault()
            createPost({ description })
          }}>
            <textarea name="description" value={description} onChange={({target}) => setDescription(target.value)}/>
            <input type="submit"/>
          </form>
          {formatFeedback(feedback)}
          </>}
      </main>
  </>
}

export default Posts;