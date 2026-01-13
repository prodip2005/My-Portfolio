import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Home as HomeIcon, LayoutGrid, User, MessageSquare,
    Zap, ArrowUpRight, Cpu, Briefcase, Award, Trophy, MoreHorizontal, ChevronUp
} from 'lucide-react';

const Navbar = ({ isFooterVisible }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    const leftLinks = [
        { name: 'HOME', icon: <HomeIcon size={20} />, href: '#home', id: 'home' },
        { name: 'ABOUT', icon: <User size={20} />, href: '#about', id: 'about' },
        { name: 'SKILLS', icon: <Cpu size={18} />, href: '#skill', id: 'skill' },
        { name: 'EXPERIENCE', icon: <Briefcase size={18} />, href: '#experience', id: 'experience' },
    ];

    const rightLinks = [
        { name: 'PROJECTS', icon: <LayoutGrid size={20} />, href: '#projects', id: 'projects' },
        { name: 'ACHIEVEMENT', icon: <Trophy size={18} />, href: '#achievements', id: 'achievements' },
        { name: 'CERTIFICATES', icon: <Award size={18} />, href: '#certificates', id: 'certificates' },
        { name: 'CONTACT', icon: <MessageSquare size={18} />, href: '#contact', id: 'contact' },
    ];

    const allLinks = [...leftLinks, ...rightLinks];

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-45% 0px -45% 0px',
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        allLinks.forEach((link) => {
            const element = document.getElementById(link.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: isFooterVisible ? -(window.innerHeight - 120) : 0, opacity: 1 }}
            className="fixed bottom-6 lg:bottom-10 left-0 right-0 z-[100] flex justify-center items-center pointer-events-none px-4"
        >
            <div className="relative flex flex-col items-center">
                {/* Mobile Dropdown */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: -10, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute bottom-full mb-4 bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-4 shadow-2xl pointer-events-auto flex flex-col gap-3 min-w-[200px] lg:hidden"
                        >
                            {allLinks.map((link) => (
                                <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${activeSection === link.id ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400'}`}>
                                    {link.icon}
                                    <span className="text-[10px] font-bold uppercase tracking-widest">{link.name}</span>
                                </a>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Navbar */}
                <div className="relative flex items-center bg-slate-950/80 backdrop-blur-3xl px-3 lg:px-6 py-2 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 pointer-events-auto">
                    <div className="hidden lg:flex items-center">
                        <div className="flex items-center gap-1 pr-4 border-r border-white/10">
                            {leftLinks.map(link => (
                                <NavItem key={link.name} link={link} isActive={activeSection === link.id} />
                            ))}
                        </div>

                        <div className="mx-5">
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
                                <Zap size={20} className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" fill="currentColor" />
                            </motion.div>
                        </div>

                        <div className="flex items-center gap-1 pl-4 border-l border-white/10">
                            {rightLinks.map(link => (
                                <NavItem key={link.name} link={link} isActive={activeSection === link.id} />
                            ))}
                            <ResumeButton />
                        </div>
                    </div>

                    {/* Mobile View */}
                    <div className="flex lg:hidden items-center gap-2">
                        <NavItem link={leftLinks[0]} isActive={activeSection === 'home'} />
                        <div className="w-[1px] h-6 bg-white/10 mx-1" />
                        <motion.button onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`w-11 h-11 flex items-center justify-center rounded-full transition-all ${isMenuOpen ? 'bg-cyan-500 text-white' : 'text-slate-400'}`}>
                            {isMenuOpen ? <ChevronUp size={22} /> : <MoreHorizontal size={22} />}
                        </motion.button>
                        <ResumeButton />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// --- Updated NavItem with Slide-up Animation ---
const NavItem = ({ link, isActive }) => {
    const [isHovered, setIsHovered] = useState(false);
    const activeState = isHovered || isActive;

    return (
        <motion.a
            href={link.href}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative min-w-[85px] h-12 flex items-center justify-center rounded-2xl transition-all group overflow-hidden"
        >
            {/* Background Glow */}
            <AnimatePresence>
                {activeState && (
                    <motion.div
                        layoutId="nav-glow"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-0 bg-cyan-500/10 rounded-xl -z-10"
                    />
                )}
            </AnimatePresence>

            {/* Animation Container */}
            <div className="relative flex flex-col items-center justify-center overflow-hidden h-full w-full">
                {/* Icon Section */}
                <motion.span
                    animate={{
                        y: activeState ? -40 : 0,
                        opacity: activeState ? 0 : 1
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute text-slate-400 group-hover:text-cyan-400"
                >
                    {link.icon}
                </motion.span>

                {/* Text Section */}
                <motion.span
                    initial={{ y: 40, opacity: 0 }}
                    animate={{
                        y: activeState ? 0 : 40,
                        opacity: activeState ? 1 : 0
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute text-cyan-400 text-[9px] font-black uppercase tracking-[0.15em] whitespace-nowrap"
                >
                    {link.name}
                </motion.span>
            </div>

            {/* Indicator Dot */}
            {isActive && (
                <motion.div
                    layoutId="active-dot"
                    className="absolute bottom-1 w-1 h-1 bg-cyan-400 rounded-full"
                />
            )}
        </motion.a>
    );
};

const ResumeButton = () => (
    <motion.a
        href="#"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="ml-3 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white to-slate-200 text-black rounded-full shadow-lg group hover:from-cyan-400 hover:to-cyan-500 hover:text-white transition-all duration-300 shrink-0"
    >
        <span className="font-black text-[10px] uppercase tracking-tighter hidden xl:block">Resume</span>
        <ArrowUpRight size={18} strokeWidth={3} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
    </motion.a>
);

export default Navbar;