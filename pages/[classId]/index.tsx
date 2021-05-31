import { ObjectId } from 'mongodb';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import EditClassForm from '../../components/classes/EditClassForm';
import fetchJson from '../../lib/fetchJson';
import Class from '../../models/Class';
import { withSession } from "../../utils/utility";
import { getDatabase } from "../../utils/db";

const zeroFill = (value: number): string => (value < 10 ? '0' : '') + value;

const ClassDetails:React.FC<{ classData: Class }> = (props) => {
  const router = useRouter();
  const updateClassHandler = async (classData: Class) => {
    try {
      await fetchJson(`/api/classes/${props.classData.id}`, {
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
        <title>{props.classData?.subject}</title>
        <meta name='description' content={props.classData?.subject}></meta>
      </Head>
      <EditClassForm subject={props.classData.subject}  startDate={props.classData.startDate} endDate={props.classData.endDate} onUpdateClass={updateClassHandler}/>
    </Fragment>
  )
};

export const getServerSideProps = withSession(async (context) => {
  const classId = context.params.classId;
  const user = context.req.session.get('user');
  if (!user || user.role === 'student') {
    return {
      redirect: {
        permanent: false,
        destination: !user ? '/auth' : '/classes',
      },
    }
  }

  const db = await getDatabase();
  const classCollection = db.collection('classes');
  const objId = new ObjectId(classId);
  const selectedClass = await classCollection.findOne({_id: objId});
  let transformedClassData = null;
  if (selectedClass) {
    const startMonth = zeroFill(selectedClass.startDate.getMonth() + 1);
    const startDay = zeroFill(selectedClass.startDate.getDate());
    const endMonth = zeroFill(selectedClass.endDate.getMonth() + 1);
    const endDay = zeroFill(selectedClass.endDate.getDate());
    const startDate = selectedClass.startDate.getFullYear() + '-' + startMonth + '-' +  startDay;
    const endDate = selectedClass.endDate.getFullYear() + '-' + endMonth + '-' +  endDay;
    transformedClassData = {
      id: classId,
      subject: selectedClass.subject,
      startDate: startDate,
      endDate: endDate
    }
  }
  return {
    props: {
      classData: transformedClassData
    }
  };
});

export default ClassDetails;