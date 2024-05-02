import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice";
import PropTypes from "prop-types";
import Button from "../../ui/Button";

function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();
  console.log(pizzaId);
  return (
    <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>
      Delete
    </Button>
  );
}
DeleteItem.propTypes = {
  pizzaId: PropTypes.string,
};
export default DeleteItem;
