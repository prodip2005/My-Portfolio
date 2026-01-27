import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Music, Code2, Heart, Sparkles, ChevronRight, Star, ChevronLeft, RefreshCw } from 'lucide-react';
import useAxios from '../hooks/useAxios';

const ICON_MAP = {
    trophy: <Trophy />,
    music: <Music />,
    code: <Code2 />,
    heart: <Heart />,
};

const Achievements = () => {
    const axios = useAxios();
    const [achievements, setAchievements] = useState([]);
    const [stats, setStats] = useState([]);
    const [projectCount, setProjectCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [achRes, statRes, projRes] = await Promise.all([
                    axios.get('/achievements'),
                    axios.get('/stats'),
                    axios.get('/projects')
                ]);
                setAchievements(achRes.data);
                setStats(statRes.data);
                setProjectCount(projRes.data.length);
            } catch (err) { console.error(err); }
            finally { setLoading(false); }
        };
        fetchData();
    }, [axios]);

    const totalPages = Math.ceil(achievements.length / itemsPerPage);
    const currentItems = achievements.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    if (loading) return <div className="py-20 flex justify-center h-96 items-center"><RefreshCw className="animate-spin text-cyan-400" size={40} /></div>;

    return (
        <section id="achievements" className="relative py-32 bg-transparent overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="mb-20">
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex items-center gap-3 text-cyan-500 font-bold text-xs tracking-[0.4em] uppercase mb-6">
                        <Sparkles size={16} /> My Milestones
                    </motion.div>
                    <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none italic uppercase">
                        Accomplish<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">ments</span>
                    </h2>
                </div>

                {/* Achievements Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AnimatePresence mode='wait'>
                        {currentItems.map((item) => (
                            <motion.div key={item._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="group relative">
                                <div className="p-8 lg:p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-md h-full flex flex-col md:flex-row gap-8 items-start hover:bg-white/[0.06] transition-all duration-500">
                                    <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-black transition-all">
                                        {React.cloneElement(ICON_MAP[item.iconType] || <Star />, { size: 36 })}
                                    </div>
                                    <div className="flex-1">
                                        <span className="text-cyan-400 font-bold text-[10px] tracking-widest uppercase">{item.subtitle}</span>
                                        <h3 className="text-2xl font-black text-white mb-4 group-hover:text-cyan-400 transition-colors">{item.title}</h3>
                                        <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center gap-4 mt-12">
                        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} className={`p-4 rounded-full border border-white/10 text-white hover:bg-cyan-500 hover:text-black transition-all ${currentPage === 1 && 'opacity-20 pointer-events-none'}`}><ChevronLeft /></button>
                        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} className={`p-4 rounded-full border border-white/10 text-white hover:bg-cyan-500 hover:text-black transition-all ${currentPage === totalPages && 'opacity-20 pointer-events-none'}`}><ChevronRight /></button>
                    </div>
                )}

                {/* Dynamic Stats Footer */}
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat) => (
                        <div key={stat._id} className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 text-center group hover:bg-cyan-500/5 transition-all">
                            <div className="text-4xl font-black text-white mb-1 tracking-tighter">
                                {
                                    stat.label.toLowerCase().includes('project')
                                        ? (projectCount >= 10 ? `${projectCount}+` : projectCount)
                                        : stat.value
                                }
                            </div>
                            <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Achievements;