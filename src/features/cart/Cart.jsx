import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import LinkButton from "../../ui/LinkButton";
import CartItem from "./CartItem";
import { clearCart, getCart } from "../../ui/cartSlice";
import EmptyCart from "./EmptyCart";

function Cart() {
  const { username } = useSelector((state) => state.user);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-3">
      <LinkButton to="/">&larr; Tillbaka</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Dina PIZZOR {username}</h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => {
          return <CartItem key={item.pizzaId} item={item} />;
        })}
      </ul>

      <div className="mt-6 space-x-2">
        <Button to={"/order/new"} type={"primary"}>
          Nästa steg
        </Button>

        <Button type="secondary" onClick={() => dispatch(clearCart())}>
          Tömma varukorg
        </Button>
      </div>
    </div>
  );
}

export default Cart;
