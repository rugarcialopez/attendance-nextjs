import AuthForm from "../../components/Auth/AuthForm";
import Head from 'next/head';
import useUser from '../../hooks/use-user';
import fetchJson from "../../lib/fetchJson";
import SignIn from "../../models/SignIn";
import SignUp from "../../models/SignUp";
import { Fragment } from "react";

function Auth() {
  const { mutateUser } = useUser({
    redirectTo: '/classes',
    redirectIfFound: true,
  });

  const loginHandler = async (loginObj: SignUp | SignIn) => {
    try {
      await mutateUser(
        fetchJson('/api/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(loginObj)
       })
      ); 
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <Fragment>
      <Head>
        <title>Log in | Attendance</title>
        <meta name='description' content='The login portal for users of the attendance platform.'></meta>
      </Head>
      <AuthForm onLogin={loginHandler}/>
    </Fragment>
  )
};

export default Auth;