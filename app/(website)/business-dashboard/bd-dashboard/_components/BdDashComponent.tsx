"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { getChatByBusinessMan, getMyReview } from "@/lib/api";
import { useBusinessContext } from "@/lib/business-context";
import Link from "next/link";
import { ChevronRight, FileText, Loader, Star } from "lucide-react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

interface Review {
  _id: string;
  user: { name: string; imageLink: string };
  report: { isReport: boolean };
  createdAt: string;
  rating: number;
  feedback?: string;
}

interface AnalyticsData {
  totalReviews: number;
  newReviews: number;
  totalPhotos: number;
  newPhotos: number;
}

export default function BdDashComponent() {
  const { selectedBusinessId } = useBusinessContext();
  const session = useSession();
  const token = session?.data?.user?.accessToken;

  const {
    data: newMessages,
    isLoading: isNewMessagesLoading,
    refetch: refetchNewMessages,
  } = useQuery({
    queryKey: ["newMessages"],
    queryFn: () => getChatByBusinessMan(selectedBusinessId as string),
    select: (data) => data?.data,
    enabled: !!selectedBusinessId,
  });

  const {
    data: analyticsData,
    isLoading: isAnalyticsLoading,
    refetch: refetchAnalytics,
  } = useQuery({
    queryKey: ["analytics", selectedBusinessId],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/analytics/business-man/${selectedBusinessId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const result = await response.json();
      return result.data as AnalyticsData;
    },
    enabled: !!token && !!selectedBusinessId,
  });

  const { data: allReview, isLoading: isReviewsLoading } = useQuery({
    queryKey: ["get-my-reviews", selectedBusinessId],
    queryFn: () => getMyReview(selectedBusinessId as string),
    enabled: !!selectedBusinessId,
  });

  useEffect(() => {
    if (selectedBusinessId) {
      refetchAnalytics();
      refetchNewMessages();
    }
  }, [selectedBusinessId, refetchAnalytics, refetchNewMessages]);

  // Prepare metrics data
  const metrics = [
    {
      name: "Reviews",
      value: analyticsData?.totalReviews || 0,
      bgColor: "bg-teal-500",
    },
    {
      name: "Photos",
      value: analyticsData?.totalPhotos || 0,
      bgColor: "bg-yellow-500",
    },
    {
      name: "Saved",
      value: 0, // You can add this to the analytics API if needed
      bgColor: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-8 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 text-sm">
            Monitor how your business is doing on Instrufx with important
            metrics
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <Card
            key={index}
            className={`${metric.bgColor} border-0 text-white rounded-xl`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <p className="text-white/80 text-sm font-medium">
                    {metric.name}
                  </p>
                  <div className="space-y-1">
                    <p className="text-3xl font-bold text-white">
                      {isAnalyticsLoading ? (
                        <Loader className="animate-spin h-6 w-6 text-white" />
                      ) : (
                        metric.value
                      )}
                    </p>
                    {metric.name === "Reviews" && analyticsData && (
                      <p className="text-white/80 text-xs">
                        {analyticsData.newReviews} new this period
                      </p>
                    )}
                    {metric.name === "Photos" && analyticsData && (
                      <p className="text-white/80 text-xs">
                        {analyticsData.newPhotos} new this period
                      </p>
                    )}
                  </div>
                </div>
                <div className="bg-white/20 p-2 rounded-lg">
                  {/* Add icon here if needed */}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reviews and Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* New Reviews */}
        <div className="space-y-4 border border-gray-300 rounded-lg p-5">
          <div className="flex items-center justify-between border-b border-gray-300 pb-3">
            <h2 className="text-lg font-semibold text-gray-900">New Reviews</h2>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>

          <div className="space-y-6 h-[800px] overflow-y-auto scrollbar-hide">
            {isReviewsLoading ? (
              <div className="flex justify-center items-center h-full">
                <Loader className="animate-spin h-7 w-7" />
              </div>
            ) : allReview?.data?.length ? (
              allReview.data.map((review: Review) => (
                <div
                  key={review._id}
                  className="space-y-3 shadow-[0px_2px_12px_0px_#003D3914] p-4 rounded-lg"
                >
                  <div className="flex items-start gap-3">
                    <div>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={review.user.imageLink} />
                        <AvatarFallback className="bg-yellow-500 text-white">
                          {review.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-900 text-sm">
                            {review.user.name}
                          </h4>
                          {review.report?.isReport && (
                            <span className="text-xs text-red-500">
                              Reported
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                        <div className="flex items-center gap-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {review.feedback && (
                    <p className="text-sm text-gray-700 leading-relaxed ml-13">
                      {review.feedback}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-center p-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    No Reviews For This Business
                  </h3>
                  <p className="text-sm text-gray-500">
                    There are no reviews to display yet.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* New Messages */}
        <div className="space-y-4 border border-gray-300 rounded-lg p-5">
          <div className="flex items-center justify-between border-b border-gray-300 pb-3">
            <h2 className="text-lg font-semibold text-gray-900">
              New Messages
            </h2>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>

          {isNewMessagesLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader className="animate-spin h-7 w-7" />
            </div>
          ) : newMessages?.length ? (
            <div className="space-y-6 h-[800px] overflow-y-auto scrollbar-hide">
              {newMessages.map(
                (
                  message: {
                    userId: { name: string; imageLink: string };
                    lastMessage: { date: string; message: string };
                  },
                  index: number,
                ) => (
                  <div
                    key={index}
                    className="space-y-3 shadow-[0px_2px_12px_0px_#003D3914] p-4 rounded-lg"
                  >
                    <Link href={`/business-dashboard/messages`}>
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={message.userId.imageLink} />
                          <AvatarFallback className="bg-gray-500 text-white text-xs uppercase">
                            {message.userId.name
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 space-y-2">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold text-gray-900 text-sm truncate">
                                {message.userId.name}
                              </h4>
                              <span className="text-xs text-gray-500 ml-2">
                                {new Date(
                                  message.lastMessage.date,
                                ).toLocaleString("en-US", {
                                  hour: "numeric",
                                  minute: "numeric",
                                  hour12: true,
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">
                              {message.lastMessage.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ),
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-center p-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  No Messages
                </h3>
                <p className="text-sm text-gray-500">
                  There are no messages to display yet.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
