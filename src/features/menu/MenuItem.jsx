import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getCurrentQuantityById } from "../../ui/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza, imageUrl, name, ingredients, unitPrice }) {
  const dispatch = useDispatch();
  const { id } = pizza;

  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  return (
    <li className="flex w-5/12 gap-4 py-2	transition hover:shadow-2xl hover:transition">
      <img src={imageUrl} alt={name} className={`h-40 `} />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-lg	 capitalize italic text-stone-500">
          {ingredients}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <p className="text-lg	">{formatCurrency(unitPrice)}</p>

          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity
                pizzaId={id}
                currentQuantity={currentQuantity}
              />
              <DeleteItem pizzaId={id} />
            </div>
          )}

          {!isInCart && (
            <Button onClick={handleAddToCart} type="small">
              Lägg till
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
