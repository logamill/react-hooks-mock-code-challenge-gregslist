import React from "react";

function Search({ searchedItem, setSearchedItem }) {

  function handleSubmit(e) {
    e.preventDefault();
    console.log("submitted");
  }
  function handleChange(e) {
    setSearchedItem(e.target.value)
    console.log(searchedItem)
  }

  return (
    <form className="searchbar" onSubmit={handleSubmit}>
      <input
        type="text"
        id="search"
        placeholder="search free stuff"
        value={searchedItem}
        onChange={handleChange}
      />
      <button type="submit">🔍</button>
    </form>
  );
}

export default Search;
