"use client";

import Image from "next/image";
import Link from "next/link";

interface WalletCardsProps {
  icon: string;
  name: string;
  amount: number;
  btnName: string;
  btnOnClick: () => void;
  url:string;
}

const WalletCards = ({
  icon,
  name,
  url,
  amount,
  btnName,
  btnOnClick,
}: WalletCardsProps) => {
  return (
    <div className="bg-white rounded-md flex flex-col justify-center items-center p-5 gap-2 w-full sm:w-1/2">
      <Image src={icon} alt="" className="h-8 w-8" width={100} height={200} />
      <div className="">{name}</div>
      <div className="font-bold text-lg">₹ {amount}</div>
      <Link href={url}>
      <button
        onClick={btnOnClick}
        className="bg-black text-white px-10 sm:px-16 md:px-24 py-2 text-xs font-bold rounded-md"
      >
        {btnName}
      </button>
      </Link>
    </div>
  );
};

export default WalletCards;
