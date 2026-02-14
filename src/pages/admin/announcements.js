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
    FaBell,
    FaLink,
    FaCalendarAlt,
    FaHome,
    FaExclamationTriangle,
    FaInfoCircle,
    FaGraduationCap,
    FaDoorOpen
} from 'react-icons/fa';

const typeConfig = {
    general: { label: 'General', color: 'bg-blue-100 text-blue-700', icon: FaInfoCircle },
    scholarship: { label: 'Scholarship', color: 'bg-green-100 text-green-700', icon: FaGraduationCap },
    admission: { label: 'Admission', color: 'bg-purple-100 text-purple-700', icon: FaDoorOpen },
    urgent: { label: 'Urgent', color: 'bg-red-100 text-red-700', icon: FaExclamationTriangle },
};

export default function AdminAnnouncements() {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        type: 'general',
        link: '',
        isActive: true,
        showOnHome: true,
        priority: 0,
        expiryDate: ''
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
                const result = await response.json();
                setAnnouncements(result.data || []);
            }
        } catch (error) {
            console.error('Failed to fetch announcements:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const token = localStorage.getItem('adminToken');
            const url = isEditing ? `/api/admin/announcements?id=${formData._id}` : '/api/admin/announcements';
            const method = isEditing ? 'PATCH' : 'POST';

            // Clean up the data before sending
            const submitData = { ...formData };
            if (!submitData.expiryDate) delete submitData.expiryDate;
            if (!submitData.link) delete submitData.link;

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(submitData)
            });

            if (response.ok) {
                setShowModal(false);
                fetchAnnouncements();
                resetForm();
            }
        } catch (error) {
            console.error('Failed to save announcement:', error);
        } finally {
            setSaving(false);
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

    const toggleActive = async (item) => {
        try {
            const token = localStorage.getItem('adminToken');
            await fetch(`/api/admin/announcements?id=${item._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ isActive: !item.isActive })
            });
            fetchAnnouncements();
        } catch (error) {
            console.error('Failed to toggle status:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            content: '',
            type: 'general',
            link: '',
            isActive: true,
            showOnHome: true,
            priority: 0,
            expiryDate: ''
        });
        setIsEditing(false);
    };

    const openEditModal = (item) => {
        setFormData({
            ...item,
            expiryDate: item.expiryDate ? new Date(item.expiryDate).toISOString().split('T')[0] : ''
        });
        setIsEditing(true);
        setShowModal(true);
    };

    const isExpired = (date) => {
        if (!date) return false;
        return new Date(date) < new Date();
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString('en-IN', {
            day: 'numeric', month: 'short', year: 'numeric'
        });
    };

    return (
        <AdminLayout title="Announcements & News">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">Announcements</h2>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                        Manage site-wide notifications & updates • {announcements.length} total
                    </p>
                </div>
                <button
                    onClick={() => { resetForm(); setShowModal(true); }}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2 hover:bg-white hover:text-indigo-600 border-2 border-transparent hover:border-indigo-600 transition-all shadow-lg shadow-indigo-600/20"
                >
                    <FaPlus /> New Announcement
                </button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                    { label: 'Total', value: announcements.length, color: 'bg-gray-100 text-gray-700' },
                    { label: 'Active', value: announcements.filter(a => a.isActive).length, color: 'bg-green-100 text-green-700' },
                    { label: 'On Homepage', value: announcements.filter(a => a.showOnHome && a.isActive).length, color: 'bg-blue-100 text-blue-700' },
                    { label: 'Urgent', value: announcements.filter(a => a.type === 'urgent' && a.isActive).length, color: 'bg-red-100 text-red-700' },
                ].map((stat, i) => (
                    <div key={i} className={`${stat.color} rounded-2xl p-4 text-center`}>
                        <p className="text-2xl font-black">{stat.value}</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">{stat.label}</p>
                    </div>
                ))}
            </div>

            {loading && announcements.length === 0 ? (
                <div className="flex items-center justify-center h-64">
                    <FaSpinner className="animate-spin text-4xl text-indigo-600" />
                </div>
            ) : announcements.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                    <FaBullhorn className="text-5xl mb-4 opacity-30" />
                    <p className="font-bold text-lg">No announcements yet</p>
                    <p className="text-sm">Create your first announcement to get started</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {announcements.map((item) => {
                        const typeInfo = typeConfig[item.type] || typeConfig.general;
                        const TypeIcon = typeInfo.icon;
                        const expired = isExpired(item.expiryDate);

                        return (
                            <div key={item._id} className={`bg-white rounded-[2rem] border p-6 flex items-center justify-between shadow-sm hover:shadow-md transition-all ${expired ? 'border-red-200 opacity-60' : 'border-gray-100'}`}>
                                <div className="flex items-center gap-6 flex-1 min-w-0">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 ${typeInfo.color}`}>
                                        <TypeIcon />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h3 className="font-bold text-gray-900 truncate">{item.title}</h3>
                                            {item.link && <FaLink className="text-blue-400 text-xs flex-shrink-0" />}
                                            {item.showOnHome && <FaHome className="text-green-400 text-xs flex-shrink-0" title="Shown on homepage" />}
                                        </div>
                                        <p className="text-sm text-gray-500 line-clamp-1">{item.content}</p>
                                        <div className="flex items-center gap-3 mt-1 flex-wrap">
                                            <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest ${typeInfo.color}`}>
                                                {typeInfo.label}
                                            </span>
                                            {item.expiryDate && (
                                                <span className={`flex items-center gap-1 text-[10px] font-bold ${expired ? 'text-red-500' : 'text-gray-400'}`}>
                                                    <FaCalendarAlt className="text-[8px]" />
                                                    {expired ? 'Expired' : `Expires ${formatDate(item.expiryDate)}`}
                                                </span>
                                            )}
                                            <span className="text-[10px] text-gray-300">
                                                {formatDate(item.createdAt)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 flex-shrink-0 ml-4">
                                    <button
                                        onClick={() => toggleActive(item)}
                                        className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest cursor-pointer transition-colors ${item.isActive ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                                    >
                                        {item.isActive ? 'Live' : 'Hidden'}
                                    </button>
                                    <div className="flex gap-2 border-l pl-4">
                                        <button
                                            onClick={() => openEditModal(item)}
                                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                            title="Edit"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => deleteAnnouncement(item._id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Create/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                    <div className="bg-white rounded-[2.5rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="p-8 border-b flex items-center justify-between sticky top-0 bg-white rounded-t-[2.5rem] z-10">
                            <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                                {isEditing ? 'Edit Announcement' : 'New Announcement'}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="w-10 h-10 bg-gray-50 text-gray-400 hover:text-red-500 rounded-xl flex items-center justify-center transition-colors">
                                <FaTimes className="text-xl" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            {/* Title */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Title *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 font-bold"
                                    placeholder="e.g., NEET 2026 Registration Open"
                                />
                            </div>

                            {/* Type & Priority */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Type</label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 font-bold text-gray-700"
                                    >
                                        <option value="general">📢 General</option>
                                        <option value="scholarship">🎓 Scholarship</option>
                                        <option value="admission">🏫 Admission</option>
                                        <option value="urgent">🚨 Urgent</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Priority (0-10)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="10"
                                        value={formData.priority}
                                        onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 0 })}
                                        className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 font-bold text-gray-700"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Content *</label>
                                <textarea
                                    rows="4"
                                    required
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 font-bold resize-none"
                                    placeholder="Enter the announcement details..."
                                />
                            </div>

                            {/* Link */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                                    <FaLink className="inline mr-1" /> Link (Optional)
                                </label>
                                <input
                                    type="url"
                                    value={formData.link || ''}
                                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 font-bold"
                                    placeholder="https://example.com/registration"
                                />
                            </div>

                            {/* Expiry Date */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                                    <FaCalendarAlt className="inline mr-1" /> Expiry Date (Optional)
                                </label>
                                <input
                                    type="date"
                                    value={formData.expiryDate || ''}
                                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 font-bold text-gray-700"
                                />
                                <p className="text-[10px] text-gray-400 ml-1">Leave empty for no expiration</p>
                            </div>

                            {/* Toggles */}
                            <div className="flex items-center gap-6 py-2 flex-wrap">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.isActive}
                                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                        className="w-5 h-5 accent-indigo-600"
                                    />
                                    <span className="text-xs font-bold text-gray-700 uppercase tracking-widest">
                                        <FaCheckCircle className="inline mr-1 text-green-500" /> Live on Website
                                    </span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.showOnHome}
                                        onChange={(e) => setFormData({ ...formData, showOnHome: e.target.checked })}
                                        className="w-5 h-5 accent-indigo-600"
                                    />
                                    <span className="text-xs font-bold text-gray-700 uppercase tracking-widest">
                                        <FaHome className="inline mr-1 text-blue-500" /> Show on Homepage
                                    </span>
                                </label>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-1 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {saving ? <FaSpinner className="animate-spin" /> : <FaBullhorn />}
                                    {isEditing ? 'Update Announcement' : 'Publish Now'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-8 py-4 bg-gray-100 text-gray-700 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-200 transition-colors"
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
