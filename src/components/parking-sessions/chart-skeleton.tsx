import { Skeleton } from "~/components/ui/skeleton";

export function ChartSkeleton() {
  return (
    <div className="col-span-3 lg:col-span-2">
      <Skeleton className="h-[350px] w-full rounded-xl" />
    </div>
  );
}
