import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { Save, Plus, Trash2, Edit3, RefreshCw, X } from 'lucide-react';
import Swal from 'sweetalert2';

const AboutEdit = () => {
    const axios = useAxios();
    const [loading, setLoading] = useState(true);
    const [aboutData, setAboutData] = useState(null);

    // Modal States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [tempText, setTempText] = useState("");

    useEffect(() => {
        fetchAboutData();
    }, [axios]);

    const fetchAboutData = () => {
        setLoading(true);
        axios.get('/about')
            .then(res => {
                setAboutData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    // --- Description List (Array) Operations ---

    const handleAddDescription = () => {
        const newList = [...aboutData.descriptionList, "New description point..."];
        setAboutData({ ...aboutData, descriptionList: newList });
    };

    const handleDeleteDescription = (index) => {
        const newList = aboutData.descriptionList.filter((_, i) => i !== index);
        setAboutData({ ...aboutData, descriptionList: newList });
    };

    const openEditModal = (index, currentText) => {
        setEditingIndex(index);
        setTempText(currentText);
        setIsModalOpen(true);
    };

    const saveFromModal = () => {
        const newList = [...aboutData.descriptionList];
        newList[editingIndex] = tempText;
        setAboutData({ ...aboutData, descriptionList: newList });
        setIsModalOpen(false);
    };

    // --- Fields Update Logic ---
    const handleFieldChange = (e, section, field) => {
        if (section) {
            setAboutData({
                ...aboutData,
                [section]: { ...aboutData[section], [field]: e.target.value }
            });
        } else {
            setAboutData({ ...aboutData, [field]: e.target.value });
        }
    };

    // --- Final PATCH to DB ---
    const handleSaveAll = async () => {
        try {
            const res = await axios.patch('/about', aboutData);
            if (res.data.modifiedCount > 0 || res.data.upsertedCount > 0) {
                Swal.fire({
                    title: 'Success!',
                    text: 'About section updated successfully',
                    icon: 'success',
                    background: '#0f172a',
                    color: '#fff',
                    confirmButtonColor: '#22d3ee'
                });
            }
        } catch (error) {
            Swal.fire('Error', 'Update failed!', 'error');
        }
    };

    if (loading) return <div className="flex justify-center p-20"><RefreshCw className="animate-spin text-cyan-400" size={40} /></div>;

    return (
        <div className="max-w-6xl mx-auto pb-20">
            <header className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-black italic uppercase tracking-tighter">
                    About <span className="text-cyan-400">Editor</span>
                </h1>
                <button onClick={handleSaveAll} className="flex items-center gap-2 px-8 py-4 bg-cyan-500 text-black font-black rounded-2xl hover:scale-105 transition-all shadow-lg shadow-cyan-500/20">
                    <Save size={20} /> Save Everything
                </button>
            </header>

            {/* Description List Array Section */}
            <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 mb-8 backdrop-blur-xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-200">Description List</h3>
                    <button onClick={handleAddDescription} className="flex items-center gap-2 text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-4 py-2 rounded-xl hover:bg-cyan-500 hover:text-black transition-all">
                        <Plus size={16} /> Add New Point
                    </button>
                </div>

                <div className="space-y-4">
                    {aboutData.descriptionList?.map((item, index) => (
                        <div key={index} className="group flex items-start gap-4 bg-slate-900/50 p-5 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all">
                            <span className="bg-cyan-500/20 text-cyan-400 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm">
                                {index + 1}
                            </span>
                            <p className="flex-1 text-slate-400 text-sm leading-relaxed">{item}</p>
                            <div className="flex gap-2">
                                <button onClick={() => openEditModal(index, item)} className="p-2 bg-yellow-500/10 text-yellow-500 rounded-xl hover:bg-yellow-500 hover:text-white transition-all">
                                    <Edit3 size={18} />
                                </button>
                                <button onClick={() => handleDeleteDescription(index)} className="p-2 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Titles */}
                <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Header Content</h3>
                    <input value={aboutData.identityTag} onChange={(e) => handleFieldChange(e, null, 'identityTag')} className="w-full bg-slate-900/50 border border-white/10 p-4 rounded-xl outline-none focus:border-cyan-500" placeholder="Identity Tag" />
                    <input value={aboutData.titleMain} onChange={(e) => handleFieldChange(e, null, 'titleMain')} className="w-full bg-slate-900/50 border border-white/10 p-4 rounded-xl outline-none focus:border-cyan-500" placeholder="Main Title" />
                    <input value={aboutData.titleGradient} onChange={(e) => handleFieldChange(e, null, 'titleGradient')} className="w-full bg-slate-900/50 border border-white/10 p-4 rounded-xl outline-none focus:border-cyan-500" placeholder="Gradient Title" />
                </div>

                {/* Cards Section */}
                <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Cards Content</h3>
                    {['academicCard', 'futureGoal', 'techStack'].map((key) => (
                        <div key={key} className="grid grid-cols-2 gap-3">
                            <input value={aboutData[key].title} onChange={(e) => handleFieldChange(e, key, 'title')} className="bg-slate-900/50 border border-white/10 p-3 rounded-xl text-sm outline-none focus:border-cyan-500" />
                            <input value={aboutData[key].subTitle} onChange={(e) => handleFieldChange(e, key, 'subTitle')} className="bg-slate-900/50 border border-white/10 p-3 rounded-xl text-sm outline-none focus:border-cyan-500" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Edit Modal for Description */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
                    <div className="bg-slate-900 border border-white/10 p-8 rounded-[2rem] w-full max-w-2xl shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Edit Point #{editingIndex + 1}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-white transition-colors"><X /></button>
                        </div>
                        <textarea
                            value={tempText}
                            onChange={(e) => setTempText(e.target.value)}
                            className="w-full h-48 bg-slate-800 border border-white/10 p-5 rounded-2xl text-slate-300 outline-none focus:border-cyan-500 mb-6 resize-none"
                        />
                        <button onClick={saveFromModal} className="w-full py-4 bg-cyan-500 text-black font-black uppercase tracking-widest rounded-xl hover:bg-cyan-400 transition-all">
                            Update List Item
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AboutEdit;