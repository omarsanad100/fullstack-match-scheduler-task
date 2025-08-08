"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import MobileNavbarUi from "./MobileNavbarUi";

const MobileNavbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  return (
    <MobileNavbarUi
      showMobileMenu={showMobileMenu}
      setShowMobileMenu={setShowMobileMenu}
      mounted={mounted}
      theme={theme}
      toggleTheme={toggleTheme}
      closeMobileMenu={closeMobileMenu}
    />
  );
};

export default MobileNavbar;
