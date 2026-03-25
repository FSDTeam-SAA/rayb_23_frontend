// components/shared/edit-review-modal.tsx
"use client";

import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { ImageUp, Loader, X } from "lucide-react";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import ReactStars from "react-stars";
import { toast } from "sonner";

interface Review {
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

interface EditReviewModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  review: Review | null;
  onSuccess: () => void;
  token: string;
}

const EditReviewModal: React.FC<EditReviewModalProps> = ({
  isOpen,
  setIsOpen,
  review,
  onSuccess,
  token,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [charCount, setCharCount] = useState(0);

  const maxImages = 5;

  // Load review data when modal opens
  useEffect(() => {
    if (isOpen && review) {
      setRating(review.rating);
      setFeedback(review.feedback);
      setCharCount(review.feedback.length);
      setExistingImages(review.image || []);
      setImagePreviews([]);
      setImageFiles([]);
      setImagesToDelete([]);
      setError(null);
    }
  }, [isOpen, review]);

  const ratingChanged = (newRating: number) => {
    setRating(newRating);
    setError(null);
  };

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 200) {
      setFeedback(value);
      setCharCount(value.length);
    }
    setError(null);
  };

  const handleUploadImage = () => {
    const totalCurrentImages = existingImages.length + imageFiles.length;
    if (totalCurrentImages >= maxImages) {
      setError(`You can only upload a maximum of ${maxImages} images.`);
      return;
    }
    const input = document.getElementById("edit_image_input");
    if (input) input.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    const totalImages =
      existingImages.length + imageFiles.length + newFiles.length;

    if (totalImages > maxImages) {
      setError(`You can only upload a maximum of ${maxImages} images.`);
      return;
    }

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setImageFiles((prev) => [...prev, ...newFiles]);
    setImagePreviews((prev) => [...prev, ...newPreviews]);
    setError(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (!files) return;

    const newFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/"),
    );
    const totalImages =
      existingImages.length + imageFiles.length + newFiles.length;

    if (totalImages > maxImages) {
      setError(`You can only upload a maximum of ${maxImages} images.`);
      return;
    }

    if (newFiles.length === 0) {
      setError("Please drop valid image files.");
      return;
    }

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setImageFiles((prev) => [...prev, ...newFiles]);
    setImagePreviews((prev) => [...prev, ...newPreviews]);
    setError(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemoveExistingImage = (imageUrl: string, index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
    setImagesToDelete((prev) => [...prev, imageUrl]);
    setError(null);
  };

  const handleRemoveNewImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setError(null);
  };

  const editMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("rating", rating.toString());
      formData.append("feedback", feedback);

      // Send existing images to keep
      existingImages.forEach((image) => {
        formData.append(`existingImages`, image);
      });

      // Send images to delete
      imagesToDelete.forEach((image) => {
        formData.append("imagesToDelete", image);
      });

      // Send new images
      imageFiles.forEach((file) => {
        formData.append("images", file);
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/review/edit/${review?._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update review");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Review updated successfully");
      onSuccess();
      setIsOpen(false);
      // Reset form
      setRating(0);
      setFeedback("");
      setImageFiles([]);
      setImagePreviews([]);
      setExistingImages([]);
      setImagesToDelete([]);
      setError(null);
    },
    onError: (error: Error) => {
      setError(
        error.message || "Something went wrong while updating your review.",
      );
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!rating) {
      setError("Please provide a rating.");
      return;
    }

    if (!feedback || feedback.trim().length === 0) {
      setError("Please write your feedback.");
      return;
    }

    await editMutation.mutateAsync();
  };

  const closeError = () => {
    setError(null);
  };

  if (!isOpen || !review) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/25 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md lg:max-w-[720px] overflow-y-auto rounded-lg shadow-lg p-6 relative max-h-[90vh]">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-[28px] font-semibold">Edit Review</h1>
              <p className="text-lg text-gray-600">
                Update your feedback for this music repair shop
              </p>
            </div>

            {/* Rating */}
            <div className="flex justify-center">
              <ReactStars
                onChange={ratingChanged}
                count={5}
                value={rating}
                size={50}
                color2={"#f4c320"}
              />
            </div>

            {/* Write feedback */}
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Your Feedback
              </label>
              <textarea
                placeholder="Please write your feedback"
                name="feedback"
                value={feedback}
                onChange={handleFeedbackChange}
                maxLength={200}
                className="mt-2 w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm focus:outline-none h-[100px]"
              />
              <p className="text-sm text-gray-500 mt-1">
                {200 - charCount} characters remaining
              </p>
            </div>

            {/* Upload image */}
            <div className="w-full h-[102px]">
              <input
                type="file"
                id="edit_image_input"
                className="hidden"
                multiple
                accept="image/*"
                onChange={handleFileChange}
              />
              <div
                className={`w-full h-full flex items-center justify-center flex-col gap-4 rounded-md cursor-pointer bg-[#F8F8F8] mt-4 text-teal-600 border border-dashed border-teal-600 ${
                  isDragging ? "bg-teal-100" : ""
                }`}
                onClick={handleUploadImage}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <ImageUp className="text-5xl" />
                <p className="text-center text-xl">
                  Upload Photos or Drag & Drop (Max {maxImages})
                </p>
                <p className="text-sm text-gray-500">
                  {existingImages.length + imageFiles.length} / {maxImages}{" "}
                  images used
                </p>
              </div>
            </div>

            {/* Image previews */}
            {(existingImages.length > 0 || imagePreviews.length > 0) && (
              <div className="grid grid-cols-3 gap-5 lg:grid-cols-5">
                {/* Existing images */}
                {existingImages.map((image, index) => (
                  <div
                    key={`existing-${index}`}
                    className="relative w-[102px] h-[102px] rounded-lg overflow-hidden mt-4 group"
                  >
                    <Image
                      src={image}
                      alt={`existing-image-${index}`}
                      width={1000}
                      height={1000}
                      className="w-full h-full object-cover"
                    />
                    <MdDelete
                      className="text-[2rem] text-white bg-[#000000ad] p-1 absolute top-1 right-1 rounded cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemoveExistingImage(image, index)}
                    />
                  </div>
                ))}

                {/* New images */}
                {imagePreviews.map((image, index) => (
                  <div
                    key={`new-${index}`}
                    className="relative w-[102px] h-[102px] rounded-lg overflow-hidden mt-4 group"
                  >
                    <Image
                      src={image}
                      alt={`new-image-${index}`}
                      width={1000}
                      height={1000}
                      className="w-full h-full object-cover"
                    />
                    <MdDelete
                      className="text-[2rem] text-white bg-[#000000ad] p-1 absolute top-1 right-1 rounded cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemoveNewImage(index)}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 lg:max-w-md mx-auto">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex-1 border border-gray-300 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`flex-1 bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition ${
                  editMutation.isPending && "opacity-70"
                }`}
                disabled={editMutation.isPending}
              >
                {editMutation.isPending ? (
                  <span className="flex items-center justify-center">
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </span>
                ) : (
                  "Update Review"
                )}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md relative">
                <div className="flex items-center">
                  <span className="flex-1">{error}</span>
                  <button
                    type="button"
                    onClick={closeError}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditReviewModal;
