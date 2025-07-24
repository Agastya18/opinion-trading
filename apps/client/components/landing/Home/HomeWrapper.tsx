"use client"
import { HeroComp } from "@/components/landing/Home/HeroComp";
import ToggleSections from "@/components/landing/Home/ToogleSections";
import { TradeComp } from "@/components/landing/Home/TradeComp";
import { DownloadBanner } from "@/components/landing/Home/DownloadBanner";
import TradingNewsComponent from "@/components/landing/Home/TradingNewsComponent";
import FeatureComponent from "@/components/landing/Home/Features";
import ProboCare from "@/components/landing/Home/ProboCare";

export default function HomeWrapper() {
  return (
    <div className="w-screen">
      <main className="container mx-auto">
        <HeroComp />
      </main>
      <div >
        <ToggleSections />
      </div>
      <div>
        <TradeComp />
      </div>
      <div>
        <FeatureComponent />
      </div>
      <div>
        <ProboCare />
      </div>
      <div>
        <TradingNewsComponent />
      </div>
      <div>
        <DownloadBanner />
      </div>
    </div>
  );
}
