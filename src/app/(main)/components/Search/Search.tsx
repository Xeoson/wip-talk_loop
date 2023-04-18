"use client";

import useOutsideClick from "@/hooks/useOutsideClick";
import { useDispatch } from "react-redux";
import SearchResultArea from "./components/SearchResultArea";
import { searchActions } from "./slice";
import Button from "@/components/Button/Button";

interface SearchProps {}

const Search = (props: SearchProps) => {
  const dispatch = useDispatch();

  return (
    <div className="relative flex flex-col p-1 bg-cyan-1">
      <div className="w-full min-w-0 px-3 py-1 overflow-hidden transition border-2 rounded-md border-neutral-400/60 focus-within:border-neutral-400">
        <input
          type="text"
          onFocus={() => {
            dispatch(searchActions.setFields({ isOpened: true }));
          }}
          onChange={(e) =>
            dispatch(searchActions.setFields({ searchQuery: e.target.value }))
          }
          className="w-full min-w-0 bg-transparent outline-none"
        />
      </div>
    </div>
  );
};

export default Search;
