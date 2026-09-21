import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import logoWhite from "../assets/logo-white.png";
import { useTheme } from "../context/ThemeContext";

interface SubItem {
    name: string;
    path: string;
    subItems?: { name: string; path: string }[];
}

interface NavLinkItem {
    name: string;
    path: string;
    dropdown?: SubItem[];
}

const Navbar = () => {
    const { pathname } = useLocation();
    const leftLinks: NavLinkItem[] = [
        {
            name: "DISCOVER AIMS",
            path: "#",
            dropdown: [
                {
                    name: "The AIMS Story",
                    path: "#",
                    subItems: [
                        { name: "About Hospital", path: "/about-hospital" },
                        { name: "About Institution", path: "/about-institution" },
                        { name: "Awards & Achivements", path: "#" },
                    ],
                },
                {
                    name: "Leadership",
                    path: "/founder",
                    subItems: [
                        { name: "Founder", path: "/founder" },
                        { name: "Management", path: "/management" },
                    ],
                },
                {
                    name: "Committees",
                    path: "#",
                    subItems: [
                        { name: "Medical Educational Unit", path: "/committess/meu" },
                        { name: "Scientific Committee", path: "/committess/scientific" },
                        { name: "Anti Ragging Committee", path: "/committess/anti-ragging" },
                        { name: "Ethics Committee", path: "/committess/ethics" },
                        { name: "POSH Internal Committee", path: "/committess/posh-internal" },
                        { name: "Pharmacvigilance Committee", path: "/committess/pharmacovigilance" },
                        { name: "Disciplinary Committee", path: "/committess/disciplinary" },
                    ],
                },
                {
                    name: "Media Center",
                    path: "#",
                    subItems: [
                        { name: "AIMS in the News", path: "/aims-in-the-news" },
                        { name: "Media Gallery", path: "/media-gallery" },
                    ],
                },
                {
                    name: "Accreditations and Approvals",
                    path: "#",
                    subItems: [
                        { name: "Accreditation", path: "#" },
                        { name: "excellence", path: "#" },
                    ],
                },
            ],
        },
        {
            name: "ACADEMICS",
            path: "#",
            dropdown: [
                {
                    name: "Programs Offered",
                    path: "#",
                    subItems: [
                        { name: "Undergraduate (MBBS)", path: "#" },
                        { name: "Postgraduate (MD/MS)", path: "#" },
                        { name: "Nursing & Allied Sciences", path: "#" },
                    ],
                },
                {
                    name: "Departments",
                    path: "/departments",
                    subItems: [
                        { name: "Pre-Clinical", path: "/departments?category=Pre-Clinical" },
                        { name: "Para-Clinical", path: "/departments?category=Para-Clinical" },
                        { name: "Clinical", path: "/departments?category=Clinical" },
                    ],
                },
                { name: "Admissions Process", path: "#" },
                { name: "Academic Calendar", path: "#" },
            ],
        },
    ];

    const rightLinks: NavLinkItem[] = [
        {
            name: "MEDICAL SERVICES",
            path: "#",
            dropdown: [
                {
                    name: "Departments",
                    path: "#",
                    subItems: [
                        { name: "Cardiology", path: "#" },
                        { name: "Neurology", path: "#" },
                        { name: "General Surgery", path: "#" },
                    ],
                },
                { name: "Emergency & Trauma", path: "#" },
                { name: "Diagnostics & Imaging", path: "#" },
            ],
        },
        {
            name: "HEALTH LIBRARY",
            path: "#",
            dropdown: [
                {
                    name: "Clinical Research",
                    path: "#",
                    subItems: [
                        { name: "Medical Journals", path: "#" },
                        { name: "Research Ethics", path: "#" },
                    ],
                },
                { name: "Patient Education", path: "#" },
                { name: "Health Bulletins", path: "#" },
            ],
        },
    ];

    const { theme, toggleTheme } = useTheme();
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const isWhiteTheme = theme === "dark" ? false : (pathname !== "/" || isScrolled);

    React.useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.scrollY || document.documentElement.scrollTop;
            setIsScrolled(scrollPos > 10);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const ChevronDown = () => (
        <svg
            className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180 opacity-70 group-hover:opacity-100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
    );

    const ChevronRight = () => (
        <svg
            className={`w-3.5 h-3.5 ml-auto transition-all duration-200 ${
                isWhiteTheme
                    ? "text-gray-400 group-hover/sub:text-gray-900 group-hover/sub:translate-x-0.5"
                    : "text-white/45 group-hover/sub:text-white group-hover/sub:translate-x-0.5"
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
    );

    // Uniform glass style applied to both Level 1 and Level 2 background layers
    const dropdownGlassBackground = isWhiteTheme
        ? "bg-white/98 backdrop-blur-2xl rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.05)] border border-black/5"
        : "bg-black/60 glass-dropdown-card backdrop-blur-2xl rounded-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.25)]";

    const dropdownItemClass = isWhiteTheme
        ? "text-gray-700 hover:text-black hover:bg-gray-100/80 rounded-xl"
        : "text-white/85 hover:text-white hover:bg-white/20 rounded-xl";

    const renderDesktopNavItem = (link: NavLinkItem, idx: number) => {
        const activeHoverPill = isWhiteTheme
            ? "text-gray-800 hover:text-black group-hover:bg-gray-100/90"
            : "text-white/90 hover:text-white group-hover:bg-white/15 group-hover:backdrop-blur-xl group-hover:border-white/25 group-hover:shadow-[0_4px_20px_rgba(0,0,0,0.15),inset_0_1px_0_0_rgba(255,255,255,0.35)]";

        return (
            <div key={idx} className="relative group inline-flex items-center">
                {/* Menu Button */}
                <Link
                    to={link.path}
                    className={`relative z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full font-semibold tracking-wider text-xs lg:text-sm border border-transparent transition-all duration-300 ease-out ${activeHoverPill}`}
                >
                    <span>{link.name}</span>
                    <ChevronDown />
                </Link>

                {/* Level 1 Dropdown */}
                {link.dropdown && (
                    <div className="absolute left-0 top-[calc(100%+4px)] hidden group-hover:block w-64 z-50 before:absolute before:-top-3 before:left-0 before:w-full before:h-4">
                        {/* Level 1 Independent Glass Background */}
                        <div
                            className={`absolute inset-0 pointer-events-none -z-10 ${dropdownGlassBackground}`}
                            style={{ backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
                        />

                        {/* Level 1 Items (Non-nested backdrop container) */}
                        <div className="p-1.5 relative text-white">
                            {link.dropdown.map((item, itemIdx) => (
                                <div key={itemIdx} className="relative group/sub">
                                    <Link
                                        to={item.path}
                                        className={`flex items-center justify-between px-3.5 py-2.5 text-xs font-medium transition-all duration-150 ${dropdownItemClass}`}
                                    >
                                        <span>{item.name}</span>
                                        {item.subItems && <ChevronRight />}
                                    </Link>

                                    {/* Level 2 Sub-Dropdown (Independent Glass Background) */}
                                    {item.subItems && (
                                        <div className="absolute left-[calc(100%+4px)] -top-1.5 hidden group-hover/sub:block w-max min-w-56 z-50 before:absolute before:top-0 before:-left-3 before:w-4 before:h-full">
                                            {/* Level 2 Independent Glass Background (Not nested in Level 1 backdrop) */}
                                            <div
                                                className={`absolute inset-0 pointer-events-none -z-10 ${dropdownGlassBackground}`}
                                                style={{ backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
                                            />

                                            {/* Level 2 Items */}
                                            <div className="p-1.5 relative text-white">
                                                {item.subItems.map((sub, subIdx) => (
                                                    <Link
                                                        key={subIdx}
                                                        to={sub.path}
                                                        className={`block whitespace-nowrap px-3.5 py-2 text-xs font-medium transition-all duration-150 ${dropdownItemClass}`}
                                                    >
                                                        {sub.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            <style>{`
                .glass-dropdown-card {
                    backdrop-filter: blur(24px);
                    -webkit-backdrop-filter: blur(24px);
                }
            `}</style>

            <nav
                className={`fixed top-0 left-0 w-full px-6 md:px-12 lg:px-20 font-['Inter',sans-serif] transition-colors duration-300 z-50 ${
                    theme === "dark" ? "text-white" : isWhiteTheme ? "text-gray-900" : "text-white"
                }`}
            >
                {/* Navbar Bar Background Layer (Separated so child dropdowns can sample real background backdrop) */}
                <div
                    className={`absolute inset-0 -z-10 pointer-events-none transition-all duration-300 ${
                        theme === "dark"
                            ? isScrolled
                                ? "bg-black/40 backdrop-blur-2xl border-b border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)]"
                                : "bg-transparent border-b border-transparent shadow-none"
                            : isWhiteTheme
                            ? "bg-white/98 backdrop-blur-md shadow-sm border-b border-transparent"
                            : "bg-transparent border-b border-transparent"
                    }`}
                />
                <div className="max-w-7xl mx-auto flex items-center justify-between md:justify-center relative">
                    {/* Left Desktop Links */}
                    <div className="hidden md:flex items-center gap-2 lg:gap-3 h-16">
                        {leftLinks.map(renderDesktopNavItem)}
                    </div>

                    {/* Center Logo */}
                    <Link to="/#" className="flex items-center justify-center mx-6 py-2">
                        <img
                            src={isWhiteTheme ? logo : logoWhite}
                            alt="Arundathi Institute of Medical Sciences & Hospital"
                            className="h-10 md:h-11 w-auto object-contain transition-colors duration-300 drop-shadow-sm"
                        />
                    </Link>

                    {/* Right Desktop Links */}
                    <div className="hidden md:flex items-center gap-2 lg:gap-3 h-16">
                        {rightLinks.map(renderDesktopNavItem)}
                    </div>

                    {/* Theme Toggle (Desktop - positioned to the right) */}
                    <div className="hidden md:flex items-center absolute -right-4 md:-right-8 lg:-right-12 xl:-right-16 top-1/2 -translate-y-1/2">
                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle Glass Theme"
                            title={theme === "dark" ? "Switch to Soft Light Theme" : "Switch to Glass Dark Theme"}
                            className={`flex items-center w-14 h-7 p-1 rounded-full transition-all duration-300 cursor-pointer ${
                                theme === "dark"
                                    ? "bg-black/50 backdrop-blur-xl border border-white/30 shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.25)]"
                                    : "bg-black/10 hover:bg-black/15 border border-black/10 backdrop-blur-sm"
                            }`}
                        >
                            <span
                                className={`flex items-center justify-center w-5 h-5 rounded-full transition-all duration-300 transform shadow-sm ${
                                    theme === "dark"
                                        ? "translate-x-7 bg-white text-[#0a1120]"
                                        : "translate-x-0 bg-white text-amber-500 shadow"
                                }`}
                            >
                                {theme === "dark" ? (
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                    </svg>
                                ) : (
                                    <svg className="w-3.2 h-3.2 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </span>
                        </button>
                    </div>

                    {/* Mobile Controls: Theme Toggle & Menu Button */}
                    <div className="flex md:hidden items-center gap-2.5 py-3">
                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle Glass Theme"
                            className={`flex items-center w-12 h-6 p-0.5 rounded-full transition-all duration-300 cursor-pointer ${
                                theme === "dark"
                                    ? "bg-black/50 backdrop-blur-xl border border-white/30"
                                    : "bg-black/10 border border-black/10"
                            }`}
                        >
                            <span
                                className={`flex items-center justify-center w-5 h-5 rounded-full transition-all duration-300 transform shadow-sm ${
                                    theme === "dark"
                                        ? "translate-x-6 bg-white text-[#0a1120]"
                                        : "translate-x-0 bg-white text-amber-500"
                                }`}
                            >
                                {theme === "dark" ? (
                                    <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                    </svg>
                                ) : (
                                    <svg className="w-2.5 h-2.5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </span>
                        </button>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`p-2 rounded-full focus:outline-none transition-all duration-200 ${
                                theme === "dark"
                                    ? "text-white bg-black/25 backdrop-blur-md border border-white/20 hover:bg-black/40"
                                    : isWhiteTheme
                                    ? "text-gray-900 hover:bg-gray-100"
                                    : "text-white bg-black/25 backdrop-blur-md border border-white/20 hover:bg-black/40"
                            }`}
                            aria-label="Toggle Menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <line x1="4" y1="6" x2="20" y2="6" />
                                <line x1="4" y1="12" x2="20" y2="12" />
                                <line x1="4" y1="18" x2="20" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Drawer */}
                <div
                    className={`fixed top-0 left-0 w-full h-screen flex flex-col justify-start items-start px-8 pt-20 gap-6 text-sm font-semibold tracking-wide transition-transform duration-300 md:hidden overflow-y-auto ${
                        isMenuOpen ? "translate-x-0" : "-translate-x-full"
                    } ${
                        theme === "dark"
                            ? "bg-[#070d18]/95 backdrop-blur-2xl text-white border-r border-white/10"
                            : isWhiteTheme
                            ? "bg-white text-gray-900 shadow-2xl"
                            : "bg-black/80 backdrop-blur-2xl text-white border-r border-white/10"
                    }`}
                >
                    <button
                        aria-label="Close menu"
                        className={`absolute top-6 right-6 p-2 rounded-full ${
                            theme === "dark"
                                ? "text-white bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20"
                                : isWhiteTheme
                                ? "text-gray-800 hover:bg-gray-100"
                                : "text-white bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>

                    {[...leftLinks, ...rightLinks].map((link, idx) => (
                        <div key={idx} className="w-full flex flex-col gap-2">
                            <span
                                className={`font-bold border-b pb-1 ${
                                    isWhiteTheme
                                        ? "text-gray-900 border-gray-200"
                                        : "text-white border-white/20"
                                }`}
                            >
                                {link.name}
                            </span>
                            <div className="pl-2 flex flex-col gap-2">
                                {link.dropdown?.map((item, itemIdx) => (
                                    <div key={itemIdx} className="flex flex-col gap-1">
                                        {item.path && item.path !== "#" ? (
                                            <Link
                                                to={item.path}
                                                onClick={() => setIsMenuOpen(false)}
                                                className={`text-xs font-semibold py-0.5 transition-colors ${
                                                    isWhiteTheme ? "text-gray-800 hover:text-black" : "text-white/90 hover:text-white"
                                                }`}
                                            >
                                                {item.name}
                                            </Link>
                                        ) : (
                                            <span
                                                className={`text-xs font-semibold ${
                                                    isWhiteTheme ? "text-gray-800" : "text-white/90"
                                                }`}
                                            >
                                                {item.name}
                                            </span>
                                        )}
                                        {item.subItems && (
                                            <div
                                                className={`pl-3 border-l flex flex-col gap-1 ${
                                                    isWhiteTheme ? "border-gray-200" : "border-white/20"
                                                }`}
                                            >
                                                {item.subItems.map((sub, subIdx) => (
                                                    <Link
                                                        key={subIdx}
                                                        to={sub.path}
                                                        onClick={() => setIsMenuOpen(false)}
                                                        className={`text-xs font-normal py-0.5 transition-colors ${
                                                            isWhiteTheme
                                                                ? "text-gray-600 hover:text-black"
                                                                : "text-white/70 hover:text-white"
                                                        }`}
                                                    >
                                                        {sub.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </nav>
        </>
    );
};

export default Navbar;