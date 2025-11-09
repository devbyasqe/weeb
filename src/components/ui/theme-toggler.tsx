"use client";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon, SystemIcon } from "../svg/theme";
import React, { useEffect, useState } from "react";
import { useHoverHighlightPosition } from "../hooks/mouse-position";
import { THoverEvent } from "../types";
import { Button } from "../ui/button";
import { motion } from "motion/react";

const THEME_MODES = [
  { icon: <SystemIcon />, label: "system" },
  { icon: <SunIcon />, label: "light" },
  { icon: <MoonIcon />, label: "dark" },
];

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  const [mount, setMount] = useState(false);
  const { handleMouseEnter, handleMouseLeave, hoverPosition } =
    useHoverHighlightPosition();

  useEffect(() => setMount(true), []);

  const handleHover = (e: THoverEvent, label: string) => {
    if (theme !== label) {
      handleMouseEnter(e);
    }
  };

  const handleClick = (e: THoverEvent, label: string) => {
    if (theme !== label) {
      setTheme(label);
      handleMouseEnter(e);
    }
  };

  if (!mount) return null;
  return (
    <div
      onMouseLeave={handleMouseLeave}
      className="relative inline-flex items-center justify-center gap-0.5"
    >
      {THEME_MODES.map(({ icon, label }) => (
        <Button
          key={label}
          size={"icon"}
          variant={null}
          disabled={theme === label}
          onClick={(e) => handleClick(e, label)}
          onMouseEnter={(e) => handleHover(e, label)}
          onFocus={(e) => handleHover(e, label)}
          className="disabled:bg-gray-accent z-10 rounded-full disabled:border"
        >
          {icon}
        </Button>
      ))}
      <motion.div
        animate={{ ...hoverPosition }}
        className="bg-gray-muted absolute rounded-full"
      />
    </div>
  );
};

export default ThemeToggler;
