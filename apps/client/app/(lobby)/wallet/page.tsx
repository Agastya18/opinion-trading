"use client";

import WalletCards from "@/components/landing/Recharge/WalletCards";

const Page = () => {
  return (
    <div>
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-56 py-10">
        <div className="mb-10">
          <div>Total balance</div>
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold">₹0</div>
        </div>

        <div className="flex flex-col sm:flex-row gap-5">
          <WalletCards
            icon="/assets/wallet-deposit.png"
            name="Deposit"
            url="/wallet/deposit"
            amount={0}
            btnName="Recharge"
            btnOnClick={() => {}}
          />
          <WalletCards
            icon="/assets/wallet-withdraw.png"
            name="Withdraw"
            url="/wallet/withdraw"
            amount={0}
            btnName="Withdraw"
            btnOnClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
