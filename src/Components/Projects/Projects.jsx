import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldAlert, Zap, Cpu, Globe, Github, ArrowRight, RefreshCw } from 'lucide-react';
import ProjectCard from '../ProjectCard';
import useAxios from '../../hooks/useAxios'; // আপনার কাস্টম এক্সিওস হুক

const Projects = () => {
    const axios = useAxios();
    const [projectsData, setProjectsData] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [loading, setLoading] = useState(true);

    // ব্যাকএন্ড থেকে প্রজেক্ট ডাটা ফেচ করা
    useEffect(() => {
        axios.get('/projects')
            .then(res => {
                setProjectsData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching projects:", err);
                setLoading(false);
            });
    }, [axios]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-32">
                <RefreshCw className="animate-spin text-cyan-400" size={40} />
            </div>
        );
    }

    return (
        <section id="projects" className="relative py-32 bg-transparent overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* --- Section Header --- */}
                <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="text-left relative">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-6xl lg:text-8xl font-black text-white uppercase tracking-tighter"
                        >
                            MY <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 italic">PROJECTS</span>
                        </motion.h2>
                        <motion.div initial={{ width: 0 }} whileInView={{ width: '80px' }} className="h-1.5 bg-cyan-500 mt-2 rounded-full" />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="hidden md:flex items-center gap-3 bg-white/5 border border-white/10 px-8 py-4 rounded-2xl text-white font-bold text-[10px] tracking-widest hover:bg-white hover:text-black transition-all group"
                    >
                        VIEW ALL ARTIFACTS
                        <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                    </motion.button>
                </div>

                {/* --- Project Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projectsData.map((project, index) => (
                        <ProjectCard
                            key={project._id} // MongoDB ID ব্যবহার করা হয়েছে
                            project={project}
                            index={index}
                            onClick={() => setSelectedProject(project)}
                        />
                    ))}
                </div>

                <AnimatePresence>
                    {selectedProject && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedProject(null)}
                                className="absolute inset-0 bg-black/90 backdrop-blur-3xl"
                            />

                            {/* Modal Box */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="relative w-full max-w-5xl bg-[#050505] border border-white/10 rounded-[2.5rem] lg:rounded-[3.5rem] overflow-hidden shadow-2xl overflow-y-auto max-h-[90vh] scrollbar-hide"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-12">
                                    {/* Left Panel: Media & Links */}
                                    <div className="lg:col-span-5 p-8 lg:p-12 bg-white/[0.02] border-r border-white/10">
                                        <div className="relative group mb-8">
                                            <img src={selectedProject.image} alt={selectedProject.title} className="w-full rounded-3xl border border-white/5 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]" />
                                            <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none" />
                                        </div>

                                        <div className="space-y-4">
                                            <a href={selectedProject.live} target="_blank" rel="noreferrer" className="flex items-center justify-between p-5 bg-cyan-500 rounded-2xl text-black font-black uppercase text-[10px] tracking-widest hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all">
                                                Launch Experience <Globe size={18} />
                                            </a>
                                            <a href={selectedProject.github} target="_blank" rel="noreferrer" className="flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-2xl text-white font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all">
                                                Source Code <Github size={18} />
                                            </a>
                                        </div>
                                    </div>

                                    {/* Right Panel: Details */}
                                    <div className="lg:col-span-7 p-10 lg:p-16">
                                        <div className="flex justify-between items-start mb-12">
                                            <div>
                                                <h2 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-3 leading-tight">{selectedProject.title}</h2>
                                                <div className="flex items-center gap-2">
                                                    <div className="h-px w-6 bg-cyan-500" />
                                                    <span className="text-cyan-400 font-bold text-[10px] tracking-[0.3em] uppercase">{selectedProject.tagline}</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setSelectedProject(null)}
                                                className="p-3 bg-white/5 rounded-full text-white hover:bg-red-500/20 transition-all hover:rotate-90"
                                            >
                                                <X size={20} />
                                            </button>
                                        </div>

                                        <div className="space-y-12">
                                            {/* Tech Stack */}
                                            <div>
                                                <div className="flex items-center gap-2 text-white/30 font-bold text-[10px] uppercase tracking-widest mb-6">
                                                    <Cpu size={14} /> Technology Architecture
                                                </div>
                                                <div className="flex flex-wrap gap-3">
                                                    {selectedProject.tech.map(t => (
                                                        <span key={t} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white/70 text-[10px] font-bold uppercase tracking-widest">
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Challenges & Future */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="p-8 rounded-[2rem] bg-red-500/5 border border-red-500/10 hover:bg-red-500/[0.08] transition-colors">
                                                    <div className="flex items-center gap-2 text-red-500 font-black text-[10px] uppercase mb-4">
                                                        <ShieldAlert size={14} /> Challenges
                                                    </div>
                                                    <p className="text-white/50 text-[11px] leading-relaxed italic">"{selectedProject.challenges}"</p>
                                                </div>
                                                <div className="p-8 rounded-[2rem] bg-cyan-500/5 border border-cyan-500/10 hover:bg-cyan-500/[0.08] transition-colors">
                                                    <div className="flex items-center gap-2 text-cyan-500 font-black text-[10px] uppercase mb-4">
                                                        <Zap size={14} /> Future
                                                    </div>
                                                    <p className="text-white/50 text-[11px] leading-relaxed italic">"{selectedProject.future}"</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

            </div>
        </section>
    );
};

export default Projects;