import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Overview = () => {
  return (
    <Card className="mt-8 bg-white">
        <CardHeader>
          <CardTitle className="">Event Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300">{"description"}</p>
        </CardContent>
      </Card>
  )
}

export default Overview
