import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { NavigationTabs } from "../../components/ui/navigation/NavigationTabs";
import ProductDetailCard from "../../components/ui/ProductDetailCard";
const categories = [
  { name: "綠豆薏仁系列", active: true },
  { name: "豆花系列", active: false },
  { name: "冷飲系列", active: false },
  { name: "冰品系列", active: false },
  { name: "熱飲系列", active: false },
  { name: "杏仁系列", active: false },
  { name: "瓶裝系列", active: false },
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
    <MenuItemContainer onClick={onClick}>
      {/* <MenuItemImage src={image} alt={name} /> */}
      <MenuItemContent>
        <MenuItemName>{item.name}</MenuItemName>
        {item.price && <MenuItemPrice>{item.price}</MenuItemPrice>}
      </MenuItemContent>
    </MenuItemContainer>
  );
};

// Category type
interface Category {
  id: string;
  name: string;
  toppings: string[];
  items: { id: string; name: string; price: number }[];
  active: boolean;
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
    <MenuContainer>
      <MainContent>
        <NavigationTabs />
        <MenuHeader>
          <MenuTitle>菜單</MenuTitle>
          <MenuIcon src="https://api.builder.io/api/v1/image/assets/7e9b7b369aa744bdae5e98cb8bfd4ec9/9c76d559a1ea8d6c85232ca15ff5dfca0177f00a?placeholderIfAbsent=true" />
        </MenuHeader>
        <CategoryContainer>
          <CategoryScrollWrapper>
            {categories.map((category, index) => {
              const isSelected = selectedCategory?.id === category.id;
              return (
                <CategoryButton
                  key={index}
                  className={isSelected ? "active" : ""}
                  onClick={() => setSelectedCategory(category)}
                >
                  <CategoryText>{category.name}</CategoryText>
                  {isSelected && <ActiveIndicator />}
                </CategoryButton>
              );
            })}
          </CategoryScrollWrapper>
        </CategoryContainer>
      </MainContent>
      <MenuListContainer>
        {selectedCategory?.items.map((item, index) => (
          <MenuItem
            key={index}
            // image={item.image} //預留圖片空間
            item={item as any} // 強制轉型或確保 item 符合 MenuItemType
            onClick={() => setSelectedItem(item as any)}
          />
        ))}
      </MenuListContainer>
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
    </MenuContainer>
  );
};

const MenuContainer = styled.main`
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  max-width: 480px;
  width: 100%;
  padding-bottom: 9px;
  flex-direction: column;
  overflow: hidden;
  align-items: stretch;
  margin: 0 auto;
`;

const MainContent = styled.div`
  align-self: center;
  display: flex;
  margin-top: 8px;
  width: 100%;
  max-width: 361px;
  flex-direction: column;
  align-items: stretch;
  color: var(--text-gray-AAA, #949494);
  white-space: nowrap;
  text-align: center;
  justify-content: start;
  font:
    590 20px/1.1 SF Pro,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
`;

const MenuHeader = styled.header`
  display: flex;
  margin-top: 15px;
  width: 100%;
  align-items: stretch;
  gap: 20px;
  font-size: 32px;
  color: rgba(0, 0, 0, 1);
  line-height: 1;
  justify-content: space-between;
`;

const MenuTitle = styled.h1`
  margin: 0;
  font: inherit;
`;

const MenuIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 24px;
  flex-shrink: 0;
`;

const CategoryContainer = styled.div`
  display: flex;
  margin-top: 15px;
  width: 100%;
  overflow: hidden;
`;

const CategoryScrollWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  gap: 8px;
  overflow: scroll;
  justify-content: start;
  padding: 4px;
  overflow-x: auto;
  white-space: nowrap;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CategoryButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: var(--text-gray-AAA, #949494);
  font:
    590 20px/1.1 SF Pro,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  white-space: nowrap;
  text-align: center;
  display: inline-flex;
  min-height: 22px;
  align-items: center;
  // gap: 10px;
  justify-content: start;

  &.active {
    color: var(--text-gray-AAAA, #343434);
    flex-direction: column;
  }
`;

const CategoryText = styled.span`
  // width: 80px;

  .active & {
    color: var(--text-gray-AAAA, #343434);
    width: auto;
  }
`;

const ActiveIndicator = styled.div`
  display: flex;
  height: 4px;
  margin-top: 4px;
  width: 100%;
  background-color: var(--bg-primary, #289a19);
  border-radius: 2px;
`;

const MenuListContainer = styled.section`
  z-index: 10;
  margin-top: 6px;
  height: 499px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  padding: 8px 16px 0;
  font:
    590 28px SF Pro,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
`;
const MenuItemContainer = styled.article`
  border-radius: 12px;
  box-shadow:
    2px 1px 4px 0 rgba(0, 0, 0, 0.25) inset,
    -3px -3px 4px 0 rgba(0, 0, 0, 0.25) inset,
    4px 4px 4px 0 rgba(0, 0, 0, 0.25);
  display: flex;
  max-width: 100%;
  width: 361px;
  align-items: stretch;
  gap: 12px;
  overflow: hidden;
  background-color: var(--white-mid, #f7f7f7);
  padding: 8px 72px 8px 16px;
  margin-top: 8px;

  &:first-child {
    margin-top: 0;
  }

  &.compact {
    color: rgba(52, 52, 52, 1);
    padding: 8px 16px 0;
  }
`;

// const MenuItemImage = styled.img`
//   aspect-ratio: 1;
//   object-fit: contain;
//   object-position: center;
//   width: 84px;
//   flex-shrink: 0;

//   .compact & {
//     aspect-ratio: 1.65;
//   }
// `;

const MenuItemContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const MenuItemName = styled.h3`
  color: rgba(52, 52, 52, 1);
  font:
    590 28px SF Pro,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  margin: 0;
`;

const MenuItemPrice = styled.span`
  color: rgba(40, 154, 25, 1);
  align-self: start;
  margin-top: 18px;
  font:
    590 28px SF Pro,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
`;

const MenuItemNameCompact = styled.h3`
  align-self: start;
  flex-grow: 1;
  flex-shrink: 1;
  width: 216px;
  color: rgba(52, 52, 52, 1);
  font:
    590 28px SF Pro,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  margin: 0;
`;
