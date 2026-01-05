import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Medal, ShieldCheck, Compass, Award, ZoomIn, X, ExternalLink, Star, FileText } from 'lucide-react';

// আইকন ম্যাপার: ডাটাবেজ থেকে আসা স্ট্রিংকে আইকনে কনভার্ট করবে
const ICON_MAP = {
    medal: <Medal className="text-pink-500" />,
    shield: <ShieldCheck className="text-red-500" />,
    compass: <Compass className="text-cyan-500" />,
    award: <Award className="text-blue-500" />,
};

const Certificate = () => {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                // ভবিষ্যতে এখানে API কল হবে। আপাতত আপনার অরিজিনাল ডাটা নিচে দেওয়া হলো:
                const data = [
                    {
                        id: 1,
                        title: "Vocal Excellence Award",
                        issuer: "Cultural Academy",
                        category: "Singing",
                        iconName: "medal",
                        image: "https://images.unsplash.com/photo-1589330273594-fade1ee91647",
                        externalLink: "#" // আপনার সিংগিং সার্টিফিকেটের লিংক এখানে দিন
                    },
                    {
                        id: 2,
                        title: "Humanitarian Service",
                        issuer: "Red Crescent Society",
                        category: "Volunteering",
                        iconName: "shield",
                        image: "https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8",
                        externalLink: "#" // রেড ক্রিসেন্ট সার্টিফিকেটের লিংক এখানে দিন
                    },
                    {
                        id: 3,
                        title: "AutoCAD Electrical Essentials",
                        issuer: "SourceCAD",
                        category: "Engineering Design",
                        iconName: "compass",
                        image: "https://images.unsplash.com/photo-1503387762-592dee58c160",
                        externalLink: "https://drive.google.com/file/d/1U0AvOhk0WBP0r39CVYdugoW4e2sC2uTk/preview"
                    },
                    {
                        id: 4,
                        title: "AutoCAD Beginner to Expert",
                        issuer: "Tutorialspoint",
                        category: "Engineering Design",
                        iconName: "award",
                        image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a",
                        externalLink: "https://drive.google.com/file/d/19rXdXeubA-7_IDEw-nx5eskZDmYQ2e5i/preview"
                    }
                ];
                setCertificates(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching certificates:", error);
                setLoading(false);
            }
        };
        fetchCertificates();
    }, []);

    const openLink = (url) => {
        if (url !== "#") window.open(url, '_blank', 'noopener,noreferrer');
        else alert("Certificate link will be updated soon!");
    };

    if (loading) return <div className="py-32 text-center text-white/20 tracking-[0.5em] uppercase animate-pulse">Loading Credentials...</div>;

    return (
        <section id="certificates" className="relative py-32 bg-transparent overflow-hidden">
            {/* Background Aesthetic Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* --- Header Section --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-28 md:mb-36 gap-10">
                    <div className="flex-1 min-w-0">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-cyan-500 font-black text-[10px] tracking-[0.5em] uppercase mb-6"
                        >
                            Verified Records
                        </motion.div>

                        {/* leading-[1.1] ব্যবহার করা হয়েছে যাতে নিচের ডিভ এর সাথে ওভারল্যাপ না হয় */}
                        {/* pr-8 যোগ করা হয়েছে যাতে Italic 'S' অক্ষরটি কেটে না যায় */}
                        <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[1.1] overflow-visible py-2">
                            CERTIFI<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 italic inline-block pr-8">CATES</span>
                        </h2>
                    </div>

                    <div className="md:text-right shrink-0">
                        <p className="text-white/30 max-w-[250px] text-xs leading-relaxed border-l md:border-l-0 md:border-r border-white/10 pl-6 md:pl-0 md:pr-6 uppercase tracking-widest mb-4">
                            Official recognition of my technical and artistic expertise.
                        </p>
                        <div className="h-1 w-20 bg-cyan-500 ml-auto hidden md:block rounded-full" />
                    </div>
                </div>

                {/* Certificates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {certificates.map((cert, index) => (
                        <motion.div
                            key={cert.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group relative h-[480px] bg-white/[0.02] border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col hover:border-cyan-500/40 transition-all duration-500 backdrop-blur-3xl shadow-2xl"
                        >
                            {/* Visual Preview Area */}
                            <div className="h-[45%] relative overflow-hidden bg-slate-900/50">
                                <img
                                    src={cert.image}
                                    alt={cert.title}
                                    className="w-full h-full object-cover opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                                <button
                                    onClick={() => setSelectedImage(cert.image)}
                                    className="absolute top-5 right-5 p-3 bg-black/50 backdrop-blur-xl rounded-full text-white/50 hover:text-white opacity-0 group-hover:opacity-100 transition-all shadow-xl"
                                >
                                    <ZoomIn size={18} />
                                </button>
                            </div>

                            {/* Content Info */}
                            <div className="p-8 flex flex-col justify-between flex-1">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/5 rounded-xl border border-white/10 group-hover:bg-cyan-500 group-hover:text-black transition-all duration-500">
                                            {ICON_MAP[cert.iconName] || <Star size={20} />}
                                        </div>
                                        <span className="text-cyan-500 text-[10px] font-black uppercase tracking-[0.2em]">{cert.category}</span>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-cyan-400 transition-colors">
                                            {cert.title}
                                        </h3>
                                        <p className="text-white/30 text-[10px] uppercase font-bold tracking-widest leading-relaxed">
                                            Issued by: {cert.issuer}
                                        </p>
                                    </div>
                                </div>

                                {/* External View Button */}
                                <button
                                    onClick={() => openLink(cert.externalLink)}
                                    className="mt-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-white hover:text-black hover:scale-[1.02] transition-all duration-500 active:scale-95"
                                >
                                    <FileText size={16} /> View Credential
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal for Image Preview */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-2xl"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="relative max-w-5xl w-full"
                        >
                            <img
                                src={selectedImage}
                                alt="Certificate Large View"
                                className="w-full h-auto max-h-[85vh] object-contain rounded-2xl border border-white/10 shadow-2xl"
                            />
                            <button className="absolute -top-12 right-0 text-white/50 hover:text-white flex items-center gap-2 uppercase text-[10px] font-bold tracking-widest">
                                Click anywhere to close <X size={20} />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Certificate;