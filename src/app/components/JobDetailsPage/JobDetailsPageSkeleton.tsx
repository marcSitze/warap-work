import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const JobDetailsPageSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Skeleton className="h-8 w-3/4 mb-4" />
        <Skeleton className="h-20 w-full mb-2" />
        <Skeleton className="h-60 w-full mb-2" />
      </div>
      <div className="space-y-6">
        <Skeleton className="h-40 w-full mb-2" />
        <Skeleton className="h-40 w-full mb-2" />
      </div>
    </div>
  );
};

export default JobDetailsPageSkeleton;
