import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { Save, User, Mail, RefreshCw } from 'lucide-react';

const UserUpdate = () => {
    const axios = useAxios();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState({
        name: '',
        email: ''
    });

    // ১. ডাটাবেস থেকে বর্তমান ইউজার ডাটা নিয়ে আসা (/user পাথ ব্যবহার করে)
    useEffect(() => {
        axios.get('/user')
            .then(res => {
                const data = Array.isArray(res.data) ? res.data[0] : res.data;
                if (data) {
                    setUserData({
                        name: data.name || '',
                        email: data.email || ''
                    });
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching user data:", err);
                setLoading(false);
            });
    }, [axios]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    // ২. PATCH রিকোয়েস্টের মাধ্যমে আপডেট (/user পাথ ব্যবহার করে)
    const handleUpdate = (e) => {
        e.preventDefault();
        axios.patch('/user', userData)
            .then(res => {
                if (res.data.modifiedCount > 0 || res.data.upsertedCount > 0) {
                    alert("User info updated successfully!");
                } else {
                    alert("No changes made.");
                }
            })
            .catch(err => {
                console.error("Update failed:", err);
                alert("Failed to update user.");
            });
    };

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <RefreshCw className="text-cyan-400 animate-spin" size={40} />
        </div>
    );

    return (
        <div className="max-w-2xl mx-auto">
            <header className="mb-10 text-center lg:text-left">
                <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white">
                    User <span className="text-cyan-400">Update</span>
                </h1>
                <p className="text-slate-500 text-sm font-medium">Edit your name and gmail address</p>
            </header>

            <form onSubmit={handleUpdate} className="bg-white/5 p-8 rounded-[2rem] border border-white/10 backdrop-blur-xl">
                <div className="space-y-6">

                    {/* Name Input */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold ml-1">Display Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                type="text"
                                name="name"
                                value={userData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className="w-full bg-slate-900/50 border border-white/10 p-4 pl-12 rounded-2xl focus:outline-none focus:border-cyan-500 text-white transition-all outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Email Input */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold ml-1">Gmail Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                type="email"
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                                placeholder="yourname@gmail.com"
                                className="w-full bg-slate-900/50 border border-white/10 p-4 pl-12 rounded-2xl focus:outline-none focus:border-cyan-500 text-white transition-all outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full mt-4 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black uppercase tracking-widest rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-3"
                    >
                        <Save size={20} /> Update User
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserUpdate;