import { useState, useEffect } from "react";
// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "Passports", quantity: 2, packed: false },
//   { id: 4, description: "Socks", quantity: 12, packed: false },
//   { id: 5, description: "Passports", quantity: 2, packed: false },
//   { id: 6, description: "Socks", quantity: 12, packed: false },
//   { id: 7, description: "Passports", quantity: 2, packed: false },
//   { id: 8, description: "Socks", quantity: 12, packed: false },
//   { id: 9, description: "Passports", quantity: 2, packed: false },
//   { id: 10, description: "Socks", quantity: 12, packed: false },
//   { id: 11, description: "Passports", quantity: 2, packed: false },
//   { id: 12, description: "Socks", quantity: 12, packed: false },
//   { id: 13, description: "Passports", quantity: 2, packed: false },
//   { id: 14, description: "Socks", quantity: 12, packed: false },
// ];
export default function App() {
  const [items, setItems] = useState([]);
  function handleAddItems(item) {
    setItems((items) => {
      return [...items, item];
    });
  }
  function handlePackItems(id) {
    const newItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, packed: !item.packed };
      }
      return item;
    });
    setItems(newItems);
  }
  function handleDel(id = null) {
    if (!id) {
      setItems([]);
      return;
    }
    setItems((items) => {
      return items.filter((item) => item.id !== id);
    });
  }
  return (
    <div className="app">
      <Logo />
      <Form items={items} onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDel={handleDel}
        onPackItems={handlePackItems}
      />
      <Stats items={items} />
    </div>
  );
}
function Logo() {
  return <h1> Far Away</h1>;
}
function Form({ items, onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const item = {
      id: items.length ? items.at(-1).id + 1 : 1,
      description: description,
      quantity: quantity,
      packed: false,
    };
    onAddItems(item);
    // console.log(initialItems);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip ?</h3>
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => (
          <option value={i + 1} key={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList({ items, onDel, onPackItems, onSort }) {
  const [order, setOrder] = useState(0);
  const sortedItems = [...items].sort((a, b) => {
    if (order === 0) return a.id - b.id; // default order
    if (order === 1) return a.description.localeCompare(b.description);
    if (order === 2) return a.packed - b.packed;
    return 0;
  });

  function handleOrder(e) {
    setOrder(+e.target.value);
  }
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item, i) => (
          <Item
            item={item}
            onPackItems={onPackItems}
            key={item.id}
            onDel={onDel}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={order} onChange={handleOrder}>
          <option value={0}>Sort By Input Order</option>
          <option value={1}>Sort By Description</option>
          <option value={2}>Sort By Packed status</option>
        </select>

        <button onClick={() => onDel()}>Clear List</button>
      </div>
    </div>
  );
}
function Item({ item, onPackItems, onDel }) {
  return (
    <li key={item.id}>
      <input
        type="checkbox"
        name="item"
        id={item.id}
        checked={item.packed}
        onChange={() => onPackItems(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>

      <button style={{ color: "red" }} onClick={() => onDel(item.id)}>
        ❌
      </button>
    </li>
  );
}
function Stats({ items }) {
  const packed = items.filter((item) => item.packed).length;
  return (
    <footer className="stats">
      {items.length ? (
        <em>
          You have {items.length} itmes on your list and you are already packed{" "}
          {packed} ({((packed / items.length) * 100).toFixed(0)}%)
        </em>
      ) : (
        <em>Start adding items to the packing list</em>
      )}
    </footer>
  );
}
