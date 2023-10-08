import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import { calcMinutesLeft, formatDate } from "../../utils/helpers";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import OrderItem from "./OrderItem";

function Order() {
  const order = useLoaderData();

  const fetcher = useFetcher();
  let totalOrderPrice = 0;

  // Run after the component mounts, automatically return fetcher.data
  useEffect(
    function () {
      // when there's no data returned from the fetcher and the state is 'idle'
      if (!fetcher.data && fetcher.state === "idle") {
        fetcher.load("/");
      }
    },
    [fetcher]
  );

  

  
  const {
    id,
    status,
    priority,

    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  const menu = useLoaderData();

  const menuItemsWithImages = [
    {
      pizza: menu[0],
      imageUrl:
        "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-7.jpg",
      name: "Napoli",
      ingredients: "Tomat, Mozzarella, Färsk Tomat, Basilika",
      unitPrice: "200",
    },
    {
      pizza: menu[1],
      imageUrl:
        "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-9.jpg",
      name: "Pepperoni",
      ingredients: "Tomat, Mozzarella, Pepperoni",
      unitPrice: "150",
    },
    {
      pizza: menu[2],
      imageUrl:
        "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-4.jpg",
      name: "Prosciutto e Rucola",
      ingredients: "Tomat, Mozzarella, Prosciutto, Arugula",
      unitPrice: "170",
    },
    {
      pizza: menu[3],
      imageUrl:
        "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-6.jpg",
      name: "Vegetale",
      ingredients: "Tomat, Mozzarella, Paprika, Lök, Champinjoner",
      unitPrice: "140",
    },
    {
      pizza: menu[4],
      imageUrl:
        "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-1.jpg",
      name: "Margherita",
      ingredients: "Tomat, Mozzarella, Basilika",
      unitPrice: "120",
    },
    {
      pizza: menu[5],
      imageUrl:
        "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-12.jpg",
      name: "Mediterranean",
      ingredients:
        "Tomat, Mozzarella, Soltorkade Tomater, Oliver, Jordärtskocka",
      unitPrice: "180",
    },
    {
      pizza: menu[6],
      imageUrl:
        "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-15.jpg",
      name: "Pesto Kyckling",
      ingredients: "Pesto, Mozzarella, Kyckling, Soltorkade Tomater, Spinach",
      unitPrice: "160",
    },
    {
      pizza: menu[7],
      imageUrl:
        "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-16.jpg",
      name: "Aubergin Parmesan",
      ingredients: "Tomatsås, Mozzarella, Aubergin, Parmesan",
      unitPrice: "150 ",
    },
  ];

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="specialColor flex items-center justify-center text-9xl	">
        <FontAwesomeIcon icon={faCircleCheck} />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Status #{id}</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-b border-t">
        {cart.map((item) => {
          const childTotalPrice = item.totalPrice; 
          totalOrderPrice += childTotalPrice; 
          return (
            <OrderItem
              name={menuItemsWithImages.name}
              key={item.pizza}
              item={item}
              ingredients={
                
                fetcher?.data?.find((el) => el.id === item.pizzaId)
                  ?.ingredients ?? []
              }
              
              isLoadingIngredients={fetcher?.state === "loading"}
            />
          );
        })}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {totalOrderPrice + " SEK"}
        </p>

        <p className="font-bold">
          To pay on delivery: {totalOrderPrice + " SEK"}
        </p>
      </div>

      {!priority && <UpdateOrder order={order} />}
    </div>
  );
}

export async function loader({ params }) {
  
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
