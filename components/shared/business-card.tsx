"use client";

import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Review {
  _id: string;
  rating: number;
  status: string;
}

interface BusinessItem {
  email: string;
  name: string;
  image: string[];
}

interface Service {
  newInstrumentName: string;
}

interface Business {
  _id: string;
  businessInfo: BusinessItem;
  services: Service[];
  review: Review[];
}

interface BusinessCardProps {
  business: Business;
}

// Helper function to calculate average rating
const calculateAverageRating = (reviews: Review[] = []) => {
  if (!reviews || reviews.length === 0) return null;

  // Only count approved reviews
  const approvedReviews = reviews.filter(
    (review) => review.status === "approved",
  );
  if (approvedReviews.length === 0) return null;

  const totalRating = approvedReviews.reduce((sum, review) => {
    return sum + review.rating;
  }, 0);

  return (totalRating / approvedReviews.length).toFixed(1);
};

export default function BusinessCard({ business }: BusinessCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllServices, setShowAllServices] = useState(false);
  const images = business?.businessInfo?.image || [];
  const services = business?.services || [];
  const visibleServices = showAllServices ? services : services.slice(0, 2);
  const hiddenServicesCount = Math.max(services.length - 2, 0);

  // Calculate average rating
  const averageRating = calculateAverageRating(business?.review);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  const toggleServices = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowAllServices((prev) => !prev);
  };

  return (
    <Link href={`/search-result/${business?._id}`} className="block">
      <div className="bg-white rounded-lg border border-gray-100 shadow-lg p-6 h-full">
        <div className="flex flex-col gap-5 h-full">
          {/* Profile Image with Slider */}
          <div className="flex-shrink-0 overflow-hidden rounded-lg relative group">
            <div className="relative w-full h-[250px] rounded-lg overflow-hidden">
              <Image
                src={images[currentImageIndex] || "/placeholder-image.jpg"}
                alt={`${business?.businessInfo?.name} - Image ${currentImageIndex + 1}`}
                width={1000}
                height={1000}
                className="rounded-lg object-cover w-full h-full hover:scale-105 transition duration-300"
              />

              {/* Navigation Arrows - Show only if multiple images */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              {images.length > 1 && (
                <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                  {currentImageIndex + 1} / {images.length}
                </div>
              )}
            </div>

            {/* Dot Indicators */}
            {images.length > 1 && (
              <div className="flex justify-center mt-3 space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => goToImage(e, index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentImageIndex
                        ? "bg-blue-600"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {business?.businessInfo?.name}
                </h3>

                {/* Rating - Shows message when no reviews */}
                <div className="flex items-center gap-1 my-3">
                  {!averageRating ? (
                    <span className="text-sm text-gray-500">
                      No reviews yet
                    </span>
                  ) : (
                    <>
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{averageRating}</span>
                    </>
                  )}
                </div>

                {/* Services */}
                <div className="flex items-center gap-2">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {visibleServices.map((service, index) => (
                      <span
                        className="inline-flex h-[40px] max-w-full items-center rounded-lg bg-[#F8F8F8] px-4 text-sm transition-colors hover:bg-gray-200"
                        key={index}
                        title={service?.newInstrumentName}
                      >
                        <span className="truncate">
                          {service?.newInstrumentName}
                        </span>
                      </span>
                    ))}
                    {hiddenServicesCount > 0 && (
                      <button
                        type="button"
                        onClick={toggleServices}
                        className="inline-flex h-[40px] items-center rounded-lg bg-[#E0F2F1] px-4 text-sm font-medium text-[#00998E] transition-colors hover:bg-[#cce8e6]"
                      >
                        {showAllServices
                          ? "See less"
                          : `See more +${hiddenServicesCount}`}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
