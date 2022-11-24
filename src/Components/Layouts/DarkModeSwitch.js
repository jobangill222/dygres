import React, { useEffect } from "react";
import { useThemeContext } from "./../../hooks/useThemeContext";
import { BsFillSunFill , BsMoon } from 'react-icons/bs';

const DarkModeSwitch = () => {

    const { darkMode, setDarkMode } = useThemeContext();

    const switchTheme = () => setDarkMode((prev) => !prev);

    useEffect(() => {
        darkMode
            ? document.documentElement.setAttribute("darkMode", "")
            : document.documentElement.removeAttribute("darkMode");
    }, [darkMode]);

    return (
        <div id="theme-switch" className="me-0">
            <div className="switch-track">
                <div className="switch-check">
                    <span className="switch-icon"><BsFillSunFill /></span>
                </div>
                <div className="switch-x">
                    <span className="switch-icon"><BsMoon /></span>
                </div>
                <div className="switch-thumb"></div>
            </div>

            <input
                type="checkbox"
                checked={darkMode}
                onChange={switchTheme}
                aria-label="Switch between dark and light mode"
            />
        </div>
    );


}

export default DarkModeSwitch;