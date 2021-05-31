import React, { useEffect, useState } from 'react';
import { AttendaceState } from '../../models/Student';
import classes from './Item.module.css';

const StudentItem: React.FC<{ key: string, fullName: string, id: string, state: string, onAttendClass: () => void, onApprove: () => void, onReject: () => void }> = (props) => {
  const [isAttended, setIsAttended] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [isRejected, setIsRejected] = useState(false);

  useEffect(() => {
    setIsAttended(props.state !== '');
    setIsApproved(props.state == AttendaceState.APPROVED);
    setIsRejected(props.state == AttendaceState.REJECTED);
  }, []);

  const attendClassHandler = () => {
    setIsAttended(true);
    props.onAttendClass();
  }

  const approveHandler = () => {
    setIsApproved(true);
    props.onApprove();
  }

  const rejectHandler = () => {
    setIsRejected(true);
    props.onReject();
  }

  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.fullName}</p>
        </blockquote>
        <figcaption>{props.state !== '' ? props.state : 'Not attended'}</figcaption>
      </figure>
      <button onClick={attendClassHandler} disabled={isAttended}>Attended</button>
      <button onClick={approveHandler} disabled={isApproved || !isAttended}>Approve</button>
      <button onClick={rejectHandler} disabled={isRejected || !isAttended}>Reject</button>
    </li>
  );
};

export default StudentItem;