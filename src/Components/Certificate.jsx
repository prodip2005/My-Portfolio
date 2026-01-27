import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Medal, ShieldCheck, Compass, Award, ZoomIn, X, Star, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import useAxios from '../hooks/useAxios';

const ICON_MAP = {
    medal: <Medal className="text-pink-500" />,
    shield: <ShieldCheck className="text-red-500" />,
    compass: <Compass className="text-cyan-500" />,
    award: <Award className="text-blue-500" />,
};

const Certificate = () => {
    const axios = useAxios();
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const res = await axios.get('/certificates');
                setCertificates(res.data);
            } catch (error) { console.error(error); }
            finally { setLoading(false); }
        };
        fetchCertificates();
    }, [axios]);

    const totalPages = Math.ceil(certificates.length / itemsPerPage);
    const currentItems = certificates.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const openLink = (url) => {
        if (url && url !== "#") window.open(url, '_blank', 'noopener,noreferrer');
        else alert("Certificate link not available!");
    };

    if (loading) return <div className="py-32 text-center text-white/20 tracking-[0.5em] uppercase animate-pulse">Loading Credentials...</div>;

    return (
        <section id="certificates" className="relative py-20 md:py-32 bg-transparent overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* --- Header Section --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-28 gap-6 md:gap-10">
                    <div className="flex-1 min-w-0">
                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-cyan-500 font-black text-[10px] tracking-[0.3em] md:tracking-[0.5em] uppercase mb-4 md:mb-6">
                            Verified Records
                        </motion.div>
                        {/* মোবাইলে এক লাইনে রাখার জন্য text-4xl এবং প্যাডিং কমানো হয়েছে */}
                        <h2 className="text-4xl md:text-8xl font-black text-white tracking-tighter leading-none py-2 uppercase">
                            Certifi
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 italic inline-block pr-2 md:pr-8">
                                cates
                            </span>
                        </h2>
                    </div>
                </div>

                {/* --- Grid Section --- */}
                {/* মোবাইলে ২ কলাম এবং ল্যাপটপে ৪ কলাম */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                    <AnimatePresence mode='wait'>
                        {currentItems.map((cert) => (
                            <motion.div
                                key={cert._id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="group relative h-[320px] md:h-[480px] bg-white/[0.02] border border-white/10 rounded-2xl md:rounded-[2.5rem] overflow-hidden flex flex-col hover:border-cyan-500/40 transition-all backdrop-blur-3xl"
                            >
                                {/* Certificate Image Container */}
                                <div className="h-[40%] md:h-[45%] relative overflow-hidden">
                                    <img src={cert.image} alt={cert.title} className="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-all duration-700 md:grayscale md:group-hover:grayscale-0" />
                                    <button onClick={() => setSelectedImage(cert.image)} className="absolute top-2 right-2 md:top-5 md:right-5 p-2 md:p-3 bg-black/50 backdrop-blur-xl rounded-full text-white/50 opacity-0 group-hover:opacity-100 transition-all">
                                        <ZoomIn size={14} className="md:w-[18px]" />
                                    </button>
                                </div>

                                {/* Content Section */}
                                <div className="p-3 md:p-8 flex flex-col justify-between flex-1">
                                    <div className="space-y-1 md:space-y-4">
                                        <div className="flex items-center gap-2 md:gap-3">
                                            <div className="p-1 md:p-2 bg-white/5 rounded-lg border border-white/10 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                                                {/* মোবাইলে আইকন ছোট */}
                                                {React.cloneElement(ICON_MAP[cert.iconName] || <Star />, { size: 14, className: "md:w-5 md:h-5" })}
                                            </div>
                                            <span className="text-cyan-500 text-[7px] md:text-[10px] font-black uppercase tracking-widest">{cert.category}</span>
                                        </div>
                                        <h3 className="text-xs md:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2 leading-tight">
                                            {cert.title}
                                        </h3>
                                        <p className="text-white/30 text-[7px] md:text-[10px] uppercase font-bold tracking-tighter md:tracking-widest truncate">
                                            {cert.issuer}
                                        </p>
                                    </div>
                                    <button onClick={() => openLink(cert.externalLink)} className="mt-2 md:mt-8 py-2 md:py-4 rounded-lg md:rounded-2xl bg-white/5 border border-white/10 text-white text-[7px] md:text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all">
                                        <FileText size={12} className="md:w-4 md:h-4" /> View Credential
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* --- Pagination --- */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-3 md:gap-6 mt-10 md:mt-16">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-2 md:p-4 rounded-full border border-white/10 text-white hover:bg-cyan-500 hover:text-black disabled:opacity-20 transition-all"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <span className="text-white/40 font-black text-[10px] md:text-xs tracking-widest uppercase">
                            {currentPage} / {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="p-2 md:p-4 rounded-full border border-white/10 text-white hover:bg-cyan-500 hover:text-black disabled:opacity-20 transition-all"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                )}
            </div>

            {/* --- Lightbox Modal --- */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/95 backdrop-blur-2xl" onClick={() => setSelectedImage(null)}>
                        <img src={selectedImage} alt="Large View" className="max-w-full md:max-w-5xl w-full max-h-[85vh] object-contain rounded-xl border border-white/10" />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Certificate;