"use client";

import Button from "@/components/Button/Button";
import { useAppSelector } from "@/redux/store";
import { useLazyQuery } from "@apollo/client";
import Image from "next/image";
import { useEffect } from "react";
import { BsCheckLg } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { SEARCH_USERS, SearchUsersResponse } from "../query";
import { searchActions } from "../slice";

interface SearchResultAreaProps {}

const SearchResultArea = (props: SearchResultAreaProps) => {
  const searchQuery = useAppSelector((s) => s.searchReducer.searchQuery);
  const isOpened = useAppSelector((s) => s.searchReducer.isOpened);
  const selectedUsers = useAppSelector((s) => s.searchReducer.selectedUsers);

  const dispatch = useDispatch();

  const [searchUsers, { data, loading: searchUsersLoading }] =
    useLazyQuery<SearchUsersResponse>(SEARCH_USERS, {
      variables: { query: searchQuery },
    });

  useEffect(() => {
    searchUsers({ variables: { query: searchQuery } });
  }, [searchQuery]);

  if (!isOpened) return null;

  return (
    <div className="flex flex-col gap-2 p-2 text-xs grow bg-cyan-1">
      {data?.searchUsersByName.map((el) => (
        <div
          className={`flex items-center h-8 space-x-2 ${
            searchUsersLoading ? "opacity-30" : ""
          }`}
        >
          <div className="relative h-full overflow-hidden rounded-full aspect-square">
            <Image fill src={`${el.image ?? "/blank_avatar.png"}`} alt="" />
          </div>
          <div className="grow">{el.name}</div>

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
      ))}
      {!!selectedUsers.length && (
        <div className="flex truncate w-full items-center [span+span]:bg-red-200 space-x-0.5">
          <div className="">
            <HiOutlineUserGroup />
          </div>
          {selectedUsers.map((el) => (
            <span className="text-xxs">{el.name}</span>
          ))}
        </div>
      )}
      <Button disabled={!selectedUsers.length} className="">
        Create chat
      </Button>
    </div>
  );
};

export default SearchResultArea;
