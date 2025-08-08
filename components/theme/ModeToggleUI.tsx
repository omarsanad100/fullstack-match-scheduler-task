import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

type ModeToggleUIProps = {
  theme: string | undefined;
  toggleTheme: () => void;
};

const ModeToggleUI = ({ theme, toggleTheme }: ModeToggleUIProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !theme) return null;

  return (
    <Button
      size="icon"
      onClick={toggleTheme}
      variant="outline"
      className={`relative cursor-pointer ${
        theme === "dark"
          ? "bg-slate-100 text-white"
          : "bg-gradient-to-r from-slate-800 via-slate-600 to-slate-400 text-white"
      }`}
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-white" />
      ) : (
        <Moon className="w-5 h-5 text-white" />
      )}
    </Button>
  );
};

export default ModeToggleUI;
