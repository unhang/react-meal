import { useContext, useState } from "react";
import CartContext from "../../../store/cart-context";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const CartCtx = useContext(CartContext);
  const [amount, setAmount] = useState(1);

  const submitFormHandler = (e) => {
    e.preventDefault();
    CartCtx.addItem({
      id: props.id,
      amount: amount,
      name: props.name,
      price: props.price
    });
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <Input
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: 1,
          max: 5,
          step: 1,
          defaultValue: amount,
          onChange: (e) => {
            setAmount(e.target.value);
          }
        }}
      />
      <button type="submit">+ Add</button>
    </form>
  );
};
export default MealItemForm;
