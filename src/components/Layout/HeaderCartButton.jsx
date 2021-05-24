import { useContext, useEffect, useState } from "react";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  const [btnHighlighted, setBtnHighLighted] = useState(false);

  const numberOfCartItems = cartCtx.items.reduce(
    (curNumb, item) => item.amount + curNumb,
    0
  );

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnHighLighted(true);
    
    const timer = setTimeout(() => {
      setBtnHighLighted(false);
    }, 300);
    
    return () => {
      clearTimeout(timer)
    }
  }, [items]);
  
  const btnClasses = `${classes.button} ${btnHighlighted ? classes.bump : ""}`;
  
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};
export default HeaderCartButton;
