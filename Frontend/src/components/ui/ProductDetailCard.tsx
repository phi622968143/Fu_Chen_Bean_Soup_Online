import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductDetailCardProps {
  product: {
    name: string;
    price: string;
    basePrice: number;
    ingredientName: string;
    ingredientPrice: number;
    upsizePrice: number;
    isPartial?: boolean;
  };
  onClose: () => void;
}

export default function ProductDetailCard({
  product,
  onClose,
}: ProductDetailCardProps) {
  const [selectedIngredient, setSelectedIngredient] =
    React.useState<boolean>(false);
  const [selectedSize, setSelectedSize] = React.useState<"small" | "large">(
    "small",
  );
  const [quantity, setQuantity] = React.useState<number>(1);

  // 1. 從傳入的產品資料動態取得價格
  const basePrice = product.basePrice;
  const ingredientPrice = selectedIngredient ? product.ingredientPrice : 0;
  const sizePrice = selectedSize === "large" ? product.upsizePrice : 0;

  // 2. 計算總價
  const totalPrice = (basePrice + ingredientPrice + sizePrice) * quantity;

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  console.log(selectedIngredient);

  return (
    <article className="flex flex-col w-full bg-white rounded-2xl overflow-hidden shadow-2xl pb-6">
      <header className="flex flex-col items-end px-4 pt-3 pb-40 w-full bg-stone-600">
        <button onClick={onClose}>
          <img
            src="https://api.builder.io/api/v1/image/assets/7e9b7b369aa744bdae5e98cb8bfd4ec9/d5ba6b66da2cc593dca1965980e8cae1c3f9ca31?placeholderIfAbsent=true"
            className="object-contain -mb-8 w-6 aspect-square"
            alt="Close"
          />
        </button>
      </header>

      <main className="flex flex-col px-4 mt-4 w-full box-border">
        <div className="flex gap-5 justify-between">
          <div className="flex flex-col items-start">
            <h1 className="text-3xl text-black font-[590]">{product.name}</h1>
            <section>
              <h3 className="mt-3 text-xl font-medium text-black">配料</h3>
              <button
                className="flex gap-1 mt-2 text-base font-medium leading-none text-black whitespace-nowrap"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIngredient(!selectedIngredient);
                }}
              >
                <span className="text-base font-medium">
                  {product.ingredientName}(+${product.ingredientPrice})
                </span>
                {selectedIngredient ? <CheckedIcon /> : <UncheckedIcon />}
              </button>
            </section>
            <section>
              <h3 className="mt-3 text-xl font-medium text-black">尺寸</h3>
              <div className="flex gap-3 self-stretch mt-2 text-base leading-none text-center whitespace-nowrap font-[590]">
                <button
                  className={`flex overflow-hidden flex-col justify-center items-center px-1 w-6 h-6 ${
                    selectedSize === "small"
                      ? "text-white bg-green-700"
                      : "text-black border border-black border-solid"
                  }`}
                  onClick={() => setSelectedSize("small")}
                >
                  <span>小</span>
                </button>
                <button
                  className={`flex overflow-hidden flex-col justify-center px-1 py-px ${
                    selectedSize === "large"
                      ? "text-white bg-green-700"
                      : "text-black border border-black border-solid"
                  }`}
                  onClick={() => setSelectedSize("large")}
                >
                  <span>大(+${product.upsizePrice})</span>
                </button>
              </div>
            </section>

            <section>
              <h3 className="mt-3 text-xl font-medium text-black">數量</h3>
              <div className="flex mt-2">
                <button
                  className="flex overflow-hidden flex-col justify-center px-1.5 py-3 border border-black border-solid"
                  onClick={handleDecrease}
                  disabled={quantity <= 1}
                >
                  <div className="flex shrink-0 w-3.5 h-0.5 bg-black" />
                </button>
                <div className="flex overflow-hidden flex-col justify-center px-4 py-1.5 text-xs font-semibold text-center text-black whitespace-nowrap border border-black border-solid">
                  <span>{quantity}</span>
                </div>
                <button
                  className="flex overflow-hidden flex-col justify-center items-center w-6 border border-black border-solid"
                  onClick={handleIncrease}
                >
                  <img
                    src="https://api.builder.io/api/v1/image/assets/7e9b7b369aa744bdae5e98cb8bfd4ec9/c5b356a9d534a66d7668402b6fd9570420b8c716?placeholderIfAbsent=true"
                    className="object-contain shrink-0 w-6 h-6 aspect-square"
                    alt="Increase quantity"
                  />
                </button>
              </div>
            </section>
          </div>
          <div className="self-start text-3xl text-right text-green-700 font-[590]">
            ${totalPrice}
          </div>
        </div>

        <button
          className="flex gap-2.5 justify-center items-center self-end p-2 mt-5 text-base text-right text-white whitespace-nowrap bg-lime-800 rounded-lg font-[590]"
          onClick={onClose}
        >
          <img
            src="https://api.builder.io/api/v1/image/assets/7e9b7b369aa744bdae5e98cb8bfd4ec9/206801c2c4b52627220060f64289113b59e23bdc?placeholderIfAbsent=true"
            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
            alt="Cart icon"
          />
          <span className="self-stretch my-auto">加入購物車</span>
        </button>
      </main>
    </article>
  );
}

function UncheckedIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 7C19 5.9 18.1 5 17 5H7C5.9 5 5 5.9 5 7V17C5 18.1 5.9 19 7 19H17C18.1 19 19 18.1 19 17V7ZM7 17V7H17V17H7Z"
        fill="black"
      />
    </svg>
  );
}

function CheckedIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 將原本的 black 改為 green-700 (#15803d) */}
      <rect x="5" y="5" width="14" height="14" rx="1" fill="#15803D" />
      <path
        d="M8 12L11 15L16 9"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
