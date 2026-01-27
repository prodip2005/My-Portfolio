import React from 'react';
import { LayoutDashboard, Home, LogOut, UserCog, User, Cpu, Sparkles, Briefcase, ExternalLink, Trophy, Award } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const Dashboard = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const linkStyle = (path) => `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive(path)
        ? 'bg-cyan-500 text-black font-bold shadow-lg shadow-cyan-500/20'
        : 'hover:bg-white/5 text-slate-400'
        }`;

    return (
        <div className="flex min-h-screen bg-[#020617] text-white">
            <aside className="w-64 bg-slate-900/50 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col fixed h-full z-50">

                <div className="flex items-center gap-3 mb-10 px-2">
                    <div className="p-2 bg-cyan-500 rounded-lg shadow-lg shadow-cyan-500/20">
                        <LayoutDashboard size={20} className="text-black" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black italic tracking-tighter uppercase leading-none">
                            Admin <span className="text-cyan-400">Panel</span>
                        </h2>
                        <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest mt-1">Management System</p>
                    </div>
                </div>

                <nav className="flex-1 space-y-1.5 overflow-y-auto pr-2 scrollbar-hide">
                    <p className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em] mb-4 ml-4">Core Settings</p>

                    <Link to="/dashboard/userUpdate" className={linkStyle('/dashboard/userUpdate')}>
                        <UserCog size={18} />
                        <span>User Profile</span>
                    </Link>

                    <p className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em] mb-4 mt-6 ml-4">Content Editor</p>

                    <Link to="/dashboard/homeEdit" className={linkStyle('/dashboard/homeEdit')}>
                        <Home size={18} />
                        <span>Home Page</span>
                    </Link>

                    <Link to="/dashboard/aboutEdit" className={linkStyle('/dashboard/aboutEdit')}>
                        <User size={18} />
                        <span>About Section</span>
                    </Link>

                    <Link to="/dashboard/skillEdit" className={linkStyle('/dashboard/skillEdit')}>
                        <Cpu size={18} />
                        <span>Skills Set</span>
                    </Link>

                    <Link to="/dashboard/experienceEdit" className={linkStyle('/dashboard/experienceEdit')}>
                        <Sparkles size={18} />
                        <span>Roadmap / Exp</span>
                    </Link>

                    {/* --- নতুন যুক্ত করা মাইলস্টোন/এচিভমেন্ট এডিটর --- */}
                    <Link to="/dashboard/achievementEdit" className={linkStyle('/dashboard/achievementEdit')}>
                        <Trophy size={18} />
                        <span>Achievements</span>
                    </Link>


                    <Link to="/dashboard/certificateEdit" className={linkStyle('/dashboard/certificateEdit')}>
                        <Award size={18} />
                        <span>Credentials</span>
                    </Link>

                    <Link to="/dashboard/projectEdit" className={linkStyle('/dashboard/projectEdit')}>
                        <Briefcase size={18} />
                        <span>Projects Vault</span>
                    </Link>
                </nav>

                {/* Bottom Actions */}
                <div className="pt-6 border-t border-white/5 mt-6 space-y-2">
                    <Link
                        to="/"
                        className="flex items-center gap-3 px-4 py-3 text-cyan-400 hover:bg-cyan-500/5 rounded-xl transition-all duration-300 text-sm font-medium"
                    >
                        <ExternalLink size={18} />
                        <span>Live Preview</span>
                    </Link>

                    <Link
                        to="/"
                        className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-300 border border-transparent hover:border-red-500/20 font-medium text-sm"
                    >
                        <LogOut size={18} />
                        <span>Sign Out</span>
                    </Link>
                </div>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <main className="flex-1 ml-64 min-h-screen bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-[#020617] to-[#020617]">
                <div className="max-w-6xl mx-auto p-10 pt-16">
                    {/* Header for the current page */}
                    <div className="mb-10 flex items-center gap-4 text-slate-500">
                        <div className="h-px flex-1 bg-white/5" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Workspace Active</span>
                        <div className="h-px flex-1 bg-white/5" />
                    </div>

                    {/* Outlet rendering the sub-components */}
                    <div className="relative">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;