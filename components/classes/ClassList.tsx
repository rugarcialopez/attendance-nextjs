import React, { Fragment } from 'react';
import Class from '../../models/Class';
import ClassItem from './ClassItem';

import classes from './List.module.css';

const ClassList: React.FC<{classList: Class[], onAttendClass: (classId: string) => void }> = (props) => {

  return (
    <Fragment>
      <ul className={classes.list}>
        {props.classList.map((classItem) => (
          <ClassItem
            key={classItem.id}
            id={classItem.id}
            subject={classItem.subject}
            startDate={classItem.startDate}
            endDate={classItem.endDate}
            attendanceState={classItem.attendanceState}
            onAttendClass={props.onAttendClass.bind(null, classItem.id)}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default ClassList;