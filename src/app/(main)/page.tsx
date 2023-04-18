import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { signOut } from "next-auth/react";
import SignOutButton from "@/components/Button/SignOutButton";
import Chats from "./components/Chats";
import ChatArea from "./components/ChatArea";

export default async function Home(props: any) {

  return (
    <div className="flex rounded-md w-chat h-[85vh] bg-cyan-1">
      <Chats />
			<ChatArea />
    </div>
  );
}
