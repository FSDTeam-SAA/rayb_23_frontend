"use client";

import { Skeleton } from "@/components/ui/skeleton"; // Import Shadcn Skeleton

const BusinessHeaderSkeleton = () => (
  <div className="flex items-center gap-6 border-b border-gray-200 pb-8">
    {/* Image Slider Skeleton */}
    <div className="flex-shrink-0">
      <Skeleton className="h-[172px] w-[172px] rounded-lg" />
    </div>

    {/* Business Info Skeleton */}
    <div className="flex-1">
      <div className="flex items-center gap-5 mb-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-6 w-20" />
      </div>
      <div className="flex items-center gap-2 mb-2">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-32" />
      </div>
      <Skeleton className="h-4 w-64 mb-1" />
      <Skeleton className="h-4 w-48" />
    </div>

    {/* Action Buttons Skeleton */}
    <div className="grid grid-cols-2 gap-5">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-12 w-32" />
      ))}
    </div>
  </div>
);

const AboutSectionSkeleton = () => (
  <div className="border-b border-gray-200 pb-8">
    <Skeleton className="h-6 w-48 mb-4" />
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-3/4" />
  </div>
);

const ServiceTypeSkeleton = () => (
  <div className="border-b border-gray-200 pb-8">
    <Skeleton className="h-6 w-48 mb-4" />
    {[...Array(3)].map((_, i) => (
      <div key={i} className="mb-4">
        <Skeleton className="h-5 w-32 mb-2" />
        <div className="space-y-2">
          {[...Array(2)].map((_, j) => (
            <Skeleton key={j} className="h-4 w-full" />
          ))}
        </div>
      </div>
    ))}
  </div>
);

const ReviewsSkeleton = () => (
  <div className="pt-8">
    <Skeleton className="h-6 w-48 mb-4" />

    {/* Overall Rating Skeleton */}
    <div className="flex items-center gap-2 mb-6">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div>
        <Skeleton className="h-8 w-16 mb-1" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>

    {/* Star Distribution Skeleton */}
    <div className="mb-8">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center gap-5 mb-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-2 flex-1" />
          <Skeleton className="h-4 w-8" />
        </div>
      ))}
    </div>

    {/* Search and Sort Skeleton */}
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <Skeleton className="h-10 flex-1" />
      <div>
        <Skeleton className="h-4 w-16 mb-1" />
        <Skeleton className="h-6 w-32" />
      </div>
    </div>

    {/* Review Items Skeleton */}
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="border shadow-md rounded-lg p-4 border-gray-200 py-6"
        >
          <div className="flex items-start gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SidebarSkeleton = () => (
  <div className="space-y-8 pl-8">
    {/* Contact Info Skeleton */}
    <div className="border-b border-gray-300 pb-8">
      <Skeleton className="h-6 w-32 mb-4" />
      <div className="space-y-5">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-36" />
      </div>
    </div>

    {/* Working Hours Skeleton */}
    <div className="border-b border-gray-300 pb-6">
      <Skeleton className="h-6 w-32 mb-4" />
      <div className="space-y-2">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="flex flex-col">
            <Skeleton className="h-4 w-12 mb-1" />
            <Skeleton className="h-4 w-32" />
          </div>
        ))}
      </div>
    </div>

    {/* Location Skeleton */}
    <div>
      <Skeleton className="h-6 w-24 mb-2" />
      <Skeleton className="h-4 w-64 mb-5" />
      <Skeleton className="h-[300px] w-[300px] rounded-xl" />
      <Skeleton className="h-10 w-full mt-8" />
    </div>
  </div>
);

export const BusinessDetailsSkeleton = () => (
  <div>
    <BusinessHeaderSkeleton />
    <div className="flex pt-8 pb-16">
      {/* Left Column */}
      <div className="flex-1 border-r border-gray-200 pr-8">
        <AboutSectionSkeleton />
        <ServiceTypeSkeleton />
        <ReviewsSkeleton />
      </div>

      {/* Right Column */}
      <SidebarSkeleton />
    </div>
  </div>
);
