import type { Review } from "../../services/reviewService";

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({
  review,
}: ReviewCardProps) => {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">

      <div className="mb-3 flex items-center justify-between">

        <h3 className="font-semibold">
          {review.buyer}
        </h3>

        <span className="text-yellow-500">
          {"⭐".repeat(review.rating)}
        </span>

      </div>

      <p className="text-gray-700">
        {review.comment}
      </p>

      <p className="mt-4 text-sm text-gray-500">
        {new Date(
          review.created_at
        ).toLocaleDateString()}
      </p>

    </div>
  );
};

export default ReviewCard;