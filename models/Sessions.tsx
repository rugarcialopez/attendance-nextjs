import { GetServerSidePropsContext, NextApiRequest } from "next";
import { Session } from "next-iron-session";
import { ParsedUrlQuery } from 'querystring';
import { IncomingMessage } from 'http';
import {
  NextApiRequestCookies,
  // @ts-ignore This path is generated at build time and conflicts otherwise
} from '../dist/next-server/server/api-utils'

export interface NextApiRequestWithSession extends NextApiRequest {
  readonly session: Session;
}

export interface GetServerSidePropsContextWithSession<Params extends ParsedUrlQuery>
  extends GetServerSidePropsContext<Params> {
  readonly req: IncomingMessage & { readonly session: Session, cookies: NextApiRequestCookies };
}
