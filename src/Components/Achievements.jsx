import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Music, Code2, Heart, Sparkles, ChevronRight, Star } from 'lucide-react';

const ICON_MAP = {
    trophy: <Trophy className="text-yellow-400" />,
    music: <Music className="text-pink-400" />,
    code: <Code2 className="text-cyan-400" />,
    heart: <Heart className="text-red-500" />,
};

const Achievements = () => {
    const [achievements, setAchievements] = useState([]);

    useEffect(() => {
        const dummyData = [
            { id: 1, title: "Competitive Programming", subtitle: "Problem Solver", desc: "Solving complex algorithms and data structures in various platforms.", iconType: "trophy" },
            { id: 2, title: "15+ Web Projects", subtitle: "Full Stack Mastery", desc: "Successfully architected and deployed over 15+ modern web applications.", iconType: "code" },
            { id: 3, title: "Red Crescent Society", subtitle: "Active Volunteer", desc: "Served as a dedicated member contributing to humanitarian welfare.", iconType: "heart" },
            { id: 4, title: "Singing Champion", subtitle: "Artistic Excellence", desc: "Won 1st place in multiple cultural and singing competitions.", iconType: "music" }
        ];
        setAchievements(dummyData);
    }, []);

    return (
        <section id="achievements" className="relative py-32 bg-transparent overflow-hidden">
            {/* Background Glows (Subtle) */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* --- Section Header --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-28 md:mb-36 gap-10">
                    <div className="flex-1 min-w-0"> {/* min-w-0 ওভারফ্লো রোধ করে */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 text-cyan-500 font-bold text-xs tracking-[0.4em] uppercase mb-6"
                        >
                            <Sparkles size={16} /> My Milestones
                        </motion.div>

                        {/* h2 কে ফ্লেক্সিবল করা হয়েছে এবং pr-4 দেওয়া হয়েছে যাতে S না কাটে */}
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[1.1] flex flex-wrap items-center gap-x-4">
                            <span>ACCOMPLISH</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-600 italic pr-6 inline-block">
                                MENTS
                            </span>
                        </h2>
                    </div>

                    <div className="md:text-right md:pb-4 shrink-0">
                        <p className="text-white/40 max-w-xs text-sm leading-relaxed mb-6">
                            Acurated list of my professional milestones and creative achievements.
                        </p>
                        <div className="h-1.5 w-24 bg-gradient-to-r from-cyan-500 to-blue-600 ml-auto hidden md:block rounded-full" />
                    </div>
                </div>

                {/* --- Achievements Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {achievements.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            whileHover={{ y: -8 }}
                            className="group relative"
                        >
                            {/* Card Background with Glassmorphism */}
                            <div className="relative z-10 p-8 lg:p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-md h-full flex flex-col md:flex-row gap-8 items-start group-hover:bg-white/[0.06] group-hover:border-white/20 transition-all duration-500">

                                {/* Icon Section */}
                                <div className="relative shrink-0">
                                    <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-black transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                                        {React.cloneElement(ICON_MAP[item.iconType], { size: 36, className: "group-hover:text-black transition-colors" })}
                                    </div>
                                    <div className="absolute -inset-4 bg-cyan-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>

                                {/* Content Section */}
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-cyan-400 font-bold text-[10px] tracking-widest uppercase">{item.subtitle}</span>
                                        <ChevronRight className="text-white/20 group-hover:text-cyan-400 group-hover:translate-x-2 transition-all" size={18} />
                                    </div>
                                    <h3 className="text-2xl lg:text-3xl font-black text-white mb-4 tracking-tight group-hover:text-cyan-400 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* --- Bottom Stats Footer --- */}
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Live Projects', value: '15+', icon: <Code2 size={14} /> },
                        { label: 'Singing Awards', value: '05+', icon: <Music size={14} /> },
                        { label: 'Red Crescent', value: 'Member', icon: <Heart size={14} /> },
                        { label: 'Algorithm Skills', value: 'Expert', icon: <Star size={14} /> },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 text-center group hover:bg-cyan-500/5 hover:border-cyan-500/20 transition-all"
                        >
                            <div className="flex justify-center text-white/20 mb-3 group-hover:text-cyan-500 transition-colors">
                                {stat.icon}
                            </div>
                            <div className="text-3xl font-black text-white mb-1 tracking-tighter">{stat.value}</div>
                            <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Achievements;