import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const Navbar = () => {
    const [activeSection, setActiveSection] = useState('home');

    const navLinks = [
        { name: 'Home', href: '#home', id: 'home' },
        { name: 'About', href: '#about', id: 'about' },
        { name: 'Skills', href: '#skill', id: 'skill' },
        { name: 'Experience', href: '#experience', id: 'experience' },
        { name: 'Projects', href: '#projects', id: 'projects' },
        { name: 'Achievements', href: '#achievements', id: 'achievements' },
        { name: 'Certificates', href: '#certificates', id: 'certificates' },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            { threshold: 0.5 }
        );

        navLinks.forEach(link => {
            const el = document.getElementById(link.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <nav className="fixed top-0 left-0 right-0 z-100 px-6 py-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between bg-slate-950/40 backdrop-blur-md border border-white/10 px-8 py-3 rounded-2xl shadow-2xl">
                
                <div className="flex-1">
                    <a href="#home" className="text-white font-black tracking-tighter text-xl italic group">
                        <span className="text-cyan-400 group-hover:text-white transition-colors">Prodip  </span>Hore
                    </a>
                </div>

                <div className="hidden lg:flex items-center gap-2">
                    {navLinks.map((link) => (
                        <a 
                            key={link.name} 
                            href={link.href}
                            className={`relative px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${activeSection === link.id ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}
                        >
                            {link.name}
                            {activeSection === link.id && (
                                <motion.div 
                                    layoutId="navUnderline"
                                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
                                />
                            )}
                        </a>
                    ))}
                </div>

                <div className="flex-1 flex justify-end">
                    <a 
                        href="https://drive.google.com/file/d/1T5q75GMzNNN6998eWwlQttPasKuMLlHg/view?usp=drive_link"
                        target="_blank"
                        className="group flex items-center gap-2 px-6 py-2.5 bg-white text-black rounded-full font-black text-[10px] uppercase tracking-tighter transition-all hover:bg-cyan-500 hover:text-white active:scale-95"
                    >
                        Resume
                        <ArrowUpRight size={14} strokeWidth={3} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                </div>
            </div>

            <div className="lg:hidden flex justify-center mt-4">
               <div className="flex gap-4 overflow-x-auto no-scrollbar py-2.5 px-6 bg-slate-900/80 backdrop-blur-md rounded-full border border-white/10 shadow-xl">
                    {navLinks.map((link) => (
                        <a 
                            key={link.name} 
                            href={link.href} 
                            className={`text-[9px] font-bold uppercase whitespace-nowrap ${activeSection === link.id ? 'text-cyan-400' : 'text-slate-400'}`}
                        >
                            {link.name}
                        </a>
                    ))}
               </div>
            </div>
        </nav>
    );
};

export default Navbar;