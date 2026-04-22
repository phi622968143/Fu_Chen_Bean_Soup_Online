import * as React from "react";
import styled from "styled-components";
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
    <MenuCard>
      <ProductImageSection>
        <ProductImage src="../../../../src/feature-pic.jpg" alt="綠豆湯" />
        <FavoriteIcon
          src="https://api.builder.io/api/v1/image/assets/7e9b7b369aa744bdae5e98cb8bfd4ec9/787cd6efcbf1b43e307ad6d67fc354e8cf1bd86b"
          alt="Close"
          onClick={onClose}
        />
      </ProductImageSection>

      <ProductDetailsSection>
        <ProductInfo>
          <ProductDetails>
            <ProductTitle>{product.name}</ProductTitle>

            <IngredientSection>
              <SectionLabel>配料</SectionLabel>
              <IngredientOption
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIngredient(!selectedIngredient);
                }}
              >
                <IngredientText>
                  {product.ingredientName}(+${product.ingredientPrice})
                </IngredientText>
                {selectedIngredient ? <CheckedIcon /> : <UncheckedIcon />}
              </IngredientOption>
            </IngredientSection>

            <SizeSection>
              <SectionLabel>尺寸</SectionLabel>
              <SizeContainer>
                <SizeOption
                  onClick={() => setSelectedSize("small")}
                  $isSelected={selectedSize == "small"}
                >
                  小
                </SizeOption>
                <SizeOption
                  onClick={() => setSelectedSize("large")}
                  $isSelected={selectedSize == "large"}
                >
                  大(+${product.upsizePrice})
                </SizeOption>
              </SizeContainer>
            </SizeSection>

            <QuantitySection>
              <SectionLabel>數量</SectionLabel>
              <QuantityContainer>
                <QuantityButton
                  onClick={handleDecrease}
                  disabled={quantity <= 1}
                >
                  <MinusIcon />
                </QuantityButton>
                <QuantityDisplay>{quantity}</QuantityDisplay>
                <QuantityButton onClick={handleIncrease}>
                  <img
                    src="https://api.builder.io/api/v1/image/assets/7e9b7b369aa744bdae5e98cb8bfd4ec9/f00ac8012dcc1b91bdd0ef90844be570d66b814b"
                    alt="Increase quantity"
                  />
                </QuantityButton>
              </QuantityContainer>
            </QuantitySection>
          </ProductDetails>

          <ProductPrice>${totalPrice}</ProductPrice>
        </ProductInfo>

        <CartButton onClick={onClose}>
          <CartIcon
            src="https://api.builder.io/api/v1/image/assets/7e9b7b369aa744bdae5e98cb8bfd4ec9/206801c2c4b52627220060f64289113b59e23bdc"
            alt="Shopping cart"
          />
          <ButtonText>加入購物車</ButtonText>
        </CartButton>
      </ProductDetailsSection>
    </MenuCard>
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

const MenuCard = styled.article`
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 1);
  box-shadow:
    4px 4px 4px 0 rgba(0, 0, 0, 0.25) inset,
    -9px -8px 4px 0 rgba(0, 0, 0, 0.25) inset,
    8px 8px 4px 0 rgba(0, 0, 0, 0.25);
  max-width: 345px;
  padding-bottom: 20px;
  overflow: hidden;
`;

const ProductImageSection = styled.header`
  display: flex;
  flex-direction: column;
  position: relative;
  aspect-ratio: 1.778;
  width: 100%;
  align-items: end;
  padding: 12px 69px 158px;
`;

const ProductImage = styled.img`
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
`;

const FavoriteIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 24px;
  margin-bottom: -32px;
  cursor: pointer;
  z-index: 1;
`;

const ProductDetailsSection = styled.section`
  display: flex;
  margin-top: 16px;
  width: 100%;
  flex-direction: column;
  align-items: stretch;
  padding: 0 16px;
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: stretch;
  gap: 20px;
  justify-content: space-between;
  padding-bottom: 20px;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const ProductTitle = styled.h1`
  color: rgba(0, 0, 0, 1);
  font:
    590 28px SF Pro,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  margin: 0;
`;

const IngredientSection = styled.div`
  margin-top: 12px;
`;

