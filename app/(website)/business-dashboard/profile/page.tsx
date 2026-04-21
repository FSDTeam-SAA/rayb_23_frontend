"use client";

import AddBusiness from "@/components/business/common/AddBusiness";
import { getMyBusinesses } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

export default function Page() {
  const { data: myBusinesses } = useQuery({
    queryKey: ["myBusinesses"],
    queryFn: getMyBusinesses,
    select: (data) => data?.data,
  });

  const hasBusinesses = myBusinesses && myBusinesses.length > 0;

  return (
    <div className="container">
      {hasBusinesses ? (
        <AddBusiness />
      ) : (
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            No Business Added
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            You haven&apos;t added any business yet. Create your first business
            to get started.
          </p>
          <Link
            href="/business-dashboard/add-my-business"
            className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
          >
            Add My Business
          </Link>
        </div>
      )}
    </div>
  );
}
