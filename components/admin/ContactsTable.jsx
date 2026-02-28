'use client';
import { Eye, Trash2 } from 'lucide-react';

export default function ContactsTable({ contacts = [], onDelete, onView }) {
    if (contacts.length === 0) {
        return <div className="text-center py-10 text-gray-500 bg-[#1A1A1A] rounded-xl border border-[#2A2A2A]">No messages found</div>;
    }

    return (
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden">
            <div className="overflow-x-auto hidden md:block">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-[#111111] text-gray-400 text-sm font-medium uppercase tracking-wider sticky top-0 z-10">
                        <tr>
                            <th className="px-4 py-3 border-b border-[#2A2A2A]">Name</th>
                            <th className="px-4 py-3 border-b border-[#2A2A2A]">Contact</th>
                            <th className="px-4 py-3 border-b border-[#2A2A2A]">Message</th>
                            <th className="px-4 py-3 border-b border-[#2A2A2A]">Date</th>
                            <th className="px-4 py-3 border-b border-[#2A2A2A] text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2A2A2A]">
                        {contacts.map((contact) => (
                            <tr key={contact._id} className="hover:bg-[#1F1F1F] transition-colors">
                                <td className="px-4 py-3 text-sm font-medium text-white">{contact.name}</td>
                                <td className="px-4 py-3 text-sm text-gray-400">
                                    <div>{contact.phone}</div>
                                    <div className="text-xs">{contact.email}</div>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-300 max-w-xs truncate">
                                    {contact.message?.length > 50 ? contact.message.substring(0, 50) + '...' : contact.message}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-400">
                                    {new Date(contact.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-3 text-sm text-right flex justify-end gap-2">
                                    <button onClick={() => onView(contact)} className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 p-2 rounded-lg">
                                        <Eye size={16} />
                                    </button>
                                    <button onClick={() => onDelete(contact._id)} className="bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 p-2 rounded-lg">
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="md:hidden divide-y divide-[#2A2A2A]">
                {contacts.map((contact) => (
                    <div key={contact._id} className="p-4 hover:bg-[#1F1F1F]">
                        <div className="flex justify-between items-start mb-2">
                            <div className="font-medium text-white">{contact.name}</div>
                            <span className="text-xs text-gray-500">{new Date(contact.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="text-xs text-gray-400 mb-2">
                            <a href={`tel:+91${contact.phone}`} className="text-[#E63946]">{contact.phone}</a> • {contact.email}
                        </div>
                        <div className="text-sm text-gray-300 mb-4 line-clamp-2">
                            {contact.message}
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => onView(contact)} className="flex-1 border border-[#2A2A2A] py-2 rounded-lg text-xs hover:bg-[#2A2A2A] text-gray-300">
                                View Full
                            </button>
                            <button onClick={() => onDelete(contact._id)} className="flex-[0.5] text-red-500 border border-red-500/20 bg-red-500/10 py-2 rounded-lg text-xs hover:bg-red-500/20">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
