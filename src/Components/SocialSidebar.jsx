import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Facebook, Mail, Plus, X, LayoutDashboard, LogOut } from 'lucide-react'; // LogOut আইকন যোগ করা হয়েছে
import { onAuthStateChanged, signOut } from 'firebase/auth'; // signOut যোগ করা হয়েছে
import { Link, useNavigate } from 'react-router';
import { auth } from '../firebase.config';

const SocialSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // লগআউট ফাংশন
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                alert("Logged out successfully!");
                navigate('/'); // লগআউট হওয়ার পর হোমে পাঠিয়ে দিবে
            })
            .catch((error) => console.error("Logout Error:", error));
    };

    const socialLinks = [
        { icon: <Github size={20} />, href: "https://github.com/prodip2005", label: "GitHub", isExternal: true },
        { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/prodip-hore-750101337/", label: "LinkedIn", isExternal: true },
        { icon: <Facebook size={20} />, href: "https://www.facebook.com/prodip.shadow.monarch", label: "Facebook", isExternal: true },
        { icon: <Mail size={20} />, href: "https://mail.google.com/mail/?view=cm&fs=1&to=prodiphore2005@gmail.com", label: "Email", isExternal: true },
    ];

    return (
        <>
            {/* --- Desktop View --- */}
            <div className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-[100] flex-col gap-5">
                {/* ইউজার থাকলে ড্যাশবোর্ড বাটন */}
                {user && (
                    <Link to="/dashboard" className="group relative flex items-center">
                        <SocialIconContent icon={<LayoutDashboard size={20} />} label="Dashboard" isSpecial={true} />
                    </Link>
                )}

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
                        <SocialIconContent icon={link.icon} label={link.label} />
                    </motion.a>
                ))}

                {/* ইউজার থাকলে লগআউট বাটন */}
                {user && (
                    <button onClick={handleLogout} className="group relative flex items-center">
                        <SocialIconContent icon={<LogOut size={20} />} label="Logout" isLogout={true} />
                    </button>
                )}
            </div>

            {/* --- Mobile View --- */}
            <div className="lg:hidden fixed bottom-24 left-6 z-[100] flex flex-col items-center gap-4">
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.8 }}
                            className="flex flex-col gap-4 mb-2"
                        >
                            {user && (
                                <Link to="/dashboard" className="p-4 bg-cyan-500 text-black rounded-full shadow-2xl flex items-center justify-center">
                                    <LayoutDashboard size={20} />
                                </Link>
                            )}

                            {socialLinks.map((link, i) => (
                                <a key={i} href={link.href} target="_blank" rel="noreferrer" className="p-4 bg-slate-900 border border-white/10 rounded-full text-cyan-400 shadow-2xl backdrop-blur-xl flex items-center justify-center">
                                    {link.icon}
                                </a>
                            ))}

                            {user && (
                                <button onClick={handleLogout} className="p-4 bg-red-500/20 border border-red-500/50 text-red-500 rounded-full shadow-2xl backdrop-blur-xl flex items-center justify-center">
                                    <LogOut size={20} />
                                </button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className={`relative p-5 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.3)] z-50 ${isOpen ? 'bg-slate-800 text-red-500 border border-red-500/50' : 'bg-cyan-500 text-black'}`}
                >
                    {!isOpen && <span className="absolute inset-0 rounded-full bg-cyan-500 animate-ping opacity-20"></span>}
                    {isOpen ? <X size={24} strokeWidth={3} /> : <Plus size={24} strokeWidth={3} />}
                </motion.button>
            </div>
        </>
    );
};

// আইকন ডিজাইন কম্পোনেন্ট
const SocialIconContent = ({ icon, label, isSpecial, isLogout }) => (
    <>
        <motion.div
            whileHover={{ x: 5 }}
            className={`p-3 backdrop-blur-xl border rounded-xl transition-all shadow-xl 
                ${isSpecial ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400' :
                    isLogout ? 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white' :
                        'bg-slate-900/60 border-white/10 text-slate-400 hover:text-cyan-400'}`}
        >
            {icon}
        </motion.div>
        <span className="absolute left-14 scale-0 group-hover:scale-100 origin-left transition-all duration-300 bg-white text-black text-[10px] font-black px-3 py-1.5 rounded uppercase tracking-widest whitespace-nowrap">
            {label}
        </span>
    </>
);

export default SocialSidebar;