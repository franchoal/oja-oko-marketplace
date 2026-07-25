import {
  CalendarDays,
  CircleUserRound,
  Star,
} from "lucide-react";

import type { Review } from "../../services/reviewService";

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({
  review,
}: ReviewCardProps) => {

  const reviewDate =
    new Date(
      review.created_at
    ).toLocaleDateString(
      "en-NG",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

  return (

    <article className="overflow-hidden rounded-[30px] border border-gray-100 bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Header */}

      <div className="flex flex-col gap-5 border-b bg-gray-50 px-8 py-6 md:flex-row md:items-center md:justify-between">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">

            <CircleUserRound
              size={28}
              className="text-green-700"
            />

          </div>

          <div>

            <h3 className="text-lg font-bold text-gray-900">

              {review.buyer}

            </h3>

            <div className="mt-2 flex items-center gap-1">

              {[1, 2, 3, 4, 5].map((star) => (

                <Star
                  key={star}
                  size={18}
                  className={
                    star <= review.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }
                />

              ))}

              <span className="ml-2 text-sm font-semibold text-gray-500">

                {review.rating}/5

              </span>

            </div>

          </div>

        </div>

        <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-gray-500 shadow-sm">

          <CalendarDays size={16} />

          {reviewDate}

        </div>

      </div>

      {/* Review */}

      <div className="px-8 py-8">

        <p className="leading-8 text-gray-700">

          {review.comment}

        </p>

      </div>

      {/* Footer */}

      <div className="border-t bg-gray-50 px-8 py-5">

        <div className="flex items-center justify-between">

          <span className="text-sm text-gray-500">

            Verified Purchase

          </span>

          <span className="rounded-full bg-green-100 px-4 py-2 text-xs font-bold uppercase tracking-wide text-green-700">

            Buyer Review

          </span>

        </div>

      </div>

    </article>

  );

};

export default ReviewCard;