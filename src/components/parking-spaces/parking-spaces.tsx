import { useParkingSpaces } from "~/hooks/use-parking-spaces";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { ChartConfig, ChartContainer } from "~/components/ui/chart";
import { FC, useMemo } from "react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import { ParkingSpaceRowDto } from "~/types/parking-space";

export const ParkingSpaces = () => {
  const { data: parkingSpaces, isLoading: isParkingSpacesLoading } =
    useParkingSpaces();

  if (isParkingSpacesLoading || !parkingSpaces) {
    return <div>Loading</div>;
  }

  return (
    <Card className="grid gap-4 md:grid-cols-3">
      {parkingSpaces.map((space) => (
        <div key={space.parkingSpaceId}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {getLabel(space.vehicleType)}
            </CardTitle>
            <Badge variant={space.isOccupied ? "destructive" : "success"}>
              {space.isOccupied ? "Full" : "Available"}
            </Badge>
          </CardHeader>
          <CardContent>
            <Chart parkingSpace={space} />
          </CardContent>
        </div>
      ))}
    </Card>
  );
};

interface Props {
  parkingSpace: ParkingSpaceRowDto;
}

// TODO: Move this to a utility function
const getLabel = (vehicleType: string | null) => {
  switch (vehicleType) {
    case "MOTOR":
      return "Visitors Motorcycles";
    case "CAR":
      return "Visitors Cars";
    default:
      return "Residents";
  }
};
const Chart: FC<Props> = ({ parkingSpace }) => {
  const chartData = useMemo(() => {
    return [
      {
        name: "Occupied",
        value: Math.abs(parkingSpace.occupancy),
        fill: "#FF4560",
      },
    ];
  }, [parkingSpace]);

  const totalSpaces = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, [chartData]);

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[150px]"
    >
      <RadialBarChart
        data={chartData}
        startAngle={0}
        endAngle={(parkingSpace.occupancy / parkingSpace.capacity) * 360}
        innerRadius={55}
        outerRadius={75}
      >
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          className="first:fill-muted last:fill-background"
          polarRadius={[60, 50]}
        />
        <RadialBar dataKey="value" background cornerRadius={10} />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-2xl font-bold"
                    >
                      {chartData[0].value.toLocaleString()}
                      {"/"}
                      {parkingSpace.capacity}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Spaces
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  );
};

const chartConfig = {
  motor: {
    label: "Non-Resident (Motorcycles)",
    color: "var(--chart-1)",
  },
  car: {
    label: "Non-Resident (Cars)",
    color: "var(--chart-2)",
  },
  residents: {
    label: "Residents",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;
