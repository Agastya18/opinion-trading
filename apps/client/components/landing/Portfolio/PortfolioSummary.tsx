interface PortfoliSummaryProps {
    returns: number;
    investment: number;
    todayReturns: number;
    rank: number;
  }
  
 export const PortfolioSummary = ({
    returns,
    investment,
    todayReturns,
    rank,
  }: PortfoliSummaryProps) => (
    <div className="bg-gray-200 p-6 rounded-lg mb-4">
      <h2 className="text-md font-semibold mb-2 text-gray-500">RETURNS</h2>
      <p className="text-3xl font-bold mb-4"> ₹{returns.toFixed(2)}</p>
      <div className="flex justify-between text-sm">
        <div>
          <p className="font-semibold">₹{investment}</p>
          <p className="text-gray-600">Investment</p>
        </div>
        <div>
          <p className="font-semibold">₹{todayReturns}</p>
          <p className="text-gray-600">Todays returns</p>
        </div>
        <div>
          <p className="font-semibold">{rank}</p>
          <p className="text-gray-600">Rank</p>
        </div>
      </div>
    </div>
  );