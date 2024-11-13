import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { FC } from "react";
import { ParkingSessionRowDto } from "~/types/parking-session";
import { calculateRevenueBreakdown } from "~/lib/utils";
import { useMediaQuery } from "~/hooks/use-mobile";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
import { FinancesSkeleton } from "~/components/finances/finances-skeleton";

interface Props {
  data?: ParkingSessionRowDto[];
  isLoading: boolean;
}

interface RevenueCardProps {
  title: string;
  amount: number;
}

const RevenueCard: FC<RevenueCardProps> = ({ title, amount }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">€{amount}</div>
    </CardContent>
  </Card>
);

export const Finances: FC<Props> = ({ data, isLoading }) => {
  const isDesktop = useMediaQuery("md");

  if (isLoading || !data) {
    return <FinancesSkeleton />;
  }

  const { totalRevenue, visitorsMotorRevenue, visitorCarsRevenue } =
    calculateRevenueBreakdown(data);

  const revenueCards = [
    { title: "Total Revenue", amount: totalRevenue },
    { title: "Visitors Cars Revenue", amount: visitorCarsRevenue },
    { title: "Visitors Motorcycle Revenue", amount: visitorsMotorRevenue },
  ];

  return (
    <>
      {!isDesktop ? (
        <Carousel
          opts={{
            align: "center",
            dragFree: true,
          }}
          className="w-full mt-6"
        >
          <CarouselContent>
            {revenueCards.map((card, index) => (
              <CarouselItem className="lg:basis-1/4" key={index}>
                <RevenueCard title={card.title} amount={card.amount} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {revenueCards.map((card, index) => (
            <RevenueCard key={index} title={card.title} amount={card.amount} />
          ))}
        </div>
      )}
    </>
  );
};
