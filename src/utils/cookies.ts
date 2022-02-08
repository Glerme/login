import ms from 'ms';
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { parseCookies, setCookie } from 'nookies';

export const COOKIE_MAX_AGE = ms('1y') / 1000;

export interface GetCookiesProps {
  req: NextApiRequest | GetServerSidePropsContext['req'];
}

export const getCookies = ({
  req,
}: GetCookiesProps): Record<string, string> => {
  const cookies = parseCookies({ req });

  return cookies;
};

export type SetCookiesProps = {
  res: NextApiResponse | GetServerSidePropsContext['res'];
};

export const setCookies = (
  { res }: SetCookiesProps,
  cookies: Record<string, string>,
) => {
  Object.keys(cookies).map(key =>
    setCookie({ res }, key, cookies[key], {
      path: '/',
      maxAge: COOKIE_MAX_AGE,
      httpOnly: true,
      secure: true,
    }),
  );
};

export interface ClearCookiesProps {
  res: NextApiResponse | GetServerSidePropsContext['res'];
}

export const clearCookies = ({ res }: ClearCookiesProps, cookies: string[]) => {
  cookies.map(key =>
    setCookie({ res }, key, '', {
      path: '/',
      expires: new Date(1),
      httpOnly: true,
      secure: true,
    }),
  );
};
