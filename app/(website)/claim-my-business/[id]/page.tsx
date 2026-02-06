"use client";
import VerifyBusinessCode from "@/components/modals/VerifyBusinessCode";
import VerifyBusinessEmail from "@/components/modals/VerifyBusinessEmail";
import PathTracker from "@/components/shared/PathTracker";
import { getSingleBusiness } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import AddClaimModal from "./_component/AddClaimModal";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import LoginModal from "@/components/business/modal/login-modal";
import CheckCustomerModal from "@/components/business/modal/check-customer-modal";

const SingleBusiness = () => {
  const params = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddPhotoOpen, setIsAddPhotoOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const id = params?.id;
  const session = useSession();
  const status = session?.status;
  const role = session?.data?.user?.userType;
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isCheckCustomerModal, setIsCheckCustomerModal] =
    useState<boolean>(false);

  useEffect(() => {
    if (status === "loading") {
      setTimeout(() => {
        setIsLoginModalOpen(false);
      }, 1000);
    }

    if (status === "unauthenticated") {
      setInterval(() => {
        setIsLoginModalOpen(true);
      }, 1000);
    }

    if (role === "user") {
      setInterval(() => {
        setIsCheckCustomerModal(true);
      }, 1000);
    }
  }, [status, role]);

  const {
    data: singleBusiness,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["get-single-business", id],
    queryFn: async () => await getSingleBusiness(id).then((res) => res.data),
  });

  if (isLoading)
    return (
      <div className="container pt-8 pb-16 space-y-10">
        {/* PathTracker Skeleton */}
        <div>
          <Skeleton className="h-6 w-64 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>

        {/* Business Card Skeleton */}
        <div className="bg-white rounded-lg shadow-[0px_2px_12px_0px_#003d3924] p-4 md:p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
            {/* Profile Image Skeleton */}
            <div className="flex-shrink-0 overflow-hidden rounded-lg w-full max-w-[200px]">
              <Skeleton className="h-[200px] w-full rounded-lg" />
            </div>

            {/* Content Skeleton */}
            <div className="flex-1 w-full space-y-4">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-4">
                <div className="space-y-3 flex-1">
                  {/* Business Name Skeleton */}
                  <Skeleton className="h-6 w-64" />

                  {/* Rating Skeleton */}
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-12" />
                  </div>

                  {/* Services Skeleton */}
                  <div className="flex flex-wrap items-center gap-2">
                    {[...Array(3)].map((_, index) => (
                      <Skeleton key={index} className="h-10 w-20 rounded-lg" />
                    ))}
                  </div>
                </div>

                {/* Button Skeleton */}
                <Skeleton className="h-10 w-[180px] rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Verification Section Skeleton */}
        <div className="mt-10">
          <div className="mb-8 space-y-2">
            <Skeleton className="h-7 w-64" />
            <Skeleton className="h-4 w-96" />
          </div>

          <div className="space-y-4">
            {/* Email Verification Skeleton */}
            {[...Array(2)].map((_, index) => (
              <div
                key={index}
                className="p-4 md:p-6 bg-gray-50 border border-gray-200 rounded-lg"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-start space-x-4 w-full">
                    <Skeleton className="w-12 h-12 rounded-lg flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-6 w-48" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                  <Skeleton className="h-10 w-24 rounded-lg" />
                </div>
              </div>
            ))}
          </div>

          {/* Note Skeleton */}
          <div className="mt-5">
            <Skeleton className="h-4 w-full max-w-md" />
          </div>
        </div>
      </div>
    );

  return (
    <div className="container pt-8 pb-16 space-y-10">
      <div>
        <PathTracker title={""} header={singleBusiness?.businessInfo?.name} />
      </div>

      <div className="bg-white rounded-lg shadow-[0px_2px_12px_0px_#003d3924] p-4 md:p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
          {/* Profile Image */}
          <div className="flex-shrink-0 overflow-hidden rounded-lg w-full max-w-[200px]">
            <Image
              src={singleBusiness?.businessInfo?.image[0]}
              alt={"business.png"}
              width={1000}
              height={1000}
              className="rounded-lg object-cover h-[200px] w-full hover:scale-105 transition"
            />
          </div>

          {/* Content */}
          <div className="flex-1 w-full">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {singleBusiness?.businessInfo?.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 my-3">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{"3.7"}</span>
                </div>

                {/* Services */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {singleBusiness?.instrumentInfo?.map(
                    (service: { serviceName: string }, index: string) => (
                      <button
                        className="h-[40px] px-4 rounded-lg bg-[#F8F8F8] text-sm"
                        key={index}
                      >
                        {service?.serviceName}
                      </button>
                    ),
                  )}
                </div>
              </div>

              {/* Action Button */}
              <Link href={`/search-result/${singleBusiness?._id}`}>
                <button className="bg-[#139a8e] h-[40px] text-white px-5 rounded-lg w-full md:w-[180px]">
                  View Profile
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Section */}
      <div className="mt-10">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Verify Your Claim
          </h1>
          <p className="text-gray-600">
            Please select one of the following methods to verify your claim
          </p>
        </div>

        <div className="space-y-4">
          {/* Email Verification */}
          <div className="p-4 md:p-6 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start space-x-4 w-full">
                <div className="w-12 h-12 flex-shrink-0">
                  <Image
                    src={"/images/email.png"}
                    alt="/images/email.png"
                    width={2000}
                    height={2000}
                    className="h-full w-full"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Email Verification
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>
                      • A verification code will be sent to the email address
                      associated with the business.
                    </li>
                    <li>
                      • Enter the code received in the provided field to verify
                      your ownership.
                    </li>
                  </ul>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                disabled={singleBusiness?.isMailVerified}
                className={`bg-teal-600 hover:bg-teal-700 text-white px-8 h-[40px] rounded-lg w-full md:w-auto ${
                  singleBusiness?.isMailVerified &&
                  " bg-gray-400 border border-gray-200 text-white font-bold h-[40px] disabled:cursor-not-allowed disabled:bg-gray-400"
                }`}
              >
                {singleBusiness?.isMailVerified ? "Verified" : "Verify"}
              </button>
            </div>
          </div>

          {/* Document Verification */}
          <div className="p-4 md:p-6 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start space-x-4 w-full">
                <div className="w-12 h-12 flex-shrink-0">
                  <Image
                    src={"/images/document.png"}
                    alt="/images/document.png"
                    width={2000}
                    height={2000}
                    className="h-full w-full"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Document Verification{" "}
                    <span className="text-gray-400 font-normal">
                      (Optional)
                    </span>
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    If you prefer, you can upload official documents to verify
                    ownership. These could include:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• A business license.</li>
                    <li>• A utility bill showing the business address.</li>
                    <li>
                      • Other documents that can confirm your connection to the
                      business.
                    </li>
                  </ul>
                </div>
              </div>
              <button
                onClick={() => setIsAddPhotoOpen(true)}
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 h-[40px] rounded-lg w-full md:w-auto"
              >
                Verify
              </button>

              {isAddPhotoOpen && (
                <AddClaimModal
                  setIsAddPhotoOpen={setIsAddPhotoOpen}
                  businessID={singleBusiness?._id}
                />
              )}

              {isModalOpen && (
                <VerifyBusinessEmail
                  businessID={singleBusiness?._id}
                  setIsModalOpen={setIsModalOpen}
                  setIsOpen={setIsOpen}
                />
              )}

              {isOpen && (
                <VerifyBusinessCode
                  setIsOpen={setIsOpen}
                  businessID={singleBusiness?._id}
                  refetch={refetch}
                />
              )}
            </div>
          </div>
        </div>

        {/* Note */}
        <div>
          <p className="mt-5 text-sm md:text-base">
            <span className="font-medium">Note:</span> Submission will be
            reviewed by the admin and you will be notified through SMS or email.
          </p>
        </div>

        <LoginModal
          isLoginModalOpen={isLoginModalOpen}
          setIsLoginModalOpen={() => setIsLoginModalOpen(false)}
        />

        <CheckCustomerModal
          isLoginModalOpen={isCheckCustomerModal}
          setIsLoginModalOpen={() => setIsCheckCustomerModal(false)}
        />
      </div>
    </div>
  );
};

export default SingleBusiness;
