import Button from "../UI/Button";
import FoodCard from "../UI/FoodCard";

export default function Menu() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-bg">
      <h1 className="font-dancing text-5xl text-txtDark">Menümüz</h1>
      <div>
        <Button el="button-category">All</Button>
        <Button el="button-category">Burger</Button>
        <Button el="button-category">Pizza</Button>
        <Button el="button-category">Pasta</Button>
        <Button el="button-category">Fries</Button>
      </div>
      <FoodCard />
    </div>
  );
}
