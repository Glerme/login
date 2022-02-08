import ms from 'ms';

import { GetServerSidePropsContext } from 'next';

import { ServerSideErrorRedirect } from './ServerSideError';

import { clearCookies, getCookies, setCookies } from './cookies';
import { parseCookieJSON } from './parseCookieJSON';

export interface AuthAdminProps {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res'];
}

export const auth = async (
  { req, res }: AuthAdminProps,
  checkResetar = true,
) => {
  const cookies = getCookies({ req });

  let {
    'refresh-token': refreshToken,
    'access-token': accessToken,
    'expires-at': expiresAtStr,
    usuario: usuarioStr,
  } = cookies;

  let expiresAt = new Date(expiresAtStr);

  let usuario = parseCookieJSON(usuarioStr);

  // if (!refreshToken) {
  //   throw new ServerSideErrorRedirect(
  //     '/?status=unauthorized',
  //     401,
  //     'Unauthorized',
  //   );
  // }

  if (
    !usuario ||
    !accessToken ||
    !expiresAt ||
    isNaN(expiresAt.getTime()) ||
    Date.now() + ms('30s') > expiresAt.getTime()
  ) {
    const data = await fetch(`${process.env.API_URL}/api/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: 'nilson@email.com', senha: 'nilson' }),
    });

    const r = await data.json();

    if (!data) {
      console.error();

      clearCookies({ res }, [
        'refresh-token',
        'access-token',
        'expires-at',
        'usuario',
      ]);

      throw new ServerSideErrorRedirect(
        '/?status=unauthorized',
        401,
        'Unauthorized',
      );
    }

    console.log('response', r);

    refreshToken = 'refresh token';
    accessToken = 'acess token';
    expiresAt = new Date();
    usuario = {
      name: 'nilson',
      login: 'nilson@nilson.com',
    };

    setCookies(
      { res },
      {
        'access-token': accessToken,
        'refresh-token': refreshToken,
        'expires-at': expiresAt.toISOString(),
        usuario: JSON.stringify(usuario),
      },
    );
  }

  if (checkResetar && usuario.resetar) {
    throw new ServerSideErrorRedirect(
      '/resetar-senha',
      307,
      'Temporary Redirect',
    );
  }

  return { accessToken, refreshToken, expiresAt, usuario };
};
