import { createContext, useState } from "react";

const UserProgressContext = createContext({
  progress: "",
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export function UserProgressContextProvider({ children }) {
  const [userCurrentProgress, setUserCurrentProgress] = useState("");
  function showCart() {
    setUserCurrentProgress("cart");
  }
  function hideCart() {
    setUserCurrentProgress("");
  }
  function showCheckout() {
    setUserCurrentProgress("checkout");
  }
  function hideCheckout() {
    setUserCurrentProgress("");
  }

  const userProgressContext = {
    progress: userCurrentProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };
  return (
    <UserProgressContext.Provider value={userProgressContext}>
      {children}
    </UserProgressContext.Provider>
  );
}

export default UserProgressContext;
