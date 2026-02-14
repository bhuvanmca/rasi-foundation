import { useState, useEffect } from 'react';
import AdminLayout from '@/frontend/components/AdminLayout';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaPlus,
    FaTrash,
    FaEdit,
    FaSpinner,
    FaBullhorn,
    FaTimes,
    FaCheckCircle,
    FaBell,
    FaLink,
    FaCalendarAlt,
    FaHome,
    FaExclamationTriangle,
    FaInfoCircle,
    FaGraduationCap,
    FaDoorOpen,
    FaSearch,
    FaFilter,
    FaEye,
    FaEyeSlash,
    FaSortAmountDown,
    FaCopy,
    FaCheck,
    FaExternalLinkAlt,
    FaToggleOn,
    FaToggleOff
} from 'react-icons/fa';

const typeConfig = {
    general: { label: 'General', color: 'bg-blue-100 text-blue-700', border: 'border-blue-200', icon: FaInfoCircle, gradient: 'from-blue-500 to-blue-600' },
    scholarship: { label: 'Scholarship', color: 'bg-green-100 text-green-700', border: 'border-green-200', icon: FaGraduationCap, gradient: 'from-green-500 to-green-600' },
    admission: { label: 'Admission', color: 'bg-purple-100 text-purple-700', border: 'border-purple-200', icon: FaDoorOpen, gradient: 'from-purple-500 to-purple-600' },
    urgent: { label: 'Urgent', color: 'bg-red-100 text-red-700', border: 'border-red-200', icon: FaExclamationTriangle, gradient: 'from-red-500 to-red-600' },
};

// Quick templates for common announcements
const quickTemplates = [
    { title: 'NEET UG 2026', type: 'urgent', content: 'NEET UG 2026 examination update. Contact Rasi Foundation for registration guidance and preparation support.' },
    { title: 'JEE Main 2026', type: 'admission', content: 'JEE Main 2026 session update. Important dates and registration information for BTech/BE aspirants.' },
    { title: 'TNEA 2026 Counselling', type: 'admission', content: 'TNEA 2026 Tamil Nadu Engineering Admissions counselling update. Rasi Foundation provides complete support.' },
    { title: 'TN HSC Board Exams', type: 'general', content: 'Tamil Nadu HSC Board Examination 2026 update for +2 students.' },
    { title: 'Scholarship Update', type: 'scholarship', content: 'Scholarship opportunity for BC/MBC/SC/ST students. Apply through Rasi Foundation for guidance.' },
    { title: 'Management Quota', type: 'admission', content: 'Management quota admissions open for Engineering and Medical colleges. Rasi Foundation has direct tie-ups.' },
];

