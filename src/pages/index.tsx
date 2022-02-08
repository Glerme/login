import { GetServerSideProps, NextPage } from 'next';
import { auth } from 'utils/auth';

import { HomeView } from 'views/Home';

const Home: NextPage = () => {
  return <HomeView />;
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { accessToken, usuario } = await auth(ctx);

  return {
    props: { accessToken, usuario },
  };
};
