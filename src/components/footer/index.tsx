import React from "react";
import ThemeToggler from "../ui/theme-toggler";

const Footer = () => (
  <section className="bg-gray-background mx-auto w-[95%] max-w-7xl transition-all duration-300 sm:max-md:max-w-160">
    <div className="flex items-center justify-between px-2 py-4 transition-all duration-300 md:px-4">
      <p className="text-sm font-bold">
        &copy; {new Date().getFullYear()} WEEB
      </p>
      <ThemeToggler />
    </div>
  </section>
);

export default Footer;
