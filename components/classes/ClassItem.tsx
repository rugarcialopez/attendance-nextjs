import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import useUser from '../../hooks/use-user';
import classes from './Item.module.css';

const ClassItem: React.FC<{ key: string, id: string, subject: string, startDate: string, endDate: string, attendanceState: string, onAttendClass: () => void }> = (props) => {
  const { user } = useUser();
  const [isAttended, setIsAttended] = useState(false);
  const role = user && user.role ? user.role : null;

  useEffect(() => {
    if (role === 'student') {
      setIsAttended(props.attendanceState !== '');
    }
  }, [role]);
  
  const attendClassHander = () => {
    setIsAttended(true);
    props.onAttendClass();
  }

  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.subject}</p>
        </blockquote>
        <figcaption>{props.startDate}-{props.endDate}</figcaption>
      </figure>
      { user && user.role === 'student' && <button title={props.attendanceState} disabled={isAttended} onClick={attendClassHander}>Attended</button>}
      { user && user.role !== 'student' && <Link href={`/${props.id}`}>
        <a className='btn'>Edit</a>
      </Link> }
      { user && user.role === 'admin' && <Link href={`/${props.id}/approve-reject`}>
        <a className='btn'>Approve/Reject</a>
      </Link> }
    </li>
  );
};

export default ClassItem;