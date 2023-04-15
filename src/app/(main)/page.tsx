import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { signOut } from "next-auth/react";
import SignOutButton from "@/components/Button/SignOutButton";

export default async function Home(props: any) {
	const session = await getServerSession(authOptions)
  return (
    <div className="">
      <h1 className="text-neutral-300/95">
        Hi, {session?.user?.name ?? session?.user?.email}
      </h1>
      <SignOutButton>Sign Out</SignOutButton>
    </div>
  );
}
