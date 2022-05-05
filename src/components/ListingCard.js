import React, { useState } from "react";

function ListingCard({ item, setItems, setFavoriteItem, passHandleDelete }) {
  const [buttonState, setButtonState] = useState(false)
  const { id, description, image, location, favorite } = item

  function handleFavoriteItem() {
    setButtonState(!buttonState)

    const updatedItem = {
      ...item, favorite: !buttonState
    }
    fetch(`http://localhost:6001/listings/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem)
    })
    .then(res => res.json())
    .then(updatedItems => console.log(updatedItems))
    setFavoriteItem(updatedItem)
  }

  function handleDelete() {
    passHandleDelete(id)
    // fetch(`http://localhost:6001/listings/${id}`, {
    //   method: "DELETE"
    // })

  }

  return (
    <li className="card">
      <div className="image">
        <span className="price">$0</span>
        <img src={image} alt={description} />
      </div>
      <div className="details">
        {buttonState ? (
          <button onClick={handleFavoriteItem} className="emoji-button favorite active">★</button>
        ) : (
          <button onClick={handleFavoriteItem} className="emoji-button favorite">☆</button>
        )}
        <strong>{description}</strong>
        <span> · {location}</span>
        <button onClick={handleDelete} className="emoji-button delete">🗑</button>
      </div>
    </li>
  );
}

export default ListingCard;
