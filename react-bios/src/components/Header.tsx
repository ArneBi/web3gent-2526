import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-teal-600 px-8 py-2 flex justify-end items-center gap-4 text-white">
      {/* <Link to="/favorites">Favorieten</Link> */}
      <NavLink
        to="/favorites"
        className={({ isActive }) =>
          `hover:text-amber-200  ${
            isActive ? "underline underline-offset-8" : "no-underline"
          }`
        }>
        Favorieten
      </NavLink>

      <NavLink
        to="/users"
        className={({ isActive }) =>
          `hover:text-amber-200  ${
            isActive ? "underline underline-offset-8" : "no-underline"
          }`
        }>
        Gebruikers
      </NavLink>

      <Link to="/contact">Contact</Link>
      {/* 
      <a href="/favorites">Favorieten</a> */}
    </div>
  );
};

export default Header;
