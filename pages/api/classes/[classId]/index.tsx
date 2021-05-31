import { ObjectId } from "bson";
import { NextApiResponse } from "next";
import { NextApiRequestWithSession } from "../../../../models/Sessions";
import { withSession } from "../../../../utils/utility";
import { getDatabase } from "../../../../utils/db";

// /api/classes/:classId
export default withSession(async(req: NextApiRequestWithSession, res: NextApiResponse) => {
  const user = req.session.get('user');
  if (!user) {
    return res.status(401).send({ message: 'User has not been authenticated'});
  }
  const classId = req.query.classId as string;
  const subject = req.body.subject;
  const startDate = new Date(req.body.startDate);
  const endDate = new Date(req.body.endDate);
  try {
    const db = await getDatabase();
    const classCollection = db.collection('classes');
    const objId = new ObjectId(classId);
    await classCollection.updateOne({_id: objId }, { $set: { subject:  subject, startDate: startDate, endDate: endDate} },);
    return res.status(200).json({ message: 'success' });
  } catch (error) {
    res.status(500).json(error);
  }

});