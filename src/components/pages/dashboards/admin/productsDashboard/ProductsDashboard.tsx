import { useState } from "react";
import Button from "../../../../UI/Button";
import AddProduct from "./AddProduct";
import ManageProduct from "./ManageProducts";

export default function ProductsDashboard() {
  const [active, setActive] = useState<boolean>(false);
  return (
    <div className="flex flex-col items-center">
      <AddProduct />
      <div className="mb-4">
        <Button onClick={() => setActive(!active)} el="button">
          Ürünleri Listele
        </Button>
      </div>
      {active && <ManageProduct />}
    </div>
  );
}
