import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { Plus, Trash2, Edit3, Globe, Github, Image as ImageIcon, Cpu, X, Save, RefreshCw } from 'lucide-react';
import Swal from 'sweetalert2';

const ProjectEdit = () => {
    const axios = useAxios();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingItem, setEditingItem] = useState(null);

    useEffect(() => { fetchProjects(); }, []);

    const fetchProjects = async () => {
        const res = await axios.get('/projects');
        setProjects(res.data);
        setLoading(false);
    };

    // --- নতুন প্রজেক্টের ডিফল্ট স্ট্রাকচার ---
    const handleAdd = async () => {
        const newItem = {
            title: "New Project",
            tagline: "Brief catchphrase",
            desc: "Detailed description here...",
            tech: ["React", "Tailwind"],
            github: "",
            live: "",
            image: "https://via.placeholder.com/600x400",
            challenges: "What was hard?",
            future: "What's next?"
        };
        const res = await axios.post('/projects', newItem);
        if (res.data.insertedId) fetchProjects();
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Delete this project?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            background: '#020617', color: '#fff'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`/projects/${id}`);
                fetchProjects();
            }
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.patch(`/projects/${editingItem._id}`, editingItem);
            if (res.data.modifiedCount > 0) {
                Swal.fire({ title: 'Success!', text: 'Project Updated', icon: 'success', background: '#020617', color: '#fff' });
                setEditingItem(null);
                fetchProjects();
            }
        } catch (err) {
            Swal.fire('Error', 'Update failed', 'error');
        }
    };

    if (loading) return <RefreshCw className="animate-spin m-20 text-cyan-400" />;

    return (
        <div className="max-w-7xl mx-auto pb-20">
            <div className="flex justify-between items-center mb-12">
                <h1 className="text-4xl font-black italic uppercase tracking-tighter">Project <span className="text-cyan-400">Vault</span></h1>
                <button onClick={handleAdd} className="flex items-center gap-2 px-6 py-3 bg-cyan-500 text-black font-bold rounded-xl hover:scale-105 transition-all shadow-lg shadow-cyan-500/20">
                    <Plus size={20} /> Add New Project
                </button>
            </div>

            {/* Project List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div key={project._id} className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden group">
                        <div className="h-48 overflow-hidden relative">
                            <img src={project.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-black/40" />
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                            <p className="text-[10px] text-cyan-400 uppercase font-bold tracking-widest mb-4">{project.tagline}</p>
                            <div className="flex gap-2">
                                <button onClick={() => setEditingItem(project)} className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all">
                                    <Edit3 size={14} /> Edit Details
                                </button>
                                <button onClick={() => handleDelete(project._id)} className="p-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- Advanced Edit Modal --- */}
            {editingItem && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
                    <form onSubmit={handleUpdate} className="bg-[#0a0f1d] border border-white/10 p-8 rounded-[3rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto scrollbar-hide shadow-2xl">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Modify <span className="text-cyan-400">Project</span></h2>
                            <button type="button" onClick={() => setEditingItem(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X /></button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Left Side: General Info */}
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-2">Project Title</label>
                                    <input value={editingItem.title} onChange={e => setEditingItem({ ...editingItem, title: e.target.value })} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-sm outline-none focus:border-cyan-500" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-2">Tagline</label>
                                    <input value={editingItem.tagline} onChange={e => setEditingItem({ ...editingItem, tagline: e.target.value })} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-sm outline-none focus:border-cyan-500" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-2">Image URL</label>
                                    <input value={editingItem.image} onChange={e => setEditingItem({ ...editingItem, image: e.target.value })} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-sm outline-none focus:border-cyan-500" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-500 uppercase ml-2">Live Link</label>
                                        <input value={editingItem.live} onChange={e => setEditingItem({ ...editingItem, live: e.target.value })} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-sm outline-none focus:border-cyan-500" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-500 uppercase ml-2">Github Repo</label>
                                        <input value={editingItem.github} onChange={e => setEditingItem({ ...editingItem, github: e.target.value })} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-sm outline-none focus:border-cyan-500" />
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Detailed Content */}
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-2">Tech Stack (Comma Separated)</label>
                                    <input
                                        value={editingItem.tech.join(', ')}
                                        onChange={e => setEditingItem({ ...editingItem, tech: e.target.value.split(',').map(t => t.trim()) })}
                                        className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-sm outline-none focus:border-cyan-500 text-cyan-400 font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-2">Challenges Faced</label>
                                    <textarea value={editingItem.challenges} onChange={e => setEditingItem({ ...editingItem, challenges: e.target.value })} className="w-full h-24 bg-white/5 border border-white/10 p-4 rounded-xl text-sm outline-none focus:border-cyan-500 resize-none" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-2">Future Roadmap</label>
                                    <textarea value={editingItem.future} onChange={e => setEditingItem({ ...editingItem, future: e.target.value })} className="w-full h-24 bg-white/5 border border-white/10 p-4 rounded-xl text-sm outline-none focus:border-cyan-500 resize-none" />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-10">
                            <button type="submit" className="flex-1 py-5 bg-cyan-500 text-black font-black uppercase tracking-widest rounded-2xl hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20 active:scale-95">
                                Update Project
                            </button>
                            <button type="button" onClick={() => setEditingItem(null)} className="px-10 py-5 bg-slate-800 text-white font-bold rounded-2xl hover:bg-slate-700 transition-all">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ProjectEdit;