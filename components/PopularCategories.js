import React from "react";
import Header from "./Header";
import Image from "next/image";
import Link from "next/link";

const popularCategories = [
  {
    id: 1,
    label: `Men's Clothing`,
    image: `/Man.jpeg`,
    link: "/tshirts",
  },
  {
    id: 2,
    label: `Men's Clothing`,
    image: `/Man.jpeg`,
    link: "/tshirts",
  },
  {
    id: 3,
    label: `Women's Clothing`,
    image: `/Man.jpeg`,
    link: "/tshirts",
  },
  {
    id: 4,
    label: `Men's Clothing`,
    image: `/Man.jpeg`,
    link: "/tshirts",
  },
  {
    id: 5,
    label: `Men's Clothing`,
    image: `/Man.jpeg`,
    link: "/tshirts",
  },
  {
    id: 6,
    label: `Men's Clothing`,
    image: `/Man.jpeg`,
    link: "/tshirts",
  },
  {
    id: 7,
    label: `Men's Clothing`,
    image: `/Man.jpeg`,
    link: "/tshirts",
  },
  {
    id: 8,
    label: `Men's Clothing`,
    image: `/Man.jpeg`,
    link: "/tshirts",
  },
];

const PopularCategories = () => {
  const allCategories = popularCategories.map((cat) => (
    <Link
      href={cat.link}
      key={cat.id}
      className="rounded-2xl overflow-hidden space-y-4"
    >
      <Image
        src={cat.image}
        alt={cat.label + " image"}
        width={340}
        height={320}
        className="w-full h-96 object-cover"
      />
      <p className="text-center">{cat.label}</p>
    </Link>
  ));
  return (
    <section className="container space-y-12">
      <Header className="font-semibold text-5xl text-center" element="h2">
        Popular Categories
      </Header>

      <div className="container grid grid-cols-6 gap-x-6 gap-y-8">
        {allCategories}
      </div>
    </section>
  );
};

export default PopularCategories;
