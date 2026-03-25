import { useState } from "react";
import { ChevronLeft, ChevronRight, X, Phone } from "lucide-react";
import OrderDetailCard from "../../components/ui/OrderDetail";

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
      <div className="max-w-lg mx-auto min-h-screen flex flex-col relative">
        {/* Header */}
        <div className="px-6 pt-10 pb-2">
          <h1 className="text-[32px] font-bold text-black leading-tight">
            所有訂單
          </h1>
        </div>

        {/* Date Navigation */}
        <div className="px-5 pt-4 pb-1 flex items-center gap-1.5">
          <button
            onClick={goToPrevDay}
            className="text-black hover:opacity-50 transition-opacity"
            aria-label="Previous day"
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>
          <span className="text-[22px] font-bold text-black">{dateStr}</span>
          <button
            onClick={goToNextDay}
            className="text-black hover:opacity-50 transition-opacity"
            aria-label="Next day"
          >
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Order Count */}
        <div className="px-4 pt-4 pb-1">
          <span className="text-[19px] font-bold text-black">
            訂單({orders.length + 199})
          </span>
        </div>

        {/* Table */}
        <div className="flex-1 px-4 mt-1">
          {/* Column Headers */}
          <div className="flex items-center py-2.5">
            <span className="w-[52px] text-center text-[18px] font-bold text-black shrink-0">
              編號
            </span>
            <span className="flex-1 text-center text-[18px] font-bold text-black">
              電話
            </span>
            <span className="w-[52px] text-center text-[18px] font-bold text-black shrink-0">
              時間
            </span>
            <span className="w-[52px] text-right text-[18px] font-bold text-black shrink-0">
              總價
            </span>
            <span className="w-[44px] text-center text-[18px] font-bold text-black shrink-0">
              完成
            </span>
          </div>

          {/* Order Rows */}
          <div>
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
    <button
      onClick={onClick}
      className="w-full flex items-center py-3 text-left active:bg-gray-50 transition-colors rounded-lg -mx-1 px-1"
    >
      <span className="w-[52px] text-center text-[18px] font-bold text-black shrink-0">
        {order.id}
      </span>
      <span className="flex-1 text-center text-[14px] font-semibold text-black">
        {order.phone}
      </span>
      <span className="w-[52px] text-center text-[14px] font-semibold text-black shrink-0">
        {displayTime}
      </span>
      <span
        className="w-[52px] text-right text-[18px] font-bold shrink-0"
        style={{ color: "#289A19" }}
      >
        ${order.total}
      </span>
      <div className="w-[44px] flex justify-center shrink-0">
        <span
          role="button"
          onClick={onToggle}
          className="w-6 h-6 flex items-center justify-center"
        >
          {order.completed ? <CheckedIcon /> : <UncheckedIcon />}
        </span>
      </div>
    </button>
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
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} // 背景壓黑 50%
      onClick={onClose} // 點擊背景任何地方關閉卡片
    >
      <div
        className="max-w-md bg-white rounded-2xl overflow-hidden shadow-xl"
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
      <rect x="5" y="5" width="14" height="14" rx="1" fill="black" />
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
