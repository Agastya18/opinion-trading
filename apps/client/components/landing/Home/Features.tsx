import Image from "next/image";

interface FeatureCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  isWide?: boolean;
}

const FeatureCard = ({
  title,
  description,
  imageSrc,
  imageAlt,
  isWide = false,
}: FeatureCardProps) => (
  <div
    className={`bg-gray-900 rounded-lg p-4 md:p-6 flex flex-col justify-between ${
      isWide ? "md:col-span-2" : ""
    }`}
  >
    <div className="flex flex-col justify-between">
      <h3 className="text-xl md:text-3xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300 mb-4 text-sm md:text-base">{description}</p>
    </div>
    <div className="mt-4 text-right flex flex-col items-end">
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={100}
        height={100}
        className="rounded-md object-cover"
      />
      <a href="#" className="text-white mt-4 text-sm md:text-base inline-block">
        Read more →
      </a>
    </div>
  </div>
);

const FeatureComponent = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Title Section */}
        <div className="md:col-span-1 bg-white p-6 md:p-10 flex flex-col justify-between h-full">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">What's new in Probo?</h2>
          <div className="text-3xl md:text-5xl text-right">→</div>
        </div>

        {/* Feature Cards */}
        <FeatureCard
          title="Probo Cares"
          description="Be it loss protection or data security, Probo is user first always. Check out the latest on responsible trading."
          imageSrc="/assets/probo-cares.png"
          imageAlt="Probo Cares"
        />

        <FeatureCard
          title="Exiting trades is your choice"
          description="The 'Exit' feature gives the user an opportunity to exit from the current trade and helps in controlling your losses and maximising the profit."
          imageSrc="/assets/exciting-trades.png"
          imageAlt="Exiting trades"
        />

        <FeatureCard
          title="Market Orders and Instant Exit"
          description="Market orders are a fast and reliable method to buy or exit a trade in a fast-moving market. With market orders, quantities are matched almost instantly after placing an order at the best available price. Come test drive."
          imageSrc="/assets/market-orders.png"
          imageAlt="Market Orders"
          isWide={true}
        />

        <FeatureCard
          title="The Power of Prediction Markets"
          description="Check out case studies, research articles and the utility of Probo events"
          imageSrc="/assets/prediction-markets.png"
          imageAlt="Prediction Markets"
        />
      </div>
    </div>
  );
};

export default FeatureComponent;
