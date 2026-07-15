interface ProductImageProps {
  image: string | null;
  name: string;
}

const ProductImage = ({
  image,
  name,
}: ProductImageProps) => {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      {image ? (
        <img
          src={image}
          alt={name}
          className="h-[450px] w-full object-cover"
        />
      ) : (
        <div className="flex h-[450px] items-center justify-center bg-gray-100">
          <span className="text-gray-400">
            No Image Available
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductImage;