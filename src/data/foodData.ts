import f1 from "../assets/f1.png";
import f2 from "../assets/f2.png";
import f3 from "../assets/f3.png";
import f4 from "../assets/f4.png";
import f5 from "../assets/f5.png";
import f6 from "../assets/f6.png";
import f7 from "../assets/f7.png";
import f8 from "../assets/f8.png";
import f9 from "../assets/f9.png";

export type Food = {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
};

const foodData: Food[] = [
  {
    id: 0,
    name: "Lab Özel Pizza",
    description:
      "Mozzarella, dana sucuk, jalapeño biberi, kırmızı soğan ve özel baharat karışımıyla hazırlanan cesur bir lezzet.",
    category: "Pizza",
    price: 200,
    image: f1,
  },
  {
    id: 1,
    name: "Akdeniz Bahçesi Pizza",
    description:
      "Fesleğen sosu, zeytin, domates, beyaz peynir, közlenmiş biber ve çıtır roka ile hafif ve taze bir seçenek.",
    category: "Pizza",
    price: 220,
    image: f3,
  },
  {
    id: 2,
    name: "Vulkan Pizza",
    description:
      "Acılı domates sosu, mozzarella, baharatlı tavuk, mısır, yeşil biber ve acı pul biberle ateşli bir lezzet patlaması.",
    category: "Pizza",
    price: 240,
    image: f6,
  },
  {
    id: 3,
    name: "İstanbul Burger",
    description:
      "Siyah susamlı ekmek, klasik Angus et, közlenmiş patlıcan, yoğurtlu cacık sosu ve taze nane ile Türk esintili bir tat.",
    category: "Burger",
    price: 260,
    image: f2,
  },
  {
    id: 4,
    name: "Cheddar Bacon Blast",
    description:
      "Kavurulmuş pastırma, cheddar peyniri, karamelize soğan, barbekü sosu ve taze marullarla dopdolu bir lezzet.",
    category: "Burger",
    price: 220,
    image: f7,
  },
  {
    id: 5,
    name: "Karadeniz Lezzeti",
    description:
      "Izgara somon fileto, roka, ince dilimlenmiş kırmızı soğan, zeytinyağlı yoğurt sosu ve limonlu mayonez ile taze ve hafif bir seçenek.",
    category: "Burger",
    price: 240,
    image: f8,
  },
  {
    id: 6,
    name: "Akdeniz Rüyası Makarna",
    description:
      "Domates, zeytin, fesleğen, roka ve beyaz peynirle hafif ve taze bir Akdeniz esintisi.",
    category: "Makarna",
    price: 150,
    image: f4,
  },
  {
    id: 7,
    name: "Kremalı Karides Makarna",
    description:
      "Taze karides, beyaz şarap sosu, krema, sarımsak ve parmesan peyniri ile zengin ve lezzetli bir seçenek.",
    category: "Makarna",
    price: 140,
    image: f9,
  },
  {
    id: 8,
    name: "Klasik Patates Kızartması",
    description:
      "Altın sarısı ve çıtır çıtır kızarmış patates dilimleri, tuzlu ve nefis bir klasik lezzet.",
    category: "Kızartma",
    price: 120,
    image: f5,
  },
];

export default foodData;
