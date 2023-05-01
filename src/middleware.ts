import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import browserRoutes from "./common/browserRoutes";


export async function middleware(req: NextRequest) {
	const protectedUrls = [browserRoutes.index];
  const { pathname } = req.nextUrl;
	const isProtectedPath = protectedUrls.some((el) => el === pathname)
  if (isProtectedPath) {
		console.log('req', req)
    const token = await getToken({ req });
		console.log('token-', token)
    if (!token) {
      const url = new URL(browserRoutes.login, req.url);
      return NextResponse.redirect(url);
    }
  } 
	else if (pathname == browserRoutes.login) {
    const token = await getToken({ req });
    if (token) {
      const url = new URL(browserRoutes.index, req.url);
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}
