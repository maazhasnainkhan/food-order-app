import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import ErrorMessage from "./ErrorMessage";

const requestConfig = {};

function Meals() {
  const {
    data: loadedMeals,
    error,
    isLoading,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  // if (!loadedMeals) {
  //   return <p>No meals found</p>;
  // }                                         instead of sending empty array as a third argument to not get undefined
  //                                           we could do this and change this to the same as loading state

  if (isLoading) {
    return <p className="loading-text">Fetching Data... Please Wait...</p>;
  }

  if (error) {
    return <ErrorMessage title="Failed To Load The Data" message={error} />;
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}

export default Meals;
