import { ObjectId } from "bson";
import { NextApiResponse } from "next";
import { NextApiRequestWithSession } from "../../../../models/Sessions";
import { AttendaceState } from "../../../../models/Student";
import { withSession } from "../../../../utils/utility";
import { getDatabase } from "../../../../utils/db";

// /api/classes/:classId/approve
export default withSession(async(req: NextApiRequestWithSession, res: NextApiResponse) => {
  const user = req.session.get('user');
  if (!user) {
    return res.status(401).send({ message: 'User has not been authenticated'});
  }
  const classId = req.query.classId as string;
  const studentId = req.body.studentId;
  try {
    const db = await getDatabase();
    const classCollection = db.collection('classes');
    const objId = new ObjectId(classId);
    await classCollection.updateOne({ _id: objId, 'students.id': studentId }, {
      $set: { "students.$.state": AttendaceState.APPROVED }
    },);
    return res.status(200).json({ message: 'success' });
  } catch (error) {
    res.status(500).json(error);
  }
});