const SectionLabel = styled.h3`
  color: rgba(0, 0, 0, 1);
  font:
    500 20px SF Pro Display,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  margin: 0 0 8px 0;
`;

const IngredientOption = styled.button`
  display: flex;
  align-items: stretch;
  gap: 4px;
  color: rgba(0, 0, 0, 1);
  white-space: nowrap;
  font:
    500 16px/1 SF Pro Display,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
`;

const IngredientText = styled.span`
  flex-grow: 1;
`;

const IngredientIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 24px;
  flex-shrink: 0;
  cursor: pointer;
`;

const SizeSection = styled.div`
  margin-top: 12px;
  align-self: stretch;
`;

const QuantitySection = styled.div`
  margin-top: 12px;
`;

const ProductPrice = styled.div`
  color: rgba(40, 154, 25, 1);
  text-align: right;
  align-self: start;
  font:
    590 28px SF Pro,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
`;

const SizeContainer = styled.div`
  display: flex;
  align-items: stretch;
  gap: 12px;
  color: var(--text-gray-AAAA, #343434);
  white-space: nowrap;
  text-align: center;
  font:
    590 16px/1 SF Pro,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
`;

const SizeOption = styled.button<{ $isSelected?: boolean }>`
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px solid var(--text-gray-AAAA, #343434);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: var(--white-mid, #f7f7f7);
  padding: 1px 4px;
  color: var(--text-gray-AAAA, #343434);
  cursor: pointer;

  background-color: ${(props) =>
    props.$isSelected
      ? "var(--bg-primary, #289a19)"
      : "var(--white-mid, #f7f7f7)"};
  border: ${(props) =>
    props.$isSelected ? "none" : "1px solid var(--text-gray-AAAA, #343434)"};
  color: ${(props) =>
    props.$isSelected
      ? "var(--white-mid, #f7f7f7)"
      : "var(--text-gray-AAAA, #343434)"};

  &:hover {
    background-color: #e7e7e7;
  }
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: start;
`;

const QuantityButton = styled.button`
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 1px solid var(--text-gray-AAAA, #343434);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 24px;
  height: 24px;
  background-color: var(--white-mid, #f7f7f7);
  padding: 0 5px;
  cursor: pointer;

  &:hover {
    background-color: #e7e7e7;
  }

  img {
    aspect-ratio: 1;
    object-fit: contain;
    object-position: center;
    width: 24px;
    flex-shrink: 0;
  }
`;

const MinusIcon = styled.div`
  background-color: rgba(52, 52, 52, 1);
  display: flex;
  width: 14px;
  flex-shrink: 0;
  height: 2px;
  fill: var(
    --text-gray-AAAA,
    linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%),
    #343434
  );
`;

const QuantityDisplay = styled.div`
  justify-content: center;
  align-items: stretch;
  border-radius: 8px;
  border: 1px solid var(--text-gray-AAAA, #343434);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: var(--text-gray-AAAA, #343434);
  white-space: nowrap;
  text-align: center;
  width: 48px;
  background-color: var(--white-mid, #f7f7f7);
  padding: 5px 21px;
  font:
    600 12px SF Pro Display,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
`;

const CartButton = styled.button`
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  opacity: 0.8;
  box-shadow:
    0 4px 4px 0 rgba(0, 0, 0, 0.25) inset,
    -4px -7px 4px 0 rgba(0, 0, 0, 0.25) inset,
    7px 5px 10px 0 rgba(0, 0, 0, 0.25);
  display: flex;
  gap: 10px;
  color: rgba(255, 255, 255, 1);
  white-space: nowrap;
  text-align: right;
  background-color: var(--bg-primary, #289a19);
  padding: 8px;
  font:
    590 16px SF Pro,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  border: none;
  cursor: pointer;

  &:hover:not(:disabled) {
    opacity: 1;
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow:
      0 2px 2px 0 rgba(0, 0, 0, 0.25) inset,
      -2px -3px 2px 0 rgba(0, 0, 0, 0.25) inset,
      3px 2px 5px 0 rgba(0, 0, 0, 0.25);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CartIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 24px;
  flex-shrink: 0;
`;

const ButtonText = styled.span`
  margin: auto 0;
`;
