import React from "react";
import Header from "./Header";
import Image from "next/image";
import Link from "next/link";
import { popularCategories } from "@/constants/home";

const PopularCategories = () => {
  const allCategories = popularCategories.map((cat) => (
    <Link href={cat.link} key={cat.id} className="space-y-4">
      <Image
        src={cat.image}
        alt={cat.label + " image"}
        width={340}
        height={320}
        className="w-full h-[250px] md:h-[300px] object-cover"
      />
    </Link>
  ));
  return (
    <section className="m-6 md:m-14 space-y-12">
      <p className="uppercase font-semibold text-2xl text-neutral-500">
        In the spotlight
      </p>
      <Header className="font-semibold text-4xl !mt-4" element="h2">
        Hottest Brands on offer
      </Header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-8">
        {allCategories}
      </div>
    </section>
  );
};

export default PopularCategories;
