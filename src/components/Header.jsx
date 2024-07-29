import { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import Button from "./support_ui/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

export default function Header() {
  const cartContext = useContext(CartContext);
  const userProgressContext = useContext(UserProgressContext);
  const cartItemsQuantity = cartContext.items.reduce(
    (totalQuantityAccumulator, item) => {
      totalQuantityAccumulator += item.quantity;
      return totalQuantityAccumulator;
    },
    0
  );

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="App Logo" />
        <h1>Gobble ITALIANO</h1>
      </div>
      <nav>
        <Button textOnly={true} onClick={() => userProgressContext.showCart()}>
          Cart ({cartItemsQuantity})
        </Button>
      </nav>
    </header>
  );
}
