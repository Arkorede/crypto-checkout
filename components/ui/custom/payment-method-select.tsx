"use client";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface PaymentMethodSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const PAYMENT_METHODS = [
  { value: "metamask", label: "Metamask", icon: "🦊", color: "bg-orange-100" },
  {
    value: "rainbow",
    label: "Rainbow",
    icon: "🌈",
    color: "bg-linear-to-r from-red-100 to-purple-100",
  },
  {
    value: "walletconnect",
    label: "WalletConnect",
    icon: "🔗",
    color: "bg-blue-100",
  },
  {
    value: "other",
    label: "Other Crypto Wallets (Binance, Coinbase, Bybit etc)",
    icon: "💼",
    color: "bg-gray-100",
  },
];

export default function PaymentMethodSelect({
  label,
  value,
  onChange,
}: PaymentMethodSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectId = "payment-method";
  const selectedMethod = PAYMENT_METHODS.find((m) => m.value === value);

  return (
    <div className="relative space-y-2">
      <Label htmlFor={selectId} className="text-primary text-base font-medium">
        {label}
      </Label>

      <Button
        type="button"
        variant="outline"
        className="text-primary w-full cursor-pointer justify-between rounded-[30px] border border-gray-400 bg-transparent p-6! text-left text-base font-normal"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={
          selectedMethod
            ? `Selected payment method: ${selectedMethod.label}`
            : "Select a payment method"
        }
      >
        <span className={selectedMethod ? "" : ""}>
          {selectedMethod ? (
            <div className="flex items-center gap-3">
              <span className="text-lg" aria-hidden="true">
                {selectedMethod.icon}
              </span>
              <span>{selectedMethod.label}</span>
            </div>
          ) : (
            "Select an option"
          )}
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 left-0 z-10 mt-1 space-y-1 rounded-[20px] border border-gray-400 bg-white p-2 shadow-lg">
          <div role="listbox" aria-label="Payment method options">
            {PAYMENT_METHODS.map((method) => (
              <button
                key={method.value}
                type="button"
                className="hover:bg-gray-250 flex w-full items-center gap-3 rounded-xl p-3 text-left text-sm font-medium transition-colors"
                onClick={() => {
                  onChange(method.value);
                  setIsOpen(false);
                }}
                role="option"
                aria-selected={method.value === value}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded ${method.color}`}
                  aria-hidden="true"
                >
                  <span className="text-lg">{method.icon}</span>
                </div>
                <span className="text-sm">{method.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
