import { useTheme } from "@/theme/ThemeProvider";
import { FiSun } from "react-icons/fi";
import { IoMoonOutline } from "react-icons/io5";
const ThemeToggler = () => {
  const { toggleTheme } = useTheme();

  return (
    <button
      aria-label="theme toggler"
      onClick={() => {
        toggleTheme();
      }}
      className="flex items-center justify-center text-black rounded-full cursor-pointer bg-gray-2 dark:bg-dark-bg h-9 w-9 dark:text-white/70 md:h-14 md:w-14"
    >
      <FiSun className="text-white w-5 h-5 stroke-current md:h-6 md:w-6 hidden dark:block" />
      <IoMoonOutline className="text-black w-5 h-5 md:h-6 md:w-6 dark:hidden" />
    </button>
  );
};

export default ThemeToggler;
