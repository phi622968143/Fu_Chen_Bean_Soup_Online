import React from "react";

interface OrderItem {
  name: string;
  size: string;
  topping: string;
  qty: number;
  subtotal: number;
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
    <div className="flex flex-col w-full bg-white rounded-2xl overflow-hidden shadow-2xl pb-6">
      {/* Title + Close */}
      <div className="relative px-6 pt-5 pb-3">
        <h2 className="text-[28px] font-bold text-black leading-normal">
          訂單明細
        </h2>
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-3 hover:opacity-60 transition-opacity"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
              fill="black"
            />
          </svg>
        </button>
      </div>

      {/* Info fields */}
      <div className="px-6 pb-5 flex flex-col gap-[10px]">
        <InfoRow label="訂單編號 :" value={order.id} />
        <InfoRow label="姓名 :" value={order.customerName} />
        <InfoRow label="電話 :" value={order.phone} />
        <InfoRow label="時間 :" value={order.datetime} />
        <InfoRow label="備註 :" value={order.note} />
      </div>

      {/* Table header */}
      <div className="flex items-center px-6 py-[7px]">
        <span className="w-[66px] text-[16px] font-bold text-black">品項</span>
        <span className="w-[66px] text-center text-[16px] font-bold text-black">
          容量
        </span>
        <span className="w-[66px] text-center text-[16px] font-bold text-black">
          配料
        </span>
        <span className="w-[66px] text-center text-[16px] font-bold text-black">
          數量
        </span>
        <span className="flex-1 text-right text-[16px] font-bold text-black">
          總價
        </span>
      </div>

      {/* Item rows — alternating #E3F5DB / white */}
      {order.items.map((item, i) => (
        <div
          key={i}
          className="flex items-center px-6 h-8"
          style={{ background: i % 2 === 0 ? "#E3F5DB" : "#FFFFFF" }}
        >
          <span className="w-[66px] text-[12px] font-bold text-black">
            {item.name}
          </span>
          <span className="w-[66px] text-center text-[12px] font-bold text-black">
            {item.size}
          </span>
          <span className="w-[66px] text-center text-[12px] font-bold text-black">
            {item.topping}
          </span>
          <span className="w-[66px] text-center text-[12px] font-bold text-black">
            {item.qty}
          </span>
          <span className="flex-1 text-right text-[12px] font-bold text-black">
            ${item.subtotal}
          </span>
        </div>
      ))}

      {/* Total + Button */}
      <div className="px-6 pt-5 pb-6">
        <div className="flex justify-end items-baseline gap-1 mb-4">
          <span className="text-[14px] font-bold text-black">總計：</span>
          <span className="text-[28px] font-bold" style={{ color: "#289A19" }}>
            ${order.total}
          </span>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onComplete}
            className="px-5 py-2 rounded-lg text-white text-[15px] font-bold hover:opacity-80 active:opacity-70 transition-opacity"
            style={{ background: "#289A19" }}
          >
            完成訂單
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-1">
      <span className="text-[12px] font-bold text-black whitespace-nowrap">
        {label}
      </span>
      <span className="text-[12px] font-bold text-black">{value}</span>
    </div>
  );
}
