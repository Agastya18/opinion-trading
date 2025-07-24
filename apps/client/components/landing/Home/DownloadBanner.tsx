import Image from "next/image";

export const DownloadBanner = () => {
  return (
    <div className="relative w-full bg-black text-center flex flex-col items-center justify-center pt-8 sm:py-12 md:py-16 lg:py-20 px-4 overflow-hidden">
      {/* Main Heading */}
      <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold max-w-3xl mx-auto leading-tight mb-4">
        What will be the return on your opinions?
      </h1>

      {/* Download Button */}
      <button className="mt-2 py-2 px-4 sm:px-6 border border-white rounded-full text-white text-sm sm:text-base md:text-lg flex items-center space-x-2 hover:bg-white hover:text-black transition duration-300 ease-in-out">
        <span>Download App</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-4 h-4 sm:w-5 sm:h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 12h14m-7-7l7 7-7 7"
          />
        </svg>
      </button>

      {/* Image Container */}
      <div className="w-full flex justify-between mt-4 sm:mt-6">
        {/* Left Image */}
        <Image
          src="/assets/downloadBanner1.png"
          alt="Person on the left"
          width={100}
          height={100}
          className="h-16 sm:h-20 md:h-24 lg:h-32 w-auto object-contain"
        />

        {/* Right Image */}
        <Image
          src="/assets/downloadBanner2.png"
          alt="Person on the right"
          width={100}
          height={100}
          className="h-16 sm:h-20 md:h-24 lg:h-32 w-auto object-contain"
        />
      </div>
    </div>
  );
};