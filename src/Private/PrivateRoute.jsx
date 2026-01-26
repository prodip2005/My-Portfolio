import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';
import useAuth from './useAuth';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#020617]">
                <RefreshCw className="animate-spin text-cyan-400 mb-4" size={40} />
                <p className="text-slate-500 uppercase tracking-widest text-[10px] font-bold">Checking Credentials...</p>
            </div>
        );
    }

    if (user) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;