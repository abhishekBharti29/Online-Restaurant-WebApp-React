import { useContext } from "react";
import { currencyFormatter } from "../util/formatter";
import Button from "./support_ui/Button";
import CartContext from "../store/CartContext";

export default function MealItem({ mealDetails }) {
  const cartContext = useContext(CartContext);
  function addSelectedMealToCart() {
    cartContext.addCartItem(mealDetails);
  }
  return (
    <li className="meal-item">
      <article>
        <img
          src={`http://localhost:3000/${mealDetails.image}`}
          alt={`${mealDetails.name} image`}
        />
        <div>
          <h3>{mealDetails.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(mealDetails.price)}
          </p>
          <p>{mealDetails.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button textOnly={false} onClick={addSelectedMealToCart}>
            Add to cart
          </Button>
        </p>
      </article>
    </li>
  );
}
