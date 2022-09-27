import clsx from 'clsx';
import Link from 'next/link';
import { signIn, signOut } from 'next-auth/react';

import { trpc } from '@root/utils/trpc';

interface NavbarProps {
  title?: string;
}

export function Navbar({ title }: NavbarProps) {
  const session = trpc.auth.getSession.useQuery();
  const user = session.data?.user;

  function sessionButton() {
    if (!user) return <button onClick={() => signIn('twitch')}>Login</button>;
    return <button onClick={() => signOut()}>Log out</button>;
  }

  function userAvatar() {
    if (!user) return <span className="text-xl">AA</span>;

    return (
      <picture>
        <img
          className="rounded-full"
          src={user.image ?? ''}
          alt={`Foto de Perfil do usuário ${user.name}`}
          width={50}
          height={50}
        />
      </picture>
    );
  }

  return (
    <nav className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown tablet:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <Link href="/">
              <li>
                <button>Início</button>
              </li>
            </Link>
            {user && (
              <>
                <Link href="/posts">
                  <li>
                    <button>Posts</button>
                  </li>
                </Link>
                <Link href="/posts/new">
                  <li>
                    <button>Novo Post</button>
                  </li>
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
      {title && (
        <div className="navbar-center">
          <a className="normal-case font-bold text-xl">{title}</a>
        </div>
      )}
      <div className="navbar-end">
        <div className="space-x-5 mr-5 invisible tablet:visible">
          <Link href="/">
            <button className="btn btn-ghost">Início</button>
          </Link>
          {user && (
            <>
              <Link href="/posts">
                <button className="btn btn-ghost">Posts</button>
              </Link>
              <Link href="/posts/new">
                <button className="btn btn-ghost">Novo Post</button>
              </Link>
            </>
          )}
        </div>
        <div className="dropdown dropdown-end">
          <div
            className="tooltip tooltip-left"
            data-tip={user?.name ?? 'Faça Login'}
          >
            <label
              tabIndex={0}
              className={clsx('btn btn-ghost btn-circle avatar', {
                placeholder: !user,
              })}
            >
              <div className="w-10">{userAvatar()}</div>
            </label>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>{sessionButton()}</li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
