import { Product } from "@/api/api.types";
import { map } from "lodash";
import Image from "next/image";
import { useCallback } from "react";

const ProductItem = ({
  title,
  thumbnail,
  description,
  category,
  price,
  discountPercentage,
  rating,
  stock,
  brand,
  sku,
}: Product) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <Image
      src={thumbnail}
      alt={title}
      width={300}
      height={200}
      className="w-full h-48 object-cover rounded-lg mb-4"
    />
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p className="text-gray-700 mb-2">{description}</p>
    <p className="text-gray-500 text-sm mb-4">{category}</p>

    <div className="flex justify-between items-center mb-4">
      <span className="text-lg font-bold text-gray-800">
        ${price.toFixed(2)}
      </span>
      <span className="text-sm text-green-600">{discountPercentage}% off</span>
    </div>

    <div className="flex justify-between items-center mb-4">
      <span className="text-sm text-gray-600">Rating: {rating}/5</span>
      <span className="text-sm text-gray-600">Stock: {stock}</span>
    </div>

    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-600">Brand: {brand}</span>
      <span className="text-sm text-gray-600">SKU: {sku}</span>
    </div>
  </div>
);

export default function Products({ products }: { products: Product[] }) {
  const renderProduct = useCallback(
    (product: Product) => <ProductItem {...product} key={product.id} />,
    []
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {map(products, renderProduct)}
      </div>
    </div>
  );
}
