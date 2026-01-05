import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Home, LayoutGrid, User, MessageSquare,
    Zap, ArrowUpRight, Cpu, Briefcase, Award, Trophy, MoreHorizontal, ChevronUp
} from 'lucide-react';

const Navbar = ({ isFooterVisible }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const mainLinks = [
        { name: 'HOME', icon: <Home size={20} />, href: '#' },
        { name: 'ABOUT', icon: <User size={20} />, href: '#about' },
    ];

    const extraLinks = [
        { name: 'SKILLS', icon: <Cpu size={18} />, href: '#skill' },
        { name: 'EXPERIENCE', icon: <Briefcase size={18} />, href: '#experience' },
        { name: 'PROJECTS', icon: <LayoutGrid size={20} />, href: '#projects' },
        { name: 'ACHIEVEMENT', icon: <Trophy size={18} />, href: '#achievements' },
        { name: 'CERTIFICATE', icon: <Award size={18} />, href: '#certificates' },
        { name: 'CONTACT', icon: <MessageSquare size={18} />, href: '/contact' },
    ];

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{
                y: isFooterVisible ? -(window.innerHeight - 120) : 0,
                opacity: 1,
            }}
            transition={{
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
            }}
            className="fixed bottom-6 lg:bottom-10 left-0 right-0 z-[100] flex justify-center items-center pointer-events-none px-4"
        >
            <div className="relative flex flex-col items-center">

                {/* --- MOBILE DROPDOWN MENU --- */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                            animate={{ opacity: 1, y: -10, scale: 1 }}
                            exit={{ opacity: 0, y: 15, scale: 0.95 }}
                            className="absolute bottom-full mb-4 bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-4 shadow-2xl pointer-events-auto flex flex-col gap-3 min-w-[200px] lg:hidden"
                        >
                            {extraLinks.map((link) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    className="flex items-center gap-3 text-slate-400 hover:text-cyan-400 px-3 py-2 transition-colors group"
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="group-hover:text-cyan-400 transition-colors">{link.icon}</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest">{link.name}</span>
                                </motion.a>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* --- MAIN NAVBAR --- */}
                <motion.div
                    animate={!isFooterVisible ? { y: [0, -6, 0] } : { y: 0 }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="relative flex items-center bg-slate-950/90 backdrop-blur-2xl px-3 lg:px-6 py-2 lg:py-2.5 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 pointer-events-auto max-w-full overflow-hidden"
                >
                    {/* Desktop View */}
                    <div className="hidden lg:flex items-center">
                        <div className="flex items-center gap-1 pr-4 border-r border-white/10">
                            {mainLinks.map(link => (
                                <NavItem key={link.name} link={link} />
                            ))}
                            <NavItem link={extraLinks[0]} />
                        </div>

                        <div className="mx-4">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                            >
                                <Zap size={18} className="text-cyan-400" fill="currentColor" />
                            </motion.div>
                        </div>

                        <div className="flex items-center gap-1 pl-4 border-l border-white/10">
                            <NavItem link={extraLinks[1]} />
                            <NavItem link={extraLinks[2]} />
                            <NavItem link={extraLinks[4]} />
                            <ResumeButton />
                        </div>
                    </div>

                    {/* Mobile View */}
                    <div className="flex lg:hidden items-center gap-1">
                        {mainLinks.map((link) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                className="w-11 h-11 flex items-center justify-center text-slate-400 rounded-full"
                                whileTap={{ scale: 0.9 }}
                            >
                                {link.icon}
                            </motion.a>
                        ))}
                        <div className="w-[1px] h-6 bg-white/10 mx-1" />
                        <motion.button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`w-11 h-11 flex items-center justify-center rounded-full transition-colors ${isMenuOpen ? 'bg-cyan-500 text-white' : 'text-slate-400'}`}
                            whileTap={{ scale: 0.9 }}
                        >
                            {isMenuOpen ? <ChevronUp size={22} /> : <MoreHorizontal size={22} />}
                        </motion.button>
                        <ResumeButton />
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

// --- Sub Components ---
const NavItem = ({ link }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <motion.a
            href={link.href}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative w-24 h-11 flex items-center justify-center rounded-xl overflow-hidden transition-all"
        >
            <AnimatePresence mode="wait">
                {isHovered ? (
                    <motion.span
                        key="n"
                        initial={{ y: 15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -15, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-cyan-400 text-[9px] font-black uppercase tracking-[0.12em] text-center"
                    >
                        {link.name}
                    </motion.span>
                ) : (
                    <motion.span
                        key="i"
                        initial={{ y: -15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 15, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-slate-400 group-hover:text-cyan-400 transition-colors"
                    >
                        {link.icon}
                    </motion.span>
                )}
            </AnimatePresence>
            {isHovered && <motion.div layoutId="nbg" className="absolute inset-0 bg-cyan-500/10 rounded-xl -z-10" />}
        </motion.a>
    );
};

const ResumeButton = () => (
    <motion.a
        href="https://drive.google.com/file/d/1I0a6FWeUTrH5-4tJc1Gv3oKwcza5XrEP/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        whileTap={{ scale: 0.95 }}
        className="ml-2 flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full shadow-lg transition-all group shrink-0 hover:bg-cyan-400 hover:text-white"
    >
        <span className="font-black text-[10px] uppercase tracking-tighter hidden sm:block">Resume</span>
        <ArrowUpRight size={18} strokeWidth={3} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
    </motion.a>
);

export default Navbar;