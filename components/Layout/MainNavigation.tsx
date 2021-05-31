import Link from 'next/link';
import { useRouter } from 'next/router';
import classes from './MainNavigation.module.css';
import useUser from '../../hooks/use-user';
import React, { MouseEvent } from 'react';

const MainNavigation = () => {
  const router = useRouter();
  const { user, mutateUser } = useUser();

  const logoutHandler = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await mutateUser(
      fetch('/api/logout', { method: 'POST' }),
      false
    );
    router.push('/auth');
  }

  return (
    <header className={classes.header}>
      <Link href='/'>
        <div className={classes.logo}>Attendance application</div>
      </Link>
      <nav>
        <ul>
          {!user || !user.isLoggedIn && <li className={router.pathname === '/auth' ? classes.active : ''}>
            <Link href='/auth'>Login</Link>
          </li>}
          {user && user.isLoggedIn && <li className={router.pathname === '/classes' ? classes.active : ''}>
            <Link href='/classes'>Classes</Link>
          </li>}
          {user && user.isLoggedIn && user.role !== 'student' && <li className={router.pathname === '/new-class' ? classes.active : ''}>
            <Link href='/new-class'>Create class</Link>
          </li>}
          {user && user.isLoggedIn && <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
