import { useState } from "react";
import Item from "./Item";
export default function PackingList({ items, onDel, onPackItems }) {
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
