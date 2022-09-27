function copyTextToClipboard(text: string) {
  return () => {
    if (typeof window === 'undefined') return;
    navigator.clipboard.writeText(text);
  };
}

export function PostCard({
  data,
}: {
  data: {
    id: string;
    description: string;
    user?: { image: string; name: string };
  };
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
