import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import ScienceBackground from '../Components/ScienceBackground'; // আপনার সংরক্ষিত নাম
import Footer from '../Components/Footer';

const RootLayout = () => {
    return (
        <div className="relative min-h-screen bg-[#020617]">
            {/* ব্যাকগ্রাউন্ড সবসময় ফিক্সড */}
            <div id="science-background-container" className="fixed inset-0 z-0">
                <ScienceBackground />
            </div>

            <div className="relative z-10">
                {/* নেভবার */}
                <Navbar />

                {/* কন্টেন্ট এরিয়া - প্যাডিং বাড়ানো হয়েছে */}
                <main className="pt-32 md:pt-40">
                    <Outlet />
                </main>

                <div id="footer-section">
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default RootLayout;