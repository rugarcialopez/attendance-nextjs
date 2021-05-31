import { Fragment } from "react";
import Head from 'next/head';
import ClassList from "../../components/classes/ClassList";
import fetchJson from "../../lib/fetchJson";
import Class from "../../models/Class"
import Student from "../../models/Student";
import User from "../../models/User";
import { withSession } from "../../utils/utility";
import { getDatabase } from "../../utils/db";
import NoClassesFound from "../../components/classes/NoClassesFound";

const Classes: React.FC<{ classList: Class[] }> =(props) => {

  const attendClassHandler = async(classId: string) => {
    try {
      await fetchJson(`/api/classes/${classId}/attend`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
     alert(error.message) 
    }
  }

  return <Fragment>
    <Head>
      <title>List of classes | Attendance</title>
      <meta name='description' content='List of classes of the attendance platform.'></meta>
    </Head>
    { props.classList.length > 0 && <ClassList classList={props.classList} onAttendClass={attendClassHandler}/> }
    { props.classList.length === 0 && <NoClassesFound /> }
  </Fragment>
}

const getAttendaceState = (students: Student[], currentUser: User): string => {
  const student = (students || []).find((student: Student) => student.id === currentUser.id);
  let attendanceState = '';
  if (student) {
    attendanceState = student.state;
  }
  return attendanceState;
}

export const getServerSideProps = withSession(async ({req}) => {
  const user = req.session.get('user');
  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth',
      },
    }
  }

  const db = await getDatabase();
  const classCollection = db.collection('classes');
  let query = {};
  if (user.role !== 'admin') {
    query = { endDate: { $lte: new Date() }};
  }
  const classList = await classCollection.find(query).toArray();
  let classListTransformed: Class[] = [];
  if (classList.length > 0) {
    classListTransformed = classList.map(classItem => {
      return {
        id: classItem._id.toString(),
        subject: classItem.subject,
        startDate: classItem.startDate.toDateString(),
        endDate: classItem.endDate.toDateString(),
        attendanceState: getAttendaceState(classItem.students, user)
      }
    });
  }
  return {
    props: {
      classList: classListTransformed
    }
  };
});


export default Classes;