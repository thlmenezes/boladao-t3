import { useState } from 'react';

import { Post } from './postList';

/* eslint-disable i18next/no-literal-string */
function copyTextToClipboard(text: string) {
  return () => {
    if (typeof window === 'undefined') return;
    navigator.clipboard.writeText(text);
  };
}

export function PostCard({
  data,
  editCB,
  deleteCB,
}: {
  data: Post;
  editCB: () => void;
  deleteCB: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (description: string) => {
    return () => {
      copyTextToClipboard(description);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };
  };

  return (
    <div
      key={data.id}
      className="card card-bordered w-max max-w-[384px] bg-neutral text-neutral-content shadow-xl"
    >
      <div className="card-body">
        {data.user && (
          <div className="card-title">
            <picture>
              <img
                className="rounded-full"
                src={data.user.image ?? ''}
                alt={`Foto de Perfil do usuário ${data.user.name}`}
                width={25}
                height={25}
              />
            </picture>
            <p>{data.user.name}</p>
            <div className="card-actions flex flex-row justify-self-end">
              <div className="tooltip tooltip-accent" data-tip="Editar post">
                <button onClick={editCB} className="btn btn-square btn-sm">
                  <picture>
                    <img
                      width={25}
                      height={25}
                      src="/pencil.svg"
                      alt={'clique para editar'}
                    />
                  </picture>
                </button>
              </div>
              <div className="tooltip tooltip-error" data-tip="Deletar">
                <button
                  onClick={deleteCB}
                  className="btn btn-ghost btn-square btn-sm hover:bg-red-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div
                className={`tooltip ${
                  copied ? 'tooltip-success' : 'tooltip-primary'
                }`}
                data-tip={copied ? 'Copiado' : 'Copiar'}
              >
                <button
                  onClick={handleCopy(data.description)}
                  className="btn btn-primary btn-sm px-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="#a6adba"
                    viewBox="0 0 256 256"
                  >
                    <rect width="256" height="256" fill="none"></rect>
                    <polyline
                      points="168 168 216 168 216 40 88 40 88 88"
                      fill="none"
                      stroke="#a6adba"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    ></polyline>
                    <rect
                      x="40"
                      y="88"
                      width="128"
                      height="128"
                      fill="none"
                      stroke="#a6adba"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    ></rect>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
        <ul className="flex gap-2">
          {data.tags?.map(({ name }) => (
            <li key={name} className="text-accent">
              #{name}
            </li>
          ))}
        </ul>
        <div className="flex items-center">
          <p className="flex-1">{data.description}</p>
          <div className="flex h-full items-end">
            <strong>{data.visible ? 'Público' : 'Privado'}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
