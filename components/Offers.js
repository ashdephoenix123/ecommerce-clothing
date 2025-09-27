import React from "react";
import Header from "./Header";
import Listings from "./Home/Listings";

const Offers = ({ heading, subHeading, options }) => {
  return (
    <div className="my-12">
      <div className="mx-6 md:mx-14">
        <p className="uppercase font-semibold text-2xl text-neutral-500">
          {heading}
        </p>
        <Header className="font-semibold text-4xl !mt-4" element="h2">
          {subHeading}
        </Header>
      </div>
      <Listings
        categories={options}
        options={{
          slidesToShow: 5,
          responsive: [
            {
              breakpoint: 1025,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
              },
            },
          ],
        }}
        className="h-[250px] md:h-[300px]"
      />
    </div>
  );
};

export default Offers;
