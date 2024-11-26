import { useDispatch } from "react-redux";
import { type Food } from "../../../data/foodData";
import Button from "../../UI/Button";
import { addToCart } from "../../../states/cartSlice";

type FoodCardProps = {
  food: Food;
};

export default function FoodCard({ food }: FoodCardProps) {
  const dispatch = useDispatch();
  return (
    <div className="p-4 text-txtLight">
      <div className="relative top-5 z-20 flex h-48 justify-center rounded-bl-3xl rounded-tl-2xl rounded-tr-2xl bg-bgDark">
        <img className="w-40 p-5 py-10" src={food.image} alt="meal image" />
      </div>
      <div className="grid h-80 gap-2 rounded-bl-2xl rounded-br-2xl bg-primary px-6 pb-6 pt-10">
        <h2 className="font-dancing text-2xl">{food.name}</h2>
        <p>{food.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg">{food.price}₺</span>
          <Button
            el="button-add-cart"
            onClick={() =>
              dispatch(
                addToCart({
                  id: food.id,
                  name: food.name,
                  image: food.image,
                  price: food.price,
                  count: 1,
                }),
              )
            }
          />
        </div>
      </div>
    </div>
  );
}
