import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import logoWhite from "../assets/logo-white.png";

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
                        { name: "Overview", path: "#" },
                        { name: "Vision & Mission", path: "#" },
                        { name: "Awards & Achivements", path: "#" },
                    ],
                },
                { name: "Leadership", path: "#" },
                {
                    name: "Committees",
                    path: "#",
                    subItems: [
                        { name: "Medical Educational Unit", path:"/committess/meu"},
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
                        { name: "AIMS in the News", path: "#" },
                        { name: "Events", path: "#" },
                        { name: "Media Gallery", path: "#" },
                        { name: "Media Content", path: "#" },
                    ],
                },
                {
                    name: "Clinical Quality & Outcomes",
                    path: "#",
                    subItems: [
                        { name: "Accreditation", path: "#" },
                        { name: "excellence", path: "#" },
                        { name: "Patient Safety", path: "#" },
                        { name: "Measuring Outcomes", path: "#" },
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

    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const isWhiteTheme = pathname !== "/" || isScrolled;

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

    // Uniform glass style applied to both Level 1 and Level 2
    const dropdownCardClass = isWhiteTheme
        ? "bg-white/98 backdrop-blur-2xl rounded-2xl p-1.5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.05)]"
        : "bg-black/40 backdrop-blur-2xl rounded-2xl p-1.5 border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.3)] text-white";

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
                    <div className="absolute left-0 top-[calc(100%+4px)] hidden group-hover:block w-64 z-50 animate-macLiquidDropdown origin-top before:absolute before:-top-3 before:left-0 before:w-full before:h-4">
                        <div className={dropdownCardClass}>
                            {link.dropdown.map((item, itemIdx) => (
                                <div key={itemIdx} className="relative group/sub">
                                    <Link
                                        to={item.path}
                                        className={`flex items-center justify-between px-3.5 py-2.5 text-[14px] font-medium transition-all duration-150 ${dropdownItemClass}`}
                                    >
                                        <span>{item.name}</span>
                                        {item.subItems && <ChevronRight />}
                                    </Link>

                                    {/* Level 2 Sub-Dropdown (Identical Styling) */}
                                    {item.subItems && (
                                        <div className="absolute left-[calc(100%+4px)] -top-1.5 hidden group-hover/sub:block w-max min-w-56 z-50 animate-macLiquidSubDropdown origin-top-left before:absolute before:top-0 before:-left-3 before:w-4 before:h-full">
                                            <div className={dropdownCardClass}>
                                                {item.subItems.map((sub, subIdx) => (
                                                    <Link
                                                        key={subIdx}
                                                        to={sub.path}
                                                        className={`block whitespace-nowrap px-3.5 py-2 text-[14px] font-medium transition-all duration-150 ${dropdownItemClass}`}
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
                @keyframes macLiquidDropdown {
                    0% {
                        opacity: 0;
                        transform: translateY(-4px) scale(0.98);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                @keyframes macLiquidSubDropdown {
                    0% {
                        opacity: 0;
                        transform: translateX(-4px) scale(0.98);
                    }
                    100% {
                        opacity: 1;
                        transform: translateX(0) scale(1);
                    }
                }

                .animate-macLiquidDropdown {
                    animation: macLiquidDropdown 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }

                .animate-macLiquidSubDropdown {
                    animation: macLiquidSubDropdown 0.18s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>

            <nav
                className={`fixed top-0 left-0 w-full px-6 md:px-12 lg:px-20 font-['Inter',sans-serif] transition-colors duration-300 z-50 ${
                    isWhiteTheme
                        ? "bg-white/98 backdrop-blur-md shadow-sm text-gray-900"
                        : "bg-transparent text-white"
                }`}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between sm:justify-center">
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

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden py-3">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`p-2 rounded-full focus:outline-none transition-all duration-200 ${
                                isWhiteTheme
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
                        isWhiteTheme
                            ? "bg-white text-gray-900 shadow-2xl"
                            : "bg-black/80 backdrop-blur-2xl text-white border-r border-white/10"
                    }`}
                >
                    <button
                        aria-label="Close menu"
                        className={`absolute top-6 right-6 p-2 rounded-full ${
                            isWhiteTheme
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
                                                className={`text-[14px] font-semibold py-0.5 transition-colors ${
                                                    isWhiteTheme ? "text-gray-800 hover:text-black" : "text-white/90 hover:text-white"
                                                }`}
                                            >
                                                {item.name}
                                            </Link>
                                        ) : (
                                            <span
                                                className={`text-[14px] font-semibold ${
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
                                                        className={`text-[14px] font-normal py-0.5 transition-colors ${
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