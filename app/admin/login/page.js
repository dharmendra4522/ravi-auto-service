'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Wrench, User, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await signIn('credentials', {
                username,
                password,
                redirect: false
            });

            if (res?.error) {
                console.error("SIGN IN ERROR:", res);
                setError('Login failed: ' + res.error);
                setLoading(false);
            } else {
                router.push('/admin/dashboard');
            }
        } catch (err) {
            setError('An error occurred during login');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-[#0D0D0D]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#E63946] rounded-full blur-[150px] opacity-10 pointer-events-none"></div>

            <div className="w-full max-w-md relative z-10">
                <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-8 shadow-2xl">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 bg-[#2A2A2A] rounded-2xl flex items-center justify-center mb-4 text-[#E63946]">
                            <Wrench size={32} />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-1">Ravi Auto Service</h1>
                        <p className="text-gray-400">Admin Panel</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <User size={20} />
                                </div>
                                <input
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-[#111111] border border-[#2A2A2A] text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-[#E63946] focus:ring-1 focus:ring-[#E63946] transition-colors"
                                    placeholder="Username"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Lock size={20} />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[#111111] border border-[#2A2A2A] text-white rounded-xl py-3 pl-10 pr-12 focus:outline-none focus:border-[#E63946] focus:ring-1 focus:ring-[#E63946] transition-colors"
                                    placeholder="Password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-lg text-center">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#E63946] hover:bg-[#d63441] text-white font-medium py-3 rounded-xl transition-colors disabled:opacity-70 flex items-center justify-center min-h-[48px]"
                        >
                            {loading ? (
                                <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-gray-500 text-sm text-center mt-6">
                    Ravi Auto Service &copy; {new Date().getFullYear()}
                </p>
            </div>
        </div>
    );
}
