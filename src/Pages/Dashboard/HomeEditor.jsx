import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { Save, RefreshCw, Trash2 } from 'lucide-react';

const HomeEditor = () => {
    const axios = useAxios();
    const [loading, setLoading] = useState(true);
    const [homeData, setHomeData] = useState({
        firstName: '',
        lastName: '',
        role: '',
        bio: '',
        profileImage: '',
        resumeLink: '',
        systemTag: ''
    });

    // ১. ডাটাবেস থেকে বর্তমান ডাটা নিয়ে আসা
    useEffect(() => {
        fetchData();
    }, [axios]);

    const fetchData = () => {
        setLoading(true);
        axios.get('/home')
            .then(res => {
                const data = Array.isArray(res.data) ? res.data[0] : res.data;
                if (data) setHomeData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHomeData(prev => ({ ...prev, [name]: value }));
    };

    // ২. PATCH লজিক (শুধুমাত্র আপডেট করার জন্য)
    const handleUpdate = (e) => {
        e.preventDefault();

        // PATCH রিকোয়েস্ট পাঠানো হচ্ছে
        axios.patch('/home', homeData)
            .then(res => {
                if (res.data.modifiedCount > 0 || res.data.upsertedCount > 0) {
                    alert("Home data updated successfully!");
                } else {
                    alert("No changes were made or data is already up-to-date.");
                }
            })
            .catch(err => {
                console.error("Update failed:", err);
                alert("Update failed! Please check console.");
            });
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to clear the home data fields?")) {
            setHomeData({
                firstName: '',
                lastName: '',
                role: '',
                bio: '',
                profileImage: '',
                resumeLink: '',
                systemTag: ''
            });
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <RefreshCw className="text-cyan-400 animate-spin" size={40} />
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto">
            <header className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-black italic uppercase tracking-tighter">
                        Home <span className="text-cyan-400">Editor</span>
                    </h1>
                    <p className="text-slate-500 text-sm">Manage your profile information shown on the hero section.</p>
                </div>
                <button
                    onClick={handleDelete}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                >
                    <Trash2 size={18} /> Clear Fields
                </button>
            </header>

            <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/5 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-xl">

                {/* --- আগের সব ইনপুট ফিল্ড একই থাকবে --- */}
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1">First Name</label>
                    <input name="firstName" value={homeData.firstName} onChange={handleChange} className="bg-slate-900/50 border border-white/10 p-4 rounded-2xl focus:outline-none focus:border-cyan-500 text-white transition-all" />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1">Last Name</label>
                    <input name="lastName" value={homeData.lastName} onChange={handleChange} className="bg-slate-900/50 border border-white/10 p-4 rounded-2xl focus:outline-none focus:border-cyan-500 text-white transition-all" />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1">Role / Job Title</label>
                    <input name="role" value={homeData.role} onChange={handleChange} className="bg-slate-900/50 border border-white/10 p-4 rounded-2xl focus:outline-none focus:border-cyan-500 text-white transition-all" />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1">Bio / Short Description</label>
                    <textarea name="bio" rows="3" value={homeData.bio} onChange={handleChange} className="bg-slate-900/50 border border-white/10 p-4 rounded-2xl focus:outline-none focus:border-cyan-500 text-white transition-all resize-none" />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1">Profile Image URL</label>
                    <input name="profileImage" value={homeData.profileImage} onChange={handleChange} className="bg-slate-900/50 border border-white/10 p-4 rounded-2xl focus:outline-none focus:border-cyan-500 text-white transition-all" />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1">System Tag</label>
                    <input name="systemTag" value={homeData.systemTag} onChange={handleChange} className="bg-slate-900/50 border border-white/10 p-4 rounded-2xl focus:outline-none focus:border-cyan-500 text-white transition-all" />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1">Resume Download Link</label>
                    <input name="resumeLink" value={homeData.resumeLink} onChange={handleChange} className="bg-slate-900/50 border border-white/10 p-4 rounded-2xl focus:outline-none focus:border-cyan-500 text-white transition-all" />
                </div>

                <div className="md:col-span-2 mt-4">
                    <button type="submit" className="w-full py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:scale-[1.02] transition-all shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-3">
                        <Save size={20} /> Save Changes (PATCH)
                    </button>
                </div>
            </form>
        </div>
    );
};

export default HomeEditor;