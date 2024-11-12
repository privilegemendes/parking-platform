import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { FC } from "react";
import { ParkingSpaceRowDto } from "~/types/parking-space";
import { getLabel } from "~/lib/utils";
import { ParkingSpacesChart } from "~/components/parking-spaces/parking-spaces-chart";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
import { useMediaQuery } from "~/hooks/use-mobile";

interface Props {
  data?: ParkingSpaceRowDto[];
  isLoading: boolean;
}

export const ParkingSpaces: FC<Props> = ({ data, isLoading }) => {
  const isDesktop = useMediaQuery("md");

  if (isLoading || !data) {
    return <div>Loading</div>;
  }

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
            {data.map((space, idx) => (
              <CarouselItem key={idx} className="lg:basis-1/4">
                <div key={space.parkingSpaceId}>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {getLabel(space.vehicleType)}
                      </CardTitle>
                      <Badge
                        variant={space.isOccupied ? "destructive" : "success"}
                      >
                        {space.isOccupied ? "Full" : "Available"}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <ParkingSpacesChart parkingSpace={space} />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      ) : (
        <Card className="grid gap-4 md:grid-cols-3">
          {data.map((space) => (
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
                <ParkingSpacesChart parkingSpace={space} />
              </CardContent>
            </div>
          ))}
        </Card>
      )}
    </>
  );
};
