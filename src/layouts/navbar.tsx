import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.webp";
import logoWhite from "../assets/logo-white.webp";
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
    const navLinks: NavLinkItem[] = [
        {
            name: "DISCOVER AIMS",
            path: "/about-institution",
            dropdown: [
                {
                    name: "The AIMS Story",
                    path: "/about-institution",
                    subItems: [
                        { name: "About Hospital", path: "/about-hospital" },
                        { name: "About Institution", path: "/about-institution" },
                        { name: "Awards & Achievements", path: "/about/awards" },
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
                    path: "/committess/meu",
                    subItems: [
                        { name: "Medical Educational Unit", path: "/committess/meu" },
                        { name: "Scientific Committee", path: "/committess/scientific" },
                        { name: "Anti Ragging Committee", path: "/committess/anti-ragging" },
                        { name: "Ethics Committee", path: "/committess/ethics" },
                        { name: "POSH Internal Committee", path: "/committess/posh-internal" },
                        { name: "Pharmacovigilance Committee", path: "/committess/pharmacovigilance" },
                        { name: "Disciplinary Committee", path: "/committess/disciplinary" },
                    ],
                },
                { name: "Media Gallery", path: "/media-gallery" },
                {
                    name: "Approvals & Excellence",
                    path: "/accreditations",
                    subItems: [
                        { name: "Accreditations", path: "/accreditations" },
                        { name: "Government Approvals", path: "/approvals/government" },
                        { name: "University Affiliation", path: "/approvals/university-affiliation" },
                        { name: "Centres of Excellence", path: "/about/centres-of-excellence" },
                    ],
                },
                { name: "Campus Life", path: "/facilities/campus-life" },
                { name: "Bus Routes & Tracker", path: "/facilities/transport" },
            ],
        },
        {
            name: "ACADEMICS",
            path: "/departments",
            dropdown: [
                { name: "Departments", path: "/departments" },
                {
                    name: "Faculty",
                    path: "/faculty",
                    subItems: [
                        { name: "Pre-Clinical Faculty", path: "/faculty?category=Pre-Clinical" },
                        { name: "Para-Clinical Faculty", path: "/faculty?category=Para-Clinical" },
                        { name: "Clinical Faculty", path: "/faculty?category=Clinical" },
                    ],
                },
                { name: "Academic Facilities", path: "/facilities/academic" },
                { name: "Academic Calendar", path: "/academics/calendar" },
                { name: "Research & Publications", path: "/academics/research" },
                { name: "LMS", path: "https://lms.aims.ac.in/" },
                { name: "ERP Login", path: "https://portal.vmedulife.com/public/auth/#/login/aims-hyderabad" },
            ],
        },
        {
            name: "ADMISSIONS",
            path: "/admissions",
            dropdown: [
                {
                    name: "Programs Offered",
                    path: "/academics/mbbs",
                    subItems: [
                        { name: "Undergraduate (MBBS)", path: "/academics/mbbs" },
                        { name: "Nursing & Allied Health", path: "/academics/nursing-allied-health" },
                        { name: "Paramedical Diplomas", path: "/academics/paramedical-diplomas" },
                    ],
                },
                { name: "Admissions Overview", path: "/admissions" },
                { name: "Admission Criteria", path: "/admissions/criteria" },
                { name: "Seat Matrix", path: "/admissions/seat-matrix" },
                { name: "Fee Structure", path: "/admissions/fee-structure" },
                { name: "Application Forms", path: "/admissions/forms" },
                { name: "Admitted List", path: "/admissions/admitted-list" },
            ],
        },
        {
            name: "INFRASTRUCTURE",
            path: "/services/specialities",
            dropdown: [
                {
                    name: "Clinical Care",
                    path: "/services/specialities",
                    subItems: [
                        { name: "Specialities", path: "/services/specialities" },
                        { name: "Super Specialities", path: "/services/super-specialities" },
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
                { name: "Emergency Care", path: "/services/emergency-trauma" },
                { name: "Diagnostics & Imaging", path: "/services/diagnostics" },
                { name: "Hospital Facilities", path: "/facilities/hospital" },
                { name: "Machines & Equipment", path: "/machines-equipment" },
            ],
        },
        {
            name: "PATIENT CARE",
            path: "/patient-care/citizen-charter",
            dropdown: [
                { name: "Citizen Charter", path: "/patient-care/citizen-charter" },
                { name: "OPD Timings & Visiting", path: "/patient-care/opd-timings" },
                { name: "Admission & Discharge", path: "/patient-care/admission-discharge" },
                { name: "Insurance & TPA", path: "/patient-care/insurance" },
                { name: "Feedback & Grievance", path: "/patient-care/feedback" },
            ],
        },
    ];

    // LMS and ERP are separate sites: open them in a new tab.
    const external = (path: string) =>
        path.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {};

    const { theme, toggleTheme } = useTheme();
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [openDrawerIdx, setOpenDrawerIdx] = React.useState<number | null>(null);
    const isWhiteTheme = theme === "dark" ? false : (pathname !== "/" || isScrolled);
    const isNavTransparent = theme === "dark" ? !isScrolled : !isWhiteTheme;

    // Hover-intent state: a short grace delay before closing/switching so a brief
    // diagonal move off the menu (e.g. reaching a nested flyout) doesn't slam it shut.
    const [openMenuKey, setOpenMenuKey] = React.useState<string | null>(null);
    const [openSubIdx, setOpenSubIdx] = React.useState<number | null>(null);
    const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    const subOpenTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    const cancelClose = () => {
        if (closeTimer.current) {
            clearTimeout(closeTimer.current);
            closeTimer.current = null;
        }
    };
    const scheduleClose = () => {
        cancelClose();
        closeTimer.current = setTimeout(() => {
            setOpenMenuKey(null);
            setOpenSubIdx(null);
        }, 250);
    };
    const openMenu = (key: string) => {
        cancelClose();
        setOpenMenuKey((prev) => {
            if (prev !== key) setOpenSubIdx(null);
            return key;
        });
    };
    const requestSubOpen = (idx: number) => {
        if (subOpenTimer.current) clearTimeout(subOpenTimer.current);
        subOpenTimer.current = setTimeout(() => setOpenSubIdx(idx), 150);
    };
    const cancelSubOpen = () => {
        if (subOpenTimer.current) {
            clearTimeout(subOpenTimer.current);
            subOpenTimer.current = null;
        }
    };

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
        ? "text-gray-700 hover:text-black hover:bg-gray-100/80 rounded-lg"
        : "text-white/85 hover:text-white hover:bg-white/15 rounded-lg";

    const renderThemeToggle = (isMobile = false) => {
        const isDark = theme === "dark";
        // Button style dynamically adjusts to match transparent vs opaque navbar states
        const buttonClass = isDark
            ? isScrolled
                ? "bg-white/10 hover:bg-white/20 text-amber-300 border border-white/20 backdrop-blur-xl shadow-[0_2px_10px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(251,191,36,0.35)]"
                : "bg-transparent hover:bg-white/15 text-amber-300 border border-white/20 hover:border-white/35 backdrop-blur-sm shadow-none hover:shadow-[0_0_12px_rgba(251,191,36,0.25)]"
            : isWhiteTheme
            ? "bg-gray-100/90 hover:bg-gray-200/90 text-gray-700 hover:text-gray-900 border border-gray-200/80 shadow-xs hover:shadow-sm"
            : "bg-transparent hover:bg-white/15 text-white/90 hover:text-white border border-white/25 hover:border-white/40 backdrop-blur-sm shadow-none hover:shadow-[0_0_12px_rgba(255,255,255,0.2)]";

        return (
            <button
                type="button"
                onClick={toggleTheme}
                aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                className={`group relative flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer active:scale-90 ${
                    isMobile ? "w-8 h-8" : "w-9 h-9"
                } ${buttonClass}`}
            >
                {isDark ? (
                    <svg
                        className={`${isMobile ? "w-4 h-4" : "w-[18px] h-[18px]"} transition-transform duration-500 group-hover:rotate-45`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                            clipRule="evenodd"
                        />
                    </svg>
                ) : (
                    <svg
                        className={`${isMobile ? "w-4 h-4" : "w-[18px] h-[18px]"} transition-transform duration-500 group-hover:-rotate-12`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                )}
            </button>
        );
    };

    const renderDesktopNavItem = (link: NavLinkItem, idx: number, alignRight = false) => {
        const activeHoverPill = isWhiteTheme
            ? "text-gray-800 hover:text-black group-hover:bg-gray-100/90"
            : "text-white/90 hover:text-white group-hover:bg-white/15 group-hover:backdrop-blur-xl group-hover:border-white/25 group-hover:shadow-[0_4px_20px_rgba(0,0,0,0.15),inset_0_1px_0_0_rgba(255,255,255,0.35)]";

        const menuKey = `${alignRight ? "r" : "l"}-${idx}`;
        const isMenuOpenState = openMenuKey === menuKey;

        return (
            <div
                key={idx}
                className="relative group inline-flex items-center"
                onMouseEnter={() => openMenu(menuKey)}
                onMouseLeave={scheduleClose}
            >
                {/* Menu Button */}
                <Link
                    to={link.path}
                    className={`relative z-10 flex items-center gap-1.5 whitespace-nowrap px-2.5 2xl:px-3.5 py-1.5 rounded-full font-semibold tracking-wide text-[13px] 2xl:text-sm border border-transparent transition-all duration-300 ease-out ${activeHoverPill}`}
                >
                    <span>{link.name}</span>
                    <ChevronDown />
                </Link>

                {/* Level 1 Dropdown */}
                {link.dropdown && (
                    <div className={`absolute ${alignRight ? "right-0" : "left-0"} top-[calc(100%+4px)] ${isMenuOpenState ? "block" : "hidden"} w-56 z-50 before:absolute before:-top-3 before:left-0 before:w-full before:h-4`}>
                        {/* Level 1 Independent Glass Background */}
                        <div
                            className={`absolute inset-0 pointer-events-none -z-10 ${dropdownGlassBackground}`}
                            style={{ backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
                        />

                        {/* Level 1 Items (Non-nested backdrop container) */}
                        <div className="p-1 relative text-white">
                            {link.dropdown.map((item, itemIdx) => (
                                <div
                                    key={itemIdx}
                                    className="relative group/sub"
                                    onMouseEnter={() => {
                                        cancelClose();
                                        requestSubOpen(itemIdx);
                                    }}
                                    onMouseLeave={cancelSubOpen}
                                >
                                    <Link
                                        to={item.path}
                                        {...external(item.path)}
                                        className={`flex items-center justify-between px-3 py-1.5 text-[13.5px] font-semibold transition-all duration-150 ${dropdownItemClass}`}
                                    >
                                        <span>{item.name}</span>
                                        {item.subItems && <ChevronRight />}
                                    </Link>

                                    {/* Level 2 Sub-Dropdown (Independent Glass Background) */}
                                    {item.subItems && (
                                        <div className={`absolute left-[calc(100%+4px)] -top-1 ${openSubIdx === itemIdx ? "block" : "hidden"} w-max min-w-52 z-50 before:absolute before:top-0 before:-left-3 before:w-4 before:h-full`}>
                                            {/* Level 2 Independent Glass Background (Not nested in Level 1 backdrop) */}
                                            <div
                                                className={`absolute inset-0 pointer-events-none -z-10 ${dropdownGlassBackground}`}
                                                style={{ backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
                                            />

                                            {/* Level 2 Items */}
                                            <div className="p-1 relative text-white">
                                                {item.subItems.map((sub, subIdx) => (
                                                    <Link
                                                        key={subIdx}
                                                        to={sub.path}
                                                        className={`block whitespace-nowrap px-3 py-1.5 text-[13.5px] font-semibold transition-all duration-150 ${dropdownItemClass}`}
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
                className={`fixed top-0 left-0 w-full px-6 md:px-12 xl:px-8 2xl:px-20 font-['Inter',sans-serif] transition-colors duration-300 z-50 ${
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
                <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-4 relative">
                    {/* Logo */}
                    <Link to="/#" className="flex items-center shrink-0 py-2">
                        <img
                            src={isWhiteTheme ? logo : logoWhite}
                            alt="Arundathi Institute of Medical Sciences & Hospital"
                            className="h-10 md:h-11 w-auto object-contain transition-colors duration-300 drop-shadow-sm"
                        />
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden xl:flex items-center gap-1 2xl:gap-3 h-16">
                        {navLinks.map((link, i) => renderDesktopNavItem(link, i, i >= navLinks.length - 2))}
                    </div>

                    {/* News, Virtual Tour & Theme Toggle (Desktop) */}
                    <div className="hidden xl:flex items-center gap-3 shrink-0">
                        <Link
                            to="/aims-in-the-news"
                            title="AIMS in the News"
                            className={`virtual-tour-btn ${isNavTransparent ? "is-glass" : ""} flex items-center justify-center px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide`}
                        >
                            <span className="relative z-10 whitespace-nowrap">AIMS in News</span>
                        </Link>
                        <Link
                            to="/virtual-tour"
                            title="Explore Campus & Hospital in 360°"
                            className={`virtual-tour-btn ${isNavTransparent ? "is-glass" : ""} flex items-center justify-center px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide`}
                        >
                            <span className="relative z-10 whitespace-nowrap">Virtual Tour</span>
                        </Link>

                        {renderThemeToggle(false)}
                    </div>

                    {/* Mobile Controls: Virtual Tour, Theme Toggle & Menu Button */}
                    <div className="flex xl:hidden items-center gap-2 py-3">
                        <Link
                            to="/aims-in-the-news"
                            title="AIMS in the News"
                            className={`virtual-tour-btn ${isNavTransparent ? "is-glass" : ""} flex items-center justify-center px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide`}
                        >
                            <span className="relative z-10">News</span>
                        </Link>
                        <Link
                            to="/virtual-tour"
                            title="Virtual Tour"
                            className={`virtual-tour-btn ${isNavTransparent ? "is-glass" : ""} flex items-center justify-center px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide`}
                        >
                            <span className="relative z-10">Tour</span>
                        </Link>

                        {renderThemeToggle(true)}

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
                    className={`fixed top-0 left-0 w-full h-screen flex flex-col justify-start items-start px-6 sm:px-8 pt-20 pb-10 text-sm font-semibold tracking-wide transition-transform duration-300 xl:hidden overflow-y-auto overscroll-contain ${
                        isMenuOpen ? "translate-x-0 m-drawer-open" : "-translate-x-full"
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

                    <div className="m-stagger w-full flex flex-col">
                        {navLinks.map((link, idx) => {
                            const isOpen = openDrawerIdx === idx;
                            const subLinkClass = `block py-1.5 text-[13px] transition-colors ${
                                isWhiteTheme ? "text-gray-600 hover:text-black" : "text-white/70 hover:text-white"
                            }`;
                            return (
                                <div key={idx} className={`w-full border-b ${isWhiteTheme ? "border-gray-200" : "border-white/15"}`}>
                                    <button
                                        type="button"
                                        aria-expanded={isOpen}
                                        onClick={() => setOpenDrawerIdx(isOpen ? null : idx)}
                                        className="w-full flex items-center justify-between py-4 font-bold tracking-wide text-left"
                                    >
                                        <span>{link.name}</span>
                                        <svg
                                            className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </button>
                                    {/* grid-rows 0fr→1fr gives a smooth height animation without measuring */}
                                    <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                                        <div className="overflow-hidden" inert={!isOpen}>
                                            <div className="pl-2 pb-4 flex flex-col">
                                                {link.dropdown?.map((item, itemIdx) => (
                                                    <div key={itemIdx} className="flex flex-col">
                                                        <Link
                                                            to={item.path}
                                        {...external(item.path)}
                                                            onClick={() => setIsMenuOpen(false)}
                                                            className={`py-1.5 text-sm font-semibold transition-colors ${
                                                                isWhiteTheme ? "text-gray-800 hover:text-black" : "text-white/90 hover:text-white"
                                                            }`}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                        {item.subItems && (
                                                            <div className={`ml-1 pl-3 mb-1 border-l ${isWhiteTheme ? "border-gray-200" : "border-white/20"}`}>
                                                                {item.subItems.map((sub, subIdx) => (
                                                                    <Link key={subIdx} to={sub.path} onClick={() => setIsMenuOpen(false)} className={subLinkClass}>
                                                                        {sub.name}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;