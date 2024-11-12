import { ParkingSpaceRowDto } from "~/types/parking-space";
import { FC, useMemo } from "react";
import { ChartConfig, ChartContainer } from "~/components/ui/chart";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

interface ChartProps {
  parkingSpace: ParkingSpaceRowDto;
}

export const ParkingSpacesChart: FC<ChartProps> = ({ parkingSpace }) => {
  const chartData = useMemo(() => {
    return [
      {
        name: "Occupied",
        value: Math.abs(parkingSpace.occupancy),
        fill: "#FF4560",
      },
    ];
  }, [parkingSpace]);

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
