"use client";
import CurrencyInput from "./currency-input";
import PaymentMethodSelect from "./payment-method-select";
import RecipientDetails from "./recipient-details";
import { Button } from "@/components/ui/button";
import type { AllCurrencyValue } from "./currency-input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tv } from "tailwind-variants";
import { useState } from "react";

const tabsStyles = tv({
  slots: {
    tabsList:
      "mx-auto grid w-[90%] max-w-98 grid-cols-3 rounded-full bg-gray-200",
    tabsTrigger:
      "data-[state=active]:bg-primary rounded-full border px-2 py-2 text-xs font-medium data-[state=active]:text-white sm:px-4 sm:text-sm",
  },
});

const CONVERSION_RATES: Record<string, Record<string, number>> = {
  ETH: {
    "USDT-CELO": 3000,
    "USDT-TON": 3000,
    "USDT-BNB": 3000,
  },
  BTC: {
    "USDT-CELO": 45000,
    "USDT-TON": 45000,
    "USDT-BNB": 45000,
  },
  USDC: {
    "USDT-CELO": 1,
    "USDT-TON": 1,
    "USDT-BNB": 1,
  },
};

export default function CryptoCashExchangeForm() {
  const [step, setStep] = useState<"exchange" | "recipient">("exchange");
  const [youPayAmount, setYouPayAmount] = useState("");
  const [youReceiveAmount, setYouReceiveAmount] = useState("");
  const [payCurrency, setPayCurrency] = useState<AllCurrencyValue>("ETH");
  const [receiveCurrency, setReceiveCurrency] =
    useState<AllCurrencyValue>("USDT-CELO");
  const [payToMethod, setPayToMethod] = useState("");
  const [payFromMethod, setPayFromMethod] = useState("");

  const [activeTab, setActiveTab] = useState("crypto-to-cash");
  const { tabsList, tabsTrigger } = tabsStyles();

  const handlePayAmountChange = (value: string) => {
    setYouPayAmount(value);

    if (value === "" || isNaN(Number(value))) {
      setYouReceiveAmount("");
      return;
    }

    const numValue = Number.parseFloat(value);
    const rate = CONVERSION_RATES[payCurrency][receiveCurrency];
    const converted = numValue * rate;
    setYouReceiveAmount(converted.toFixed(2));
  };

  const handlePayCurrencyChange = (currency: AllCurrencyValue) => {
    setPayCurrency(currency);
    if (youPayAmount) {
      const numValue = Number.parseFloat(youPayAmount);
      const rate = CONVERSION_RATES[currency][receiveCurrency];
      const converted = numValue * rate;
      setYouReceiveAmount(converted.toFixed(2));
    }
  };

  const handleReceiveCurrencyChange = (currency: AllCurrencyValue) => {
    setReceiveCurrency(currency);
    if (youPayAmount) {
      const numValue = Number.parseFloat(youPayAmount);
      const rate = CONVERSION_RATES[payCurrency][currency];
      const converted = numValue * rate;
      setYouReceiveAmount(converted.toFixed(2));
    }
  };

  const handleConvert = () => {
    setStep("recipient");
  };

  const handleBack = () => {
    setStep("exchange");
  };

  const handleComplete = (data: {
    bank: string;
    accountNumber: string;
    accountName: string;
  }) => {
    alert(
      JSON.stringify({
        youPayAmount,
        payCurrency,
        youReceiveAmount,
        receiveCurrency,
        payToMethod,
        payFromMethod,
        ...data,
      }),
    );
  };

  if (step === "recipient") {
    return <RecipientDetails onBack={handleBack} onNext={handleComplete} />;
  }

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="">
        <TabsList className={tabsList()}>
          <TabsTrigger value="crypto-to-cash" className={tabsTrigger()}>
            Crypto to cash
          </TabsTrigger>
          <TabsTrigger value="cash-to-crypto" className={tabsTrigger()}>
            Cash to crypto
          </TabsTrigger>
          <TabsTrigger value="crypto-to-fiat-loan" className={tabsTrigger()}>
            Crypto to fiat loan
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="space-y-6 p-6">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleConvert();
          }}
          aria-label="Cryptocurrency exchange form"
        >
          <CurrencyInput
            label="You pay"
            value={youPayAmount}
            onChange={handlePayAmountChange}
            currency={payCurrency}
            onCurrencyChange={handlePayCurrencyChange}
            type="pay"
          />
          <CurrencyInput
            label="You receive"
            value={youReceiveAmount}
            onChange={setYouReceiveAmount}
            currency={receiveCurrency}
            onCurrencyChange={handleReceiveCurrencyChange}
            type="receive"
            readOnly
          />
          <PaymentMethodSelect
            label="Pay from"
            value={payFromMethod}
            onChange={setPayFromMethod}
          />
          <PaymentMethodSelect
            label="Pay to"
            value={payToMethod}
            onChange={setPayToMethod}
          />
          <Button
            type="submit"
            className="bg-primary h-12 w-full cursor-pointer rounded-full text-base font-medium text-white hover:bg-[#0d3f46]"
            disabled={!youPayAmount || !payFromMethod || !payToMethod}
            aria-disabled={!youPayAmount || !payFromMethod || !payToMethod}
            aria-label="Proceed to convert cryptocurrency"
          >
            Convert now
          </Button>
        </form>
      </div>
    </div>
  );
}
