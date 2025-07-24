import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LineChart from "@/components/ui/line-chart";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";

const ProbabilityChart = () => {
  const [showYesData, setShowYesData] = useState<boolean>(true);

  return (
    <Card className="mt-8 bg-white md:w-[66%]">
      <CardHeader>
        <CardTitle className=" flex items-center justify-between">
          Probability Chart
          <Button
            onClick={() => setShowYesData(!showYesData)}
            className={`text-white
            ${
              showYesData
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            <ArrowUpDown className="mr-2 h-4 w-4" />
            {showYesData ? "Show No Data" : "Show Yes Data"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <LineChart
          labels={["timeSeries"]}
          data={showYesData ? [10] : [90]}
          borderColor={
            showYesData ? "rgba(59, 130, 246, 1)" : "rgba(220, 38, 38, 1)"
          }
        />
      </CardContent>
    </Card>
  );
};

export default ProbabilityChart;
