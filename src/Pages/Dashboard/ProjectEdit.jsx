import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { Plus, Trash2, Edit3, X, RefreshCw } from 'lucide-react';
import Swal from 'sweetalert2';

const ProjectEdit = () => {
    const axios = useAxios();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingItem, setEditingItem] = useState(null);

    // --- ১. ফাংশনটিকে উপরে নিয়ে আসা হয়েছে (Hoisting fix) ---
    const fetchProjects = async () => {
        setLoading(true);
        try {
            const res = await axios.get('/projects');
            setProjects(res.data);
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    // --- ২. এখন useEffect ঠিকমতো কাজ করবে ---
    useEffect(() => {
        fetchProjects();
    }, []);

    const handleAdd = async () => {
        const newItem = {
            title: "New Dynamic Project",
            tagline: "Future of Web",
            desc: "Description here...",
            tech: ["React", "Node.js"],
            github: "#",
            live: "#",
            image: "https://via.placeholder.com/600x400", // খালি না রেখে একটি ডিফল্ট দেওয়া ভালো
            challenges: "Syncing real-time data.",
            future: "AI integration."
        };
        const res = await axios.post('/projects', newItem);
        if (res.data.insertedId) {
            Swal.fire({ title: 'Created!', icon: 'success', background: '#020617', color: '#fff' });
            fetchProjects();
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Delete project?',
            text: "This action is permanent!",
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
        const { _id, createdAt, ...updateData } = editingItem;
        try {
            const res = await axios.patch(`/projects/${_id}`, updateData);
            if (res.data.modifiedCount > 0) {
                Swal.fire({ title: 'Updated!', icon: 'success', background: '#020617', color: '#fff' });
                setEditingItem(null);
                fetchProjects();
            }
        } catch (err) {
            Swal.fire('Error', 'Update failed', 'error');
        }
    };

    if (loading) return (
        <div className="p-20 flex justify-center h-screen items-center bg-[#020617]">
            <RefreshCw className="animate-spin text-cyan-400" size={40} />
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto pb-20 p-6">
            <div className="flex justify-between items-center mb-12">
                <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">Project <span className="text-cyan-400">Vault</span></h1>
                <button onClick={handleAdd} className="flex items-center gap-2 px-6 py-3 bg-cyan-500 text-black font-bold rounded-xl hover:scale-105 transition-all">
                    <Plus size={20} /> New Project
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div key={project._id} className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden group p-2">
                        <img src={project.image || "https://via.placeholder.com/600x400"} alt="" className="w-full h-44 object-cover rounded-2xl mb-4" />
                        <div className="px-4 pb-4">
                            <h3 className="text-lg font-bold text-white leading-tight">{project.title}</h3>
                            <p className="text-[10px] text-cyan-400 font-bold uppercase mt-1 mb-4">{project.tagline}</p>
                            <div className="flex gap-2">
                                <button onClick={() => setEditingItem(project)} className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2">
                                    <Edit3 size={14} /> Edit
                                </button>
                                <button onClick={() => handleDelete(project._id)} className="p-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal এডিটর */}
            {editingItem && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
                    <form onSubmit={handleUpdate} className="bg-[#0a0f1d] border border-white/10 p-8 rounded-[3rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto scrollbar-hide">
                        <div className="flex justify-between items-center mb-8 text-white">
                            <h2 className="text-2xl font-black uppercase italic">Edit <span className="text-cyan-400">Project</span></h2>
                            <button type="button" onClick={() => setEditingItem(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X /></button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4 text-white">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-2">Title</label>
                                    <input value={editingItem.title} onChange={e => setEditingItem({ ...editingItem, title: e.target.value })} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-cyan-500" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-2">Tagline</label>
                                    <input value={editingItem.tagline} onChange={e => setEditingItem({ ...editingItem, tagline: e.target.value })} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-cyan-500" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-2">Image URL</label>
                                    <input value={editingItem.image} onChange={e => setEditingItem({ ...editingItem, image: e.target.value })} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-cyan-500" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <input placeholder="Live" value={editingItem.live} onChange={e => setEditingItem({ ...editingItem, live: e.target.value })} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-cyan-500" />
                                    <input placeholder="Github" value={editingItem.github} onChange={e => setEditingItem({ ...editingItem, github: e.target.value })} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-cyan-500" />
                                </div>
                            </div>
                            <div className="space-y-4 text-white">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-2">Tech Stack</label>
                                    <input value={editingItem.tech.join(', ')} onChange={e => setEditingItem({ ...editingItem, tech: e.target.value.split(',').map(t => t.trim()) })} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-cyan-500" />
                                </div>
                                <textarea placeholder="Challenges" value={editingItem.challenges} onChange={e => setEditingItem({ ...editingItem, challenges: e.target.value })} className="w-full h-24 bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-cyan-500 resize-none" />
                                <textarea placeholder="Future" value={editingItem.future} onChange={e => setEditingItem({ ...editingItem, future: e.target.value })} className="w-full h-24 bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-cyan-500 resize-none" />
                            </div>
                        </div>
                        <button type="submit" className="w-full py-5 bg-cyan-500 text-black font-black uppercase mt-8 rounded-2xl hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20 active:scale-95">Update Now</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ProjectEdit;