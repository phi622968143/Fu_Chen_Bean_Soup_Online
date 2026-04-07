"use client";
import * as React from "react";

interface FormFieldProps {
  label: string;
  type?: "text" | "textarea";
  className?: string;
}

export function PaymentForm() {
  const handleClose = () => {
    // Handle close action
    console.log("Close button clicked");
  };

  const handleCheckout = () => {
    // Handle checkout action
    console.log("Checkout button clicked");
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
      />
      <div className="flex justify-center items-start p-4 w-full bg-white min-h-[screen]">
        <main className="relative w-full bg-white rounded-lg max-w-[345px]">
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold leading-7 text-black">
              填寫付款資訊
            </h1>
            <button
              className="flex justify-center items-center w-6 h-6 bg-gray-300 rounded cursor-pointer border-[nonepx]"
              onClick={handleClose}
              aria-label="關閉"
            >
              <i className="ti ti-x text-base text-gray-500" />
            </button>
          </header>

          <section className="flex flex-col gap-4">
            <FormField label="姓名" type="text" />
            <FormField label="電話" type="text" />
            <FormField label="備註" type="textarea" />
          </section>
          <footer className="flex justify-between items-center mt-6">
            <div className="flex gap-1 items-center">
              <span className="text-base leading-6 text-black">金額:</span>
              <span className="text-2xl font-bold leading-8 text-green-400">
                $350
              </span>
            </div>
            <button
              className="flex gap-2 justify-center items-center px-5 py-3 text-sm font-medium leading-5 text-white bg-lime-800 rounded-md cursor-pointer border-[nonepx]"
              onClick={handleCheckout}
            >
              <i className="ti ti-copy text-lg" />
              去結帳
            </button>
          </footer>
        </main>
      </div>
    </>
  );
}

export default PaymentForm;

export function FormField({
  label,
  type = "text",
  className = "",
}: FormFieldProps) {
  const baseInputClasses =
    "px-4 py-3 w-full text-sm bg-white rounded-lg border-2 border-black";

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm leading-5 text-black">{label}</label>
      {type === "textarea" ? (
        <textarea
          className={`${baseInputClasses} resize-none h-[140px] ${className}`}
        />
      ) : (
        <input
          type={type}
          className={`${baseInputClasses} h-12 ${className}`}
        />
      )}
    </div>
  );
}
