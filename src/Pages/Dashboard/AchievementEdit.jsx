import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Edit3, X, RefreshCw, BarChart3, Save, CheckCircle2 } from 'lucide-react';
import Swal from 'sweetalert2';
import useAxios from '../../hooks/useAxios';

const AchievementEdit = () => {
    const axios = useAxios();
    const [achievements, setAchievements] = useState([]);
    const [stats, setStats] = useState([]);
    const [projectCount, setProjectCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [editingAch, setEditingAch] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [ach, st, proj] = await Promise.all([
                axios.get('/achievements'),
                axios.get('/stats'),
                axios.get('/projects')
            ]);
            setAchievements(ach.data);
            setStats(st.data);
            setProjectCount(proj.data.length);
        } catch (error) {
            console.error("Error fetching data", error);
        } finally { setLoading(false); }
    };

    useEffect(() => { fetchData(); }, []);

    // --- Stats Logic ---
    const handleAddStat = async () => {
        await axios.post('/stats', { label: "New Stat", value: "0" });
        fetchData();
    };

    const handleStatUpdate = (id, field, value) => {
        setStats(prev => prev.map(s => s._id === id ? { ...s, [field]: value } : s));
    };

    const handleDeleteStat = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This stat card will be permanently removed!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            background: '#020617', color: '#fff'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`/stats/${id}`);
                fetchData();
            }
        });
    };

    // --- Achievements Logic ---
    const handleAddAch = async () => {
        await axios.post('/achievements', { title: "New Milestone", subtitle: "Category", desc: "Short description...", iconType: "trophy" });
        fetchData();
    };

    // --- Overall Save Logic ---
    const handleOverallSave = async () => {
        setIsSaving(true);
        try {
            // ১. স্ট্যাটস আপডেট করা (প্রজেক্ট কার্ড বাদে)
            const statPromises = stats
                .filter(s => !s.label.toLowerCase().includes('project'))
                .map(s => axios.patch(`/stats/${s._id}`, { label: s.label, value: s.value }));

            await Promise.all(statPromises);

            Swal.fire({
                title: "All Changes Saved!",
                text: "Your stats and milestones have been updated.",
                icon: "success",
                background: "#020617",
                color: "#fff",
                timer: 2000,
                showConfirmButton: false
            });
            fetchData();
        } catch (error) {
            Swal.fire("Error saving data", "Please try again later", "error");
        } finally {
            setIsSaving(false);
        }
    };

    const handleModalUpdate = async (e) => {
        e.preventDefault();
        await axios.patch(`/achievements/${editingAch._id}`, editingAch);
        setEditingAch(null);
        fetchData();
        Swal.fire({ title: "Milestone Updated!", icon: "success", background: "#020617", color: "#fff" });
    };

    if (loading) return <div className="p-20 flex justify-center h-screen items-center"><RefreshCw className="animate-spin text-cyan-400" size={40} /></div>;

    return (
        <div className="max-w-7xl mx-auto p-6 text-white pb-40">
            {/* Top Header with Overall Save Button */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
                <div>
                    <h1 className="text-4xl font-black uppercase italic tracking-tighter">Milestone <span className="text-cyan-400">Editor</span></h1>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">Manage your stats and achievements</p>
                </div>
                <button
                    onClick={handleOverallSave}
                    disabled={isSaving}
                    className="group relative flex items-center gap-3 px-8 py-4 bg-cyan-500 text-black font-black uppercase rounded-2xl shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                >
                    {isSaving ? <RefreshCw className="animate-spin" size={20} /> : <Save size={20} />}
                    <span>{isSaving ? 'Saving...' : 'Save All Changes'}</span>
                </button>
            </div>

            {/* Stats Management Section */}
            <div className="mb-20 p-8 bg-white/5 border border-white/10 rounded-[3rem] relative overflow-hidden">
                <div className="flex justify-between items-center mb-8 px-2">
                    <h2 className="text-xl font-bold flex items-center gap-2 uppercase italic tracking-widest text-slate-300">
                        <BarChart3 className="text-cyan-400" /> Statistical Cards
                    </h2>
                    <button onClick={handleAddStat} className="flex items-center gap-2 px-5 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold hover:bg-white/10 transition-all">
                        <Plus size={14} /> ADD NEW STAT
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {stats.map(s => {
                        const isProject = s.label.toLowerCase().includes('project');
                        return (
                            <div key={s._id} className={`relative p-6 border rounded-3xl group transition-all ${isProject ? 'bg-cyan-500/5 border-cyan-500/30' : 'bg-black/40 border-white/10 hover:border-cyan-500/30'}`}>
                                {!isProject && (
                                    <button onClick={() => handleDeleteStat(s._id)} className="absolute -top-2 -right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg">
                                        <Trash2 size={12} />
                                    </button>
                                )}

                                <input
                                    className={`w-full bg-transparent text-[10px] uppercase font-bold outline-none mb-1 ${isProject ? 'text-cyan-400' : 'text-slate-500 focus:text-cyan-300'}`}
                                    value={s.label}
                                    disabled={isProject}
                                    onChange={(e) => handleStatUpdate(s._id, 'label', e.target.value)}
                                    placeholder="Label"
                                />
                                <div className="flex items-end gap-2">
                                    <input
                                        className="w-full bg-transparent text-3xl font-black outline-none text-white focus:text-cyan-400"
                                        value={isProject ? (projectCount >= 10 ? `${projectCount}+` : projectCount) : s.value}
                                        disabled={isProject}
                                        onChange={(e) => handleStatUpdate(s._id, 'value', e.target.value)}
                                        placeholder="Value"
                                    />
                                    {isProject && <CheckCircle2 size={16} className="text-cyan-500 mb-2 animate-pulse" />}
                                </div>

                                {isProject && <div className="mt-2 text-[8px] text-cyan-400/50 font-bold uppercase tracking-widest italic">Synced with Project Vault</div>}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Main Milestones List */}
            <div className="flex justify-between items-center mb-8 px-2">
                <h2 className="text-2xl font-bold uppercase italic tracking-widest">Achievements List</h2>
                <button onClick={handleAddAch} className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-bold text-[10px] hover:bg-cyan-500 hover:text-black transition-all">CREATE MILESTONE</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map(ach => (
                    <div key={ach._id} className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] flex justify-between items-center group hover:bg-white/[0.07] transition-all border-l-4 border-l-transparent hover:border-l-cyan-500">
                        <div>
                            <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">{ach.subtitle}</span>
                            <h3 className="text-xl font-bold text-white mt-1 group-hover:text-cyan-400 transition-colors">{ach.title}</h3>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => setEditingAch(ach)} className="p-3 bg-white/5 rounded-xl hover:text-cyan-400 border border-white/5"><Edit3 size={18} /></button>
                            <button onClick={async () => {
                                Swal.fire({ title: 'Delete Milestone?', icon: 'warning', showCancelButton: true, background: '#020617', color: '#fff' })
                                    .then(async (r) => { if (r.isConfirmed) { await axios.delete(`/achievements/${ach._id}`); fetchData(); } })
                            }} className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={18} /></button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit Modal (Popup) */}
            {editingAch && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
                    <form onSubmit={handleModalUpdate} className="bg-[#0a0f1d] border border-white/10 p-10 rounded-[3rem] w-full max-w-xl space-y-4 shadow-2xl shadow-cyan-500/10">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-black text-cyan-400 uppercase italic">Update Milestone</h2>
                            <button type="button" onClick={() => setEditingAch(null)} className="text-slate-500 hover:text-white transition-colors"><X /></button>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase ml-2">Milestone Title</label>
                                <input value={editingAch.title} onChange={e => setEditingAch({ ...editingAch, title: e.target.value })} className="w-full bg-white/5 p-4 rounded-xl border border-white/10 outline-none focus:border-cyan-500 text-white" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase ml-2">Subtitle / Category</label>
                                <input value={editingAch.subtitle} onChange={e => setEditingAch({ ...editingAch, subtitle: e.target.value })} className="w-full bg-white/5 p-4 rounded-xl border border-white/10 outline-none focus:border-cyan-500 text-white" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase ml-2">Choose Icon</label>
                                <select value={editingAch.iconType} onChange={e => setEditingAch({ ...editingAch, iconType: e.target.value })} className="w-full bg-[#0a0f1d] p-4 rounded-xl border border-white/10 text-white outline-none focus:border-cyan-500">
                                    <option value="trophy">Trophy (Achievements)</option>
                                    <option value="code">Code (Programming)</option>
                                    <option value="heart">Heart (Social/Health)</option>
                                    <option value="music">Music (Art/Culture)</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase ml-2">Brief Description</label>
                                <textarea value={editingAch.desc} onChange={e => setEditingAch({ ...editingAch, desc: e.target.value })} className="w-full h-32 bg-white/5 p-4 rounded-xl border border-white/10 outline-none focus:border-cyan-500 text-white resize-none" />
                            </div>
                        </div>
                        <button type="submit" className="w-full py-5 bg-cyan-500 text-black font-black uppercase rounded-2xl shadow-lg shadow-cyan-500/20 active:scale-95 transition-all mt-4">Update Milestone Details</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AchievementEdit;