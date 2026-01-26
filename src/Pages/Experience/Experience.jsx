import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, RefreshCw } from 'lucide-react';
import useAxios from '../../hooks/useAxios'; // আপনার কাস্টম হুক অনুযায়ী পাথ ঠিক করে নিন

const Experience = () => {
    const axios = useAxios();
    const [journeyData, setJourneyData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // ব্যাকএন্ড থেকে এক্সপেরিয়েন্স ডেটা ফেচ করা
        axios.get('/experience')
            .then(res => {
                setJourneyData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching journey data:", err);
                setLoading(false);
            });
    }, [axios]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-24">
                <RefreshCw className="animate-spin text-cyan-400" size={40} />
            </div>
        );
    }

    return (
        <section id="experience" className="relative py-24 bg-transparent overflow-hidden">
            <div className="max-w-5xl mx-auto px-6 relative z-10">

                {/* --- Header Section --- */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4"
                    >
                        <Sparkles size={12} className="text-cyan-400" />
                        <span className="text-[10px] text-cyan-400 font-bold tracking-[0.2em] uppercase">Development Journey</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl lg:text-7xl font-black text-white tracking-tighter uppercase overflow-visible"
                    >
                        My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 italic pr-8 inline-block">Roadmap</span>
                    </motion.h2>
                </div>

                <div className="relative">
                    {/* The Main Linear Path */}
                    <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/5">
                        <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: '100%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="w-full bg-gradient-to-b from-cyan-400 via-purple-500 to-yellow-500"
                        />
                    </div>

                    <div className="space-y-10">
                        {journeyData.map((item, index) => (
                            <motion.div
                                key={item._id} // মঙ্গোডিবি থেকে আসা ইউনিক আইডি
                                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50, scale: 0.9 }}
                                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{
                                    duration: 0.8,
                                    delay: index * 0.1,
                                    type: "spring",
                                    stiffness: 100
                                }}
                                className={`relative flex items-center justify-between w-full ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                            >
                                {/* Indicator Node with Ripple Effect */}
                                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-20">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        transition={{ delay: 0.5 + index * 0.1 }}
                                        className="w-4 h-4 rounded-full border-2 border-slate-950 z-10 relative"
                                        style={{ backgroundColor: item.color }}
                                    />
                                    <div className="absolute inset-0 w-4 h-4 rounded-full animate-ping opacity-40" style={{ backgroundColor: item.color }} />
                                </div>

                                {/* Content Card */}
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="ml-14 md:ml-0 md:w-[45%]"
                                >
                                    <div className="group relative bg-[#0a0f1d]/60 backdrop-blur-2xl p-6 rounded-[2rem] border border-white/5 hover:border-cyan-500/30 transition-all duration-500 shadow-2xl overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                                        <div className="flex items-center justify-between mb-3 relative z-10">
                                            <span className="text-[9px] font-bold text-white/30 tracking-widest uppercase">{item.date}</span>
                                            <div className="h-[1px] w-8 bg-white/10" />
                                        </div>

                                        <h3 className="text-xl lg:text-2xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors relative z-10">
                                            {item.title}
                                        </h3>
                                        <h4 className="text-white/40 text-[10px] font-medium mb-3 italic uppercase relative z-10">
                                            {item.subtitle}
                                        </h4>

                                        <p className="text-slate-400 text-xs lg:text-sm leading-relaxed mb-4 font-light relative z-10">
                                            {item.desc}
                                        </p>

                                        <div className="flex items-center gap-2 text-[9px] text-white/20 font-bold tracking-widest uppercase group-hover:text-cyan-500 transition-colors relative z-10">
                                            <span>Stage {journeyData.length - index}</span>
                                            <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </motion.div>

                                <div className="hidden md:block md:w-[45%]" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;