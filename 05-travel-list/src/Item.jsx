import PropTypes from "prop-types";
function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}
export default Item;
Item.propTypes = {
  item: PropTypes.object.isRequired,
};
