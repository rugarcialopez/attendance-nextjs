import { NextApiResponse } from "next";
import { NextApiRequestWithSession } from "../../models/Sessions";
import { withSession } from "../../utils/utility";

// /api/logout
export default withSession(async(req: NextApiRequestWithSession, res: NextApiResponse) => {
  req.session.destroy();
  res.json({ isLoggedIn: false });
});