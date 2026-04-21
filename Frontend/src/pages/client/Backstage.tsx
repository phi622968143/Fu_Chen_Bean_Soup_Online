import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import OrderDetailCard from "../../components/ui/OrderDetail";
import styled from "styled-components";
import { NavigationTabs } from "../../components/ui/navigation/NavigationTabs";

interface OrderItem {
  name: string;
  size: string;
  topping: string;
  qty: number;
  subtotal: number;
}

interface Order {
  id: string;
  customerName: string;
  phone: string;
  datetime: string;
  note: string;
  total: number;
  items: OrderItem[];
  completed: boolean;
}

const INITIAL_ORDERS: Order[] = [
  {
    id: "038",
    customerName: "伊地知虹夏",
    phone: "0988122707",
    datetime: "2026/09/20 22:08",
    note: "",
    total: 515,
    items: [
      { name: "綠豆湯", size: "小", topping: "無", qty: 6, subtotal: 210 },
      { name: "薏仁湯", size: "大", topping: "無", qty: 4, subtotal: 220 },
      { name: "洛神花(瓶)", size: "大", topping: "無", qty: 1, subtotal: 75 },
    ],
    completed: false,
  },
  {
    id: "039",
    customerName: "平澤憂",
    phone: "0918041005",
    datetime: "2026/09/20 22:11",
    note: "",
    total: 230,
    items: [
      { name: "薏仁湯", size: "小", topping: "粉角", qty: 4, subtotal: 160 },
      { name: "綠豆汁", size: "大", topping: "無", qty: 2, subtotal: 70 },
    ],
    completed: false,
  },
  {
    id: "040",
    customerName: "千早愛音",
    phone: "0920430515",
    datetime: "2026/09/20 22:16",
    note: "",
    total: 830,
    items: [
      { name: "杏仁茶", size: "小", topping: "無", qty: 6, subtotal: 240 },
      { name: "三色豆花", size: "大", topping: "無", qty: 7, subtotal: 420 },
      { name: "雪花冰", size: "小", topping: "布丁", qty: 1, subtotal: 70 },
    ],
    completed: false,
  },
  {
    id: "041",
    customerName: "後藤一里",
    phone: "0966242830",
    datetime: "2026/09/20 22:30",
    note: "",
    total: 60,
    items: [
      { name: "三色豆花", size: "大", topping: "無", qty: 1, subtotal: 60 },
    ],
    completed: false,
  },
];

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}/${m}/${d}`;
}

function parseDate(str: string): Date {
  const [y, m, d] = str.split("/").map(Number);
  return new Date(y, m - 1, d);
}

export default function Backstage() {
  const [dateStr, setDateStr] = useState("2026/09/20");
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const toggleCompleted = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, completed: !o.completed } : o)),
    );
    if (selectedOrder?.id === id) {
      setSelectedOrder((prev) =>
        prev ? { ...prev, completed: !prev.completed } : null,
      );
    }
  };

  const goToPrevDay = () => {
    const d = parseDate(dateStr);
    d.setDate(d.getDate() - 1);
    setDateStr(formatDate(d));
  };

  const goToNextDay = () => {
    const d = parseDate(dateStr);
    d.setDate(d.getDate() + 1);
    setDateStr(formatDate(d));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-lg mx-auto min-h-screen flex flex-col">
        <div className="items-center px-6">
          <div className="items-start w-full">
            <NavigationTabs />
          </div>

          <div className="flex w-full bg-neutral-400 min-h-px" />
          <div className="items-start w-full">
            {/* Header */}
            <div className="pt-2 pb-2">
              <h1 className="text-[32px] font-bold text-black leading-tight">
                所有訂單
              </h1>
            </div>

            {/* Date Navigation */}
            <div className="pt-4 pb-2 flex items-center gap-1.5">
              <button
                onClick={goToPrevDay}
                className="text-black hover:opacity-50 transition-opacity cursor-pointer"
                aria-label="Previous day"
              >
                <ChevronLeft size={20} strokeWidth={2.5} />
              </button>
              <span className="text-[22px] font-bold text-black">
                {dateStr}
              </span>
              <button
                onClick={goToNextDay}
                className="text-black hover:opacity-50 transition-opacity cursor-pointer"
                aria-label="Next day"
              >
                <ChevronRight size={20} strokeWidth={2.5} />
              </button>
            </div>

            {/* Order Count */}
            <div className="pt-4 pb-6">
              <span className="text-[19px] font-bold text-black">
                訂單({orders.length})
              </span>
            </div>

            <div className="flex w-full justify-center bg-neutral-400 min-h-px" />

            <div className="items-start w-full">
              {/* Column Headers */}
              <div className="flex items-center flex-row border-b border-neutral-200">
                <span className="w-[52px] text-center text-[18px] font-bold text-black shrink-0">
                  編號
                </span>
                <div className="flex h-9 bg-neutral-400 min-w-px" />
                <span className="w-[113px] text-center text-[18px] font-bold text-black shrink-0">
                  電話
                </span>
                <div className="flex h-9 bg-neutral-400 min-w-px" />
                <span className="w-[52px] text-center text-[18px] font-bold text-black shrink-0">
                  時間
                </span>
                <div className="flex h-9 bg-neutral-400 min-w-px" />
                <span className="w-[52px] text-center text-[18px] font-bold text-black shrink-0">
                  總價
                </span>
                <div className="flex h-9 bg-neutral-400 min-w-px" />
                <span className="w-[44px] text-center text-[18px] font-bold text-black shrink-0">
                  完成
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="items-center px-6">
          {/* Order Rows */}
          <div className="flex-1 m-1">
            {orders.map((order) => (
              <OrderRow
                key={order.id}
                order={order}
                onToggle={(e) => toggleCompleted(order.id, e)}
                onClick={() => setSelectedOrder(order)}
              />
            ))}
          </div>
        </div>

        {/* Detail Drawer */}
        {selectedOrder && (
          <OrderDetailDrawer
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
            onToggle={(e) => toggleCompleted(selectedOrder.id, e)}
          />
        )}
      </div>
    </div>
  );
}

function OrderRow({
  order,
  onToggle,
  onClick,
}: {
  order: Order;
  onToggle: (e: React.MouseEvent) => void;
  onClick: () => void;
}) {
  const displayTime = order.datetime.slice(11);
  return (
    <div
      onClick={onClick}
      className="flex items-center flex-row border-b border-neutral-200 w-full hover:bg-gray-50 transition-colors"
    >
      {/* 1. ID 欄位 */}
      <div className="flex flex-col items-center justify-center px-2 py-3 w-[52px] shrink-0">
        <span className="text-center w-full font-bold">{order.id}</span>
      </div>

      {/* 2. 電話欄位 */}
      <div className="flex flex-col items-center justify-center px-2.5 py-3 w-[113px] shrink-0 text-xs">
        <span className="text-center w-full font-bold">{order.phone}</span>
      </div>

      {/* 3. 時間欄位 */}
      <div className="flex flex-col items-center justify-center px-2.5 py-3 w-[52px] shrink-0">
        <span className="text-center w-full font-bold">{displayTime}</span>
      </div>

      {/* 4. 金額欄位 */}
      <div className="flex flex-col items-center justify-center px-3.5 py-3 w-[52px] shrink-0 text-base font-bold text-[#289A19]">
        <span className="text-center w-full font-bold">${order.total}</span>
      </div>

      {/* 5. 勾選按鈕 */}
      <div className="flex items-center justify-center px-1.5 py-3 w-[44px] shrink-0">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation(); // 防止觸發整列點擊
            onToggle(e);
          }}
          className="w-5 h-5 flex items-center justify-center"
        >
          {order.completed ? <CheckedIcon /> : <UncheckedIcon />}
        </button>
      </div>
    </div>
  );
}

function OrderDetailDrawer({
  order,
  onClose,
  onToggle,
}: {
  order: Order;
  onClose: () => void;
  onToggle: (e: React.MouseEvent) => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" // 背景壓黑 50%
      onClick={onClose} // 點擊背景任何地方關閉卡片
    >
      <div
        className="w-full rounded-2xl max-w-[345px] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <OrderDetailCard order={order} onClose={onClose}></OrderDetailCard>
      </div>
    </div>
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
