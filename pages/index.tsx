import { Fragment } from 'react';
import Head from 'next/head';
import StartingPageContent from '../components/StartingPage/StartingPageContent';
import { withSession } from '../utils/utility';

const Home = () => {
  return (
    <Fragment>
      <Head>
        <title>Attendance application</title>
        <meta name='description' content='Welcome to attendance application!!!'></meta>
      </Head>
      <StartingPageContent/>
    </Fragment>
  );
}

export const getServerSideProps = withSession(async ({req}) => {
  const user = req.session.get('user');
  if (user) {
    return {
      redirect: {
        permanent: false,
        destination: '/classes',
      },
    }
  }
  return {
    props: {}
  };
});

export default Home;