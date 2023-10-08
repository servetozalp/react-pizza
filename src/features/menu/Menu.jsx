import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
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
    <ul
      className="flex flex-wrap divide-y divide-stone-200 px-2"
      style={{ gap: "5%" }}
    >
      {menuItemsWithImages.map((menuItem) => (
        <MenuItem
          pizza={menuItem.pizza}
          name={menuItem.name}
          ingredients={menuItem.ingredients}
          unitPrice={menuItem.unitPrice}
          imageUrl={menuItem.imageUrl}
          key={menuItem.pizza.id}
        />
      ))}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
