import React from "react";
import ListingCard from './ListingCard'


function ListingsContainer({ items, setItems, setFavoriteItem, passHandleDelete }) {
  return (
    <main>
      <ul className="cards">
        {items.map((item) => {
        return <ListingCard key={item.id} item={item} setItem={setItems} setFavoriteItem={setFavoriteItem} passHandleDelete={passHandleDelete} />
      })}
      </ul>
    </main>
  );
}

export default ListingsContainer;
