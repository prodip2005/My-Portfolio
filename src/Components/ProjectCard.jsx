import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Code2 } from 'lucide-react';

const ProjectCard = ({ project, index, onClick }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            whileHover={{ y: -12 }}
            onClick={onClick}
            className="group relative h-[480px] rounded-[2.5rem] overflow-hidden cursor-pointer border border-white/5 bg-slate-900/40 backdrop-blur-md shadow-2xl"
        >
            {/* --- Top Accent Line --- */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />

            {/* --- Project Image with Tilt Effect --- */}
            <div className="absolute inset-0 z-0">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-50 grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 group-hover:rotate-2 transition-all duration-1000 ease-out"
                />
                {/* Overlay Gradients */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/80 to-slate-950 transition-opacity duration-500 group-hover:opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>

            {/* --- Top Header (ID & Icon) --- */}
            <div className="absolute top-8 left-8 right-8 flex justify-between items-start z-10">
                <div className="flex flex-col">
                    <span className="text-white/20 text-5xl font-black group-hover:text-cyan-500/30 transition-colors duration-500">
                        {project.id}
                    </span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md group-hover:bg-cyan-500 group-hover:text-black transition-all duration-500 group-hover:rotate-[360deg]">
                    <Code2 size={20} />
                </div>
            </div>

            {/* --- Card Content --- */}
            <div className="absolute inset-0 p-10 flex flex-col justify-end z-20">
                {/* Tagline */}
                <div className="overflow-hidden">
                    <motion.span
                        className="inline-block text-cyan-400 font-bold text-[10px] tracking-[0.3em] uppercase mb-3"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {project.tagline}
                    </motion.span>
                </div>

                {/* Title */}
                <h3 className="text-3xl lg:text-4xl font-black text-white mb-4 group-hover:tracking-wider transition-all duration-500">
                    {project.title}
                </h3>

                {/* Description - Revealed on Hover */}
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
                    <p className="text-white/60 text-sm leading-relaxed overflow-hidden opacity-0 group-hover:opacity-100 mb-6 group-hover:mt-2 transition-all duration-500">
                        {project.desc}
                    </p>
                </div>

                {/* Footer Link */}
                <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-4">
                    <span className="text-white/40 group-hover:text-white font-bold text-[10px] uppercase tracking-widest transition-colors">
                        Explore Artifact
                    </span>
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 group-hover:translate-x-1">
                        <ArrowUpRight size={18} />
                    </div>
                </div>
            </div>

            {/* --- Hover Glow Effect --- */}
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 pointer-events-none" />
        </motion.div>
    );
};

export default ProjectCard;