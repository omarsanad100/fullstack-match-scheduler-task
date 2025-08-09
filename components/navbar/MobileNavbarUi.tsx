import React from "react";
import { HomeIcon, MenuIcon, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Link from "next/link";

type Props = {
  showMobileMenu: boolean;
  setShowMobileMenu: (open: boolean) => void;
  mounted: boolean;
  theme: string | undefined;
  toggleTheme: () => void;
  closeMobileMenu: () => void;
};

const MobileNavbarUi = ({
  showMobileMenu,
  closeMobileMenu,
  setShowMobileMenu,
  mounted,
  theme,
  toggleTheme,
}: Props) => (
  <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
    <SheetTrigger asChild>
      <Button variant="ghost" className="lg:hidden cursor-pointer">
        <MenuIcon />
      </Button>
    </SheetTrigger>
    <SheetContent
      side="right"
      className="w-64 bg-white/40 dark:bg-gray-900/30 backdrop-blur-md shadow-lg border-l border-gray-200 dark:border-gray-800"
    >
      <SheetHeader>
        <SheetTitle className="text-lg font-semibold tracking-wide ">
          Menu
        </SheetTitle>
      </SheetHeader>

      <nav className="mt-6 flex flex-col space-y-4">
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="flex items-center text-gray-800 dark:text-gray-100 transition "
        >
          <Button className="bg-transparent text-black dark:text-white hover:bg-white/80 dark:hover:bg-black/30 cursor-pointer w-[100%]">
            <HomeIcon className="w-5 h-5 mr-2 " />
            Matches
          </Button>
        </Link>

        <Button
          variant="ghost"
          onClick={toggleTheme}
          className="flex items-center gap-2 text-gray-800 dark:text-gray-100 hover:text-primary transition cursor-pointer"
        >
          {mounted &&
            (theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            ))}
          Toggle Theme
        </Button>
      </nav>
    </SheetContent>
  </Sheet>
);

export default MobileNavbarUi;
