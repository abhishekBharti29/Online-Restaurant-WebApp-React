import { useContext } from "react";
import { currencyFormatter } from "../util/formatter";
import CartContext from "../store/CartContext";

export default function CartItem({ itemDetails }) {
  const cartContext = useContext(CartContext);
  return (
    <li className="cart-item">
      <p>
        {itemDetails.name} - {itemDetails.quantity} x{" "}
        {currencyFormatter.format(itemDetails.price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={() => cartContext.removeCartItem(itemDetails.id)}>
          -
        </button>
        <span>{itemDetails.quantity}</span>
        <button onClick={() => cartContext.addCartItem(itemDetails)}>+</button>
      </p>
    </li>
  );
}
