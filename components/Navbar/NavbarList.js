import React, { useState } from "react";
import MegaMenu from "../MegaMenu";
import { menucategories } from "@/constants/menucategories";
import Link from "next/link";

const NavbarList = ({ megaMenuData }) => {
  const [menu, setMenu] = useState(null);
  const [isMegaMenuHovered, setIsMegaMenuHovered] = useState(false);

  const activateMegaMenu = (id) => {
    const hovered = megaMenuData.find((menu) => menu.category._id === id);
    setMenu(hovered);
  };

  const handleMouseLeave = () => {
    // Only hide the MegaMenu if the mouse is not hovering over it
    if (!isMegaMenuHovered) {
      setMenu(null);
    }
  };

  return (
    <ul className="justify-center items-center mx-12 hidden lg:flex">
      {megaMenuData.map((menu) => (
        <li
          key={menu.category._id}
          className="px-8 py-12 text-white uppercase font-semibold text-xl"
          onMouseOver={() => activateMegaMenu(menu.category._id)}
          onMouseLeave={handleMouseLeave}
        >
          <Link href={`/products?collection=${menu.category.slug}`}>
            {menu.category.label}
          </Link>
        </li>
      ))}
      {menu && (
        <MegaMenu
          categories={menu.menuItems}
          onClick={() => setIsMegaMenuHovered(false)}
          onMouseEnter={() => setIsMegaMenuHovered(true)}
          onMouseLeave={() => setIsMegaMenuHovered(false)}
        />
      )}
    </ul>
  );
};

export default NavbarList;
