import { useState } from "react";

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
    <div className="rounded-xl border bg-white p-6 shadow">

      <h2 className="mb-5 text-2xl font-semibold">
        Leave a Review
      </h2>

      <div className="mb-5">

        <label className="mb-2 block font-medium">
          Rating
        </label>

        <select
          value={rating}
          onChange={(e) =>
            setRating(Number(e.target.value))
          }
          className="w-full rounded-lg border p-3"
        >
          {[5, 4, 3, 2, 1].map((value) => (
            <option
              key={value}
              value={value}
            >
              {value} Star{value > 1 ? "s" : ""}
            </option>
          ))}
        </select>

      </div>

      <div className="mb-6">

        <label className="mb-2 block font-medium">
          Comment
        </label>

        <textarea
          rows={4}
          value={comment}
          onChange={(e) =>
            setComment(e.target.value)
          }
          className="w-full rounded-lg border p-3"
          placeholder="Share your experience..."
        />

      </div>

      <Button
        className="w-full"
        disabled={isPending}
        onClick={submit}
      >
        {isPending
          ? "Submitting..."
          : "Submit Review"}
      </Button>

    </div>
  );
};

export default ReviewForm;