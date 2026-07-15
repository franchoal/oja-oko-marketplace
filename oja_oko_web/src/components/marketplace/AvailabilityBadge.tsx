interface AvailabilityBadgeProps {
  isAvailable: boolean;
}

const AvailabilityBadge = ({
  isAvailable,
}: AvailabilityBadgeProps) => {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
        isAvailable
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {isAvailable ? "Available" : "Out of Stock"}
    </span>
  );
};

export default AvailabilityBadge;