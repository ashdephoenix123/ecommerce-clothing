import React from "react";
import Header from "./Header";
import Image from "next/image";
import Link from "next/link";

const popularCategories = [
  {
    id: 1,
    label: `Men's Clothing`,
    image: `/catagories/men-clothing.jpg`,
    link: "/tshirts",
  },
  {
    id: 2,
    label: `Women's Clothing`,
    image: `/catagories/women-clothing.jpg`,
    link: "/tshirts",
  },
  {
    id: 3,
    label: `T-Shirts`,
    image: `/catagories/tshirts.jpg`,
    link: "/tshirts",
  },
  {
    id: 4,
    label: `Hoodies`,
    image: `/catagories/hoodies.jpg`,
    link: "/tshirts",
  },
  {
    id: 5,
    label: `Mugs`,
    image: `/catagories/mugs.jpg`,
    link: "/tshirts",
  },
  {
    id: 6,
    label: `Stickers`,
    image: `/catagories/stickers.jpg`,
    link: "/tshirts",
  },
  {
    id: 7,
    label: `Shoes`,
    image: `/catagories/shoes.jpg`,
    link: "/tshirts",
  },
  {
    id: 8,
    label: `Headphones`,
    image: `/catagories/headphones.jpg`,
    link: "/tshirts",
  },
];

const PopularCategories = () => {
  const allCategories = popularCategories.map((cat) => (
    <Link href={cat.link} key={cat.id} className="space-y-4">
      <Image
        src={cat.image}
        alt={cat.label + " image"}
        width={340}
        height={320}
        className="w-full h-96 object-cover rounded-2xl"
      />
      <p className="text-center">{cat.label}</p>
    </Link>
  ));
  return (
    <section className="container space-y-12">
      <Header className="font-semibold text-5xl text-center" element="h2">
        Popular Categories
      </Header>

      <div className="md:container md:grid grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-8">
        {allCategories}
      </div>
    </section>
  );
};

export default PopularCategories;
