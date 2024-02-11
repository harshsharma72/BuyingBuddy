"use client";

import { products } from "@/data/products.json";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "@/components/Products";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  source: string;
};

const ComparePage = ({ params: { id } }: { params: { id: number } }) => {
  const product = products.find((product) => product.id === +id);
  const router = useRouter();

  if (!product) {
    router.push("/");
    return null;
  }
  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    thumbnail,
    images,
    source,
  } = product;

  const compare = products.find(
    (product) =>
      product.id !== +id &&
      product.title === title &&
      product.source !== source,
  );
  return (
    <div className="grid max-h-[32rem] grid-cols-2 gap-8 overflow-y-auto px-4">
      <ProductCompareView {...product} />
      {compare && <ProductCompareView {...compare} />}
    </div>
  );
};

const ProductCompareView = ({
  id,
  title,
  description,
  price,
  discountPercentage,
  rating,
  stock,
  brand,
  category,
  thumbnail,
  images,
  source,
}: Product) => {
  return (
    <div className="grid">
      <div className="flex h-64 w-64 flex-col items-center justify-center place-self-center">
        <Image
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover"
          height={500}
          width={500}
        />
      </div>
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="mb-4 text-sm font-bold text-gray-400">
          {brand} | {category}
        </p>
        {discountPercentage ? (
          <div className="mb-4 flex items-center">
            <p className="text-2xl font-bold text-primary">
              £{(price * (1 - discountPercentage / 100)).toFixed(2)}
            </p>
            <p className="ml-4 text-xl font-bold text-gray-400 line-through">
              £{price}
            </p>
          </div>
        ) : (
          <p className="text-2xl font-bold text-red-600">£{price}</p>
        )}

        <p className="mb-4 text-xl font-bold text-gray-400">
          Rating {rating} / 5
        </p>

        <p className="text-muted-foreground">{description}</p>

        <p className="text-xl font-bold text-gray-400">
          Source:{" "}
          {source === "A" ? (
            <Button variant="link">
              <Link href="amazon.com">Amazon</Link>
            </Button>
          ) : (
            <Button variant="link">
              <Link href="ebay.com">eBay</Link>
            </Button>
          )}
        </p>

        <Button
          className="w-full"
          variant="default"
          onClick={() => console.log("add to cart")}
        >
          Add to cart
        </Button>
        <Link href={`/product/${id}`}>
          <Button className="\ mt-4 w-full" variant="outline">
            View Product
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ComparePage;
