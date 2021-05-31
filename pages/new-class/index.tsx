import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from 'next/head';
import NewClassForm from "../../components/classes/NewClassForm";
import fetchJson from "../../lib/fetchJson";
import Class from "../../models/Class";
import { withSession } from "../../utils/utility";

const newClass = () => {
  const router = useRouter();
  const addClassHandler = async (classData: Class) => {
    try {
      await fetchJson('/api/new-class', {
        method: 'POST',
        body: JSON.stringify(classData),
        headers: { 'Content-Type': 'application/json' }
      });
      router.push('/classes');
    } catch (error) {
     alert(error.message) 
    }
  } 

  return (
    <Fragment>
      <Head>
        <title>Create a class | Attendance</title>
        <meta name='description' content='Create class form of the attendance platform.'></meta>
      </Head>
      <NewClassForm onAddClass={addClassHandler}/>
    </Fragment>
  );
}

export const getServerSideProps = withSession(async ({req}) => {
  const user = req.session.get('user');
  if (!user || user.role === 'student') {
    return {
      redirect: {
        permanent: false,
        destination: !user ? '/auth' : '/classes',
      },
    }
  }
  return {
    props: {}
  };
});

export default newClass;