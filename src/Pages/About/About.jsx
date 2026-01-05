import React from 'react';
import { motion } from 'framer-motion';
import { Code, Brain, GraduationCap, Cpu, Database, Layers } from 'lucide-react';

const About = () => {
    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const floatAnimation = {
        y: [0, -12, 0],
        transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    };

    return (
        <section id='about' className="relative min-h-screen py-28 px-6 lg:px-12 bg-transparent overflow-hidden flex items-center">
            {/* --- ANIMATED BACKGROUND ELEMENTS --- */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-cyan-500/10 blur-[120px] rounded-full"
                />
                <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.15, 0.1] }}
                    transition={{ duration: 8, repeat: Infinity, delay: 1 }}
                    className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full"
                />
            </div>

            <div className="max-w-7xl mx-auto relative z-10 w-full">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="grid lg:grid-cols-2 gap-16 items-center"
                >
                    {/* --- LEFT SIDE: CONTENT --- */}
                    <div className="space-y-8">
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
                            <Cpu size={14} className="text-cyan-400 animate-pulse" />
                            <span className="text-cyan-400 font-mono text-[10px] tracking-[0.3em] uppercase">Identity // Researcher</span>
                        </motion.div>

                        <motion.h2 variants={itemVariants} className="text-5xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter">
                            BRIDGING <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                                CODE & INTELLIGENCE
                            </span>
                        </motion.h2>

                        <motion.div variants={itemVariants} className="space-y-6 text-slate-400 text-lg font-light leading-relaxed max-w-xl">
                            <p>
                                I am a Computer Science & Engineering student at <span className="text-white font-semibold">Patuakhali Science and Technology University (PSTU)</span>, driven by a relentless curiosity for how systems think and evolve.
                            </p>

                            <p>
                                Currently, I architect modern digital experiences using the <span className="text-cyan-400 font-medium">MERN Stack</span>. My approach blends rigorous logic with creative problem-solving to build resilient, full-stack ecosystems.
                            </p>

                            <p>
                                While my hands are on the web, my vision is set on the horizon of <span className="text-purple-400 font-medium">Machine Learning</span>. I aim to transition from building interfaces to engineering intelligent algorithms that redefine human-computer interaction.
                            </p>
                        </motion.div>

                     
                    </div>

                    {/* --- RIGHT SIDE: ANIMATED CARDS --- */}
                    <div className="relative h-[500px] flex items-center justify-center">
                        {/* Main Floating Card */}
                        <motion.div
                            animate={floatAnimation}
                            className="relative z-20 w-full max-w-[350px] aspect-square bg-gradient-to-br from-white/10 to-transparent border border-white/20 rounded-[3rem] backdrop-blur-xl p-8 flex flex-col justify-between overflow-hidden group shadow-2xl"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity">
                                <Database size={120} className="text-white" />
                            </div>

                            <div className="p-4 bg-cyan-500 rounded-2xl w-fit shadow-xl shadow-cyan-500/40">
                                <GraduationCap size={32} className="text-black" />
                            </div>

                            <div>
                                <h3 className="text-white text-3xl font-bold mb-2 uppercase tracking-tighter">Academic Hub</h3>
                                <p className="text-cyan-400 font-mono text-xs tracking-widest uppercase mb-4">PSTU // CSE Faculty</p>
                                <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full" />
                            </div>
                        </motion.div>

                        {/* Secondary Floating Elements */}
                        <motion.div
                            animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-10 right-0 lg:-right-10 z-30 p-6 bg-slate-900/80 border border-white/10 rounded-3xl backdrop-blur-xl shadow-2xl flex items-center gap-4"
                        >
                            <div className="p-3 bg-purple-500/20 rounded-xl">
                                <Brain className="text-purple-400" size={24} />
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm">Future Goal</p>
                                <p className="text-slate-500 text-[10px] uppercase">Machine Learning</p>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, -20, 0], x: [0, -10, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            className="absolute bottom-10 left-0 lg:-left-10 z-30 p-6 bg-slate-900/80 border border-white/10 rounded-3xl backdrop-blur-xl shadow-2xl flex items-center gap-4"
                        >
                            <div className="p-3 bg-blue-500/20 rounded-xl">
                                <Layers className="text-blue-400" size={24} />
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm">Tech Stack</p>
                                <p className="text-slate-500 text-[10px] uppercase">Full-Stack MERN</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;