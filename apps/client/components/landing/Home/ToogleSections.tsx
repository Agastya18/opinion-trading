"use client";

import { useState } from "react";

type Section = "samachar" | "vichaar" | "vyapaar";

const ToggleSections = () => {
  const [activeSection, setActiveSection] = useState<Section>("samachar");

  const sections: Record<Section, { title: string; description: string }> = {
    samachar: {
      title: "Be in the know",
      description:
        "From Sports to Entertainment, Economy, Finance and more. Keep an eye on events in your field of interest.",
    },
    vichaar: {
      title: "Use what you know",
      description:
        "Build your knowledge and form your opinions and views about upcoming events in the world.",
    },
    vyapaar: {
      title: "Trade and grow",
      description:
        "Invest in your opinions about future events and use your knowledge to trade & benefit.",
    },
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between p-28 py-20 bg-black text-white">
      <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
        {/* Toggle buttons */}
        <div className="flex space-x-4 mb-6">
          {Object.keys(sections).map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section as Section)}
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl ${
                activeSection === section ? "font-bold" : "text-gray-400"
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>

        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          {sections[activeSection].title}
        </h2>

        {/* Section Description */}
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
          {sections[activeSection].description}
        </p>
      </div>

      {/* Video Section */}
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-end lg:mr-32 md:mr-10">
        <div className="relative w-64 h-128 bg-white rounded-3xl overflow-hidden">
          <video
            src={`/assets/${activeSection}-screen.mp4`}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          ></video>
        </div>
      </div>
    </div>
  );
};

export default ToggleSections;
