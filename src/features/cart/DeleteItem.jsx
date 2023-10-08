import { useDispatch } from "react-redux";
import { deleteItem } from "../../ui/cartSlice";
import Button from "../../ui/Button";

const DeleteItem = ({ pizzaId }) => {
  const dispatch = useDispatch();

  return (
    <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>
      Ta bort
    </Button>
  );
};

export default DeleteItem;
