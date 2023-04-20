"use client";

import User from "@/components/User";
import useOutsideClick from "@/hooks/useOutsideClick";
import { useAppSelector } from "@/redux/store";
import { getSession, signOut, useSession } from "next-auth/react";
import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import Search from "../Search/Search";
import SearchResultArea from "../Search/components/SearchResultArea";
import { searchActions } from "../Search/slice";
import { useQuery } from "@apollo/client";
import { GET_CHATS, GetConversationsResp } from "./query";

interface ChatsProps {}

const Chats = (props: ChatsProps) => {
  const isSearchAreaOpened = useAppSelector((s) => s.searchReducer.isOpened);
  // const chats = useAppSelector((s) => s.chatsReducer.chats);
	const {data, loading} = useQuery<GetConversationsResp>(GET_CHATS)

	const session = useSession()
  const dispatch = useDispatch();

  const handleHide = () => {
    dispatch(searchActions.setFields({ isOpened: false }));
  };
  const wrapperRef = useOutsideClick<HTMLDivElement>(handleHide);

  return (
    <div
      ref={wrapperRef}
      className="w-[16rem] flex flex-col p-2 border-r-2 border-neutral-500/10"
    >
      <Search />
      {isSearchAreaOpened ? (
        <SearchResultArea />
      ) : (
        <>
          {data?.getConversations && (
            <div className="">
              {data.getConversations.map((el) => (
                <div key={el.id} className="">
                  {el.id}
                </div>
              ))}
            </div>
          )}
          <div className="flex items-center mt-auto space-x-1 text-sm">
            <User
              image={session.data?.user?.image!}
              name={session.data?.user?.name!}
            >
              <button
                onClick={() => {
                  signOut();
                }}
              >
                <MdLogout />
              </button>
            </User>
          </div>
        </>
      )}
    </div>
  );
};

export default Chats;
