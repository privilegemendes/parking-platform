import { useParkingSpaces } from "~/hooks/use-parking-spaces";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import { FC, useMemo } from "react";
import { Label, Pie, PieChart } from "recharts";
import { ParkingSpaceRowDto } from "~/types/parking-space";

export const ParkingSpaces = () => {
  const { data: parkingSpaces, isLoading: isParkingSpacesLoading } =
    useParkingSpaces();

  if (isParkingSpacesLoading || !parkingSpaces) {
    return <div>Loading</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {parkingSpaces.map((space) => (
        <Card key={space.parkingSpaceId}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {getLabel(space.vehicleType)}
            </CardTitle>
            <Badge>{space.isOccupied ? "Full" : "Available"}</Badge>
          </CardHeader>
          <CardContent>
            <Chart parkingSpace={space} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

interface Props {
  parkingSpace: ParkingSpaceRowDto;
}

// TODO: Move this to a utility function
const getLabel = (vehicleType: string | null) => {
  switch (vehicleType) {
    case "MOTOR":
      return "Non Resident - Motorcycles";
    case "CAR":
      return "Non Resident - Cars";
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
        fill: "#f13838",
      },
      {
        name: "Capacity",
        value: parkingSpace.capacity,
        fill: "#11df22",
      },
    ];
  }, [parkingSpace]);

  const totalSpaces = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, [chartData]);

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          strokeWidth={5}
        >
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
                      className="fill-foreground text-3xl font-bold"
                    >
                      {totalSpaces}
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
        </Pie>
      </PieChart>
    </ChartContainer>
  );
};

const chartConfig = {
  motor: {
    label: "Non-Resident (Motorcycles)",
    color: "hsl(var(--chart-1))",
  },
  car: {
    label: "Non-Resident (Cars)",
    color: "hsl(var(--chart-2))",
  },
  residents: {
    label: "Residents",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;
