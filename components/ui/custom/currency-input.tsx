"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronDown, Search } from "lucide-react";

const PAY_CURRENCIES = [
  {
    value: "ETH",
    label: "ETH",
    icon: "⟠",
    color: "bg-purple-100 text-purple-600",
  },
  {
    value: "BTC",
    label: "BTC",
    icon: "₿",
    color: "bg-orange-100 text-orange-600",
  },
  {
    value: "USDC",
    label: "USDC",
    icon: "○",
    color: "bg-blue-100 text-blue-600",
  },
] as const;

const RECEIVE_CURRENCIES = [
  {
    value: "USDT-CELO",
    label: "USDT - CELO",
    icon: "◉",
    color: "bg-yellow-100 text-yellow-600",
    description: "USDT stablecoin on the Celo blockchain",
  },
  {
    value: "USDT-TON",
    label: "USDT - TON",
    icon: "◆",
    color: "bg-blue-100 text-blue-600",
    description: "USDT on the TON (Telegram) blockchain",
  },
  {
    value: "USDT-BNB",
    label: "USDT - BNB",
    icon: "◇",
    color: "bg-orange-100 text-orange-600",
    description: "USDT on the Binance Smart Chain",
  },
] as const;

type PayCurrencyValue = (typeof PAY_CURRENCIES)[number]["value"];
type ReceiveCurrencyValue = (typeof RECEIVE_CURRENCIES)[number]["value"];
export type AllCurrencyValue = PayCurrencyValue | ReceiveCurrencyValue;

interface CurrencyInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  currency: AllCurrencyValue;
  onCurrencyChange: (currency: AllCurrencyValue) => void;
  type: "pay" | "receive";
  readOnly?: boolean;
}

export default function CurrencyInput({
  label,
  value,
  onChange,
  currency,
  onCurrencyChange,
  type,
  readOnly = false,
}: CurrencyInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const currencies = type === "pay" ? PAY_CURRENCIES : RECEIVE_CURRENCIES;
  const inputId = `${type}-amount`;
  // const selectId = `${type}-currency`;

  const selectedCurrency = currencies.find((c) => c.value === currency);

  const filteredCurrencies = currencies.filter((curr) =>
    curr.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="relative space-y-2 rounded-[30px] border border-gray-400 p-6">
      <Label htmlFor={inputId} className="text-base font-medium text-gray-500">
        {label}
      </Label>

      <div className="flex items-center justify-between">
        <Input
          id={inputId}
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="1.00"
          className="border-0 p-0 text-2xl! font-semibold shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
          readOnly={readOnly}
          aria-label={`${label} amount in ${currency}`}
          aria-readonly={readOnly}
        />

        <Button
          type="button"
          variant="outline"
          className="flex items-center gap-2 rounded-[20px] border border-gray-400 bg-gray-100! px-3 py-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label={`Select ${type} currency, currently ${selectedCurrency?.label}`}
        >
          {selectedCurrency && (
            <>
              <div
                className={`flex h-6 w-6 items-center justify-center rounded ${selectedCurrency.color}`}
                aria-hidden="true"
              >
                {selectedCurrency.icon}
              </div>
              <span className="text-sm font-medium">
                {selectedCurrency.label.split(" - ")[0]}
              </span>
            </>
          )}
          <ChevronDown
            className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </Button>
      </div>

      {isOpen && (
        <div className="absolute top-full right-0 z-10 mt-1 max-w-60 space-y-3 rounded-[20px] border border-gray-400 bg-white px-3 py-4">
          <div className="relative rounded-[20px] border border-gray-400 px-4 py-3">
            <Search
              className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
              aria-hidden="true"
            />
            <Input
              type="text"
              placeholder="Search"
              className="h-auto border-0 p-0 pl-8 shadow-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search currencies"
            />
          </div>

          <div
            className="space-y-2"
            role="listbox"
            aria-label={`${type} currency options`}
          >
            {filteredCurrencies.map((curr) => (
              <button
                key={curr.value}
                type="button"
                className="hover:bg-muted flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors"
                onClick={() => {
                  onCurrencyChange(curr.value);
                  setIsOpen(false);
                  setSearchQuery("");
                }}
                role="option"
                aria-selected={curr.value === currency}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded ${curr.color} shrink-0`}
                  aria-hidden="true"
                >
                  {curr.icon}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{curr.label}</div>
                  {"description" in curr && (
                    <div className="text-muted-foreground text-xs">
                      {/* {curr.description} */}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {readOnly && value && (
        <div
          className="sr-only"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          You will receive {value} {currency}
        </div>
      )}
    </div>
  );
}
