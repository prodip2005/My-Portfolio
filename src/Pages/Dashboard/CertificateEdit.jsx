import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Edit3, X, RefreshCw, Save, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import Swal from 'sweetalert2';
import useAxios from '../../hooks/useAxios';

const CertificateEdit = () => {
    const axios = useAxios();
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingCert, setEditingCert] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get('/certificates');
            setCertificates(res.data);
        } finally { setLoading(false); }
    };

    useEffect(() => { fetchData(); }, []);

    const handleAdd = async () => {
        const newCert = {
            title: "New Certificate",
            issuer: "Organization Name",
            category: "Category",
            iconName: "medal",
            image: "",
            externalLink: "#"
        };
        await axios.post('/certificates', newCert);
        fetchData();
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Delete Certificate?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            background: '#020617', color: '#fff'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`/certificates/${id}`);
                fetchData();
            }
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        await axios.patch(`/certificates/${editingCert._id}`, editingCert);
        setEditingCert(null);
        fetchData();
        Swal.fire({ title: "Updated!", icon: "success", background: "#020617", color: "#fff" });
    };

    if (loading) return <div className="p-20 flex justify-center h-screen items-center"><RefreshCw className="animate-spin text-cyan-400" size={40} /></div>;

    return (
        <div className="max-w-7xl mx-auto p-6 text-white pb-32">
            <div className="flex justify-between items-center mb-16">
                <h1 className="text-4xl font-black uppercase italic tracking-tighter">Credentials <span className="text-cyan-400">Vault</span></h1>
                <button onClick={handleAdd} className="flex items-center gap-2 px-6 py-3 bg-cyan-500 text-black font-black rounded-xl hover:scale-105 transition-all text-xs">
                    <Plus size={16} /> ADD NEW CERTIFICATE
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map(cert => (
                    <div key={cert._id} className="group p-6 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-white/[0.08] transition-all relative overflow-hidden">
                        <div className="h-32 w-full mb-4 rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                            <img src={cert.image} className="w-full h-full object-cover" alt="" />
                        </div>
                        <h3 className="text-lg font-bold line-clamp-1">{cert.title}</h3>
                        <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest mt-1">{cert.issuer}</p>

                        <div className="flex gap-2 mt-6">
                            <button onClick={() => setEditingCert(cert)} className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-cyan-500 hover:text-black transition-all flex items-center justify-center gap-2 text-[10px] font-bold">
                                <Edit3 size={14} /> EDIT
                            </button>
                            <button onClick={() => handleDelete(cert._id)} className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit Modal */}
            {editingCert && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
                    <form onSubmit={handleUpdate} className="bg-[#0a0f1d] border border-white/10 p-10 rounded-[3rem] w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-full flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-black text-cyan-400 uppercase italic">Edit Certificate</h2>
                            <button type="button" onClick={() => setEditingCert(null)}><X /></button>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase ml-2">Certificate Title</label>
                                <input value={editingCert.title} onChange={e => setEditingCert({ ...editingCert, title: e.target.value })} className="w-full bg-white/5 p-4 rounded-xl border border-white/10 outline-none focus:border-cyan-500 text-white" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase ml-2">Issuing Organization</label>
                                <input value={editingCert.issuer} onChange={e => setEditingCert({ ...editingCert, issuer: e.target.value })} className="w-full bg-white/5 p-4 rounded-xl border border-white/10 outline-none focus:border-cyan-500 text-white" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase ml-2">Icon Type</label>
                                <select value={editingCert.iconName} onChange={e => setEditingCert({ ...editingCert, iconName: e.target.value })} className="w-full bg-[#0a0f1d] p-4 rounded-xl border border-white/10 text-white">
                                    <option value="medal">Medal</option>
                                    <option value="shield">Shield</option>
                                    <option value="compass">Compass</option>
                                    <option value="award">Award</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase ml-2">Category</label>
                                <input value={editingCert.category} onChange={e => setEditingCert({ ...editingCert, category: e.target.value })} className="w-full bg-white/5 p-4 rounded-xl border border-white/10 outline-none focus:border-cyan-500 text-white" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase ml-2 flex items-center gap-1"><ImageIcon size={10} /> Image URL</label>
                                <input value={editingCert.image} onChange={e => setEditingCert({ ...editingCert, image: e.target.value })} className="w-full bg-white/5 p-4 rounded-xl border border-white/10 outline-none focus:border-cyan-500 text-white" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase ml-2 flex items-center gap-1"><LinkIcon size={10} /> External Link</label>
                                <input value={editingCert.externalLink} onChange={e => setEditingCert({ ...editingCert, externalLink: e.target.value })} className="w-full bg-white/5 p-4 rounded-xl border border-white/10 outline-none focus:border-cyan-500 text-white" />
                            </div>
                        </div>

                        <button type="submit" className="col-span-full mt-4 py-5 bg-cyan-500 text-black font-black uppercase rounded-2xl shadow-lg shadow-cyan-500/20 hover:bg-white transition-all">
                            Save Changes
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CertificateEdit;