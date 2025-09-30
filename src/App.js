import { useState } from "react";
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Passports", quantity: 2, packed: false },
  { id: 4, description: "Socks", quantity: 12, packed: false },
  { id: 5, description: "Passports", quantity: 2, packed: false },
  { id: 6, description: "Socks", quantity: 12, packed: false },
  { id: 7, description: "Passports", quantity: 2, packed: false },
  { id: 8, description: "Socks", quantity: 12, packed: false },
  { id: 9, description: "Passports", quantity: 2, packed: false },
  { id: 10, description: "Socks", quantity: 12, packed: false },
  { id: 11, description: "Passports", quantity: 2, packed: false },
  { id: 12, description: "Socks", quantity: 12, packed: false },
  { id: 13, description: "Passports", quantity: 2, packed: false },
  { id: 14, description: "Socks", quantity: 12, packed: false },
];
export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}
function Logo() {
  return <h1> Far Away</h1>;
}
function Form() {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  // console.log(initialItems);
  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    initialItems.push({
      id: initialItems.at(-1).id + 1,
      description: description,
      quantity: quantity,
      packed: false,
    });
    console.log(initialItems);
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
function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item, i) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}
function Item({ item }) {
  const [packed, setPacked] = useState(item.packed);
  function handleDel() {}
  return (
    <li key={item.id}>
      <input
        type="checkbox"
        name="item"
        id={item.id}
        onChange={() => setPacked((p) => !p)}
        checked={packed}
      />
      <span style={packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>

      <button style={{ color: "red" }} onClick={handleDel}>
        ❌
      </button>
    </li>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <em>You have X itmes on your list and you are already packed X</em>
    </footer>
  );
}
