import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const JobPostItemSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-full" />
      <div className="space-y-2">
        <Skeleton className="h-[175px] w-full rounded-xl" />
      </div>
    </div>
  );
};

export default JobPostItemSkeleton;
