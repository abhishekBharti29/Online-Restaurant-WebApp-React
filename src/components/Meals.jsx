import useHttp from "../hooks/useHttp";
import MealItem from "./MealItem";
import Error from "./Error";

const requestConfig = {};

export default function Meals() {
  const {
    error,
    isLoading,
    data: loadedMeals,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);
  if (isLoading) {
    return <p className="center">Loading meals...</p>;
  }
  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }
  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} mealDetails={meal} />
      ))}
    </ul>
  );
}