export default function AdminAnnouncements() {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [showTemplates, setShowTemplates] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
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

    useEffect(() => {
        if (toast.show) {
            const timer = setTimeout(() => {
                setToast(prev => ({ ...prev, show: false }));
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [toast.show]);

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
    };

    const fetchAnnouncements = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('/api/admin/announcements', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 401) {
                localStorage.removeItem('adminToken');
                localStorage.removeItem('adminUser');
                window.location.href = '/admin/login';
                return;
            }

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
                showToast(isEditing ? 'Announcement updated successfully!' : 'Announcement published successfully!');
            } else {
                showToast('Failed to save announcement', 'error');
            }
        } catch (error) {
            console.error('Failed to save announcement:', error);
            showToast('Failed to save announcement', 'error');
        } finally {
            setSaving(false);
        }
    };

    const deleteAnnouncement = async (id, title) => {
        if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`/api/admin/announcements?id=${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.ok) {
                fetchAnnouncements();
                showToast('Announcement deleted successfully!');
            } else {
                showToast('Failed to delete announcement', 'error');
            }
        } catch (error) {
            console.error('Failed to delete announcement:', error);
            showToast('Failed to delete', 'error');
        }
    };

    const toggleActive = async (item) => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`/api/admin/announcements?id=${item._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ isActive: !item.isActive })
            });
            if (response.ok) {
                setAnnouncements(prev => prev.map(a =>
                    a._id === item._id ? { ...a, isActive: !a.isActive } : a
                ));
                showToast(`Announcement ${!item.isActive ? 'activated' : 'deactivated'}!`);
            }
        } catch (error) {
            console.error('Failed to toggle status:', error);
        }
    };

    const toggleShowOnHome = async (item) => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`/api/admin/announcements?id=${item._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ showOnHome: !item.showOnHome })
            });
            if (response.ok) {
                setAnnouncements(prev => prev.map(a =>
                    a._id === item._id ? { ...a, showOnHome: !a.showOnHome } : a
                ));
                showToast(`${!item.showOnHome ? 'Now showing' : 'Removed from'} homepage notification!`);
            }
        } catch (error) {
            console.error('Failed to toggle homepage:', error);
        }
    };

    const duplicateAnnouncement = (item) => {
        setFormData({
            title: item.title + ' (Copy)',
            content: item.content,
            type: item.type,
            link: item.link || '',
            isActive: true,
            showOnHome: item.showOnHome,
            priority: item.priority || 0,
            expiryDate: ''
        });
        setIsEditing(false);
        setShowModal(true);
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
        setShowTemplates(false);
    };

    const openEditModal = (item) => {
        setFormData({
            ...item,
            link: item.link || '',
            expiryDate: item.expiryDate ? new Date(item.expiryDate).toISOString().split('T')[0] : ''
        });
        setIsEditing(true);
        setShowTemplates(false);
        setShowModal(true);
    };

    const applyTemplate = (template) => {
        setFormData(prev => ({
            ...prev,
            title: template.title,
            type: template.type,
            content: template.content,
        }));
        setShowTemplates(false);
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

    const getRelativeTime = (dateStr) => {
        if (!dateStr) return '';
        const now = new Date();
        const date = new Date(dateStr);
        const diffMs = now - date;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays}d ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
        return formatDate(dateStr);
    };

    // Filtered announcements
    const filteredAnnouncements = announcements.filter(a => {
        const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.content.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = typeFilter === 'all' || a.type === typeFilter;
        const matchesStatus = statusFilter === 'all' ||
            (statusFilter === 'active' && a.isActive) ||
            (statusFilter === 'inactive' && !a.isActive) ||
            (statusFilter === 'expired' && isExpired(a.expiryDate)) ||
            (statusFilter === 'homepage' && a.showOnHome && a.isActive);
        return matchesSearch && matchesType && matchesStatus;
    });

    return (
        <AdminLayout title="Announcements & Updates">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                            <FaBullhorn className="text-indigo-600" />
                            Announcements
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Manage examination updates, notifications & site-wide announcements
                        </p>
                    </div>
                    <button
                        onClick={() => { resetForm(); setShowModal(true); }}
                        className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
                    >
                        <FaPlus /> New Announcement
                    </button>
                </div>

                {/* Search & Filters */}
                <div className="flex flex-col md:flex-row gap-3 mt-6">
                    <div className="relative flex-1">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search announcements..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        />
                    </div>
                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm font-medium"
                    >
                        <option value="all">All Types</option>
                        <option value="urgent">🚨 Urgent</option>
                        <option value="admission">🏫 Admission</option>
                        <option value="scholarship">🎓 Scholarship</option>
                        <option value="general">📢 General</option>
                    </select>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm font-medium"
                    >
                        <option value="all">All Status</option>
                        <option value="active">✅ Active</option>
                        <option value="inactive">🔴 Inactive</option>
                        <option value="homepage">🏠 On Homepage</option>
                        <option value="expired">⏰ Expired</option>
                    </select>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                {[
                    { label: 'Total', value: announcements.length, color: 'from-gray-600 to-gray-700', icon: FaBullhorn },
                    { label: 'Active', value: announcements.filter(a => a.isActive).length, color: 'from-green-500 to-green-600', icon: FaCheckCircle },
                    { label: 'Homepage', value: announcements.filter(a => a.showOnHome && a.isActive).length, color: 'from-blue-500 to-blue-600', icon: FaHome },
                    { label: 'Urgent', value: announcements.filter(a => a.type === 'urgent' && a.isActive).length, color: 'from-red-500 to-red-600', icon: FaExclamationTriangle },
                    { label: 'Expired', value: announcements.filter(a => isExpired(a.expiryDate)).length, color: 'from-amber-500 to-amber-600', icon: FaCalendarAlt },
                ].map((stat, i) => {
                    const StatIcon = stat.icon;
                    return (
                        <div key={i} className={`bg-gradient-to-r ${stat.color} text-white rounded-xl p-4 relative overflow-hidden`}>
                            <div className="relative z-10">
                                <p className="text-2xl font-black">{stat.value}</p>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">{stat.label}</p>
                            </div>
                            <StatIcon className="absolute -right-2 -bottom-2 text-5xl text-white/10" />
                        </div>
                    );
                })}
            </div>

            {/* Announcement List */}
            {loading && announcements.length === 0 ? (
                <div className="flex items-center justify-center h-64 bg-white rounded-xl shadow-sm">
                    <FaSpinner className="animate-spin text-4xl text-indigo-600" />
                </div>
            ) : announcements.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400 bg-white rounded-xl shadow-sm">
                    <FaBullhorn className="text-5xl mb-4 opacity-30" />
                    <p className="font-bold text-lg">No announcements yet</p>
                    <p className="text-sm">Create your first announcement to get started</p>
                </div>
            ) : filteredAnnouncements.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-gray-400 bg-white rounded-xl shadow-sm">
                    <FaSearch className="text-3xl mb-3 opacity-30" />
                    <p className="font-bold">No matching announcements</p>
                    <p className="text-sm">Try changing your search or filters</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {filteredAnnouncements.map((item) => {
                        const typeInfo = typeConfig[item.type] || typeConfig.general;
                        const TypeIcon = typeInfo.icon;
                        const expired = isExpired(item.expiryDate);

                        return (
                            <div
                                key={item._id}
                                className={`bg-white rounded-xl border shadow-sm hover:shadow-md transition-all overflow-hidden ${expired ? 'border-red-200 opacity-70' : item.isActive ? 'border-gray-100' : 'border-gray-200 opacity-60'}`}
                            >
                                {/* Color accent bar */}
                                <div className={`h-1 bg-gradient-to-r ${typeInfo.gradient}`}></div>

                                <div className="p-5">
                                    <div className="flex items-start gap-4">
                                        {/* Type Icon */}
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${typeInfo.color}`}>
                                            <TypeIcon />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap mb-1">
                                                <h3 className="font-bold text-gray-900">{item.title}</h3>
                                                {item.link && (
                                                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                                                        <FaExternalLinkAlt className="text-xs" />
                                                    </a>
                                                )}
                                            </div>

                                            <p className="text-sm text-gray-500 line-clamp-2 mb-3">{item.content}</p>

                                            {/* Meta info */}
                                            <div className="flex items-center gap-3 flex-wrap">
                                                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${typeInfo.color}`}>
                                                    {typeInfo.label}
                                                </span>

                                                <span className="text-[11px] text-gray-400 flex items-center gap-1">
                                                    <FaCalendarAlt className="text-[9px]" />
                                                    {getRelativeTime(item.createdAt)}
                                                </span>

                                                {item.expiryDate && (
                                                    <span className={`text-[11px] flex items-center gap-1 ${expired ? 'text-red-500 font-bold' : 'text-gray-400'}`}>
                                                        ⏰ {expired ? 'Expired' : `Expires ${formatDate(item.expiryDate)}`}
                                                    </span>
                                                )}

                                                <span className="text-[11px] text-gray-300">
                                                    Priority: {item.priority || 0}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            {/* Toggle Active */}
                                            <button
                                                onClick={() => toggleActive(item)}
                                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors ${item.isActive
                                                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                                                    }`}
                                                title={item.isActive ? 'Click to deactivate' : 'Click to activate'}
                                            >
                                                {item.isActive ? <FaToggleOn className="text-base" /> : <FaToggleOff className="text-base" />}
                                                {item.isActive ? 'Live' : 'Off'}
                                            </button>

                                            {/* Toggle Homepage */}
                                            <button
                                                onClick={() => toggleShowOnHome(item)}
                                                className={`p-2 rounded-lg transition-colors ${item.showOnHome
                                                    ? 'text-blue-600 bg-blue-50 hover:bg-blue-100'
                                                    : 'text-gray-300 hover:bg-gray-100 hover:text-gray-500'
                                                    }`}
                                                title={item.showOnHome ? 'Showing on homepage – click to hide' : 'Hidden from homepage – click to show'}
                                            >
                                                <FaHome />
                                            </button>

                                            {/* Divider */}
                                            <div className="w-px h-6 bg-gray-200"></div>

                                            {/* Edit */}
                                            <button
                                                onClick={() => openEditModal(item)}
                                                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <FaEdit />
                                            </button>

                                            {/* Duplicate */}
                                            <button
                                                onClick={() => duplicateAnnouncement(item)}
                                                className="p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 rounded-lg transition-colors"
                                                title="Duplicate"
                                            >
                                                <FaCopy />
                                            </button>

                                            {/* Delete */}
                                            <button
                                                onClick={() => deleteAnnouncement(item._id, item.title)}
                                                className="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Create/Edit Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                        >
                            {/* Modal Header */}
                            <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
                                <div>
                                    <h3 className="text-xl font-black text-gray-900">
                                        {isEditing ? 'Edit Announcement' : 'New Announcement'}
                                    </h3>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {isEditing ? 'Modify the announcement details below' : 'Create a new examination update or notification'}
                                    </p>
                                </div>
                                <button onClick={() => setShowModal(false)} className="w-10 h-10 bg-gray-50 text-gray-400 hover:text-red-500 rounded-xl flex items-center justify-center transition-colors">
                                    <FaTimes className="text-xl" />
                                </button>
                            </div>

                            {/* Quick Templates (only for new) */}
                            {!isEditing && (
                                <div className="px-6 pt-4">
                                    <button
                                        onClick={() => setShowTemplates(!showTemplates)}
                                        className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 mb-2"
                                    >
                                        ⚡ {showTemplates ? 'Hide' : 'Use'} Quick Templates
                                    </button>

                                    <AnimatePresence>
                                        {showTemplates && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pb-4">
                                                    {quickTemplates.map((template, i) => {
                                                        const tConfig = typeConfig[template.type];
                                                        return (
                                                            <button
                                                                key={i}
                                                                onClick={() => applyTemplate(template)}
                                                                className={`text-left p-3 rounded-xl border-2 border-dashed ${tConfig.border} hover:border-solid hover:shadow-sm transition-all text-xs`}
                                                            >
                                                                <span className={`inline-block px-2 py-0.5 rounded-md text-[9px] font-black uppercase ${tConfig.color} mb-1`}>
                                                                    {tConfig.label}
                                                                </span>
                                                                <p className="font-bold text-gray-700">{template.title}</p>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                                {/* Title */}
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">Title *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 font-bold text-gray-900"
                                        placeholder="e.g., NEET UG 2026 – Registration Open"
                                    />
                                </div>

                                {/* Type & Priority */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">Type</label>
                                        <select
                                            value={formData.type}
                                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                            className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 font-bold text-gray-700"
                                        >
                                            <option value="general">📢 General</option>
                                            <option value="scholarship">🎓 Scholarship</option>
                                            <option value="admission">🏫 Admission</option>
                                            <option value="urgent">🚨 Urgent</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">Priority (0-10)</label>
                                        <input
                                            type="number"
                                            min="0"
                                            max="10"
                                            value={formData.priority}
                                            onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 0 })}
                                            className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 font-bold text-gray-700"
                                        />
                                        <p className="text-[10px] text-gray-400 mt-1">Higher = shows first on homepage</p>
                                    </div>
                                </div>

                                {/* Content */}
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">Content *</label>
                                    <textarea
                                        rows="4"
                                        required
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 font-medium resize-none text-gray-700"
                                        placeholder="Enter the announcement details, exam dates, registration info..."
                                    />
                                    <p className="text-[10px] text-gray-400 mt-1">{formData.content.length} characters</p>
                                </div>

                                {/* Link & Expiry */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">
                                            <FaLink className="inline mr-1" /> Link (Optional)
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.link || ''}
                                            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                            className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 font-medium text-sm"
                                            placeholder="https://neet.nta.nic.in/"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">
                                            <FaCalendarAlt className="inline mr-1" /> Expiry Date (Optional)
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.expiryDate || ''}
                                            onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                                            className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 font-bold text-gray-700"
                                        />
                                        <p className="text-[10px] text-gray-400 mt-1">Auto-hides after this date</p>
                                    </div>
                                </div>

                                {/* Toggles */}
                                <div className="flex items-center gap-6 py-2 flex-wrap bg-gray-50 rounded-xl p-4">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={formData.isActive}
                                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                            className="w-5 h-5 accent-green-600 rounded"
                                        />
                                        <span className="text-xs font-bold text-gray-700 group-hover:text-green-600 transition-colors">
                                            <FaCheckCircle className="inline mr-1 text-green-500" /> Live on Website
                                        </span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={formData.showOnHome}
                                            onChange={(e) => setFormData({ ...formData, showOnHome: e.target.checked })}
                                            className="w-5 h-5 accent-blue-600 rounded"
                                        />
                                        <span className="text-xs font-bold text-gray-700 group-hover:text-blue-600 transition-colors">
                                            <FaHome className="inline mr-1 text-blue-500" /> Show in Homepage Notification Bar
                                        </span>
                                    </label>
                                </div>

                                {/* Preview */}
                                {formData.title && (
                                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-4">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">📱 Preview</p>
                                        <div className={`flex items-center gap-3 bg-gray-900 rounded-full p-2 px-4`}>
                                            <span className={`text-[10px] font-black text-white bg-gradient-to-r ${(typeConfig[formData.type] || typeConfig.general).gradient} px-3 py-1 rounded-full`}>
                                                {(typeConfig[formData.type] || typeConfig.general).label}
                                            </span>
                                            <span className="text-white text-sm font-bold truncate">{formData.title}</span>
                                        </div>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="flex-1 px-6 py-3.5 bg-indigo-600 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2 active:scale-95"
                                    >
                                        {saving ? <FaSpinner className="animate-spin" /> : <FaBullhorn />}
                                        {isEditing ? 'Update Announcement' : 'Publish Now'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-6 py-3.5 bg-gray-100 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toast Notification */}
            <AnimatePresence>
                {toast.show && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200]"
                    >
                        <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-md ${toast.type === 'success'
                            ? 'bg-green-600/90 border-green-500 text-white'
                            : 'bg-red-600/90 border-red-500 text-white'
                            }`}>
                            {toast.type === 'success' ? (
                                <div className="bg-white/20 p-2 rounded-full">
                                    <FaCheck className="text-sm" />
                                </div>
                            ) : (
                                <div className="bg-white/20 p-2 rounded-full">
                                    <FaTimes className="text-sm" />
                                </div>
                            )}
                            <p className="font-bold tracking-tight">{toast.message}</p>
                            <button
                                onClick={() => setToast({ ...toast, show: false })}
                                className="ml-4 hover:opacity-70 transition-opacity"
                            >
                                <FaTimes />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </AdminLayout>
    );
}
