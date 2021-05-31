import { ObjectId } from 'mongodb';
import Head from 'next/head';
import { Fragment } from 'react';
import StudentList from '../../components/classes/StudentList';
import fetchJson from '../../lib/fetchJson';
import Student from '../../models/Student';
import { getDatabase } from "../../utils/db";
import { withSession } from "../../utils/utility";

const ApproveReject: React.FC<{ students: Student[], classId: string }> = (props) => {

  const attendClassHandler = async (studentId: string) => {
    try {
      await fetchJson(`/api/classes/${props.classId}/attend`, {
        method: 'POST',
        body: JSON.stringify({ studentId }),
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
     alert(error.message) 
    }
  }
  
  const approveHandler = async (studentId: string) => {
    try {
      await fetchJson(`/api/classes/${props.classId}/approve`, {
        method: 'POST',
        body: JSON.stringify({ studentId }),
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
     alert(error.message) 
    }
  }

  const rejectHandler = async (studentId: string) => {
    try {
      await fetchJson(`/api/classes/${props.classId}/reject`, {
        method: 'POST',
        body: JSON.stringify({ studentId }),
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
     alert(error.message) 
    }
  }

  return (
    <Fragment>
      <Head>
        <title>Approve/Reject | Attendance</title>
        <meta name='description' content='Approve/Reject attendance platform.'></meta>
      </Head>
      <StudentList
        studentList={props.students} 
        onAttendClass={attendClassHandler}
        onApprove={approveHandler}
        onReject={rejectHandler}
      />
    </Fragment>
  )
}

export const getServerSideProps = withSession(async (context) => {
  const user = context.req.session.get('user');
  if (!user || user.role === 'student') {
    return {
      redirect: {
        permanent: false,
        destination: !user ? '/auth' : '/classes',
      },
    }
  }
  const classId = context.params.classId;
  const db = await getDatabase();
  const classCollection = db.collection('classes');
  const objId = new ObjectId(classId);
  const selectedClass = await classCollection.findOne({_id: objId});
  const students =  selectedClass.students || [];
  const studentIds = students.map(student => new Object( new ObjectId (student.id)) );
  const usersCollection =  db.collection('users');
  const users = await usersCollection.find({_id: { $nin: studentIds }, role: 'student'}).toArray();
  users.forEach(user => {
    students.push({ id: user._id.toString(), fullName: user.fullName, state: ''});
  });
  return {
    props: {
      classId,
      students: students
    }
  };
});

export default ApproveReject;