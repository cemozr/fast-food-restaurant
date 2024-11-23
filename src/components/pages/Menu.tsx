import Button from "../UI/Button";
import FoodCard from "../FoodCard";
import foodData from "../../data/foodData";
import { useDispatch, useSelector } from "react-redux";
import { filter } from "../../states/categorySlice";
import { RootState } from "../../states/store";
import { setIsCartActive } from "../../states/cartSlice";

export default function Menu() {
  const dispatch = useDispatch();
  const category = useSelector((state: RootState) => {
    return state.categoryReducer.category;
  });

  const selectedCategory =
    category === "Hepsi" || ""
      ? foodData
      : foodData.filter((food) => food.category === category);

  return (
    <div className="flex flex-col items-center justify-center gap-2 bg-bg p-10">
      <button
        onClick={() => dispatch(setIsCartActive())}
        className="fixed right-4 top-1/2 -translate-y-1/2 translate-x-1/2 -rotate-90 transform rounded bg-secondary px-4 py-2 font-dancing text-2xl text-txtDark lg:hidden"
      >
        Sepetim
      </button>
      <h1 className="p-2 font-dancing text-5xl text-txtDark">Menümüz</h1>
      <div className="grid grid-cols-3 md:flex">
        <Button
          el="button-category"
          onClick={(e) => dispatch(filter(e.currentTarget.innerText))}
        >
          Hepsi
        </Button>
        <Button
          el="button-category"
          onClick={(e) => dispatch(filter(e.currentTarget.innerText))}
        >
          Burger
        </Button>
        <Button
          el="button-category"
          onClick={(e) => dispatch(filter(e.currentTarget.innerText))}
        >
          Pizza
        </Button>
        <Button
          el="button-category"
          onClick={(e) => dispatch(filter(e.currentTarget.innerText))}
        >
          Makarna
        </Button>
        <Button
          el="button-category"
          onClick={(e) => dispatch(filter(e.currentTarget.innerText))}
        >
          Kızartma
        </Button>
      </div>
      <div className="grid h-full grid-cols-1 justify-stretch md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {selectedCategory.map((food, i) => {
          return <FoodCard key={i} food={food} />;
        })}
      </div>
    </div>
  );
}
