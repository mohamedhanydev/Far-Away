import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";
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
      const confirmed = window.confirm(
        "Are you sure you want to delete all items?"
      );
      confirmed && setItems([]);
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
