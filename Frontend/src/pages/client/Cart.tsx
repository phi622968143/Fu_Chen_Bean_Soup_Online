import React, { useState } from "react";

interface CartItemData {
  id: string;
  name: string;
  price: number;
  options: string;
  quantity: number;
  isSelected: boolean;
}

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  options: string;
  quantity: number;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onQuantityChange: (id: string, newQuantity: number) => void;
  onDelete: (id: string) => void;
}

const initialCartItems: CartItemData[] = [
  {
    id: "1",
    name: "綠豆湯",
    price: 35,
    options: "小",
    quantity: 10,
    isSelected: true,
  },
  {
    id: "2",
    name: "三色豆花",
    price: 60,
    options: "大(+$20)",
    quantity: 1,
    isSelected: true,
  },
  {
    id: "3",
    name: "古早味紅茶",
    price: 35,
    options: "粉角(+$5)/大(+$10)",
    quantity: 2,
    isSelected: true,
  },
  {
    id: "4",
    name: "綠豆汁",
    price: 35,
    options: "大(+$10)",
    quantity: 1,
    isSelected: false,
  },
];

export const ShoppingCart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItemData[]>(initialCartItems);

  const handleToggleSelect = (id: string) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, isSelected: !item.isSelected } : item,
      ),
    );
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const handleDelete = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout...");
  };

  const total = cartItems
    .filter((item) => item.isSelected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
      />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <div className="bg-white min-h-[screen]">
        <header className="flex items-center px-4 py-3 border border-b">
          <button aria-label="返回">
            <i className="ti ti-arrow-left text-2xl text-gray-900" />
          </button>
        </header>
        <main className="px-4 py-6">
          <h1 className="mb-6 text-3xl font-bold text-gray-900">購物車</h1>
          <section className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                options={item.options}
                quantity={item.quantity}
                isSelected={item.isSelected}
                onToggleSelect={handleToggleSelect}
                onQuantityChange={handleQuantityChange}
                onDelete={handleDelete}
              />
            ))}
          </section>
          <section>
            <div className="flex gap-2 justify-end items-center mt-8 mb-6">
              <div className="text-xl text-gray-900">總共:</div>
              <div className="text-3xl font-bold text-green-500">${total}</div>
            </div>
            <div className="flex justify-end">
              <button
                className="flex gap-2 items-center px-6 py-3 text-base font-semibold text-white bg-green-500 rounded-lg"
                onClick={handleCheckout}
              >
                <i className="ti ti-shopping-cart text-xl" />
                去結帳
              </button>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  options,
  quantity,
  isSelected,
  onToggleSelect,
  onQuantityChange,
  onDelete,
}) => {
  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(id, quantity - 1);
    }
  };

  const handleIncrease = () => {
    onQuantityChange(id, quantity + 1);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleToggleSelect = () => {
    onToggleSelect(id);
  };

  return (
    <article className="p-4 rounded-lg border border border-solid">
      <div className="flex gap-3 items-start">
        <div className="flex justify-center items-center mt-1 w-5 h-5">
          <button
            className={`flex justify-center items-center rounded h-[18px] w-[18px] ${
              isSelected ? "bg-green-500" : "border-2 border-gray-300"
            }`}
            onClick={handleToggleSelect}
            aria-label={isSelected ? "取消選擇商品" : "選擇商品"}
          >
            {isSelected && (
              <i className="ti ti-check text-sm font-bold text-white" />
            )}
          </button>
        </div>
        <div className="flex flex-1 gap-3">
          <div className="bg-gray-300 rounded flex-[shrink] h-[84px] w-[84px]" />
          <div className="flex flex-col flex-1">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
              <div className="text-lg font-semibold text-green-500">
                ${price * quantity}
              </div>
            </div>
            <p className="mb-3 text-sm text-gray-500">{options}</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center rounded border border border-solid">
                <button
                  className="w-8 h-8 text-lg text-gray-900 border border-r"
                  onClick={handleDecrease}
                  aria-label="減少數量"
                >
                  −
                </button>
                <div className="w-12 h-8 text-sm text-gray-900 flex items-center justify-center">
                  {quantity}
                </div>
                <button
                  className="w-8 h-8 text-lg text-gray-900 border border-l"
                  onClick={handleIncrease}
                  aria-label="增加數量"
                >
                  +
                </button>
              </div>
              <button onClick={handleDelete} aria-label="刪除商品">
                <i className="ti ti-trash text-2xl text-gray-900" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ShoppingCart;
