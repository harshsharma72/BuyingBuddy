import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { products } from "@/data/products.json";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Combobox } from "./Combobox";

const Products = () => {
  return (
    <div>
      <div></div>
      <div className="grid h-[30rem] w-full grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] gap-4">
        {products.map((product) => (
          <Product key={product.title} {...product} />
        ))}
      </div>
    </div>
  );
};

export const Product = ({
  id,
  title,
  description,
  price,
  thumbnail,
  source,
}: {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  source: string;
  [key: string]: any;
}) => {
  return (
    <Link href={`/product/${id}`}>
      <Card>
        <CardHeader>
          <Image
            src={thumbnail}
            alt={title}
            width={500}
            height={500}
            className="place-self-center object-cover object-top"
          />
        </CardHeader>
        <CardContent>
          <CardTitle>
            <span className="[text-wrap:balance]">{title}</span>
            <span>${price}</span>
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardContent>
        <CardFooter>
          <p className="text-xl font-bold">
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
          <Button className="w-full">Add to cart</Button>
        </CardFooter>
      </Card>
    </Link>
  );
};
export default Products;
