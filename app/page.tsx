"use client";

import { tv } from "tailwind-variants";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";

const homePage = tv({
  slots: {
    base: "mx-auto max-w-160 pt-10 pb-9 font-sans",
    tabsList: "grid w-full grid-cols-3 rounded-full bg-gray-200",
    tabsTrigger:
      "data-[state=active]:bg-primary rounded-full border px-4 py-2 text-sm font-medium data-[state=active]:text-white",
  },
});

export default function Home() {
  const [activeTab, setActiveTab] = useState("crypto-to-cash");
  const { base, tabsList, tabsTrigger } = homePage();

  return (
    <div className={base()}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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

        <TabsContent value="crypto-to-cash" className="mt-6">
          <div className="rounded-lg bg-gray-300 p-4">
            <h2 className="text-primary text-center text-xl font-bold">
              Crypto to Cash
            </h2>
          </div>
        </TabsContent>

        <TabsContent value="cash-to-crypto" className="mt-6">
          <div className="rounded-lg bg-gray-300 p-4">
            <h2 className="text-primary text-center text-xl font-bold">
              Cash to Crypto
            </h2>
          </div>
        </TabsContent>

        <TabsContent value="crypto-to-fiat-loan" className="mt-6">
          <div className="rounded-lg bg-gray-300 p-4">
            <h2 className="text-primary text-center text-xl font-bold">
              Crypto to Fiat Loan
            </h2>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
