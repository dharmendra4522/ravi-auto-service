'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Save, AlertTriangle } from 'lucide-react';

export default function SettingsPage() {
    const { data: session } = useSession();
    const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (passwords.new !== passwords.confirm) {
            return setMessage({ type: 'error', text: 'New passwords do not match' });
        }
        if (passwords.new.length < 8) {
            return setMessage({ type: 'error', text: 'Password must be at least 8 characters' });
        }

        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const res = await fetch('/api/admin/settings/password', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ currentPassword: passwords.current, newPassword: passwords.new })
            });
            const data = await res.json();

            if (res.ok) {
                setMessage({ type: 'success', text: 'Password updated successfully!' });
                setPasswords({ current: '', new: '', confirm: '' });
            } else {
                setMessage({ type: 'error', text: data.error || 'Failed to update password' });
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'An error occurred. Try again.' });
        }
        setLoading(false);
    };

    return (
        <div className="max-w-3xl space-y-8">
            <div>
                <h1 className="text-2xl font-bold mb-2">Settings</h1>
                <p className="text-gray-400">Manage your admin account and application preferences.</p>
            </div>

            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden">
                <div className="p-6 border-b border-[#2A2A2A]">
                    <h2 className="text-lg font-medium text-white">Admin Profile</h2>
                </div>
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-500 mb-1">Username (Login ID)</label>
                            <input type="text" disabled value={session?.user?.username || 'admin'} className="w-full bg-[#111111] border border-[#2A2A2A] text-gray-400 rounded-lg p-3 outline-none cursor-not-allowed" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-500 mb-1">Display Name</label>
                            <input type="text" disabled value={session?.user?.name || 'Ravi Admin'} className="w-full bg-[#111111] border border-[#2A2A2A] text-gray-400 rounded-lg p-3 outline-none cursor-not-allowed" />
                        </div>
                    </div>
                    <p className="text-xs text-gray-500">Currently, changing your username or name is not supported from the dashboard.</p>
                </div>
            </div>

            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden">
                <div className="p-6 border-b border-[#2A2A2A]">
                    <h2 className="text-lg font-medium text-white">Change Password</h2>
                </div>
                <form onSubmit={handlePasswordChange} className="p-6 space-y-4">
                    {message.text && (
                        <div className={`p-4 rounded-lg text-sm border ${message.type === 'error' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-green-500/10 text-green-500 border-green-500/20'}`}>
                            {message.text}
                        </div>
                    )}

                    <div className="space-y-4 max-w-md">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Current Password</label>
                            <input
                                type="password"
                                required
                                value={passwords.current}
                                onChange={e => setPasswords({ ...passwords, current: e.target.value })}
                                className="w-full bg-[#111111] border border-[#2A2A2A] text-white rounded-lg p-3 outline-none focus:border-[#E63946]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">New Password (min 8 chars)</label>
                            <input
                                type="password"
                                required
                                minLength={8}
                                value={passwords.new}
                                onChange={e => setPasswords({ ...passwords, new: e.target.value })}
                                className="w-full bg-[#111111] border border-[#2A2A2A] text-white rounded-lg p-3 outline-none focus:border-[#E63946]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Confirm New Password</label>
                            <input
                                type="password"
                                required
                                minLength={8}
                                value={passwords.confirm}
                                onChange={e => setPasswords({ ...passwords, confirm: e.target.value })}
                                className="w-full bg-[#111111] border border-[#2A2A2A] text-white rounded-lg p-3 outline-none focus:border-[#E63946]"
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 bg-[#E63946] hover:bg-[#d63441] text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-70"
                        >
                            <Save size={18} /> {loading ? 'Saving...' : 'Update Password'}
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden">
                <div className="p-6 border-b border-[#2A2A2A]">
                    <h2 className="text-lg font-medium text-white">Shop Information</h2>
                </div>
                <div className="p-6 text-gray-400 space-y-2">
                    <p>These details are managed via environment variables in your server configuration.</p>
                    <ul className="list-disc list-inside mt-4 space-y-1 text-sm">
                        <li><strong>Shop Phone:</strong> {process.env.NEXT_PUBLIC_SHOP_PHONE1 || 'Not set'}</li>
                        <li><strong>Shop Address:</strong> {process.env.NEXT_PUBLIC_SHOP_ADDRESS || 'Not set'}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
