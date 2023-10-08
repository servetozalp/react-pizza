/* eslint-disable react-refresh/only-export-components */
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const dispatch = useDispatch();
  const [withPriority, setWithPriority] = useState(false);
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);

  const isLoadingAddress = addressStatus === "loading";

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // accessing the data return from the action
  const formErrors = useActionData();

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  const handleGetUserAddress = (e) => {
    e.preventDefault();
    return dispatch(fetchAddress());
  };

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-lg font-semibold">
        Ready to order? Let&apos;s go!
      </h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Namn</label>
          <input
            className="input  grow"
            type="text"
            name="customer"
            placeholder={`Namn`}
            defaultValue={username}
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Mobilnummer</label>
          <div className="grow">
            <input
              className="input w-full"
              type="tel"
              name="phone"
              placeholder="Mobilnummer"
              required
            />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:mb-11 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              placeholder="Adress"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />

            {addressStatus === "error" && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700 sm:absolute sm:right-0">
                {errorAddress}
              </p>
            )}

            {!position.latitude && !position.longitude && (
              <span className="absolute right-[3px] top-[35px] z-50 sm:right-[3px] sm:top-[3px]">
                <Button
                  disabled={isSubmitting || isLoadingAddress}
                  type={"small"}
                  onClick={handleGetUserAddress}
                >
                  Get position
                </Button>
              </span>
            )}
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:bg-yellow-300 focus:text-white focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Vill du ge din beställning företräde?
          </label>
        </div>

        <div>
          {}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />

          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude}, ${position.longitude}`
                : ""
            }
          />

          <Button disabled={isSubmitting} type="primary">
            {isSubmitting
              ? "Placing order"
              : `Beställ nu for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// Named action by convention
export async function action({ request }) {
  // it will recieve the submmitted request
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart), // Varukorgen är i JSON-format (från ovanstående inmatning)
    priority: data.priority === "true",
  };

  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone =
      "Please filled in a valid phone number. We need it to contact you";
  }

  if (Object.keys(errors).length > 0) return errors;

  // Om allt är okej skapar en ny order och omdirigera.
  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
