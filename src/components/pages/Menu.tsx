import Button from "../UI/Button";
import FoodCard from "../FoodCard";
import foodData from "../../data/foodData";

export default function Menu() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 bg-bg p-10">
      <h1 className="p-2 font-dancing text-5xl text-txtDark">Menümüz</h1>
      <div className="grid grid-cols-3 md:flex">
        <Button el="button-category">Hepsi</Button>
        <Button el="button-category">Burger</Button>
        <Button el="button-category">Pizza</Button>
        <Button el="button-category">Makarna</Button>
        <Button el="button-category">Kızartma</Button>
      </div>
      <div className="grid h-full grid-cols-1 justify-stretch md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {foodData.map((food, i) => {
          return <FoodCard key={i} food={food} />;
        })}
      </div>
    </div>
  );
}
