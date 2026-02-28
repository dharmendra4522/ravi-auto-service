'use client';
import { useState, useEffect } from 'react';
import ContactsTable from '@/components/admin/ContactsTable';
import { X } from 'lucide-react';

export default function ContactsPage() {
    const [contacts, setContacts] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    const [selectedContact, setSelectedContact] = useState(null);

    useEffect(() => {
        const fetchContacts = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/admin/messages?page=${page}`);
                const data = await res.json();
                if (data.success) {
                    setContacts(data.contacts);
                    setTotal(data.total);
                    setTotalPages(data.totalPages);
                }
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };
        fetchContacts();
    }, [page]);

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this message?')) return;
        try {
            const res = await fetch('/api/admin/messages', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            if (res.ok) {
                setContacts(contacts.filter(c => c._id !== id));
                setTotal(t => t - 1);
            }
        } catch (err) {
            console.error('Failed to delete contact');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Contact Messages</h1>
                <div className="bg-[#1A1A1A] text-gray-400 px-4 py-2 rounded-full border border-[#2A2A2A] text-sm font-medium">
                    {total} messages
                </div>
            </div>

            {loading ? (
                <div className="animate-pulse bg-[#1A1A1A] h-[500px] rounded-xl border border-[#2A2A2A]"></div>
            ) : (
                <ContactsTable
                    contacts={contacts}
                    onDelete={handleDelete}
                    onView={(contact) => setSelectedContact(contact)}
                />
            )}

            {!loading && totalPages > 1 && (
                <div className="flex justify-between items-center bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A2A]">
                    <span className="text-sm text-gray-400">
                        Showing {(page - 1) * 10 + 1} to {Math.min(page * 10, total)} of {total}
                    </span>
                    <div className="flex gap-2">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            className="px-3 py-1 rounded-lg text-sm border border-[#2A2A2A] bg-[#111] text-gray-300 disabled:opacity-50 hover:bg-[#1A1A1A]"
                        >
                            Prev
                        </button>
                        <span className="px-3 py-1 text-sm text-gray-400 flex items-center">{page} / {totalPages}</span>
                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            className="px-3 py-1 rounded-lg text-sm border border-[#2A2A2A] bg-[#111] text-gray-300 disabled:opacity-50 hover:bg-[#1A1A1A]"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {selectedContact && (
                <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="flex items-center justify-between p-4 border-b border-[#2A2A2A] bg-[#111111]">
                            <h3 className="text-lg font-bold">Message Details</h3>
                            <button
                                onClick={() => setSelectedContact(null)}
                                className="text-gray-400 hover:text-white bg-[#2A2A2A] p-2 rounded-full transition-colors"
                                aria-label="Close"
                            >
                                <X size={16} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4 overflow-y-auto">
                            <div>
                                <strong className="text-xs text-gray-500 uppercase block mb-1">From</strong>
                                <p className="text-white flex flex-col md:flex-row md:items-center gap-1 md:gap-3 text-lg">
                                    {selectedContact.name}
                                </p>
                                <div className="text-sm mt-1 flex gap-4 text-gray-400">
                                    <a href={`tel:+91${selectedContact.phone}`} className="hover:text-[#E63946]">{selectedContact.phone}</a>
                                    <span>{selectedContact.email || 'No email'}</span>
                                </div>
                            </div>
                            <div>
                                <strong className="text-xs text-gray-500 uppercase block mb-1">Date</strong>
                                <p className="text-gray-300">{new Date(selectedContact.createdAt).toLocaleString()}</p>
                            </div>
                            <div>
                                <strong className="text-xs text-gray-500 uppercase block mb-2">Message</strong>
                                <div className="bg-[#111111] border border-[#2A2A2A] p-4 rounded-xl text-gray-300 whitespace-pre-wrap">
                                    {selectedContact.message}
                                </div>
                            </div>
                        </div>
                        <div className="p-4 border-t border-[#2A2A2A] bg-[#111111] flex gap-3 justify-end mt-auto">
                            <a
                                href={`tel:+91${selectedContact.phone}`}
                                className="px-4 py-2 rounded-lg bg-[#2A2A2A] text-white hover:bg-[#333] transition-colors text-sm font-medium"
                            >
                                Call Customer
                            </a>
                            <button
                                onClick={() => {
                                    handleDelete(selectedContact._id);
                                    setSelectedContact(null);
                                }}
                                className="px-4 py-2 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 transition-colors text-sm font-medium"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
