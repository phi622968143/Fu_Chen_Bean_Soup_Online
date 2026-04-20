import React from "react";
import styled from "styled-components";

interface OrderItem {
  name: string;
  size: string;
  topping: string;
  qty: number;
  subtotal: number;
  isHighlighted?: boolean;
}

interface OrderDetail {
  id: string;
  customerName: string;
  phone: string;
  datetime: string;
  note: string;
  total: number;
  items: OrderItem[];
}

interface OrderDetailCardProps {
  order: OrderDetail;
  onClose: () => void;
  onComplete: () => void;
}

// const order: OrderDetail = {
//   id: "038",
//   customerName: "伊地知虹夏",
//   phone: "0988122707",
//   datetime: "2026/09/20 22:08",
//   note: "",
//   total: 515,
//   items: [
//     { name: "綠豆湯", size: "小", topping: "粉角", qty: 6, subtotal: 210 },
//     { name: "薏仁湯", size: "大", topping: "無", qty: 4, subtotal: 220 },
//     { name: "洛神花(瓶)", size: "大", topping: "無", qty: 1, subtotal: 75 },
//   ],
// };

export default function OrderDetailCard({
  order,
  onClose,
  onComplete,
}: OrderDetailCardProps) {
  return (
    <OrderContainer>
      {/* Title + Close */}
      <Header>
        <Title>訂單明細</Title>
        <CloseButton onClick={onClose} aria-label="關閉訂單明細">
          <CloseIcon viewBox="0 0 24 24" fill="none">
            <path
              d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
              fill="black"
            />
          </CloseIcon>
        </CloseButton>
      </Header>

      {/* Info fields */}
      <InfoSection>
        <InfoRow>
          <InfoLabel>訂單編號 :</InfoLabel>
          <InfoValue>{order.id}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>姓名 :</InfoLabel>
          <InfoValue>{order.customerName}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>電話 :</InfoLabel>
          <PhoneValue>{order.phone}</PhoneValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>時間 :</InfoLabel>
          <TimeValue>{order.datetime}</TimeValue>
        </InfoRow>
        <NotesLabel>備註 :</NotesLabel>
        <NoteContent>{order.note || ""}</NoteContent>
      </InfoSection>

      {/* Table header */}
      <TableSection>
        <TableHeader>
          <HeaderCell>
            <HeaderText>品項</HeaderText>
          </HeaderCell>
          <Divider />
          <HeaderCell>
            <HeaderText>容量</HeaderText>
          </HeaderCell>
          <Divider />
          <HeaderCell>
            <HeaderText>配料</HeaderText>
          </HeaderCell>
          <Divider />
          <HeaderCell>
            <HeaderText>數量</HeaderText>
          </HeaderCell>
          <Divider />
          <HeaderCell>
            <HeaderText>總價</HeaderText>
          </HeaderCell>
        </TableHeader>
        <TableBody>
          {order.items.map((item, index) => (
            <OrderItem
              key={index}
              name={item.name}
              size={item.size}
              topping={item.topping}
              qty={item.qty}
              subtotal={item.subtotal}
            />
          ))}
        </TableBody>
      </TableSection>

      {/* Total + Button */}
      <TotalSection>
        <TotalRow>
          <TotalLabel>總計 :</TotalLabel>
          <TotalAmount>${order.total}</TotalAmount>
        </TotalRow>
      </TotalSection>
      <ButtonSection>
        <CtaButton onClick={onComplete}>
          <ButtonText>完成訂單</ButtonText>
        </CtaButton>
      </ButtonSection>
    </OrderContainer>
  );
}

export const OrderItem: React.FC<OrderItem> = ({
  name,
  size,
  topping,
  qty,
  subtotal,
}) => {
  return (
    <ItemRow>
      <GreenLine />
      <ItemContent>
        <ItemNameCell>
          <ItemName>{name}</ItemName>
        </ItemNameCell>
        <SizeCell>
          <SizeText>{size}</SizeText>
        </SizeCell>
        <ToppingsCell>
          <ToppingsText>{topping}</ToppingsText>
        </ToppingsCell>
        <QuantityCell>
          <QuantityText>{qty}</QuantityText>
        </QuantityCell>
        <PriceCell>
          <PriceText>{subtotal}</PriceText>
        </PriceCell>
      </ItemContent>
    </ItemRow>
  );
};

const OrderContainer = styled.main`
  row-gap: 14px;
  grid-template-rows: repeat(5, fit-content(100%));
  grid-template-columns: repeat(1, fit-content(100%));
  border-radius: 20px;
  box-shadow:
    4px 4px 4px 0 rgba(0, 0, 0, 0.25) inset,
    -9px -8px 4px 0 rgba(0, 0, 0, 0.25) inset,
    8px 8px 4px 0 rgba(0, 0, 0, 0.25);
  overflow: hidden;
  font-family:
    SF Pro,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-weight: 590;
  background-color: var(--white-mid, #f7f7f7);
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Header = styled.header`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 40px 100px;
  font-size: 28px;
  color: rgba(0, 0, 0, 1);
  white-space: nowrap;
  justify-content: space-between;
  padding: 16px 16px 8px;
`;

const Title = styled.h1`
  align-self: stretch;
  margin: auto 0;
  font-size: 28px;
  font-weight: 590;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  align-self: stretch;
  margin: auto 0;
`;

const CloseIcon = styled.svg`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 24px;
  height: 24px;
  align-self: stretch;
  flex-shrink: 0;
  margin: auto 0;
`;

const InfoSection = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: start;
  color: rgba(0, 0, 0, 1);
  justify-content: start;
  padding: 0 20px;
`;

