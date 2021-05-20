import { useReducer, useState } from "react";
import CartContext from "./cart-context";

const ADD_ITEM = "ADD_ITEM"
const REMOVE_ITEM = "REMOVE_ITEM"

const defaultCartState = {
  items: [],
  totalAmount: 0
}

const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const updatedTotalAmount = state.totalAmount + (action.item.price * action.item.amount)

      const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id)
      const existingCartItem = state.items[existingCartItemIndex]

      let updatedItems;
      
      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount
        }
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item)
      }
 
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount
      }
    case REMOVE_ITEM:
      return state
    default:
      return defaultCartState
  }
}

const CartProvider = (props) => {
  const [cartState, dispatchAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatchAction({ type: ADD_ITEM, item: item })
  };

  const removeItemFromCartHandler = (id) => { };

  const cartContent = {
    items: cartState.items,
    totalAmount: cartState.totalAmount, // price x amount
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler
  };

  return (
    <CartContext.Provider value={{ ...cartContent }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
