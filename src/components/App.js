import React, { useEffect, useState } from "react";
import Header from "./Header";
import ListingsContainer from "./ListingsContainer";

function App() {
  const baseURL = 'http://localhost:6001/listings'
  const [items, setItems] = useState([])
  const [searchedItem, setSearchedItem] = useState('')
  const [filter, setFilter] = useState('')

  function getFetch() {
    fetch(baseURL)
    .then(res => res.json())
    .then(data => setItems(data))
  }

  function passHandleDelete(id) {
    const newItemsArray = items.filter((item) => {
      if(item.id === id) {
        return null
      } else {
        return item
      }
    })
    setItems(newItemsArray)
  }

  const itemsToDispaly = items
  .filter((item) => {
    if(item.description.toLowerCase().includes(searchedItem)) {
      return item
    }else {
      return false
    }
  })

  function handleFilter(e) {
    const filteredItems = items.sort((a, b) => {
      if(a.location < b.location) {return -1;}
      if(a.location > b.location) {return 1;}
      return 0
    })
    if(e.target.value === 'a-z'){
    setFilter(filteredItems)
    } else {
      setFilter('')
    }
    console.log(filteredItems)
  }


  function handleNewItemSubmit(e) {
    e.preventDefault()
    const addedItem = {
      description: e.target['description'].value,
      location: e.target['location'].value,
      image: e.target['image'].value
    }
    fetch(baseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(addedItem)
    })
    .then(res => res.json())
    .then(newData => setItems({...items, newData}))
}

  function setFavoriteItem(updatedItems) {
    const addFavorite = items.filter((item) => {
      if(item.id === updatedItems.id){
        return updatedItems
      }else {
        return item
      }
    })
    setItems(addFavorite)
  }

  useEffect(() => {
    getFetch();
  }, [])

  return (
    <div className="app">
      <Header searchedItem={searchedItem} setSearchedItem={setSearchedItem} />
      <select onChange={handleFilter} name="location-filter">
        <option value="sort">Sort</option>
        <option value="a-z">A-Z</option>
      </select>
      <div>
      <form className="form" onSubmit={handleNewItemSubmit}>
        <input 
          type="text"
          name="description"
          placeholder="Enter item description"
        />
        <input 
          type="text" 
          name="location" 
          placeholder="Location" />
        <input
          type='text'
          name='image'
          placeholder="image-url"/>
        <button type='submit'>Add Item</button>
      </form>
      </div>
      <ListingsContainer items={itemsToDispaly} 
        setItems={setItems} 
        setFavoriteItem={setFavoriteItem}
        passHandleDelete={passHandleDelete}/>
    </div>
  );
}

export default App;
