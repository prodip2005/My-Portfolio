import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Download, Code2 } from 'lucide-react';
import Img from '../../assets/1000002535.jpg';

const Profile = () => {
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
    };

    // সরাসরি ডাউনলোডের জন্য গুগল ড্রাইভ লিঙ্ক ফরম্যাট
    const directDownloadLink = "https://drive.google.com/uc?export=download&id=1I0a6FWeUTrH5-4tJc1Gv3oKwcza5XrEP";

    return (
        <section id='#' className="relative min-h-screen flex items-center justify-center pt-28 pb-40 lg:py-20 px-6 lg:px-12 overflow-hidden bg-transparent">
            {/* Ambient Background Lights */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 lg:w-96 lg:h-96 bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 lg:w-96 lg:h-96 bg-purple-600/10 blur-[120px] rounded-full animate-pulse delay-700" />

            <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20 relative z-10">

                {/* --- IMAGE SECTION --- */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2 }}
                    className="w-full lg:w-1/2 flex justify-center lg:justify-end order-1 lg:order-2"
                >
                    <div className="relative group w-full max-w-[260px] md:max-w-[380px] lg:max-w-lg">
                        <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-r from-cyan-500/20 to-purple-600/20 blur-3xl group-hover:opacity-100 transition-opacity duration-700" />

                        <motion.div
                            whileHover={{ rotateY: 8, rotateX: -5 }}
                            style={{ perspective: 1200 }}
                            className="relative w-full aspect-[4/5] bg-[#0c1222] rounded-[2.5rem] lg:rounded-[3.5rem] p-2.5 lg:p-3 border border-white/20 shadow-2xl overflow-hidden cursor-pointer"
                        >
                            <div className="relative h-full w-full rounded-[1.8rem] lg:rounded-[2.8rem] overflow-hidden bg-slate-800">
                                <img
                                    src={Img}
                                    alt="Prodip Hore Profile"
                                    className="h-full w-full object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1222] via-transparent to-transparent opacity-90" />
                            </div>

                            <div className="absolute bottom-6 left-6 right-6 lg:bottom-8 lg:left-8 lg:right-8">
                                <div className="flex items-center gap-2 mb-1 lg:mb-2">
                                    <Code2 size={14} className="text-cyan-400 animate-pulse" />
                                    <p className="text-white/60 font-mono text-[8px] lg:text-[10px] tracking-widest uppercase">System v2.0 // MERN</p>
                                </div>
                                <h3 className="text-white font-bold text-xl lg:text-3xl tracking-tight uppercase">Prodip Hore</h3>
                                <div className="h-1 w-10 bg-gradient-to-r from-cyan-400 to-blue-500 mt-2 rounded-full" />
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-2 -right-2 lg:-top-4 lg:-right-6 p-2 lg:p-5 bg-slate-900/80 backdrop-blur-xl border border-white/20 rounded-xl lg:rounded-3xl shadow-2xl flex items-center gap-2 z-20"
                        >
                            <div className="h-2 w-2 bg-green-500 rounded-full animate-ping" />
                            <div className="flex flex-col">
                                <span className="text-white font-bold text-[8px] lg:text-sm leading-tight">Online</span>
                                <span className="text-white/40 text-[6px] lg:text-[10px] uppercase font-mono tracking-tighter hidden xs:block">Available for hire</span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* --- CONTENT SECTION --- */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="w-full lg:w-1/2 text-center lg:text-left order-2 lg:order-1"
                >
                    <motion.div variants={fadeInUp} className="flex items-center justify-center lg:justify-start gap-2 mb-4 lg:mb-6">
                        <div className="p-1.5 lg:p-2 bg-cyan-500/10 rounded-lg">
                            <Terminal size={14} className="text-cyan-400" />
                        </div>
                        <span className="text-cyan-400 text-[8px] lg:text-[10px] font-bold tracking-[0.3em] lg:tracking-[0.4em] uppercase">
                            Full Stact Developer and Machine Learning aspharent
                        </span>
                    </motion.div>

                    <motion.h1
                        variants={fadeInUp}
                        className="text-4xl xs:text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[1.1] mb-6 lg:mb-8 py-2 overflow-visible"
                    >
                        Prodip <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 italic pr-8 inline-block">Hore</span>
                    </motion.h1>

                    <motion.p variants={fadeInUp} className="text-slate-400 text-xs sm:text-base lg:text-xl max-w-md lg:max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8 lg:mb-10 font-light px-2 lg:px-0">
                        Engineering <span className="text-white font-medium">high-performance web ecosystems</span> where logic meets creativity.
                        I build <span className="text-cyan-400 italic">resilient architectures</span> for digital experiences.
                    </motion.p>

                    <motion.div variants={fadeInUp} className="flex justify-center lg:justify-start">
                        {/* Download Resume Link Button */}
                        <motion.a
                            href={directDownloadLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 lg:px-10 py-3 lg:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold text-sm lg:text-base rounded-xl lg:rounded-2xl flex items-center gap-3 shadow-xl shadow-cyan-500/20 transition-all cursor-pointer no-underline inline-flex"
                        >
                            Download Resume <Download size={18} />
                        </motion.a>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
};

export default Profile;