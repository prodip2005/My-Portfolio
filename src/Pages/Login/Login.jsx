import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase.config';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // SweetAlert ইমপোর্ট করুন
import useAxios from '../../hooks/useAxios'; // ইউজার ইমেইল চেক করার জন্য

const Login = () => {
    const navigate = useNavigate();
    const axios = useAxios();

    const handleGoogleLogin = () => {
        signInWithPopup(auth, googleProvider)
            .then(async (result) => {
                const loggedInUser = result.user;

                try {
                    // ১. ডাটাবেস থেকে অনুমোদিত ইউজার ইমেইলটি নিয়ে আসা
                    const res = await axios.get('/user');
                    const adminEmail = res.data?.email;

                    // ২. ইমেইল ম্যাচিং চেক করা
                    if (loggedInUser.email === adminEmail) {
                        // সফল লগইন অ্যালার্ট
                        Swal.fire({
                            title: 'Access Granted!',
                            text: `Welcome back, ${loggedInUser.displayName}`,
                            icon: 'success',
                            background: '#0f172a',
                            color: '#fff',
                            confirmButtonColor: '#22d3ee',
                            showConfirmButton: false,
                            timer: 2000
                        });
                        navigate('/');
                    } else {
                        // যদি ইমেইল না মিলে (অন্য কোনো গুগল একাউন্ট)
                        Swal.fire({
                            title: 'Access Denied!',
                            text: 'You are not authorized to access this panel.',
                            icon: 'error',
                            background: '#0f172a',
                            color: '#fff',
                            confirmButtonColor: '#ef4444',
                        });
                        // অথরাইজেশন না থাকলে সাইন আউট করে দেওয়া ভালো
                        auth.signOut();
                    }
                } catch (error) {
                    console.error("Auth Check Error:", error);
                }
            })
            .catch((error) => {
                console.error("Login Error:", error.message);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-transparent">
            <div className="bg-white/5 backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-2xl text-center">
                <h2 className="text-white text-3xl font-black mb-6 italic uppercase tracking-tighter">
                    Admin <span className="text-cyan-400">Access</span>
                </h2>

                <button
                    onClick={handleGoogleLogin}
                    className="flex items-center gap-3 px-6 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-cyan-400 transition-all duration-300 shadow-lg shadow-cyan-500/20"
                >
                    <img
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                        alt="Google"
                        className="w-5 h-5"
                    />
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};

export default Login;