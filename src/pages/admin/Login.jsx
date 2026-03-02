import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/admin/dashboard');
        } catch (err) {
            console.error('Login failed:', err);
            setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050d0d] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0df2f2]/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-[100px] animate-pulse delay-700"></div>
            </div>

            <div className="max-w-md w-full relative z-10 animate-in fade-in zoom-in-95 duration-500">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-[#0df2f2] to-blue-600 p-0.5 mb-6 group hover:scale-110 transition-transform">
                        <div className="w-full h-full bg-[#050d0d] rounded-[22px] flex items-center justify-center">
                            <span className="material-symbols-outlined text-4xl text-[#0df2f2] group-hover:text-glow">shield_person</span>
                        </div>
                    </div>
                    <h1 className="text-4xl font-black text-white mb-2 font-display uppercase tracking-widest text-glow">Admin Login</h1>
                    <p className="text-slate-400 text-sm font-bold tracking-widest uppercase">JarnNong.com Ecosystem</p>
                </div>

                <div className="glass-card p-8 md:p-10 border-white/10">
                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center gap-3 animate-in slide-in-from-top-2">
                                <span className="material-symbols-outlined text-lg">error</span>
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Email Address</label>
                            <div className="relative group">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#0df2f2] transition-colors">alternate_email</span>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#0df2f2]/50 focus:bg-white/10 transition-all font-mono"
                                    placeholder="admin@jarnnong.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Password</label>
                            <div className="relative group">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#0df2f2] transition-colors">lock</span>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#0df2f2]/50 focus:bg-white/10 transition-all font-mono"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#0df2f2] text-[#050d0d] py-4 rounded-xl font-black uppercase tracking-widest hover:shadow-[0_0_30px_rgba(13,242,242,0.4)] hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <span className="w-5 h-5 border-2 border-[#050d0d]/30 border-t-[#050d0d] rounded-full animate-spin"></span>
                            ) : (
                                <span className="material-symbols-outlined">login</span>
                            )}
                            {loading ? 'Authenticating...' : 'Sign In To Panel'}
                        </button>
                    </form>
                </div>

                <div className="text-center mt-8">
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                        ระบบความปลอดภัยโดย <span className="text-[#0df2f2]">Google Firebase</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
