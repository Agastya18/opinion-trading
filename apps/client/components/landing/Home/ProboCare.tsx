import React from 'react';
import { Globe, Filter, LogOut, Users } from 'lucide-react';

interface FeatureCardProps {
    Icon: any;
    title: string;
    description: string;
    }

const FeatureCard = ({ Icon, title, description }: FeatureCardProps) => (
  <div className="flex flex-col">
    <Icon className="w-12 h-12 text-purple-500 mb-4" />
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const ProboCare = () => {
  const features = [
    {
      icon: Globe,
      title: "Fastest news feed in the game",
      description: "Probo is all about understanding the world around us and benefitting from our knowledge. Everything on Probo is based on real events that you can learn about, verify and follow yourself."
    },
    {
      icon: Filter,
      title: "All the news without the noise",
      description: "Our experts go through tons of information to get to the very core of a world event. They help you develop not only an opinion about events but also a better understanding of the world around us."
    },
    {
      icon: LogOut,
      title: "The power to exit trades, anytime",
      description: "Probo is an opinion trading platform. And, like a true trading platform, Probo gives you the power to exit. You can withdraw from a trade, if it's not going in the direction you thought it will go."
    },
    {
      icon: Users,
      title: "The pulse of society is on Probo",
      description: "Besides helping you learn important financial & trading skills, Probo also helps you understand the collective thoughts of Indians. Knowledge that is crucial for the betterment of our country."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-6xl font-bold mb-16">
        Probo takes care of you,<br />so you take care of your trades.
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            Icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};

export default ProboCare;