import React from "react";
import { SearchIcon as SearchIconComponent } from "@heroicons/react/24/outline";

function SearchCircleIcon(props) {
  return (
    <div {...props}>
      <SearchIconComponent className="h-6 w-6 text-gray-400" />
    </div>
  );
}

export default SearchCircleIcon;
