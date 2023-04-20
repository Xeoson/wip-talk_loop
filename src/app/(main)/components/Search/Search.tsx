"use client";

import { useDispatch } from "react-redux";
import { searchActions } from "./slice";

interface SearchProps {}

const Search = (props: SearchProps) => {
  const dispatch = useDispatch();

  return (
    <div className="min-w-0 px-3 py-1 overflow-hidden transition border-2 rounded-md border-neutral-400/60 focus-within:border-neutral-400">
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
  );
};

export default Search;
