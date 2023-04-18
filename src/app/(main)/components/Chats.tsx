"use client"

import { useAppSelector } from "@/redux/store";
import Search from "./Search/Search";
import SearchResultArea from "./Search/components/SearchResultArea";
import useOutsideClick from "@/hooks/useOutsideClick";
import { useDispatch } from "react-redux";
import { searchActions } from "./Search/slice";

interface ChatsProps {}

const Chats = (props: ChatsProps) => {
  const isSearchAreaOpened = useAppSelector((s) => s.searchReducer.isOpened);

	const dispatch = useDispatch()

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
      {isSearchAreaOpened ? <SearchResultArea /> : <div>Chat List</div>}
    </div>
  );
};

export default Chats;
