import Image from "next/image";

interface TradingNewsCardProps {
  name: string;
  description: string;
  imageSrc: string;
}

const TradingNewsCard = ({
  name,
  description,
  imageSrc,
}: TradingNewsCardProps) => (
  <div className="flex flex-col items-center p-4 rounded-lg">
    <div className="mb-4">
      <Image
        src={imageSrc}
        alt={name}
        width={1000}
        height={1000}
        objectFit="cover"
        className=""
      />
    </div>
    <div className="bg-white text-center p-3">
      <h3 className="text-xl font-bold mb-4">{name}</h3>
      <p className="text-center text-sm">{description}</p>
    </div>
  </div>
);

const TradingNewsComponent = () => {
  const tradeInfo = [
    {
      name: "Nazar",
      description:
        "Keep an eye on the happenings around you. Be it Politics, Sports, Entertainment and more.",
      imageSrc: "/assets/nazar.png",
    },
    {
      name: "Khabar",
      description:
        "Understand the news without the noise. Get to the crux of every matter and develop an opinion.",
      imageSrc: "/assets/khabar.png",
    },
    {
      name: "Jigar",
      description:
        "Have the courage to stand by your opinions about upcoming world events by investing in them.",
      imageSrc: "/assets/jigar.png",
    },
    {
      name: "Sabar",
      description:
        "Have the patience to negotiate market ups and downs, and take a decision as events unfold.",
      imageSrc: "/assets/sabar.png",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-5xl md:text-6xl font-bold text-center mb-8">
        <span className="text-purple-500">{'"'}</span>
        News that creates trading opportunity, everyday
        <span className="text-purple-500">{'"'}</span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tradeInfo.map((trade) => (
          <TradingNewsCard key={trade.name} {...trade} />
        ))}
      </div>
    </div>
  );
};

export default TradingNewsComponent;
