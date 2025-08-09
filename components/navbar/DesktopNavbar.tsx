import { HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ModeToggleButton from "@/components/theme/ModeToggleButton";

const DesktopNavbar = async () => {
  return (
    <nav className="hidden lg:flex items-center justify-end gap-4 w-full">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button
            variant="ghost"
            className="flex items-center gap-2 px-4 py-2 hover:text-primary transition cursor-pointer"
          >
            <HomeIcon className="h-5 w-5" />
            {/* <span className="text-sm font-medium">Matches</span> */}
          </Button>
        </Link>
      </div>
      <ModeToggleButton />
    </nav>
  );
};

export default DesktopNavbar;
