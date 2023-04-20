"use client";

import Button from "@/components/Button/Button";
import User from "@/components/User";
import { popupActions } from "@/components/common/Popup/slice";
import { useAppSelector } from "@/redux/store";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { BsCheckLg } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { Triangle } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { chatsActions } from "../../Chats/slice";
import {
  CREATE_CHAT,
  CreateChatResponse,
  SEARCH_USERS,
  SearchUsersResponse,
} from "../query";
import { searchActions } from "../slice";

interface SearchResultAreaProps {}

const SearchResultArea = (props: SearchResultAreaProps) => {
  const searchQuery = useAppSelector((s) => s.searchReducer.searchQuery);
  const isOpened = useAppSelector((s) => s.searchReducer.isOpened);
  const selectedUsers = useAppSelector((s) => s.searchReducer.selectedUsers);

  const dispatch = useDispatch();

  const [searchUsers, { data, previousData, loading: searchUsersLoading }] =
    useLazyQuery<SearchUsersResponse>(SEARCH_USERS, {
      variables: { query: searchQuery },
    });
  const [createChat, { loading: createChatLoading }] =
    useMutation<CreateChatResponse>(CREATE_CHAT);

  const handleCreateChat = async () => {
    try {
      const res = await createChat({ variables: { users: selectedUsers.map((el) => el.id) } });
      if (res.data?.createConversation.conversationId) {
        dispatch(
          chatsActions.pushChat({
            id: res.data.createConversation.conversationId,
          })
        );
      } else {
        throw new Error("Creating conversation error");
      }
    } catch (error: any) {
      dispatch(popupActions.setMessage(error.message));
    }
  };

  const returnUsers = () => {
    if (searchUsersLoading)
      return (
        <Triangle
          color="#c9d0d1"
          wrapperClass="px-1 mx-auto"
          height={20}
          width={20}
        />
      );
    const users = data ?? previousData;
    return users?.searchUsersByName.map((el) => (
      <div
        key={el.id}
        className={`flex items-center h-8 space-x-2 ${
          searchUsersLoading ? "opacity-30" : ""
        }`}
      >
        <User image={el.image} className="w-full" name={el.name} />
        {selectedUsers.find((selEl) => selEl.id == el.id) ? (
          <button
            onClick={() => {
              dispatch(searchActions.delUser(el.id));
            }}
            className="flex items-center justify-center py-1 space-x-1 border-2 rounded-md border-neutral-500 w-14"
          >
            <BsCheckLg />
          </button>
        ) : (
          <button
            onClick={() => {
              dispatch(searchActions.addUser({ id: el.id, name: el.name }));
            }}
            className="flex items-center justify-center py-1 space-x-1 rounded-md w-14 bg-cyan-2"
          >
            Select
          </button>
        )}
      </div>
    ));
  };

  useEffect(() => {
    searchUsers({ variables: { query: searchQuery.toLowerCase() } });
  }, [searchQuery]);

  if (!isOpened) return null;

  return (
    <div className="flex flex-col gap-2 p-2 text-xs grow bg-cyan-1">
      {returnUsers()}
      <div
        className={`flex truncate w-full h-4 items-center space-x-0.5 ${
          !selectedUsers.length && "opacity-0"
        }`}
      >
        <div className="">
          <HiOutlineUserGroup />
        </div>
        {selectedUsers.map((el) => (
          <span key={el.id} className="text-xxs">
            {el.name}
          </span>
        ))}
      </div>

      <Button
        onClick={handleCreateChat}
        disabled={!selectedUsers.length || createChatLoading}
        className=""
      >
        Create chat
      </Button>
    </div>
  );
};

export default SearchResultArea;
