import React from "react";
import { NavigationTabs } from "../../components/ui/navigation/NavigationTabs";
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
  { name: "綠豆湯", price: "$35" },
  { name: "綠豆汁", price: "$25" },
  { name: "綠豆汁", price: "$25" },
  { name: "綠豆汁", price: "$25" },
  { name: "綠豆汁", price: "$25" },
];

interface MenuItemProps {
  name: string;
  price: string;
  isPartial?: boolean;
}

export const MenuWireframe: React.FC = () => {
  return (
    <div className="flex overflow-hidden flex-col pb-2.5 mx-auto w-full min-h-screen bg-white max-w-[480px]">
      <main className="fixed flex flex-col overflow-hidden items-start w-full min-h-screen text-3xl whitespace-nowrap font-[590]">
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
        <section className="pl-4 w-full">
          <MenuItem name={menuItems[0].name} price={menuItems[0].price} />
          <MenuItem name={menuItems[1].name} price={menuItems[1].price} />
          <MenuItem name={menuItems[2].name} price={menuItems[2].price} />
          <MenuItem name={menuItems[3].name} price={menuItems[3].price} />
          <MenuItem name={menuItems[4].name} price={menuItems[4].price} />
        </section>
      </main>
    </div>
  );
};

export const MenuItem: React.FC<MenuItemProps> = ({ name, price }) => {
  return (
    <article className="flex overflow-hidden gap-3 py-2.5 pr-20 pl-4 mt-1.5 border border-black border-solid">
      <div className="flex shrink-0 bg-zinc-300 h-[84px] w-[84px]" />
      <div className="flex flex-col">
        <h3 className="text-black">{name}</h3>
        <p className="self-start mt-5 text-green-700">{price}</p>
      </div>
    </article>
  );
};

export default MenuWireframe;
