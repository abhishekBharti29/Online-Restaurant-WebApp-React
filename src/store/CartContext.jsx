import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addCartItem: (itemObj) => {},
  removeCartItem: (itemId) => {},
  clearAllCartItems: () => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const currentStateItems = [...state.items];
    if (existingCartItemIndex > -1) {
      const selectedItem = state.items[existingCartItemIndex];
      const selectedItemUpdatedVersion = {
        ...selectedItem,
        quantity: selectedItem.quantity + 1,
      };
      currentStateItems[existingCartItemIndex] = selectedItemUpdatedVersion;
    } else {
      currentStateItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: currentStateItems };
  } else if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const currentStateItems = [...state.items];
    if (existingCartItemIndex > -1) {
      const selectedItem = state.items[existingCartItemIndex];
      if (selectedItem.quantity === 1) {
        currentStateItems.splice(existingCartItemIndex, 1);
        return { ...state, items: currentStateItems };
      }
      const selectedItemUpdatedVersion = {
        ...selectedItem,
        quantity: selectedItem.quantity - 1,
      };
      currentStateItems[existingCartItemIndex] = selectedItemUpdatedVersion;
    }
    return { ...state, items: currentStateItems };
  } else if (action.type === "EMPTY_CART") {
    return { ...state, items: [] };
  }
  return state;
}

export function CartContextProvider({ children }) {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, {
    items: [],
  });
  function addItem(itemObj) {
    dispatchCartAction({
      type: "ADD_ITEM",
      item: itemObj,
    });
  }
  function removeItem(itemId) {
    dispatchCartAction({
      type: "REMOVE_ITEM",
      id: itemId,
    });
  }
  function clearCart() {
    dispatchCartAction({
      type: "EMPTY_CART",
    });
  }
  const cartContext = {
    items: cartState.items,
    addCartItem: addItem,
    removeCartItem: removeItem,
    clearAllCartItems: clearCart,
  };
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
