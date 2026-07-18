interface PaginationProps {
  page: number;

  total: number;

  pageSize: number;

  onPageChange: (
    page: number
  ) => void;
}

const Pagination = ({
  page,
  total,
  pageSize,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(
    total / pageSize
  );

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-10 flex items-center justify-center gap-2">

      <button
        disabled={page === 1}
        onClick={() =>
          onPageChange(page - 1)
        }
        className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        ← Previous
      </button>

      {Array.from(
        {
          length: totalPages,
        },
        (_, i) => (
          <button
            key={i}
            onClick={() =>
              onPageChange(i + 1)
            }
            className={`rounded-lg px-4 py-2 ${
              page === i + 1
                ? "bg-green-600 text-white"
                : "border"
            }`}
          >
            {i + 1}
          </button>
        )
      )}

      <button
        disabled={
          page === totalPages
        }
        onClick={() =>
          onPageChange(page + 1)
        }
        className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next →
      </button>

    </div>
  );
};

export default Pagination;