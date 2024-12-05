import Button from "../../UI/Button";
import FoodCard from "./FoodCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../states/store";
import { setIsCartActive } from "../../../states/cartSlice";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../../states/productSlice";

export default function Menu() {
  const dispatch: AppDispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState<string>("Hepsi");
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const { products } = useSelector((state: RootState) => state.productReducer);
  const categories: string[] = [
    "Hepsi",
    ...Array.from(new Set(products.map((product) => product.category))),
  ];
  const productsToList =
    selectedCategory === "Hepsi"
      ? products
      : products.filter((product) => product.category === selectedCategory);
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
        {categories.map((category, i) => {
          return (
            <Button
              key={i}
              el="button-category"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          );
        })}
      </div>
      <div className="grid h-full grid-cols-1 justify-stretch md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {productsToList.map((product) => {
          return <FoodCard key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
}
