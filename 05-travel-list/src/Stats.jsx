import PropTypes from "prop-types";
function Stats({ items }) {
  if (!items.length) {
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list</em>
      </footer>
    );
  }

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage =
    numItems !== 0 ? Math.round((numPacked / numItems) * 100) : 0;
  return (
    <footer className="stats">
      {percentage === 100
        ? "You got everything! Ready to go🛩️"
        : `👜 You have ${numItems} items on your list, and you already packed
        ${numPacked} (${percentage}%)`}
    </footer>
  );
}

Stats.propTypes = {
  items: PropTypes.array.isRequired,
};
export default Stats;
