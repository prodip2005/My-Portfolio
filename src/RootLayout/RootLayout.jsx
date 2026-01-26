import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import { Outlet, Link } from 'react-router';
import ScienceBackground from '../Components/ScienceBackground';
import Footer from '../Components/Footer';

const RootLayout = () => {
    const [isFooterVisible, setIsFooterVisible] = useState(false);
    // নামের জন্য নতুন স্টেট
    const [personalData, setPersonalData] = useState({ firstName: '', lastName: '' });

    useEffect(() => {
        // ১. JSON থেকে ডাটা ফেচ করা
        fetch('/home.json')
            .then((res) => res.json())
            .then((data) => {
                setPersonalData({
                    firstName: data.firstName,
                    lastName: data.lastName
                });
            })
            .catch((err) => console.error("Error fetching name:", err));

        // ২. ফুটার অবজারভার লজিক (আগের মতই)
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsFooterVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        const footer = document.querySelector('#footer');
        if (footer) observer.observe(footer);

        return () => {
            if (footer) observer.unobserve(footer);
        };
    }, []);

    return (
        <div className="relative min-h-screen">
            <ScienceBackground />

            <div className="relative z-10">
                {/* Branding Logo */}
                <header className="fixed top-8 left-8 z-[90]">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center font-black text-white text-xl shadow-lg shadow-cyan-500/20">
                            {personalData.firstName ? personalData.firstName.charAt(0) : 'P'}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white font-bold tracking-tighter text-lg leading-none uppercase">
                                {personalData.firstName} {personalData.lastName}
                            </span>
                        </div>
                    </Link>
                </header>

                <main>
                    <Outlet />
                </main>

                <Footer />

                <Navbar isFooterVisible={isFooterVisible} />
            </div>
        </div>
    );
};

export default RootLayout;