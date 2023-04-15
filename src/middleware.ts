import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "./app/api/auth/[...nextauth]/route";
import browserRoutes from "./common/browserRoutes";
import { getToken } from "next-auth/jwt";
import { BASE_URL } from "./common/const";

const protectedUrls = [browserRoutes.index];

export async function middleware(req: NextRequest) {
	const {pathname} = req.nextUrl
  if (protectedUrls.includes(pathname)) {
    const token = await getToken({req});
    if (!token) return NextResponse.redirect(BASE_URL + browserRoutes.login);
  }
	if (pathname == browserRoutes.login) {
		const token = await getToken({req})
		if (token) return NextResponse.redirect(BASE_URL + browserRoutes.index)
	}
	return NextResponse.next()
}
