import ChatArea from "./components/ChatArea";
import Chats from "./components/Chats/Chats";

export default async function Home(props: any) {
  return (
    <div className="flex rounded-md w-chat h-[85vh] bg-cyan-1">
      <Chats />
      <ChatArea />
    </div>
  );
}
