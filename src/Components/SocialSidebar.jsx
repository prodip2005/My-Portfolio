import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Facebook, Mail, Plus, X } from 'lucide-react';

const SocialSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const socialLinks = [
        { icon: <Github size={20} />, href: "https://github.com/prodip2005", label: "GitHub" },
        { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/prodip-hore-750101337/", label: "LinkedIn" },
        { icon: <Facebook size={20} />, href: "https://www.facebook.com/prodip.shadow.monarch", label: "Facebook" },
        {
            icon: <Mail size={20} />,
            // সরাসরি ব্রাউজারে জিমেইল ওপেন করার জন্য এই লিঙ্কটি ব্যবহার করুন
            href: "https://mail.google.com/mail/?view=cm&fs=1&to=prodiphore2005@gmail.com",
            label: "Email"
        },
    ];

    return (
        <>
            {/* --- Desktop View (Side Bar) --- */}
            <div className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-[100] flex-col gap-5">
                {socialLinks.map((link, i) => (
                    <motion.a
                        key={i}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="group relative flex items-center"
                    >
                        <motion.div
                            whileHover={{ x: 5, backgroundColor: "rgba(34, 211, 238, 0.2)" }}
                            className="p-3 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-xl text-slate-400 hover:text-cyan-400 transition-all shadow-xl"
                        >
                            {link.icon}
                        </motion.div>
                        <span className="absolute left-14 scale-0 group-hover:scale-100 origin-left transition-all duration-300 bg-white text-black text-[10px] font-black px-3 py-1.5 rounded uppercase tracking-widest">
                            {link.label}
                        </span>
                    </motion.a>
                ))}
            </div>

            {/* --- Mobile View (Floating Button) --- */}
            {/* bottom-24 ব্যবহার করা হয়েছে যেন এটি নেভিগেশন বার থেকে একটু উপরে থাকে */}
            <div className="lg:hidden fixed bottom-24 left-6 z-[100] flex flex-col items-center gap-4">
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.8 }}
                            className="flex flex-col gap-4 mb-2"
                        >
                            {socialLinks.map((link, i) => (
                                <motion.a
                                    key={i}
                                    href={link.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="p-4 bg-slate-900 border border-white/10 rounded-full text-cyan-400 shadow-2xl backdrop-blur-xl flex items-center justify-center"
                                >
                                    {link.icon}
                                </motion.a>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Toggle Button with Pulse Effect */}
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className={`relative p-5 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-500 z-50 ${isOpen ? 'bg-slate-800 text-red-500 border border-red-500/50' : 'bg-cyan-500 text-black'
                        }`}
                >
                    {/* Background Pulse for attention when closed */}
                    {!isOpen && (
                        <span className="absolute inset-0 rounded-full bg-cyan-500 animate-ping opacity-20"></span>
                    )}

                    {isOpen ? <X size={24} strokeWidth={3} /> : <Plus size={24} strokeWidth={3} />}
                </motion.button>
            </div>
        </>
    );
};

export default SocialSidebar;