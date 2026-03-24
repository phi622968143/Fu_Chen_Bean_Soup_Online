import { useState } from "react";
import { ChevronLeft, ChevronRight, X, Phone } from "lucide-react";

interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

interface Order {
  id: string;
  phone: string;
  time: string;
  total: number;
  completed: boolean;
}

const INITIAL_ORDERS: Order[] = [
  {
    id: "038",
    phone: "0988122707",
    time: "22:08",
    total: 515,
    completed: false,
  },
  {
    id: "039",
    phone: "0918041005",
    time: "22:11",
    total: 230,
    completed: false,
  },
  {
    id: "040",
    phone: "0920430515",
    time: "22:16",
    total: 830,
    completed: false,
  },
  {
    id: "041",
    phone: "0966242830",
    time: "22:30",
    total: 60,
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
        {order.time}
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
    <>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 z-10" onClick={onClose} />
      {/* Drawer */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl z-20 shadow-2xl">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>

        <div className="px-6 pb-10">
          {/* Header row */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <span className="text-[26px] font-bold text-black">
                訂單 #{order.id}
              </span>
              <span className="ml-3 text-base text-gray-500">{order.time}</span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600"
            >
              <X size={16} />
            </button>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2 mb-4">
            <Phone size={15} className="text-gray-400" />
            <span className="text-[15px] text-gray-700 font-medium">
              {order.phone}
            </span>
          </div>

          {/* Address */}
          <p className="text-[13px] text-gray-500 mb-5 leading-relaxed">
            {order.address}
          </p>

          {/* Items */}
          <div className="border-t border-gray-100 pt-4 mb-5">
            <div className="space-y-3">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-[15px] text-black font-medium">
                    {item.name}
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="text-[14px] text-gray-500">
                      x{item.qty}
                    </span>
                    <span className="text-[15px] font-semibold text-black w-16 text-right">
                      ${item.price * item.qty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-gray-100 pt-4 flex items-center justify-between mb-6">
            <span className="text-[17px] font-bold text-black">總計</span>
            <span
              className="text-[20px] font-bold"
              style={{ color: "#289A19" }}
            >
              ${order.total}
            </span>
          </div>

          {/* Complete button */}
          <button
            onClick={onToggle}
            className={`w-full py-3.5 rounded-xl text-[16px] font-bold transition-colors ${
              order.completed
                ? "bg-gray-100 text-gray-600"
                : "bg-black text-white active:bg-gray-800"
            }`}
          >
            {order.completed ? "取消完成" : "標記完成"}
          </button>
        </div>
      </div>
    </>
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
