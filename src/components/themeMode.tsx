import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

const ThemeSwitcher = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <Button variant="ghost" onClick={toggleTheme}>
            {theme === "dark" ? (
                <Sun className="w-5 h-5 text-foreground dark:text-gray-900" />
            ) : (
                <Moon className="w-5 h-5 text-foreground" />
            )}
        </Button>

    );
};

export default ThemeSwitcher;
