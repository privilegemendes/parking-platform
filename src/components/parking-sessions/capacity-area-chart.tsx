import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useState } from "react";
import { useParkingSessions } from "~/hooks/use-parking-sessions";
import { format } from "date-fns";
import { ParkingSessionRowDto } from "~/types/parking-session";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  CAR: {
    label: "Cars",
    color: "var(--chart-1)",
  },
  MOTOR: {
    label: "Motorcyles",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function CapacityAreaChart() {
  const [timeRange, setTimeRange] = useState("90d");
  const { data, isLoading: isParkingSessionsLoading } = useParkingSessions();

  if (isParkingSessionsLoading || !data) {
    return <div>Loading</div>;
  }

  const parkingSessions = transformParkingSessions(data);
  console.log(parkingSessions);

  const filteredData = parkingSessions.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date(); // Current date
    let daysToSubtract = 90;

    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    } else if (timeRange === "6m") {
      daysToSubtract = 180; // Approx. 6 months
    } else if (timeRange === "1y") {
      daysToSubtract = 365; // Approx. 1 year
    }

    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);

    return date >= startDate;
  });

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Visitors</CardTitle>
          <CardDescription>
            Showing total visitors for the last year
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="1y" className="rounded-lg">
              Last 1 year
            </SelectItem>
            <SelectItem value="6m" className="rounded-lg">
              Last 6 months
            </SelectItem>
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillCar" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-CAR)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-CAR)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMotor" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-MOTOR)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-MOTOR)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="MOTOR"
              type="natural"
              fill="url(#fillMotor)"
              stroke="var(--color-MOTOR)"
              stackId="a"
            />
            <Area
              dataKey="CAR"
              type="natural"
              fill="url(#fillCar)"
              stroke="var(--color-CAR)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

type ChartData = {
  date: string;
  CAR: number;
  MOTOR: number;
};

function transformParkingSessions(
  parkingSessions: ParkingSessionRowDto[] | undefined
): ChartData[] {
  if (!parkingSessions) return [];

  // Step 1: Normalize vehicle types and parse dates
  const normalizedSessions = parkingSessions.map((session) => ({
    date: format(session.sessionStartedAt, "yyyy-MM-dd"), // Extracts the date part
    vehicleType:
      session.vehicleType === "MOTORCYCLE" ? "MOTOR" : session.vehicleType,
  }));

  // Step 2: Group by date and count occurrences of each vehicle type
  const countsByDate: { [date: string]: { CAR: number; MOTOR: number } } = {};

  normalizedSessions.forEach(({ date, vehicleType }) => {
    if (!countsByDate[date]) {
      countsByDate[date] = { CAR: 0, MOTOR: 0 };
    }
    if (vehicleType === "CAR" || vehicleType === "MOTOR") {
      countsByDate[date][vehicleType]++;
    }
  });

  // Step 3: Convert the grouped data into the ChartData format
  const chartData: ChartData[] = Object.keys(countsByDate).map((date) => ({
    date,
    CAR: countsByDate[date].CAR,
    MOTOR: countsByDate[date].MOTOR,
  }));

  // Step 4: Sort the chartData array by date in ascending order
  chartData.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return chartData;
}
