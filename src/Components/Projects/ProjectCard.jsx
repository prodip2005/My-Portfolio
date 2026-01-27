import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const ProjectCard = ({ project, index, onClick }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            onClick={onClick}
            // h-[240px] মোবাইলের জন্য একটি ছোট এবং ফিক্সড হাইট নিশ্চিত করবে
            className="group relative w-full h-[240px] sm:h-[300px] md:h-[400px] bg-[#0a0a0a] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden cursor-pointer border border-white/10"
        >
            {/* Background Image Container */}
            <div className="absolute inset-0">
                <img
                    src={project.image}
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                    alt={project.title}
                />
                {/* শক্তিশালী কালো গ্রেডিয়েন্ট যাতে কার্ড ছোট হলেও লেখা পরিষ্কার থাকে */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/60 to-transparent" />
            </div>

            {/* Content Area */}
            <div className="absolute inset-0 p-4 md:p-8 flex flex-col justify-end">
                <div className="space-y-1">
                    <span className="text-cyan-400 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] block">
                        {project.tagline || 'Artifact'}
                    </span>
                    <h3 className="text-sm md:text-2xl font-black text-white uppercase leading-tight truncate">
                        {project.title}
                    </h3>
                </div>

                {/* Bottom Bar: Explore Section */}
                <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center">
                    <span className="text-white/40 text-[8px] md:text-[10px] font-bold uppercase tracking-widest">
                        Explore
                    </span>
                    <div className="p-1.5 bg-cyan-500/10 rounded-full border border-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                        <ArrowUpRight size={14} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;