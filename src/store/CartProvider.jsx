import { useState } from "react";
import CartContext from "./cart-context";

const CartProvider = (props) => {
  const [items, setItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const updateItems = (item) => {
    let updatedItems = [...items];
    let updatedAmount = 0;
    updatedItems = updatedItems.map((updatedItem) => {
      if (updateItems.id !== item.id) {
        updatedAmount = updatedAmount + updatedItem.amount * updatedItem.price;
        return updatedItem;
      } else {
        updatedAmount =
          updatedAmount +
          (updatedItem.amount + item.amount) * updatedItem.price;
        return {
          ...updatedItem,
          amount: updatedItem.amount + item.amount
        };
      }
    });

    console.log({updatedItems})
    console.log({updatedAmount})

    setItems(updatedItems);
    setTotalAmount(updatedAmount);
  };

  const addItemToCartHandler = (item) => {
    console.log({ item });
    updateItems(item);
  };

  const removeItemfromCartHandler = (id) => {};

  const cartContent = {
    items: items,
    totalAmount: totalAmount,
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
