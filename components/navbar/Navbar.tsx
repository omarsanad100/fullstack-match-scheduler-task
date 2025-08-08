import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  return (
    <nav className="w-full antialiased text-gray-800 bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-gray-800 dark:via-black dark:to-gray-600 transition-all duration-500 dark:text-gray-200 shadow-md rounded-b-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-end items-center h-16">
          <DesktopNavbar />
          <MobileNavbar />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
