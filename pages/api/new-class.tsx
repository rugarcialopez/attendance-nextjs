import { NextApiResponse } from "next";
import { NextApiRequestWithSession } from "../../models/Sessions";
import { withSession } from "../../utils/utility";
import { getDatabase } from "../../utils/db";

// /api/new-class
export default withSession(async(req: NextApiRequestWithSession, res: NextApiResponse) => {
  const user = req.session.get('user');
  if (!user) {
    return res.status(401).send({ message: 'User has not been authenticated'});
  }
  try {
    const newClass = {
      subject: req.body.subject,
      startDate: new Date(req.body.startDate),
      endDate: new Date(req.body.endDate)
    }
    const db = await getDatabase();
    const classCollection = db.collection('classes');
    await classCollection.insertOne(newClass);
    return res.status(200).json({ message: 'success' });
  } catch (error) {
    res.status(500).json(error);
  }

});