import React from "react";
import Search from "./Search";

function Header({ searchedItem, setSearchedItem }) {
  return (
    <header>
      <h1>
        <span className="logo" role="img">
          ☮
        </span>
        gregslist
      </h1>
      <Search searchedItem={searchedItem} setSearchedItem={setSearchedItem}/>
    </header>
  );
}

export default Header;
