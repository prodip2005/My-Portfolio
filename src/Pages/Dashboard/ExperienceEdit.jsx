import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { Save, Plus, Trash2, Edit3, RefreshCw, X, Sparkles, ArrowRight } from 'lucide-react';
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from 'framer-motion';

const ExperienceEdit = () => {
    const axios = useAxios();
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingItem, setEditingItem] = useState(null);

    // ১. ব্যাকএন্ড থেকে সব ডাটা লোড করা
    useEffect(() => {
        fetchExp();
    }, []);

    const fetchExp = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/experience');
            setExperiences(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Fetch error:", err);
            setLoading(false);
        }
    };

    // ২. নতুন রোডম্যাপ আইটেম যোগ করা
    const handleAdd = async () => {
        const newItem = {
            title: "New Milestone",
            subtitle: "Main Focus",
            desc: "Write a short description about this journey stage.",
            date: "2026",
            color: "#22d3ee"
        };
        try {
            const res = await axios.post('/experience', newItem);
            if (res.data.insertedId) {
                fetchExp(); // সাথে সাথে লিস্ট আপডেট
                Swal.fire({
                    title: 'Success!',
                    text: 'New stage added to roadmap',
                    icon: 'success',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    background: '#020617',
                    color: '#fff'
                });
            }
        } catch (err) {
            Swal.fire('Error', 'Could not add new stage', 'error');
        }
    };

    // ৩. রোডম্যাপ আপডেট করা
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.patch(`/experience/${editingItem._id}`, editingItem);
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    title: 'Updated!',
                    text: 'Roadmap stage has been modified.',
                    icon: 'success',
                    background: '#020617',
                    color: '#fff',
                    confirmButtonColor: '#22d3ee'
                });
                setEditingItem(null);
                fetchExp();
            } else {
                setEditingItem(null); // কোনো পরিবর্তন না করলে মোডাল বন্ধ হবে
            }
        } catch (err) {
            console.error("Update error:", err.response?.data);
            Swal.fire('Error', 'Update failed!', 'error');
        }
    };

    // ৪. আইটেম ডিলিট করা
    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This roadmap stage will be permanently deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#1e293b',
            confirmButtonText: 'Yes, delete it!',
            background: '#020617',
            color: '#fff'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`/experience/${id}`);
                    fetchExp();
                    Swal.fire({ title: 'Deleted!', icon: 'success', background: '#020617', color: '#fff' });
                } catch (err) {
                    Swal.fire('Error', 'Delete failed!', 'error');
                }
            }
        });
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center h-[60vh]">
            <RefreshCw className="animate-spin text-cyan-400 mb-4" size={48} />
            <p className="text-slate-500 animate-pulse uppercase tracking-widest text-xs">Loading Roadmap...</p>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto pb-24">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <div className="flex items-center gap-2 mb-2 text-cyan-400">
                        <Sparkles size={16} />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Editor Mode</span>
                    </div>
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter">
                        Journey <span className="text-cyan-400">Roadmap</span>
                    </h1>
                </div>
                <button
                    onClick={handleAdd}
                    className="group flex items-center gap-3 px-8 py-4 bg-cyan-500 text-black font-black rounded-2xl hover:scale-105 transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
                >
                    <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                    Add Milestone
                </button>
            </header>

            {/* Grid List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {experiences.map((item, index) => (
                    <motion.div
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={item._id}
                        className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 relative overflow-hidden group hover:border-cyan-500/30 transition-all shadow-xl backdrop-blur-sm"
                    >
                        {/* Status Label */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: item.color }} />
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.date}</span>
                            </div>
                            <div className="text-[10px] font-black text-cyan-500/50 bg-cyan-500/5 px-3 py-1 rounded-full border border-cyan-500/10">
                                Stage {experiences.length - index}
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{item.title}</h3>
                        <h4 className="text-xs font-medium text-slate-500 uppercase mb-4 tracking-wider italic">{item.subtitle}</h4>
                        <p className="text-sm text-slate-400 leading-relaxed mb-8 line-clamp-3 font-light">{item.desc}</p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setEditingItem(item)}
                                className="flex-1 flex items-center justify-center gap-2 py-4 bg-white/5 hover:bg-cyan-500 hover:text-black rounded-2xl transition-all font-bold text-xs uppercase tracking-widest border border-white/5"
                            >
                                <Edit3 size={16} /> Edit
                            </button>
                            <button
                                onClick={() => handleDelete(item._id)}
                                className="p-4 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl transition-all"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Edit Modal */}
            <AnimatePresence>
                {editingItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
                    >
                        <motion.form
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onSubmit={handleUpdate}
                            className="bg-slate-900 border border-white/10 p-10 rounded-[3rem] w-full max-w-2xl shadow-2xl relative"
                        >
                            <button
                                type="button"
                                onClick={() => setEditingItem(null)}
                                className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <h2 className="text-2xl font-black mb-8 text-white uppercase italic tracking-tighter">
                                Edit <span className="text-cyan-400">Milestone</span>
                            </h2>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase ml-2">Milestone Title</label>
                                        <input value={editingItem.title} onChange={e => setEditingItem({ ...editingItem, title: e.target.value })} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-sm focus:border-cyan-500 outline-none transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase ml-2">Timeline (Date)</label>
                                        <input value={editingItem.date} onChange={e => setEditingItem({ ...editingItem, date: e.target.value })} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-sm focus:border-cyan-500 outline-none transition-all" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-2">Subtitle / Role</label>
                                    <input value={editingItem.subtitle} onChange={e => setEditingItem({ ...editingItem, subtitle: e.target.value })} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-sm focus:border-cyan-500 outline-none transition-all" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-2">Description</label>
                                    <textarea value={editingItem.desc} onChange={e => setEditingItem({ ...editingItem, desc: e.target.value })} className="w-full h-32 bg-white/5 border border-white/10 p-4 rounded-2xl text-sm resize-none focus:border-cyan-500 outline-none transition-all" />
                                </div>

                                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                                    <div className="flex-1">
                                        <h4 className="text-xs font-bold text-white uppercase tracking-widest">Theme Color</h4>
                                        <p className="text-[10px] text-slate-500">Pick a color for the roadmap indicator</p>
                                    </div>
                                    <input type="color" value={editingItem.color} onChange={e => setEditingItem({ ...editingItem, color: e.target.value })} className="bg-transparent w-12 h-12 cursor-pointer rounded-lg border-none" />
                                </div>
                            </div>

                            <div className="flex gap-4 mt-10">
                                <button type="submit" className="flex-1 py-5 bg-cyan-500 text-black font-black uppercase tracking-widest rounded-2xl hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20 active:scale-95">
                                    Save Changes
                                </button>
                                <button type="button" onClick={() => setEditingItem(null)} className="px-8 py-5 bg-slate-800 text-white font-bold rounded-2xl hover:bg-slate-700 transition-all">
                                    Cancel
                                </button>
                            </div>
                        </motion.form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ExperienceEdit;