import { NextApiResponse } from "next";
import { NextApiRequestWithSession } from "../../models/Sessions";
import { withSession } from "../../utils/utility";

// /api/user
export default withSession(async(req: NextApiRequestWithSession, res: NextApiResponse) => {
  const user = req.session.get('user');
  if (user) { 
    res.json({
      isLoggedIn: true,
      ...user,
    })
  } else {
    res.json({
      isLoggedIn: false,
    })
  }
});