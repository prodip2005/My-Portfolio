import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import ProjectCard from '../ProjectCard';

const AllProjects = () => {
    const axios = useAxios();
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    // Pagination States
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 12;

    useEffect(() => {
        axios.get('/projects')
            .then(res => {
                setProjects(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error:", err);
                setLoading(false);
            });
    }, [axios]);

    // Pagination Logic
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
    const totalPages = Math.ceil(projects.length / projectsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-[#020617]">
                <RefreshCw className="animate-spin text-cyan-400" size={50} />
            </div>
        );
    }

    return (
        <section className="min-h-screen ] py-20 px-6">
            <div className="max-w-[1600px] mx-auto">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors group font-bold text-xs tracking-widest"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform" /> BACK TO BASE
                    </button>

                    <div className="text-center">
                        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter italic">
                            All <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Artifacts</span>
                        </h2>
                        <p className="text-slate-500 text-[10px] uppercase tracking-[0.5em] mt-4 font-bold">Total Compiled: {projects.length} Units</p>
                    </div>

                    <div className="w-32 hidden md:block"></div> {/* Spacer for alignment */}
                </div>

                {/* Projects Grid - 4 Columns on large screens */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20"
                >
                    <AnimatePresence>
                        {currentProjects.map((project, index) => (
                            <motion.div
                                key={project._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <ProjectCard project={project} index={index} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Pagination Controls */}
                {projects.length > projectsPerPage && (
                    <div className="flex justify-center items-center gap-4 mt-10">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => paginate(currentPage - 1)}
                            className={`p-4 rounded-2xl border border-white/10 transition-all ${currentPage === 1 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-cyan-500 hover:text-black text-white'}`}
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <div className="flex gap-2">
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => paginate(i + 1)}
                                    className={`w-12 h-12 rounded-xl font-black transition-all border ${currentPage === i + 1 ? 'bg-cyan-500 text-black border-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.3)]' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => paginate(currentPage + 1)}
                            className={`p-4 rounded-2xl border border-white/10 transition-all ${currentPage === totalPages ? 'opacity-20 cursor-not-allowed' : 'hover:bg-cyan-500 hover:text-black text-white'}`}
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