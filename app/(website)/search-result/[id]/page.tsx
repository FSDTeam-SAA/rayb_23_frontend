"use client";
import PathTracker from "@/components/shared/PathTracker";
import { getSingleBusiness } from "@/lib/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import BusinessDetails from "../_component/business-details/BusinessDetails";
import { BusinessDetailsSkeleton } from "../_component/business-details/BusinessDetailsSkeleton";
import type { SavedBusiness } from "@/components/customer-dashboard/saved/saved-data";

type SavedBusinessCache = SavedBusiness[] | { data?: SavedBusiness[] };

const Page = () => {
  const { id } = useParams();
  const businessId = Array.isArray(id) ? id[0] : id;
  const queryClient = useQueryClient();
  const savedBusinessCache =
    queryClient.getQueryData<SavedBusinessCache>(["savedBusinessData"]);
  const savedBusinessData = Array.isArray(savedBusinessCache)
    ? savedBusinessCache
    : savedBusinessCache?.data || [];
  const cachedBusinessName = savedBusinessData.find((business) => {
    const savedBusinessId = business?.savedBusiness?._id || business?._id;

    return savedBusinessId === businessId;
  })?.savedBusiness?.businessInfo?.name;

  const { data: singleBusiness = {}, isLoading } = useQuery({
    queryKey: ["get-single-business", businessId],
    enabled: Boolean(businessId),
    queryFn: async () => {
      const res = await getSingleBusiness(businessId);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="container mt-8">
        {cachedBusinessName && (
          <div className="pb-5">
            <PathTracker title="" header={cachedBusinessName} />
          </div>
        )}
        <BusinessDetailsSkeleton />
      </div>
    );

  return (
    <div className="container">
      <div className="py-5">
        <PathTracker
          title=""
          header={singleBusiness?.businessInfo?.name || cachedBusinessName}
          id={singleBusiness?._id}
          isLoading={isLoading}
        />
      </div>

      {singleBusiness?.businessInfo && (
        <BusinessDetails singleBusiness={singleBusiness} />
      )}
    </div>
  );
};

export default Page;
