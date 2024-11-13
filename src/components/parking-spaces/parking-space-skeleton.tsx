import { useMediaQuery } from "~/hooks/use-mobile";
import { Skeleton } from "~/components/ui/skeleton";

export const ParkingSpaceSkeleton = () => {
  const isDesktop = useMediaQuery("md");
  return (
    <div className="grid gap-4 md:grid-cols-3 h-[220px]">
      {Array.from({ length: isDesktop ? 3 : 1 }).map((_, index) => (
        <Skeleton key={index} className="h-[220px] w-full rounded-xl" />
      ))}
    </div>
  );
};
