import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, RefreshCw, ChevronLeft, ChevronRight, X, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import ProjectCard from '../ProjectCard';

const AllProjects = () => {
    const axios = useAxios();
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    // ডিভাইস অনুযায়ী আইটেম সংখ্যা নির্ধারণের স্টেট
    const [projectsPerPage, setProjectsPerPage] = useState(12);

    useEffect(() => {
        // স্ক্রিন সাইজ অনুযায়ী projectsPerPage আপডেট করার ফাংশন
        const handleResize = () => {
            if (window.innerWidth < 640) { // small devices (phone)
                setProjectsPerPage(6); // ৫টির বদলে ৬টি দেওয়া ভালো কারণ গ্রিড ২ কলামের (জোড় সংখ্যা)
            } else {
                setProjectsPerPage(12); // large devices
            }
        };

        handleResize(); // ইনিশিয়াল চেক
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        axios.get('/projects')
            .then(res => {
                setProjects(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching projects:", err);
                setLoading(false);
            });
    }, [axios]);

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
    const totalPages = Math.ceil(projects.length / projectsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) return (
        <div className="min-h-screen flex justify-center items-center bg-[#020617]">
            <RefreshCw className="animate-spin text-cyan-400" size={50} />
        </div>
    );

    return (
        <section className="min-h-screen py-10 md:py-20 px-3 md:px-6 bg-[#020617]">
            <div className="max-w-[1600px] mx-auto">

                {/* --- Header --- */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                    <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-cyan-400 flex items-center gap-2 font-bold text-[10px] tracking-widest uppercase transition-colors">
                        <ArrowLeft size={16} /> Back
                    </button>
                    <h2 className="text-3xl md:text-6xl font-black text-white uppercase italic text-center leading-tight">
                        All <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Artifacts</span>
                    </h2>
                    <div className="hidden md:block w-24"></div>
                </div>

                {/* --- Projects Grid --- */}
                {/* মোবাইলে ২ কলাম এবং মাঝারি/বড় স্ক্রিনে ৩/৪/৫ কলাম */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 px-2 md:px-0">
                    {currentProjects.map((project, index) => (
                        <ProjectCard
                            key={project._id}
                            project={project}
                            index={index}
                            onClick={() => setSelectedProject(project)}
                        />
                    ))}
                </div>

                {/* --- Detail Modal --- */}
                <AnimatePresence>
                    {selectedProject && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedProject(null)}
                                className="absolute inset-0 bg-black/95 backdrop-blur-md"
                            />
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto scrollbar-hide"
                            >
                                <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 z-50 p-2 bg-white/10 rounded-full text-white hover:bg-red-500 transition-colors">
                                    <X size={20} />
                                </button>

                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    <div className="h-56 md:h-full">
                                        <img src={selectedProject.image} className="w-full h-full object-cover" alt="" />
                                    </div>
                                    <div className="p-6 md:p-10 space-y-5">
                                        <div>
                                            <h3 className="text-2xl md:text-4xl font-black text-white uppercase leading-tight">{selectedProject.title}</h3>
                                            <p className="text-cyan-400 text-[10px] font-bold tracking-widest uppercase mt-2">{selectedProject.tagline}</p>
                                        </div>

                                        <div className="flex gap-3">
                                            <a href={selectedProject.live} target="_blank" rel="noreferrer" className="flex-1 text-center py-3 bg-cyan-500 text-black font-black rounded-xl text-[10px] uppercase">Live</a>
                                            <a href={selectedProject.github} target="_blank" rel="noreferrer" className="flex-1 text-center py-3 bg-white/5 border border-white/10 text-white font-black rounded-xl text-[10px] uppercase">Code</a>
                                        </div>

                                        <div className="pt-4 border-t border-white/5">
                                            <div className="flex items-center gap-2 text-white/40 text-[9px] uppercase font-bold mb-3"><Cpu size={12} /> Tech Stack</div>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedProject.tech?.map(t => (
                                                    <span key={t} className="px-3 py-1 bg-white/5 rounded-md text-[9px] text-white/70 border border-white/10">{t}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* --- Pagination --- */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-3 mt-12 mb-10">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => paginate(currentPage - 1)}
                            className="p-3 rounded-full border border-white/10 text-white disabled:opacity-20 hover:bg-cyan-500 hover:text-black transition-all"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <span className="text-white/40 font-black text-xs tracking-widest">
                            {currentPage} <span className="mx-1 text-white/10">/</span> {totalPages}
                        </span>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => paginate(currentPage + 1)}
                            className="p-3 rounded-full border border-white/10 text-white disabled:opacity-20 hover:bg-cyan-500 hover:text-black transition-all"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AllProjects;