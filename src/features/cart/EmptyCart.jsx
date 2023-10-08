import LinkButton from "../../ui/LinkButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

function EmptyCart() {
  return (
    <div className=" px-4 py-3">
      <LinkButton to="/">
        <span className="specialColor flex items-center gap-2 ">
          <FontAwesomeIcon icon={faArrowLeftLong} />
          Tillbaka
        </span>
      </LinkButton>

      <p className="mt-7 font-semibold">
        Din varukorg är fortfarande tom. Börja lägga till några pizzor :)
      </p>
    </div>
  );
}

export default EmptyCart;
