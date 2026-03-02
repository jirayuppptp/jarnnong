import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        await new Promise(r => setTimeout(r, 600)); // simulate loading
        const result = login(username, password);
        if (result.success) {
            navigate('/admin/dashboard');
        } else {
            setError(result.error);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#050d0d] flex items-center justify-center px-4 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0df2f2]/5 blur-[120px] rounded-full pointer-events-none" />
            {/* Circuit pattern */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: 'radial-gradient(rgba(13, 242, 242, 0.07) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
            />

            <div className="relative w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center mb-4">
                        <img src="/profile.jpg" alt="JarnNong" className="w-16 h-16 rounded-full border-2 border-[#0df2f2]/50 object-cover shadow-[0_0_20px_rgba(13,242,242,0.3)]" />
                    </div>
                    <h1 className="text-3xl font-black text-white font-display tracking-tight">Admin Panel</h1>
                    <p className="text-slate-400 mt-2 text-sm">JarnNong.com — ระบบจัดการเนื้อหา</p>
                </div>

                {/* Card */}
                <div
                    className="rounded-3xl p-8 border border-[#0df2f2]/15"
                    style={{ background: 'rgba(10, 26, 26, 0.8)', backdropFilter: 'blur(20px)' }}
                >
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Username */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">ชื่อผู้ใช้</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#0df2f2]/50 text-xl">person</span>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    placeholder="กรอกชื่อผู้ใช้"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-10 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#0df2f2]/50 focus:bg-white/8 transition-all text-sm"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">รหัสผ่าน</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#0df2f2]/50 text-xl">lock</span>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="กรอกรหัสผ่าน"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-10 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#0df2f2]/50 focus:bg-white/8 transition-all text-sm"
                                    required
                                />
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
                                <span className="material-symbols-outlined text-lg">error</span>
                                {error}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 bg-[#0df2f2] text-[#050d0d] font-extrabold text-base rounded-xl hover:shadow-[0_0_30px_rgba(13,242,242,0.5)] hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                        >
                            {loading ? (
                                <>
                                    <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                                    กำลังเข้าสู่ระบบ...
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-lg">login</span>
                                    เข้าสู่ระบบ
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center text-slate-600 text-xs mt-6">
                    © 2024 JarnNong.com — Admin Only
                </p>
            </div>
        </div>
    );
}
