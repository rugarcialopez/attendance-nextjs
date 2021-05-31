import React, { Fragment } from 'react';
import Student from '../../models/Student';

import classes from './List.module.css';
import StudentItem from './StudentItem';

const StudentList: React.FC<{studentList: Student[], onAttendClass: (studentId: string) => void, onApprove: (studentId: string) => void, onReject: (studentId: string) => void }> = (props) => {

  return (
    <Fragment>
      <ul className={classes.list}>
        {props.studentList.map((studentItem) => (
          <StudentItem
            key={studentItem.id}
            id={studentItem.id}
            fullName={studentItem.fullName}
            state={studentItem.state}
            onAttendClass={props.onAttendClass.bind(null, studentItem.id)}
            onApprove={props.onApprove.bind(null, studentItem.id)}
            onReject={props.onReject.bind(null, studentItem.id)}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default StudentList;