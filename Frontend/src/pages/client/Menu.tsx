import React, { useState } from "react";
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

export const Menu: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null);
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
        <section className="p-4 w-full">
          <nav className="flex overflow-x-auto w-full flex-nowrap scroll-auto gap-2 items-center p-1 mt-4 mr-0 text-xl leading-none text-center text-black">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`flex-shrink-0 self-stretch my-auto ${index === 0 ? "w-[120px]" : "w-20"}`}
              >
                <button className="text-black">{category}</button>
                <div className="flex mt-1 w-full bg-zinc-300 min-h-1" />
              </div>
            ))}
          </nav>
        </section>
        <section className="p-4 w-full flex-1 items-center overflow-y-scroll scroll-auto">
          {menuItems.map((item, index) => (
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

function MenuItem({
  item,
  onClick,
}: {
  item: MenuItemType;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex overflow-hidden gap-3 py-2.5 pl-4 mt-1.5 border border-black border-solid text-left active:bg-gray-50 transition-colors"
    >
      {/* 圖片佔位符 */}
      <div className="flex shrink-0 bg-zinc-300 h-[84px] w-[84px]" />

      {/* 文字內容區塊 */}
      <div className="flex flex-col justify-between py-1">
        <div>
          <h3 className="text-black text-[20px] font-bold leading-tight">
            {item.name}
          </h3>
        </div>
        <p className="text-[#289A19] text-[18px] font-bold">{item.price}</p>
      </div>
    </button>
  );
}

export default Menu;
