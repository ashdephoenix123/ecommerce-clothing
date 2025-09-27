import React from "react";
import { Merriweather } from "next/font/google";
const merriweather = Merriweather({ subsets: ["latin"], weight: "400" });

const Header = ({ element = "div", className = "", children }) => {
  const Element = element;
  return (
    <Element className={`${merriweather.className} ${className}`}>
      {children}
    </Element>
  );
};

export default Header;
