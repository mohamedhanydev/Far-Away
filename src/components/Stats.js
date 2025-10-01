export default function Stats({ items }) {
  if (!items.length)
    return (
      <footer className="stats">
        <em>Start adding items to the packing list</em>
      </footer>
    );
  const packed = items.filter((item) => item.packed).length;
  const percentage = Math.round((packed / items.length) * 100);
  return (
    <footer className="stats">
      {percentage === 100 ? (
        "You Are Ready To Go!"
      ) : (
        <em>
          You have {items.length} itmes on your list and you are already packed{" "}
          {packed} ({percentage}%)
        </em>
      )}
    </footer>
  );
}
