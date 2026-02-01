import React from 'react';
import { motion } from 'framer-motion';

const ScienceBackground = () => {
    // ২০টি তারার জন্য একটি অ্যারে
    const stars = Array.from({ length: 20 });

    return (
        <div className="fixed inset-0 z-0 bg-[#020617] overflow-hidden">
            {/* ১. কসমিক গ্রেডিয়েন্ট (Cosmic Background) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#0f172a_0%,#020617_100%)]" />

            {/* ২. অরোরার আভা (Floating Aurora Effect) */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2],
                    rotate: [0, 45, 0],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1/4 -left-1/4 w-full h-full bg-cyan-500/10 blur-[150px] rounded-full"
            />
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.2, 0.3, 0.2],
                    rotate: [0, -45, 0],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-1/4 -right-1/4 w-full h-full bg-purple-600/10 blur-[150px] rounded-full"
            />

            {/* ৩. ঝিকিমিকি তারা (Twinkling Science Stars) */}
            <div className="absolute inset-0">
                {stars.map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            opacity: [0.1, 0.8, 0.1],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                        }}
                    />
                ))}
            </div>

            {/* ৪. শুটিং স্টার (Shooting Star - মাঝে মাঝে যাবে) */}
            <motion.div
                initial={{ x: "-10%", y: "20%", opacity: 0 }}
                animate={{ x: "110%", y: "80%", opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 7, ease: "easeOut" }}
                className="absolute w-40 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent rotate-[-35deg]"
            />

            {/* ৫. টেকনিক্যাল গ্রিড (খুবই হালকা) */}
            <div 
                className="absolute inset-0 opacity-[0.05] pointer-events-none" 
                style={{ 
                    backgroundImage: `linear-gradient(#22d3ee 0.5px, transparent 0.5px), linear-gradient(90deg, #22d3ee 0.5px, transparent 0.5px)`,
                    backgroundSize: '100px 100px' 
                }}
            />

            {/* ৬. ভিনিয়েট লেয়ার */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_90%)]" />
        </div>
    );
};

export default ScienceBackground;