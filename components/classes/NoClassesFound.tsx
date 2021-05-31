import Link from 'next/link';
import classes from './NoClassesFound.module.css';

const NoClassesFound = () => {
  return (
    <div className={classes.noclasses}>
      <p>No classes found!</p>
      <Link href='/new-class'>
        <a className='btn'>
          Add a Class
        </a>
      </Link>
    </div>
  );
};

export default NoClassesFound;