import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import { useSelector } from "react-redux";

import { formatCurrency } from "../utils/helpers";
const Header = () => {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);

  return (
    <header
      className="flex items-center justify-between border-b border-stone-200  px-4 py-4 uppercase sm:px-6"
      style={{ backgroundColor: "#79AC78" }}
    >
      <Link to={"/"} className="tracking-widest">
        Pizzeria Charlottenberg!..
      </Link>
      <div className="flex w-6/12 items-center justify-end">
        <div className="flex w-full	items-center justify-end gap-3">
          <div className="relative z-10 w-auto p-1">
            <span className=" absolute left-0 top-0 z-20 flex	 h-4 w-4 items-center justify-center	rounded-full bg-red-600 text-xs		 text-white">
              {totalCartQuantity}{" "}
            </span>
            <Link to="/cart" className="w-100 h-100 relative z-10 block">
              <FontAwesomeIcon className="text-2xl" icon={faCartShopping} />
            </Link>
          </div>
          <Link to="/cart">
            <span className="w-1/12	">{formatCurrency(totalCartPrice)}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
