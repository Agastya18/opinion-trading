import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Orderbook = () => {
  const getBarWidth = (quantity: number, maxQuantity: number) => {
    return `${Math.min((quantity / maxQuantity) * 100, 100)}%`;
  };

  return (
    <Card className="md:col-span-2 bg-white">
      <CardHeader>
        <CardTitle>Order Book</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-b ">
              <TableHead className=" font-sans">PRICE</TableHead>
              <TableHead className=" font-sans">QTY AT YES</TableHead>
              <TableHead className=" font-sans">PRICE</TableHead>
              <TableHead className=" font-sans">QTY AT NO</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow key={Date.now()} className="border-b border-gray-800">
              <TableCell className="text-blue-500 font-semibold">
                {"yesPrice"}
              </TableCell>
              <TableCell className="p-0">
                <div className="relative h-full w-full">
                  <div
                    className="absolute top-0 left-0 h-full bg-blue-700 opacity-20"
                    style={{
                      width: getBarWidth(1, 10),
                    }}
                  ></div>
                  <div className="relative p-4 text-blue-500">{1}</div>
                </div>
              </TableCell>
              <TableCell className="text-red-500 font-semibold">
                {"noPrice"}
              </TableCell>
              <TableCell className="p-0">
                <div className="relative h-full w-full">
                  <div
                    className="absolute top-0 left-0 h-full bg-red-700 opacity-20"
                    style={{
                      width: getBarWidth(1, 10),
                    }}
                  ></div>
                  <div className="relative p-4 text-red-500">{1}</div>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Orderbook;
