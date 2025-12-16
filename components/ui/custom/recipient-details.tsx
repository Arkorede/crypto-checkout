"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";

interface RecipientDetailsProps {
  onBack: () => void;
  onNext: (data: {
    bank: string;
    accountNumber: string;
    accountName: string;
  }) => void;
}

export default function RecipientDetails({
  onBack,
  onNext,
}: RecipientDetailsProps) {
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");

  const handleNext = () => {
    if (bank && accountNumber && accountName) {
      onNext({ bank, accountNumber, accountName });
    }
  };

  return (
    <div className="">
      <div className="">
        <div className="flex justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            aria-label="Go back to exchange form"
            className="cursor-pointer"
          >
            <ArrowLeft className="h-6 w-6" />
            <span className="sr-only">Back</span>
          </Button>
          <h2
            className="text-primary text-center text-xl font-semibold"
            id="recipient-heading"
          >
            Recipient details
          </h2>
          <div></div>
        </div>
      </div>
      <div className="space-y-6 pt-8">
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleNext();
          }}
          aria-labelledby="recipient-heading"
        >
          <div className="space-y-2">
            <Label
              htmlFor="bank"
              className="text-primary text-base font-medium"
            >
              Bank
            </Label>
            <Select value={bank} onValueChange={setBank} required>
              <SelectTrigger
                id="bank"
                className="h-auto! w-full cursor-pointer rounded-[30px] border border-gray-400 px-6! py-4!"
                aria-label="Select your bank"
                aria-required="true"
              >
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent className="mt-12 cursor-pointer border-0 bg-white font-sans">
                <SelectItem value="access">Access Bank</SelectItem>
                <SelectItem value="gtb">GTBank</SelectItem>
                <SelectItem value="first">First Bank</SelectItem>
                <SelectItem value="zenith">Zenith Bank</SelectItem>
                <SelectItem value="uba">UBA</SelectItem>
                <SelectItem value="fidelity">Fidelity Bank</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="account-number"
              className="text-primary text-base font-medium"
            >
              Account number
            </Label>
            <Input
              id="account-number"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Enter your account number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="h-auto w-full rounded-[30px] border! border-gray-400! px-6! py-4! outline-none! focus-visible:border-0 focus-visible:ring-0"
              required
              aria-required="true"
              aria-describedby="account-number-hint"
            />
            <span id="account-number-hint" className="sr-only">
              Enter your 10-digit bank account number
            </span>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="account-name"
              className="text-primary text-base font-medium"
            >
              Account name
            </Label>
            <Input
              id="account-name"
              type="text"
              placeholder="Enter your account name"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="h-auto w-full rounded-[30px] border! border-gray-400! px-6! py-4! outline-none! focus-visible:border-0 focus-visible:ring-0"
              required
              aria-required="true"
              aria-describedby="account-name-hint"
            />
          </div>

          <Button
            type="submit"
            className="bg-primary h-12 w-full cursor-pointer rounded-full text-base font-medium text-white hover:bg-[#0d3f46]"
            disabled={!bank || !accountNumber}
            aria-disabled={!bank || !accountNumber}
            aria-label="Proceed to next step with recipient details"
          >
            Next
          </Button>
        </form>
      </div>
    </div>
  );
}
