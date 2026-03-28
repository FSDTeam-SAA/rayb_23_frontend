"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoreVertical, Star, Edit, Trash2 } from "lucide-react";
import BusinessCard from "@/components/shared/business-card";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserBusinesses, getUserPhotos, getUserReview } from "@/lib/api";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import EditReviewModal from "./edit-review-modal";

export interface Review {
  _id: number;
  feedback: string;
  status: string;
  user: {
    name: string;
    imageLink: string;
    role: string;
  };
  image: string[];
  rating: number;
  createdAt: string;
}

interface BusinessItem {
  email: string;
  name: string;
  image: string[];
}

interface Service {
  newInstrumentName: string;
}

interface ReviewType {
  _id: string;
  rating: number;
  status: string;
}

interface Business {
  _id: string;
  businessInfo: BusinessItem;
  services: Service[];
  review: ReviewType[]; // Add the review property
}

// API functions
const deleteReview = async ({
  reviewId,
  token,
}: {
  reviewId: number;
  token: string;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/review/delete-Review/${reviewId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete review");
  }

  return response.json();
};

export default function ContributionTabs() {
  const session = useSession();
  const token = session?.data?.user?.accessToken;
  const queryClient = useQueryClient();

  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<Review | null>(null);

  const { data: myReviews } = useQuery({
    queryKey: ["myReviews"],
    queryFn: getUserReview,
    select: (data) => data?.data,
    enabled: !!token,
  });

  const { data: myPhotos } = useQuery({
    queryKey: ["myPhotos"],
    queryFn: getUserPhotos,
    select: (data) => data?.data,
    enabled: !!token,
  });

  const { data: myBusinesses } = useQuery({
    queryKey: ["myBusinesses"],
    queryFn: getUserBusinesses,
    select: (data) => data?.data,
    enabled: !!token,
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myReviews"] });
      toast.success("Review deleted successfully");
      setDeleteDialogOpen(false);
      setReviewToDelete(null);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete review");
    },
  });

  const handleEditClick = (review: Review) => {
    setEditingReview(review);
  };

  const handleEditSuccess = () => {
    // Invalidate and refetch reviews
    queryClient.invalidateQueries({ queryKey: ["myReviews"] });
    setEditingReview(null);
  };

  const handleDeleteClick = (review: Review) => {
    setReviewToDelete(review);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!reviewToDelete || !token) return;

    deleteMutation.mutate({
      reviewId: reviewToDelete._id,
      token,
    });
  };

  return (
    <div>
      <Tabs defaultValue="reviews" className="w-full">
        <TabsList className="gap-4 bg-transparent">
          <TabsTrigger
            value="reviews"
            className="data-[state=active]:bg-[#00998E] data-[state=active]:text-white bg-[#E0E0E0] px-5 py-2"
          >
            Reviews ({myReviews?.length})
          </TabsTrigger>
          <TabsTrigger
            value="photos"
            className="data-[state=active]:bg-[#00998E] data-[state=active]:text-white bg-[#E0E0E0] px-5 py-2"
          >
            Photos ({myPhotos?.length})
          </TabsTrigger>
          <TabsTrigger
            value="businesses"
            className="data-[state=active]:bg-[#00998E] data-[state=active]:text-white bg-[#E0E0E0] px-5 py-2"
          >
            Businesses ({myBusinesses?.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="reviews">
          <div className="py-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold">
              Reviews{" "}
              <span className="text-[#8D9A99]">({myReviews?.length})</span>
            </h3>
          </div>
          {myReviews?.length > 0 ? (
            <div className="space-y-5">
              {myReviews?.map((review: Review) => (
                <div
                  key={review._id}
                  className="p-6 border rounded-md shadow-md"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <div className="">
                        <div className="flex items-center gap-4">
                          <Image
                            src={
                              review.user.imageLink ||
                              "/images/profilePlaceholder.jpg"
                            }
                            alt={review.user.name}
                            width={50}
                            height={50}
                            className="h-16 w-16 rounded-full object-cover"
                          />
                          <div className="">
                            <h3 className="text-lg font-semibold">
                              {review.user.name}
                            </h3>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 py-3">
                          {Array.from({ length: 5 }, (_, index) => (
                            <Star
                              key={index}
                              className={`h-6 w-6 inline-block ${
                                index < review.rating
                                  ? "text-yellow-500"
                                  : "text-gray-300"
                              }`}
                              fill={
                                index < review.rating
                                  ? "currentColor"
                                  : "#E7E9E9"
                              }
                              stroke="none"
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-3 items-center">
                        <p
                          className={`${review.status === "approved" ? "text-green-500 bg-green-100" : review.status === "pending" ? "text-[#E38441] bg-[#E384411F]" : "text-[#E24040] bg-[#E240401F]"} px-4 py-1 rounded-xl`}
                        >
                          {review.status}
                        </p>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleEditClick(review)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteClick(review)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <p className="text-base text-[#485150]">
                      {review.feedback}
                    </p>
                    <div className="flex items-center gap-3">
                      {review.image.length > 0 && (
                        <div className="flex gap-6 flex-wrap">
                          {review.image
                            .slice(0, 3)
                            .map((photo: string, index: number) => (
                              <Image
                                key={index}
                                src={photo}
                                alt={`Review photo ${index + 1}`}
                                width={1000}
                                height={1000}
                                className="h-32 w-32 object-cover rounded-md"
                              />
                            ))}
                          {review.image.length > 3 && (
                            <span className="text-gray-500">
                              +{review.image.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-between items-center bg-[#F7F8F8] p-6 rounded-md">
              <div className="flex items-center gap-4">
                <Image
                  src="/images/review.png"
                  alt="No reviews yet"
                  width={300}
                  height={300}
                  className="h-16 w-16 object-contain"
                />
                <div className="space-y-2">
                  <h4 className="text-xl font-semibold">No Reviews Given</h4>
                  <p>
                    You haven&apos;t written any reviews yet. Share your story
                    to guide fellow musicians.
                  </p>
                </div>
              </div>
              <Link href="/review-a-business" className="flex-shrink-0">
                <Button>Write a Review</Button>
              </Link>
            </div>
          )}
        </TabsContent>

        <TabsContent value="photos">
          <div className="py-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold mb-2">
              Photos{" "}
              <span className="text-[#8D9A99]">({myPhotos?.length})</span>
            </h3>
          </div>
          {myPhotos?.length > 0 ? (
            <div className="grid grid-cols-4 gap-5">
              {myPhotos?.map(
                (photo: {
                  business: { name: string; logo: string; price: number };
                  images: { url: string; status: string }[];
                }) => (
                  <div
                    key={photo?.business.name}
                    className="p-4 space-y-4 border shadow-md rounded-md"
                  >
                    <div>
                      {photo?.images?.map((image) => (
                        <div key={image?.url} className="relative">
                          <Image
                            src={image.url}
                            alt="Photo"
                            width={200}
                            height={200}
                            className="w-full aspect-[5/4] rounded-lg object-cover"
                          />
                          <div className="absolute right-2 top-2 flex gap-1 items-center">
                            <p className="bg-white text-black rounded-md px-4 py-1">
                              {image.status}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ),
              )}
            </div>
          ) : (
            <div className="flex justify-between items-center bg-[#F7F8F8] p-6 rounded-md">
              <div className="flex items-center gap-4">
                <Image
                  src="/images/photo.png"
                  alt="No photos yet"
                  width={300}
                  height={300}
                  className="h-16 w-16 object-contain"
                />
                <div className="space-y-2">
                  <h4 className="text-xl font-semibold">No Photos Uploaded</h4>
                  <p>
                    Help other musicians by sharing pictures of your repair
                    experience and favorite shops
                  </p>
                </div>
              </div>
              <Link href="/review-a-business" className="flex-shrink-0">
                <Button>Upload Photos</Button>
              </Link>
            </div>
          )}
        </TabsContent>

        <TabsContent value="businesses">
          <div className="py-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold mb-2">
              Businesses{" "}
              <span className="text-[#8D9A99]">({myBusinesses?.length})</span>
            </h3>
            {myBusinesses?.length > 0 && <Button>Add a Business</Button>}
          </div>
          {myBusinesses?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {myBusinesses.map((business: Business) => (
                <BusinessCard key={business._id} business={business} />
              ))}
            </div>
          ) : (
            <div className="flex justify-between items-center bg-[#F7F8F8] p-6 rounded-md">
              <div className="flex items-center gap-4">
                <Image
                  src="/images/business.png"
                  alt="No photos yet"
                  width={300}
                  height={300}
                  className="h-16 w-16 object-contain"
                />
                <div className="space-y-2">
                  <h4 className="text-xl font-semibold">No Business Added</h4>
                  <p>
                    Know a hidden gem? Add it to support our music community
                  </p>
                </div>
              </div>
              <Link href="/add-a-business" className="flex-shrink-0">
                <Button>Add Business</Button>
              </Link>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Edit Review Modal */}
      <EditReviewModal
        isOpen={!!editingReview}
        setIsOpen={() => setEditingReview(null)}
        review={editingReview}
        onSuccess={handleEditSuccess}
        token={token || ""}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Review</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>
              Are you sure you want to delete this review? This action cannot be
              undone.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              disabled={deleteMutation.isPending}
              variant="destructive"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
