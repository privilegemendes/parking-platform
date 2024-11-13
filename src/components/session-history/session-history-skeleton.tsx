import { Skeleton } from "~/components/ui/skeleton";

export const SessionHistorySkeleton = () => {
  return (
    <div className="col-span-3 lg:col-span-1">
      <Skeleton className="h-[350px] w-full rounded-xl" />
    </div>
  );
};
