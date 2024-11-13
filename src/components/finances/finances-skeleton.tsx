import { SkeletonCard } from "~/components/skeleton/skeleton-card";
import { useMediaQuery } from "~/hooks/use-mobile";

export const FinancesSkeleton = () => {
  const isDesktop = useMediaQuery("md");
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {Array.from({ length: isDesktop ? 3 : 1 }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};
