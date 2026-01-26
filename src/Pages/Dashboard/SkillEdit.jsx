import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { Save, Plus, Trash2, Terminal, Server, Layout, Cpu, RefreshCw } from 'lucide-react';
import Swal from 'sweetalert2';

const SkillEdit = () => {
    const axios = useAxios();
    const [loading, setLoading] = useState(true);
    const [skillData, setSkillData] = useState(null);

    const icons = { Terminal, Server, Layout, Cpu };

    useEffect(() => {
        axios.get('/skills')
            .then(res => {
                setSkillData(res.data);
                setLoading(false);
            });
    }, [axios]);

    // ১. নতুন স্কিল আইটেম যোগ করা (Add)
    const addItem = (category) => {
        const newItem = { name: "New Skill", color: "#ffffff" };
        const updatedCategory = {
            ...skillData[category],
            items: [...skillData[category].items, newItem]
        };
        setSkillData({ ...skillData, [category]: updatedCategory });
    };

    // ২. স্কিল আইটেম ডিলিট করা (Delete)
    const removeItem = (category, index) => {
        const updatedItems = skillData[category].items.filter((_, i) => i !== index);
        const updatedCategory = { ...skillData[category], items: updatedItems };
        setSkillData({ ...skillData, [category]: updatedCategory });
    };

    // ৩. স্কিল আইটেম এডিট করা (Update Input)
    const handleItemChange = (category, index, field, value) => {
        const updatedItems = [...skillData[category].items];
        updatedItems[index][field] = value;
        const updatedCategory = { ...skillData[category], items: updatedItems };
        setSkillData({ ...skillData, [category]: updatedCategory });
    };

    // ৪. ডাটাবেসে সেভ করা (Final Patch)
    const handleSave = async () => {
        try {
            const res = await axios.patch('/skills', skillData);
            if (res.data.modifiedCount > 0 || res.data.upsertedCount > 0) {
                Swal.fire({
                    title: 'Saved!',
                    text: 'Skills updated successfully',
                    icon: 'success',
                    background: '#020617',
                    color: '#fff',
                    confirmButtonColor: '#22d3ee'
                });
            }
        } catch (err) {
            Swal.fire('Error', 'Failed to save', 'error');
        }
    };

    if (loading) return <div className="flex justify-center p-20"><RefreshCw className="animate-spin text-cyan-400" size={40} /></div>;

    return (
        <div className="max-w-6xl mx-auto pb-20">
            <header className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-black italic uppercase tracking-tighter">
                    Skill <span className="text-cyan-400">Manager</span>
                </h1>
                <button onClick={handleSave} className="flex items-center gap-2 px-8 py-4 bg-cyan-500 text-black font-black rounded-2xl hover:scale-105 transition-all shadow-lg shadow-cyan-500/20">
                    <Save size={20} /> Save All Changes
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {Object.keys(skillData).filter(key => key !== '_id').map((categoryKey) => {
                    const category = skillData[categoryKey];
                    const IconComponent = icons[category.iconName] || Terminal;

                    return (
                        <div key={categoryKey} className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-xl">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/10 rounded-lg text-cyan-400">
                                        <IconComponent size={20} />
                                    </div>
                                    <h3 className="text-xl font-bold uppercase tracking-tight">{category.title}</h3>
                                </div>
                                <button onClick={() => addItem(categoryKey)} className="p-2 bg-cyan-500/10 text-cyan-400 rounded-xl hover:bg-cyan-500 hover:text-black transition-all">
                                    <Plus size={20} />
                                </button>
                            </div>

                            <div className="space-y-3">
                                {category.items.map((item, idx) => (
                                    <div key={idx} className="flex gap-3 items-center bg-slate-900/50 p-3 rounded-2xl border border-white/5 group">
                                        <input
                                            type="color"
                                            value={item.color}
                                            onChange={(e) => handleItemChange(categoryKey, idx, 'color', e.target.value)}
                                            className="w-10 h-10 bg-transparent border-none cursor-pointer rounded-lg"
                                        />
                                        <input
                                            value={item.name}
                                            onChange={(e) => handleItemChange(categoryKey, idx, 'name', e.target.value)}
                                            className="flex-1 bg-transparent border-none outline-none text-slate-200 font-medium"
                                            placeholder="Skill Name"
                                        />
                                        <button onClick={() => removeItem(categoryKey, idx)} className="p-2 text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500/10 rounded-lg">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SkillEdit;