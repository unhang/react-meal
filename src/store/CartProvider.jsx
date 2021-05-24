import { useReducer } from "react";
import CartContext from "./cart-context";

const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";
const RESET_CART = "RESET_CART";

const defaultCartState = {
  items: [],
  totalAmount: 0
};

const addItem = (state, action) => {
  const updatedTotalAmount =
    state.totalAmount + action.item.price * action.item.amount;

  const existingCartItemIndex = state.items.findIndex(
    (item) => item.id === action.item.id
  );
  const existingCartItem = state.items[existingCartItemIndex];

  let updatedItems;

  if (existingCartItem) {
    const updatedItem = {
      ...existingCartItem,
      amount: existingCartItem.amount + action.item.amount
    };
    updatedItems = [...state.items];
    updatedItems[existingCartItemIndex] = updatedItem;
  } else {
    updatedItems = state.items.concat(action.item);
  }

  return {
    items: updatedItems,
    totalAmount: updatedTotalAmount
  };
};

const removeItem = (state, action) => {
  const itemIndex = state.items.findIndex((item) => item.id === action.id);

  const updatedItem = {
    ...state.items[itemIndex],
    amount: state.items[itemIndex].amount - 1
  };

  const updatedItems = [...state.items];
  updatedItems[itemIndex] = updatedItem;
  if (updatedItems[itemIndex].amount === 0) {
    updatedItems.splice(itemIndex, 1);
  }
  const updatedTotalAmount = state.totalAmount - updatedItem.price;

  return { items: updatedItems, totalAmount: updatedTotalAmount };
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return addItem(state, action);
    case REMOVE_ITEM:
      return removeItem(state, action);
    case RESET_CART:
      return defaultCartState;
    default:
      return defaultCartState;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatchAction({ type: ADD_ITEM, item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchAction({ type: REMOVE_ITEM, id: id });
  };

  const resetCart = () => {
    dispatchAction({ type: RESET_CART });
  };

  const cartContent = {
    items: cartState.items,
    totalAmount: cartState.totalAmount, // price x amount
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    resetCart: resetCart
  };

  return (
    <CartContext.Provider value={{ ...cartContent }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
