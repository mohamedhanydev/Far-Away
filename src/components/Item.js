export default function Item({ item, onPackItems, onDel }) {
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