const InfoRow = styled.div`
  border-radius: 0px 0px 0px 0px;
  display: flex;
  align-items: stretch;
  gap: 8px;
  font-size: 16px;
  margin-top: 8px;

  &:first-child {
    margin-top: 0;
    width: 114px;
    max-width: 100%;
  }

  &:nth-child(2) {
    width: 130px;
    max-width: 100%;
  }

  &:nth-child(3) {
    width: 150px;
    max-width: 100%;
  }

  &:nth-child(4) {
    width: 159px;
    max-width: 100%;
  }
`;

const InfoLabel = styled.span`
  flex-grow: 1;
  font-size: 16px;
`;

const InfoValue = styled.span`
  font-size: 16px;
`;

const PhoneValue = styled.span`
  flex-grow: 1;
  flex-shrink: 1;
  width: 92px;
  font-size: 16px;
`;

const TimeValue = styled.time`
  font-size: 12px;
  flex-grow: 1;
  flex-shrink: 1;
  width: 101px;
  margin: auto 0;
`;
const NoteContent = styled.span`
  flex-grow: 1;
  flex-shrink: 1;
  width: 92px;
  font-size: 16px;
`;

const NotesLabel = styled.p`
  font-size: 16px;
  align-self: stretch;
  margin-top: 8px;
  margin-bottom: 0;
`;

const ItemRow = styled.div`
  background-color: rgba(227, 245, 219, 1);
  width: 100%;
  overflow: hidden;
`;

const GreenLine = styled.div`
  display: flex;
  min-height: 1px;
  width: 100%;
  background-color: var(--bg-primary, #289a19);
`;

const ItemContent = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: start;
  padding: 6px 0;
  box-shadow:
    4px 0px 4px 0 rgba(0, 0, 0, 0.25) inset,
    -9px 0px 4px 0 rgba(0, 0, 0, 0.25) inset;
`;

const ItemNameCell = styled.div`
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  flex-shrink: 1;
  flex-basis: 58px;
  margin: auto 0;
`;

const ItemName = styled.span`
  color: var(--text-gray-AAAA, #343434);
  align-self: stretch;
  flex: 1;
  flex-shrink: 1;
  flex-basis: 0%;
  margin: auto 0;
`;

const SizeCell = styled.div`
  align-self: stretch;
  flex: 1;
  flex-shrink: 1;
  flex-basis: 0%;
  margin: auto 0;
  padding: 0 27px;
`;

const SizeText = styled.span`
  color: var(--text-gray-AAAA, #343434);
`;

const ToppingsCell = styled.div`
  align-self: stretch;
  flex: 1;
  flex-shrink: 1;
  flex-basis: 0%;
  margin: auto 0;
  padding: 0 19px;
`;

const ToppingsText = styled.span`
  color: var(--text-gray-AAAA, #343434);
`;

const QuantityCell = styled.div`
  align-self: stretch;
  flex: 1;
  flex-shrink: 1;
  flex-basis: 0%;
  margin: auto 0;
  padding: 0 29px;
`;

const QuantityText = styled.span`
  color: var(--text-gray-AAAA, #343434);
`;

const PriceCell = styled.div`
  align-self: stretch;
  text-align: right;
  flex: 1;
  flex-shrink: 1;
  flex-basis: 28px;
  margin: auto 0;
  padding: 0 15px;
`;

const PriceText = styled.span`
  color: var(--text-gray-AAAA, #343434);
`;

const TableSection = styled.section`
  width: 100%;
  font-size: 16px;
  white-space: nowrap;
`;

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  color: rgba(0, 0, 0, 1);
  justify-content: start;
  padding: 6px 0;
`;

const HeaderCell = styled.div`
  align-self: stretch;
  flex: 1;
  flex-shrink: 1;
  flex-basis: 0%;
  margin: auto 0;
  padding: 0 18px;

  &:nth-child(5) {
    padding: 0 19px;
  }
`;

const HeaderText = styled.span`
  font-weight: 590;
`;

const Divider = styled.div`
  align-self: stretch;
  display: flex;
  width: 1px;
  flex-shrink: 0;
  height: 16px;
  background-color: var(--text-gray-AAA, #949494);
  margin: auto 0;
`;

const TableBody = styled.div`
  width: 100%;
  color: var(--text-gray-AAAA, #343434);
  text-align: center;
`;

const TotalSection = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: end;
  text-align: center;
  justify-content: start;
  padding: 0 16px;
`;

const TotalRow = styled.div`
  border-radius: 0px 0px 0px 0px;
  display: flex;
  width: 103px;
  max-width: 100%;
  align-items: stretch;
  gap: 4px;
`;

const TotalLabel = styled.span`
  color: rgba(0, 0, 0, 1);
  font-size: 16px;
  align-self: start;
  margin-top: 10px;
  flex-grow: 1;
`;

const TotalAmount = styled.span`
  color: rgba(9, 140, 2, 1);
  font-size: 24px;
  font-weight: 590;
`;

const ButtonSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: end;
  font-size: 16px;
  color: #f7f7f7;
  white-space: nowrap;
  text-align: center;
  justify-content: start;
  padding: 0 16px 16px;
`;

const CtaButton = styled.button`
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
  background-color: var(--bg-primary, #289a19);
  padding: 8px;
  border: none;
  cursor: pointer;
  font-family:
    SF Pro,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-weight: 590;

  &:hover {
    opacity: 1;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const ButtonText = styled.span`
  align-self: stretch;
  margin: auto 0;
  color: #f7f7f7;
  font-size: 16px;
`;
