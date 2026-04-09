import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavigationTabs } from "../../components/ui/navigation/NavigationTabs";
import ProductDetailCard from "../../components/ui/ProductDetailCard";
const categories = [
  "綠豆薏仁系列",
  "豆花系列",
  "冷飲系列",
  "冰品系列",
  "熱飲系列",
  "杏仁系列",
  "瓶裝系列",
];

const menuItems = [
  {
    name: "綠豆湯",
    price: "$35",
    basePrice: 35,
    ingredientName: "粉角",
    ingredientPrice: 5,
    upsizePrice: 20,
  },
  {
    name: "綠豆汁",
    price: "$25",
    basePrice: 25,
    ingredientName: "珍珠",
    ingredientPrice: 10,
    upsizePrice: 15,
  },
  {
    name: "紅豆湯",
    price: "$40",
    basePrice: 40,
    ingredientName: "湯圓",
    ingredientPrice: 10,
    upsizePrice: 20,
  },
  {
    name: "冬瓜茶",
    price: "$20",
    basePrice: 20,
    ingredientName: "椰果",
    ingredientPrice: 5,
    upsizePrice: 10,
  },
  {
    name: "仙草凍",
    price: "$30",
    basePrice: 30,
    ingredientName: "奶油球",
    ingredientPrice: 5,
    upsizePrice: 15,
  },
];

interface MenuItemType {
  name: string;
  price: string;
  basePrice: number;
  ingredientName: string;
  ingredientPrice: number;
  upsizePrice: number;
  isPartial?: boolean;
}

export const MenuItem: React.FC<{
  item: MenuItemType;
  onClick: () => void;
}> = ({ item, onClick }) => {
  return (
    <article
      onClick={onClick}
      className="flex overflow-hidden gap-3 py-2.5 pr-20 pl-4 mt-1.5 border border-black border-solid"
    >
      <div className="flex shrink-0 bg-zinc-300 h-[84px] w-[84px]" />
      <div className="flex flex-col">
        <h3 className="text-black">{item.name}</h3>
        <p className="self-start mt-5 text-green-700">{item.price}</p>
      </div>
    </article>
  );
};

// Category type
interface Category {
  id: string;
  name: string;
  toppings: string[];
  items: { id: string; name: string; price: number }[];
}

export const MenuWireframe: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null);

  // fectch data
  useEffect(() => {
    axios
      .get("http://localhost:3000/")
      .then((res) => {
        const data = res.data.categories || res.data;
        setCategories(data);
        setSelectedCategory(data[0] || null); // 預設第一個分類
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex overflow-hidden flex-col pb-2.5 mx-auto w-full h-screen bg-white max-w-[480px]">
      <main className="fixed flex flex-col flex-1 overflow-hidden items-start w-full h-screen text-3xl whitespace-nowrap font-[590]">
        <div className="pl-4 w-full mt-5">
          <NavigationTabs />
          <header className="flex gap-10 mt-5 text-3xl leading-none text-center text-black">
            <h1>菜單</h1>
            <img
              src="https://api.builder.io/api/v1/image/assets/7e9b7b369aa744bdae5e98cb8bfd4ec9/3f7bd44c6a425393d53672dda05da8b961c1f90b?placeholderIfAbsent=true"
              alt="Menu icon"
              className="object-contain shrink-0 w-6 aspect-square"
            />
          </header>
        </div>

        {/* 分類導覽列 */}
        <nav className="flex overflow-x-auto w-full flex-nowrap scroll-auto gap-2 items-center p-1 mt-4 mr-0 text-xl leading-none text-center text-black">
          {categories.map((cat, index) => (
            <div
              key={cat.id}
              className={`flex-shrink-0 self-stretch my-auto ${index === 0 ? "w-[120px]" : "w-20"}`}
            >
              <button
                className={`text-black ${selectedCategory?.id === cat.id ? "font-bold" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat.name}
              </button>
              <div className="flex mt-1 w-full bg-zinc-300 min-h-1" />
            </div>
          ))}
        </nav>

        {/* 商品列表區塊 - 修正滾動問題 */}
        <section className="flex-1 overflow-y-auto px-4 pb-20">
          {selectedCategory?.items.map((item, index) => (
            <MenuItem
              key={index}
              item={item}
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </section>
      </main>
      {selectedItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" // 背景壓黑 50%
          onClick={() => setSelectedItem(null)} // 點擊背景任何地方關閉卡片
        >
          <div
            className="w-full rounded-2xl max-w-[345px] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <ProductDetailCard
              product={selectedItem}
              onClose={() => setSelectedItem(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
