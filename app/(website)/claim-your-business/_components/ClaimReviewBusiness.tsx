"use client";
import ReviewModal from "@/components/modals/ReviewModal";
import ReviewSubmittedModal from "@/components/modals/ReviewSubmittedModal";
import { Button } from "@/components/ui/button";
import { getAllbusiness } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Search, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

interface BusinessItem {
  email: string;
  name: string;
  image: string;
}

interface Service {
  serviceName: string;
}

interface Business {
  _id: string;
  businessInfo: BusinessItem;
  instrumentInfo: Service[];
}

const ClaimReviewBusiness = () => {
  const pathname = usePathname();
  const [businessID, setBusinessID] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data: allBusiness = [], isLoading } = useQuery({
    queryKey: ["get-all-business"],
    queryFn: async () => await getAllbusiness().then((res) => res.data),
  });

  const totalPages = Math.ceil(allBusiness.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBusiness = allBusiness.slice(startIndex, endIndex);

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading)
    return (
      <div className="text-center flex flex-col items-center justify-center min-h-[650px] text-lg">
        Loading...
      </div>
    );

  return (
    <div className="mt-8">
      <div>
        {/* Search Section */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                placeholder="Search for instructors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border border-gray-200 bg-gray-50 h-[48px] focus:outline-none w-full rounded-md"
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button
              onClick={handleSearch}
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 h-[48px]"
            >
              Search
            </Button>
          </div>
        </div>

        {/* Instructors List */}
        <div className="space-y-6">
          {currentBusiness.map((business: Business) => (
            <div
              key={business?.businessInfo?.email}
              className="bg-white rounded-lg shadow-[0px_2px_12px_0px_#003d3924] p-6"
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-5">
                {/* Profile Image */}
                <div className="flex-shrink-0 overflow-hidden rounded-lg w-full sm:w-auto">
                  <Image
                    src={business?.businessInfo?.image[0] || "/placeholder.svg"}
                    alt={"business.png"}
                    width={1000}
                    height={1000}
                    className="rounded-lg object-cover w-full sm:w-[200px] h-[200px] hover:scale-105 transition"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 w-full">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {business?.businessInfo?.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-1 my-3">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{"3.7"}</span>
                      </div>

                      {/* Services */}
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        {business?.instrumentInfo?.map((service, index) => (
                          <button
                            className="h-[48px] px-5 rounded-lg bg-[#F8F8F8]"
                            key={index}
                          >
                            {service?.serviceName}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-4 lg:mt-0 w-full sm:w-auto">
                      {pathname === "/claim-your-business" && (
                        <Link href={`/claim-your-business/${business?._id}`}>
                          <button className="w-full sm:w-[180px] bg-[#e0f2f1] h-[48px] text-[#139a8e] px-5 rounded-lg">
                            Claim Business
                          </button>
                        </Link>
                      )}

                      {pathname === "/review-business" && (
                        <button
                          onClick={() => {
                            setIsOpen(true);
                            setBusinessID(business?._id);
                          }}
                          className="w-full sm:w-[180px] bg-[#e0f2f1] h-[48px] text-[#139a8e] px-5 rounded-lg"
                        >
                          Review Business
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className={
                  currentPage === page ? "bg-teal-600 hover:bg-teal-700" : ""
                }
              >
                {page}
              </Button>
            ))}
            {currentPage < totalPages && (
              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                className="bg-teal-600 hover:bg-teal-700 text-white ml-2"
              >
                Next Page
              </Button>
            )}
          </div>
        )}

        {/* Add Business Section */}
        <div className="border border-gray-200 bg-gray-50 mt-10 p-5 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex gap-6 items-start md:items-center">
            <div>
              <Image
                src={"/images/location.png"}
                alt="location.png"
                width={1000}
                height={1000}
                className="w-[48px] h-[60px]"
              />
            </div>

            <div>
              <h1 className="font-semibold text-xl">
                Can’t find your business?
              </h1>
              <p className="text-[#485150] text-[16px] mt-2">
                Adding your business to Instrufix is completely free!
              </p>
            </div>
          </div>

          <div className="w-full md:w-auto">
            <Link href={"/add-a-business"}>
              <Button className="w-full md:w-auto bg-teal-600 hover:bg-teal-700 text-white px-8 h-[48px]">
                Add Business
              </Button>
            </Link>
          </div>
        </div>

        {/* No Results */}
        {currentBusiness.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No instructors found matching your search.
            </p>
          </div>
        )}

        {isOpen && (
          <ReviewModal setIsModalOpen={setIsModalOpen} setIsOpen={setIsOpen} businessID={businessID} />
        )}

        {isModalOpen && (
          <ReviewSubmittedModal setIsModalOpen={setIsModalOpen} />
        )}
      </div>
    </div>
  );
};

export default ClaimReviewBusiness;
