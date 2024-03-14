import Item from "./Item";
import PropTypes from "prop-types";

function PackingList({ data }) {
  return (
    <div className="list">
      <ul>
        {data.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}
export default PackingList;

PackingList.propTypes = {
  data: PropTypes.object.isRequired,
};
