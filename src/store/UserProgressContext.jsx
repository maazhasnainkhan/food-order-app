import { createContext, useReducer, useState } from "react";

const UserProgressContext = createContext({
  progress: "",
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

function userProgressReducer(state, action) {
  if (action.type === "SHOW_CART") {
    return "cart";
  }

  if (action.type === "HIDE_CART") {
    return "";
  }

  if (action.type === "SHOW_CHECKOUT") {
    return "checkout";
  }

  if (action.type === "HIDE_CHECKOUT") {
    return "";
  }

  return state;
}

export function UserProgressContextProvider({ children }) {
  const [userProgress, dispatchUserProgressAction] = useReducer(
    userProgressReducer,
    ""
  );

  function showCart() {
    dispatchUserProgressAction({
      type: "SHOW_CART",
    });
  }

  function hideCart() {
    dispatchUserProgressAction({
      type: "HIDE_CART",
    });
  }

  function showCheckout() {
    dispatchUserProgressAction({
      type: "SHOW_CHECKOUT",
    });
  }

  function hideCheckout() {
    dispatchUserProgressAction({
      type: "HIDE_CHECKOUT",
    });
  }

  const userProgressContext = {
    progress: userProgress,
    showCart: showCart,
    hideCart: hideCart,
    showCheckout: showCheckout,
    hideCheckout: hideCheckout,
  };

  return (
    <UserProgressContext.Provider value={userProgressContext}>
      {children}
    </UserProgressContext.Provider>
  );
}

// export function UserProgressContextProvider({ children }) {
//   const [userProgress, setUserProgress] = useState("");

//   function showCart() {
//     setUserProgress("cart");
//   }

//   function hideCart() {
//     setUserProgress("");
//   }

//   function showCheckout() {
//     setUserProgress("checkout");
//   }

//   function hideCheckout() {
//     setUserProgress("");
//   }

//   const userProgressContext = {
//     progress: userProgress,
//     showCart: showCart(),
//     hideCart: hideCart(),
//     showCheckout: showCheckout(),
//     hideCheckout: hideCheckout(),
//   };

//   return (
//     <UserProgressContext.Provider value={userProgressContext}>
//       {children}
//     </UserProgressContext.Provider>
//   );
// }

export default UserProgressContext;
