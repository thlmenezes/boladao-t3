import type { NextPage } from "next";
import { trpc } from "@root/utils/trpc";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Navbar } from "@root/components/navbar";

const Message = ({ variant, children }: { variant: 'success' | 'error', children: React.ReactNode }) => {
  /*!
   * Original code by Rotimi Best from StackOverflow
   *
   * Attribution-ShareAlike 4.0 International Licensed, Copyright (c) 2020 Rotimi Best, see https://creativecommons.org/licenses/by-sa/4.0/ for details
   *
   * Credits to the Rotimi Best team:
   * https://stackoverflow.com/questions/65214950/how-to-disappear-alert-after-5-seconds-in-react-js
   * https://stackoverflow.com/users/8817146/rotimi-best
   */
  const [alert, setAlert] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
    
  return (<>{alert && <div className={`alert alert-${variant}`}>{children}</div>}</>)
}

const Posts: NextPage = () => {
  const { data } = useSession();
  const [description, setDescription] = useState('');
  const [feedbacks, setFeedbacks] = useState([] as string[]);
  const { mutate: createPost } = trpc.post.createPost.useMutation({
    onSuccess: (post) => {
      setFeedbacks((old) => [...old, `post ${post.id} criado`]);
      setDescription('')
    },
    onError: (error) => setFeedbacks((old) => [...old, `ERRO: ${error.message}`])
  });

  function formatFeedback(feedback: string) {
    if(!feedback) return <></>
    if(feedback.startsWith('ERRO')) return <Message variant="error"><span>{feedback}</span></Message>
    return <Message variant="success"><span>{feedback}</span></Message>
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
            {
              <div className="toast">
                {feedbacks.map(feedback => formatFeedback(feedback))}
              </div>
            }
          </>
        }
      </main>
  </div>
}

export default Posts;