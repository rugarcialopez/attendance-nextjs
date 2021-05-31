import { NextApiResponse } from "next";
import { NextApiRequestWithSession } from "../../models/Sessions";
import { withSession } from "../../utils/utility";
import { getDatabase } from "../../utils/db";

// /api/login
export default withSession(async(req: NextApiRequestWithSession, res: NextApiResponse) => {
  const { fullName, email, password, role } = await req.body;
  try {
    const db = await getDatabase();
    const usersCollection = db.collection('users');
    let user = await usersCollection.findOne({email, password});
    if (!fullName && !role) {
      if (!user) {
        return res.status(422).json({ message: 'User does not exist'});
      }
      req.session.set('user',{
        id: user._id,
        fullName: user.fullName,
        role: user.role
      });
    } else {
      if (user) {
        return res.status(422).json({ message: 'User already exist'});
      }
      user = await usersCollection.insertOne({ fullName, email, password, role });
      req.session.set('user',{
        id: user.insertedId,
        fullName,
        role
      });
    }
    await req.session.save();
    return res.status(200).json({ message: 'success' });
  } catch (error) {
    res.status(error?.status || 500).json({message: 'Unexpected error'});
  }
});