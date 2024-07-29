import { useContext } from "react";
import Modal from "./support_ui/Modal";
import UserProgressContext from "../store/UserProgressContext";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatter";
import Input from "./support_ui/Input";
import Button from "./support_ui/Button";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const userProgressContext = useContext(UserProgressContext);
  const cartContext = useContext(CartContext);
  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);
  const cartTotal = cartContext.items.reduce((totalPriceAccumulator, item) => {
    totalPriceAccumulator = totalPriceAccumulator + item.quantity * item.price;
    return totalPriceAccumulator;
  }, 0);
  function handlePlaceOrder(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());
    sendRequest(
      JSON.stringify({
        order: {
          items: cartContext.items,
          customer: customerData,
        },
      })
    );
  }

  function handleOrderComplete() {
    userProgressContext.hideCheckout();
    cartContext.clearAllCartItems();
    clearData();
  }

  let actions = (
    <>
      <Button
        type="button"
        textOnly={true}
        onClick={() => userProgressContext.hideCheckout()}
      >
        Close
      </Button>
      <Button>Place Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Placing order...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        isDialogOpen={userProgressContext.progress === "checkout"}
        onModalClose={handleOrderComplete}
      >
        <h2>Order placed successfuly!</h2>
        <p>Your order will be delivered shortly</p>
        <p className="modal-actions">
          <Button onClick={handleOrderComplete}>Okay</Button>
        </p>
      </Modal>
    );
  }
  return (
    <Modal
      classesToBeApplied="checkout"
      isDialogOpen={userProgressContext.progress === "checkout"}
    >
      <form onSubmit={handlePlaceOrder}>
        <p>
          We currently only accept cash on delivery due to our recent opening.
          Online payments will soon be available. We apologize for any
          inconvenience.
        </p>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" id="name" type="text" />
        <Input label="E-Mail Address" id="email" type="email" />
        <Input label="Street" id="street" type="text" />
        <div className="control-row">
          <Input label="Postal Code" id="postal-code" type="text"></Input>
          <Input label="City" id="city" type="text"></Input>
        </div>
        {error && <Error title="Failed to place order!" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
