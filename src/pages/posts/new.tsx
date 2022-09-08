import type { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import { Navbar } from "../../components/navbar";

const Posts: NextPage = () => {
  const { data } = useSession();
  const [description, setDescription] = useState('');
  const [feedback, setFeedback] = useState('')
  const { mutate: createPost } = trpc.post.createPost.useMutation({
    onSuccess: (post) => {
      setFeedback(`post ${post.id} criado`)
      setDescription('')
    },
    onError: (error) => setFeedback(`ERRO: ${error.message}`)
  });

  function formatFeedback(feedback: string): JSX.Element {
    if(!feedback) return <></>
    if(feedback.startsWith('ERRO')) return <p className='bg-red-600'>{feedback}</p>
    return <p className="bg-green-600">{feedback}</p>
  }

  return <div className="flex flex-col min-h-screen">
      <Head>
        <title>Criar Post</title>
        <meta name="description" content="Criar nova publicação" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar title="Novo Post"/>
      <main className="container flex flex-1 flex-col items-center justify-center p-4 mx-auto">
        {!data ?
          <h1>Deslogado</h1> :
          <>
          <form onSubmit={(e) => {
            e.preventDefault()
            if(description.trim().length > 0){
              createPost({ description })
            }
          }}>
            <textarea
              placeholder="Digite algo..."
              className="textarea textarea-bordered bg-neutral text-neutral-content w-full rounded px-2 py-1 text-center text-lg"
              name="description"
              onChange={({target}) => setDescription(target.value)}
              rows={20}
              cols={50}
              value={description}
            />
            <input disabled={description.trim().length === 0} className="btn btn-primary" type="submit"/>
          </form>
          {formatFeedback(feedback)}
          </>}
      </main>
  </div>
}

export default Posts;