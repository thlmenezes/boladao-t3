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
  data: {
    id: string;
    description: string;
    user?: { image: string; name: string };
  };
  editCB: () => void;
  deleteCB: () => void;
}) {
  return (
    <div
      key={data.id}
      className="card card-bordered w-96 bg-neutral text-neutral-content shadow-xl"
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
          </div>
        )}
        <p>{data.description}</p>
        <div className="card-actions justify-end">
          <button onClick={editCB} className="btn btn-square">
            <picture>
              <img
                width={25}
                height={25}
                src="/pencil.svg"
                alt={'clique para editar'}
              />
            </picture>
          </button>
          <button
            onClick={deleteCB}
            className="btn btn-square hover:bg-red-800"
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
          <button
            onClick={copyTextToClipboard(
              data.description + '\nCopiado de projeto boladão <3'
            )}
            className="btn btn-primary"
          >
            Copiar
          </button>
        </div>
      </div>
    </div>
  );
}
