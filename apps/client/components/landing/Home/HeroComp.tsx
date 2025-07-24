import { BlackBtn } from "@/components/ui/BlackBtn";
import { WhiteBtn } from "@/components/ui/WhiteBtn";
import Image from "next/image";
import { FaSquareCheck } from "react-icons/fa6";

export const HeroComp = () => {
  return (
    <div className="flex flex-col p-5 md:flex-row items-center justify-between py-8 md:py-12 lg:py-16">
      <div className="w-full md:w-1/2 mb-8 md:mb-0">
        {/* Text */}
        <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-semibold mb-2">
          Invest in your
        </h1>
        <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl mb-3">
          point of view
        </h2>
        <p className="text-lg sm:text-xl md:text-xl lg:text-2xl mb-6">
          Sports, Entertainment, Economy or Finance.
        </p>

        {/* Buttons */}
        <div className="flex space-x-4 mb-4">
          <WhiteBtn text="Download App" />
          <BlackBtn text="Trade Online" />
        </div>

        {/* Disclaimer */}
        <div className="flex items-center gap-2">
          <FaSquareCheck className="text-lg" />
          <span className="text-xs sm:text-sm">For 18 years and above only</span>
        </div>
      </div>

      {/* Hero Image */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-end">
        <Image
          src="/assets/hero.png"
          width={600}
          height={600}
          alt="hero"
          className="w-full max-w-md md:max-w-lg lg:max-w-xl object-contain"
        />
      </div>
    </div>
  );
};