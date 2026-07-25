import { useState } from "react";

import {
  MessageSquare,
  Star,
} from "lucide-react";

import { Button } from "../ui";

import { useCreateReview } from "../../hooks/useCreateReview";

interface ReviewFormProps {
  productId: number;
}

const ReviewForm = ({
  productId,
}: ReviewFormProps) => {
  const [rating, setRating] =
    useState(5);

  const [comment, setComment] =
    useState("");

  const {
    mutate,
    isPending,
  } = useCreateReview();

  const submit = () => {
    if (!comment.trim()) return;

    mutate({
      product: productId,
      rating,
      comment,
    });

    setComment("");
    setRating(5);
  };

  return (
    <section className="overflow-hidden rounded-[32px] bg-white shadow-lg">

      {/* Header */}

      <div className="border-b bg-gradient-to-r from-green-600 to-green-500 px-8 py-8 text-white">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-white/20 p-3 backdrop-blur">

            <MessageSquare size={28} />

          </div>

          <div>

            <h2 className="text-3xl font-bold">

              Leave a Review

            </h2>

            <p className="mt-2 text-green-100">

              Share your buying experience and help other customers make better decisions.

            </p>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="space-y-8 p-8">

        {/* Rating */}

        <div>

          <label className="mb-4 block text-lg font-semibold text-gray-900">

            Your Rating

          </label>

          <div className="flex flex-wrap gap-3">

            {[1, 2, 3, 4, 5].map((value) => (

              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                className={`flex h-14 w-14 items-center justify-center rounded-2xl border-2 transition-all duration-200 ${
                  rating >= value
                    ? "border-yellow-400 bg-yellow-50 text-yellow-500 shadow-md"
                    : "border-gray-200 bg-white text-gray-300 hover:border-yellow-300"
                }`}
              >

                <Star
                  size={24}
                  fill={
                    rating >= value
                      ? "currentColor"
                      : "none"
                  }
                />

              </button>

            ))}

          </div>

          <p className="mt-4 text-sm text-gray-500">

            Selected Rating:
            <span className="ml-2 font-semibold text-green-700">

              {rating} / 5

            </span>

          </p>

        </div>

        {/* Comment */}

        <div>

          <label className="mb-4 block text-lg font-semibold text-gray-900">

            Your Review

          </label>

          <textarea
            rows={6}
            value={comment}
            onChange={(e) =>
              setComment(
                e.target.value
              )
            }
            placeholder="Tell other buyers about the product quality, freshness, packaging, delivery experience and anything else that may help..."
            className="w-full rounded-2xl border border-gray-200 p-5 leading-8 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
          />

          <div className="mt-3 flex items-center justify-between">

            <span className="text-sm text-gray-500">

              {comment.length} characters

            </span>

            <span className="text-sm text-gray-400">

              Honest reviews help everyone.

            </span>

          </div>

        </div>

        {/* Submit */}

        <Button
          className="w-full py-4 text-lg font-bold"
          disabled={
            isPending ||
            !comment.trim()
          }
          onClick={submit}
        >

          {isPending
            ? "Submitting Review..."
            : "⭐ Submit Review"}

        </Button>

      </div>

    </section>
  );
};

export default ReviewForm;