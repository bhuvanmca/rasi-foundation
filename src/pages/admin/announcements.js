import { useState, useEffect } from 'react';
import AdminLayout from '@/frontend/components/AdminLayout';
import {
    FaPlus,
    FaTrash,
    FaEdit,
    FaSpinner,
    FaBullhorn,
    FaEye,
    FaTimes,
    FaCheckCircle,
    FaBell
} from 'react-icons/fa';

export default function AdminAnnouncements() {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        type: 'info',
        isActive: true,
        priority: 0
    });

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('/api/admin/announcements', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setAnnouncements(data);
            }
        } catch (error) {
            console.error('Failed to fetch announcements:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            const url = isEditing ? `/api/admin/announcements?id=${formData._id}` : '/api/admin/announcements';
            const method = isEditing ? 'PATCH' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setShowModal(false);
                fetchAnnouncements();
                resetForm();
            }
        } catch (error) {
            console.error('Failed to save announcement:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteAnnouncement = async (id) => {
        if (!confirm('Are you sure you want to delete this announcement?')) return;
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`/api/admin/announcements?id=${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.ok) {
                fetchAnnouncements();
            }
        } catch (error) {
            console.error('Failed to delete announcement:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            content: '',
            type: 'info',
            isActive: true,
            priority: 0
        });
        setIsEditing(false);
    };

    return (
        <AdminLayout title="Announcements & News">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">Public Updates</h2>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Manage site-wide notifications</p>
                </div>
                <button
                    onClick={() => { resetForm(); setShowModal(true); }}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2 hover:bg-white hover:text-indigo-600 border-2 border-transparent hover:border-indigo-600 transition-all shadow-lg shadow-indigo-600/20"
                >
                    <FaPlus /> Create New Update
                </button>
            </div>

            {loading && announcements.length === 0 ? (
                <div className="flex items-center justify-center h-64">
                    <FaSpinner className="animate-spin text-4xl text-indigo-600" />
                </div>
            ) : (
                <div className="space-y-4">
                    {announcements.map((item) => (
                        <div key={item._id} className="bg-white rounded-[2rem] border border-gray-100 p-6 flex items-center justify-between shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-center gap-6">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${item.type === 'alert' ? 'bg-red-100 text-red-600' :
                                        item.type === 'warning' ? 'bg-amber-100 text-amber-600' :
                                            'bg-indigo-100 text-indigo-600'
                                    }`}>
                                    <FaBullhorn />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                                    <p className="text-sm text-gray-500 line-clamp-1">{item.content}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${item.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'
                                    }`}>
                                    {item.isActive ? 'Live' : 'Hidden'}
                                </span>
                                <div className="flex gap-2 border-l pl-4">
                                    <button
                                        onClick={() => { setFormData(item); setIsEditing(true); setShowModal(true); }}
                                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => deleteAnnouncement(item._id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                    <div className="bg-white rounded-[2.5rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="p-8 border-b flex items-center justify-between sticky top-0 bg-white">
                            <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                                {isEditing ? 'Edit Announcement' : 'Post Announcement'}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="w-10 h-10 bg-gray-50 text-gray-400 hover:text-red-500 rounded-xl flex items-center justify-center transition-colors">
                                <FaTimes className="text-xl" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Title</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 font-bold"
                                    placeholder="e.g., NEET 2024 Registration Open"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Type / Priority</label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 font-bold text-gray-700"
                                >
                                    <option value="info">Information (Blue)</option>
                                    <option value="alert">Alert (Red)</option>
                                    <option value="warning">Important (Amber)</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Content</label>
                                <textarea
                                    rows="4"
                                    required
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 font-bold resize-none"
                                    placeholder="Enter the update message..."
                                />
                            </div>

                            <div className="flex items-center gap-4 py-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.isActive}
                                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                        className="w-5 h-5 accent-indigo-600"
                                    />
                                    <span className="text-xs font-bold text-gray-700 uppercase tracking-widest">Live on Website</span>
                                </label>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-lg shadow-indigo-600/20"
                                >
                                    {isEditing ? 'Update Announcement' : 'Broadcast Now'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-8 py-4 bg-gray-100 text-gray-700 rounded-2xl font-black uppercase tracking-widest text-[10px]"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
