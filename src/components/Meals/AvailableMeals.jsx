import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [httpError, setHttpError] = useState('');

  useEffect(() => {
    fetch(
      "https://hang-restaurant-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const mealsData = Object.keys(data).map((key) => {
          return {
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price
          };
        });

        setMeals(mealsData);
        setLoading(false);
        setHttpError('');
      })
      .catch((err) => {
        setHttpError(err.message);
        console.log(err);
      });
  }, []);

  let mealsList;
  if (!loading && meals.length) {
    mealsList = (
      <ul>
        {meals.map((meal) => (
          <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
          />
        ))}
      </ul>
    );
  } else mealsList = <p>Loading...</p>;

  if (httpError) {
    mealsList = <p>{httpError}</p>;
  }

  return (
    <section className={classes.meals}>
      <Card>{mealsList}</Card>
    </section>
  );
};

export default AvailableMeals;
