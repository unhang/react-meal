import { useState } from "react";
import CartContext from "./cart-context";

const CartProvider = (props) => {
  const [items, setItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const updateItems = (item) => {
    let updatedItems = [...items];
    let isItemInCart = false;

    for (let i = 0; i < updatedItems.length; i++) {
      if (updatedItems[i].id === item.id) {
        updatedItems[i] = {
          ...updatedItems[i],
          amount: updatedItems[i].amount + item.amount
        };
        isItemInCart = true;
        break;
      }
    }

    if (!isItemInCart) {
      updatedItems.push(item);
    }

    setItems(updatedItems);
  };

  const addItemToCartHandler = (item) => {
    if (items.length) {
      updateItems(item);
    } else {
      setItems([item]);
    }

    setTotalAmount((prevState) => {
      return prevState + item.price * item.amount;
    });
  };

  const removeItemfromCartHandler = (id) => {};

  const cartContent = {
    items: items,
    totalAmount: totalAmount, // price x amount
    addItem: addItemToCartHandler,
    removeItem: removeItemfromCartHandler
  };

  return (
    <CartContext.Provider value={{ ...cartContent }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
