import ThemeSwitcher from "./themeMode";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-16 flex items-center justify-between px-4 bg-white dark:bg-gray-800 shadow-md z-50">
      <div className="container flex items-center space-x-4">
        <div className="text-xl font-bold text-[#2563eb]">AuthStream</div>
      </div>
      <div className="flex items-center space-x-2 ">
        <ThemeSwitcher />
        <div className="font-bold">Documentation</div>
      </div>
    </header>
  );
};

export default Header;
