import { Skeleton } from "~/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col items-center">
      <Skeleton className="h-[125px] w-full rounded-xl" />
    </div>
  );
}
