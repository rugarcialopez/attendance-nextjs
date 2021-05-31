import { withIronSession, Handler } from 'next-iron-session';

export function withSession(handler:  Handler) {
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD || '2gyZ3GDw3LHZQKDhPmPDL3sjREVRXPr8',
    cookieName: 'user',
    cookieOptions: {
      // the next line allows to use the session in non-https environments like
      // Next.js dev mode (http://localhost:3000)
      secure: process.env.NODE_ENV === 'production' ? true : false,
    },
  })
};