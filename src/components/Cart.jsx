import { useContext } from "react";
import Modal from "./support_ui/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatter";
import Button from "./support_ui/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";

export default function Cart() {
  const cartContext = useContext(CartContext);
  const userProgressContext = useContext(UserProgressContext);
  const cartTotal = cartContext.items.reduce((totalPriceAccumulator, item) => {
    totalPriceAccumulator = totalPriceAccumulator + item.quantity * item.price;
    return totalPriceAccumulator;
  }, 0);
  function handleCloseCart() {
    userProgressContext.hideCart();
  }
  return (
    <Modal
      classesToBeApplied="cart"
      isDialogOpen={userProgressContext.progress === "cart"}
      onModalClose={
        userProgressContext.progress === "cart" ? handleCloseCart : null
      }
    >
      <h2>Your Cart</h2>
      <ul>
        {cartContext.items.map((item) => (
          <CartItem key={item.id} itemDetails={item} />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly={true} onClick={handleCloseCart}>
          Close
        </Button>
        {cartContext.items.length > 0 && (
          <Button textOnly={true} onClick={cartContext.clearAllCartItems}>
            Clear Cart
          </Button>
        )}
        {cartContext.items.length > 0 && (
          <Button
            textOnly={false}
            onClick={() => userProgressContext.showCheckout()}
          >
            Checkout
          </Button>
        )}
      </p>
    </Modal>
  );
}
