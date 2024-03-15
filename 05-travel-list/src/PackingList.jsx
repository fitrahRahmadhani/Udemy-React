import Item from "./Item";
import PropTypes from "prop-types";

function PackingList({ items }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}
export default PackingList;

PackingList.propTypes = {
  items: PropTypes.object.isRequired,
};
