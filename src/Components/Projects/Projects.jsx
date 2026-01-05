import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldAlert, Zap, Cpu, Globe, Github, ArrowRight } from 'lucide-react';
import ProjectCard from '../ProjectCard';

const PROJECTS_DATA = [
    {
        id: "01",
        title: "Tutor OWL",
        tagline: "Educational Networking Platform",
        desc: "A web-based platform connecting students with suitable tutors through an organized and user-friendly interface.",
        tech: ["React.js", "Node.js", "MongoDB", "Tailwind", "Firebase"],
        github: "https://github.com/prodip2005/Tution-BD.git",
        live: "https://gentle-fairy-2db57a.netlify.app/",
        image: "https://i.ibb.co.com/LzfhcR51/Screenshot-From-2026-01-01-10-54-12.png",
        challenges: "Managing real-time tutor availability sync required custom hook logic and Firebase optimization.",
        future: "Automating lesson scheduling with Google Calendar API and implementing a built-in video call feature."
    },
    {
        id: "02",
        title: "Attendance Tracker",
        tagline: "Smart Academic Utility",
        desc: "An efficient tracker for subject-wise and overall attendance with easy management and update features.",
        tech: ["React.js", "Node.js", "MongoDB", "Tailwind", "Firebase"],
        github: "https://github.com/prodip2005/Attendence-Calc-Clint.git",
        live: "https://majestic-mooncake-21d3bd.netlify.app/",
        image: "https://i.ibb.co.com/3m20LLYG/Screenshot-From-2026-01-01-11-05-36.png",
        challenges: "Handling frequent state updates for live attendance calculations without performance lag.",
        future: "Syncing data with official institution APIs and generating automatic PDF reports."
    },
    {
        id: "03",
        title: "Vehicle Hub",
        tagline: "Automotive Rental System",
        desc: "Secure rental and listing platform for vehicles with booking and management functionalities.",
        tech: ["React.js", "Node.js", "MongoDB", "Tailwind", "Firebase"],
        github: "https://github.com/prodip2005/Vehicle-Shop-Clint.git",
        live: "https://admirable-elf-d414ab.netlify.app/",
        image: "https://i.ibb.co.com/1GZntqj4/Screenshot-From-2026-01-01-13-32-09.png",
        challenges: "Ensuring secure server-side validation for rentals and avoiding double booking scenarios.",
        future: "Real-time GPS tracking for vehicles and automated payment receipts with SMS."
    }
];

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <section id="projects" className="relative py-32 bg-transparent overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

           
                {/* --- Section Header --- */}
                <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="text-left relative overflow-visible">
                        {/* overflow-visible নিশ্চিত করে যে বাইরের দিকে কিছু যাবে না */}
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-6xl lg:text-8xl font-black text-white leading-[1.1] tracking-tighter pr-10"
                        >
                            MY <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-600 italic pb-4 pr-4 ml-2">PROJECTS</span>
                        </motion.h2>

                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: '80px' }}
                            className="h-1.5 bg-cyan-500 mt-2 rounded-full"
                        />
                    </div>

                    {/* All Projects Button (Desktop) */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="hidden md:flex items-center gap-3 bg-white/5 border border-white/10 px-8 py-4 rounded-2xl text-white font-bold text-[10px] tracking-[0.2em] hover:bg-white hover:text-black transition-all group"
                        onClick={() => window.location.href = '/all-projects'}
                    >
                        VIEW ALL ARTIFACTS
                        <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                    </motion.button>
                </div>

                

                {/* --- Project Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PROJECTS_DATA.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            onClick={() => setSelectedProject(project)}
                        />
                    ))}
                </div>

                {/* All Projects Button (Mobile Only) */}
                <div className="mt-16 flex justify-center md:hidden">
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-3 bg-white/5 border border-white/10 px-10 py-5 rounded-2xl text-white font-black text-[10px] tracking-widest uppercase"
                        onClick={() => window.location.href = '/all-projects'}
                    >
                        View All Projects <ArrowRight size={16} />
                    </motion.button>
                </div>

                {/* --- Cinematic Modal --- */}
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