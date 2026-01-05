import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMessageCircle, FiArrowUpRight } from 'react-icons/fi';

const Contact = () => {
    const contactData = [
        {
            id: 1,
            title: "Email Support",
            value: "prodiphore2005@gmail.com",
            link: "mailto:prodiphore2005@gmail.com",
            icon: <FiMail />,
            brandColor: "text-[#ea4335]", // Gmail Red
            bgLight: "bg-[#ea4335]/10",
            borderHover: "group-hover:border-[#ea4335]/50",
            glow: "shadow-[0_0_30px_-10px_rgba(234,67,53,0.3)]"
        },
        {
            id: 2,
            title: "Call Hotline",
            value: "+880 1910 644031",
            link: "tel:+8801910644031",
            icon: <FiPhone />,
            brandColor: "text-[#3b82f6]", // Phone Blue
            bgLight: "bg-[#3b82f6]/10",
            borderHover: "group-hover:border-[#3b82f6]/50",
            glow: "shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)]"
        },
        {
            id: 3,
            title: "WhatsApp Chat",
            value: "01910644031",
            link: "https://wa.me/8801910644031",
            icon: <FiMessageCircle />,
            brandColor: "text-[#25d366]", // WhatsApp Green
            bgLight: "bg-[#25d366]/10",
            borderHover: "group-hover:border-[#25d366]/50",
            glow: "shadow-[0_0_30px_-10px_rgba(37,211,102,0.3)]"
        }
    ];

    return (
        <section className="py-32 bg-transparent font-['Outfit'] text-white relative">
            <div className="container mx-auto px-6 relative z-10">

                {/* Section Header */}
                <div className="text-center mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-[1000] tracking-tighter italic uppercase leading-none"
                    >
                        Direct <span className="text-primary not-italic opacity-20">Contact</span>
                    </motion.h2>
                </div>

                {/* Contact Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
                    {contactData.map((item, i) => (
                        <motion.a
                            key={item.id}
                            href={item.link}
                            target={item.id === 3 ? "_blank" : "_self"}
                            rel="noreferrer"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.7 }}
                            whileHover={{ y: -15 }}
                            className={`group relative p-12 rounded-[3.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl transition-all duration-500 flex flex-col items-center text-center ${item.borderHover} ${item.glow}`}
                        >
                            {/* Brand Colored Icon Container */}
                            <div className="relative mb-10">
                                {/* Always Visible Glow */}
                                <div className={`absolute inset-0 blur-2xl rounded-full opacity-20 group-hover:opacity-40 transition-opacity ${item.brandColor.replace('text-', 'bg-')}`} />

                                <div className={`relative w-24 h-24 rounded-3xl border border-white/10 flex items-center justify-center text-4xl transition-all duration-500 
                                    ${item.bgLight} ${item.brandColor} group-hover:bg-white group-hover:rotate-[360deg]`}>
                                    {item.icon}
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="space-y-4">
                                <h3 className={`text-xs font-black uppercase tracking-[0.3em] opacity-60`}>
                                    {item.title}
                                </h3>
                                <p className={`text-2xl font-[1000] italic tracking-tighter transition-all duration-300 ${item.brandColor}`}>
                                    {item.value}
                                </p>
                            </div>

                            {/* Interactive Arrow with Brand Color */}
                            <div className={`mt-10 flex items-center justify-center w-12 h-12 rounded-full border border-white/10 group-hover:border-current transition-all ${item.brandColor}`}>
                                <FiArrowUpRight className="text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Contact;