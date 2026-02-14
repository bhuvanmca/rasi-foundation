import Layout from '@/frontend/components/Layout';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    FaBullhorn,
    FaGraduationCap,
    FaDoorOpen,
    FaExclamationTriangle,
    FaInfoCircle,
    FaCalendarAlt,
    FaArrowRight,
    FaLink,
    FaSpinner,
    FaFilter,
    FaBell
} from 'react-icons/fa';

const typeConfig = {
    general: { label: 'General', color: 'bg-blue-100 text-blue-700', borderColor: 'border-blue-200', accentColor: 'bg-blue-600', icon: FaInfoCircle, gradient: 'from-blue-500 to-blue-600' },
    scholarship: { label: 'Scholarship', color: 'bg-green-100 text-green-700', borderColor: 'border-green-200', accentColor: 'bg-green-600', icon: FaGraduationCap, gradient: 'from-green-500 to-green-600' },
    admission: { label: 'Admission', color: 'bg-purple-100 text-purple-700', borderColor: 'border-purple-200', accentColor: 'bg-purple-600', icon: FaDoorOpen, gradient: 'from-purple-500 to-purple-600' },
    urgent: { label: 'Urgent', color: 'bg-red-100 text-red-700', borderColor: 'border-red-200', accentColor: 'bg-red-600', icon: FaExclamationTriangle, gradient: 'from-red-500 to-red-600' },
};

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function Announcements() {
    const [announcements, setAnnouncements] = useState([]);
    const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    useEffect(() => {
        if (activeFilter === 'all') {
            setFilteredAnnouncements(announcements);
        } else {
            setFilteredAnnouncements(announcements.filter(a => a.type === activeFilter));
        }
    }, [activeFilter, announcements]);

    const fetchAnnouncements = async () => {
        try {
            const res = await fetch('/api/announcements');
            const data = await res.json();
            if (data.success) {
                setAnnouncements(data.data || []);
                setFilteredAnnouncements(data.data || []);
            }
        } catch (error) {
            console.error('Failed to fetch announcements:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
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
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return formatDate(dateStr);
    };

    const filters = [
        { key: 'all', label: 'All Updates', icon: FaBullhorn },
        { key: 'urgent', label: 'Urgent', icon: FaExclamationTriangle },
        { key: 'admission', label: 'Admissions', icon: FaDoorOpen },
        { key: 'scholarship', label: 'Scholarships', icon: FaGraduationCap },
        { key: 'general', label: 'General', icon: FaInfoCircle },
    ];

    return (
        <Layout
            title="Announcements"
            description="Stay updated with the latest news, announcements, and updates from Rasi Foundation. Important information about admissions, scholarships, and more."
            keywords="Rasi Foundation announcements, admission updates, scholarship news, NEET updates, education news Tamil Nadu"
        >
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden py-20 md:py-28">
                {/* Background decorations */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-red-500 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 text-white px-5 py-2.5 rounded-full text-sm font-bold mb-6">
                            <FaBell className="text-amber-400 animate-bounce" />
                            <span>Stay Informed</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Announcements & <span className="bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent">Updates</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                            Stay updated with the latest news about admissions, scholarships, registration deadlines, and important updates from Rasi Foundation.
                        </p>
                    </motion.div>
                </div>

                {/* Wave */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
                    </svg>
                </div>
            </section>

            {/* Filters */}
            <section className="py-8 bg-white sticky top-[72px] z-30 border-b border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        <FaFilter className="text-gray-400 flex-shrink-0" />
                        {filters.map((filter) => {
                            const FilterIcon = filter.icon;
                            const count = filter.key === 'all'
                                ? announcements.length
                                : announcements.filter(a => a.type === filter.key).length;

                            return (
                                <button
                                    key={filter.key}
                                    onClick={() => setActiveFilter(filter.key)}
                                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-200 ${activeFilter === filter.key
                                        ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    <FilterIcon className="text-xs" />
                                    {filter.label}
                                    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${activeFilter === filter.key ? 'bg-white/20' : 'bg-gray-200'}`}>
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Announcements List */}
            <section className="py-16 bg-gradient-to-b from-white to-gray-50 min-h-[50vh]">
                <div className="container mx-auto px-4">
                    {loading ? (
                        <div className="flex items-center justify-center h-64">
                            <FaSpinner className="animate-spin text-4xl text-gray-400" />
                        </div>
                    ) : filteredAnnouncements.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center h-64 text-gray-400"
                        >
                            <FaBullhorn className="text-6xl mb-4 opacity-20" />
                            <p className="font-bold text-xl text-gray-500">No announcements found</p>
                            <p className="text-sm text-gray-400 mt-2">
                                {activeFilter !== 'all' ? 'Try selecting a different filter' : 'Check back later for updates'}
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial="initial"
                            animate="animate"
                            variants={staggerContainer}
                            className="space-y-6 max-w-4xl mx-auto"
                        >
                            {filteredAnnouncements.map((announcement, index) => {
                                const config = typeConfig[announcement.type] || typeConfig.general;
                                const TypeIcon = config.icon;

                                return (
                                    <motion.div
                                        key={announcement._id}
                                        variants={fadeInUp}
                                        className={`bg-white rounded-3xl border ${config.borderColor} shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group`}
                                    >
                                        {/* Accent top bar */}
                                        <div className={`h-1 bg-gradient-to-r ${config.gradient}`}></div>

                                        <div className="p-6 md:p-8">
                                            <div className="flex items-start gap-4 md:gap-6">
                                                {/* Icon */}
                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 ${config.color} group-hover:scale-110 transition-transform duration-300`}>
                                                    <TypeIcon />
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-3 flex-wrap mb-2">
                                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${config.color}`}>
                                                            {config.label}
                                                        </span>
                                                        <span className="text-xs text-gray-400 flex items-center gap-1">
                                                            <FaCalendarAlt className="text-[10px]" />
                                                            {getRelativeTime(announcement.createdAt)}
                                                        </span>
                                                    </div>

                                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                                                        {announcement.title}
                                                    </h3>

                                                    <p className="text-gray-600 leading-relaxed mb-4">
                                                        {announcement.content}
                                                    </p>

                                                    {/* Footer */}
                                                    <div className="flex items-center justify-between flex-wrap gap-4">
                                                        <div className="flex items-center gap-4">
                                                            {announcement.expiryDate && (
                                                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                                                    <FaCalendarAlt className="text-[10px]" />
                                                                    Valid till {formatDate(announcement.expiryDate)}
                                                                </span>
                                                            )}
                                                        </div>

                                                        {announcement.link && (
                                                            <a
                                                                href={announcement.link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r ${config.gradient} hover:shadow-lg transition-all hover:scale-105`}
                                                            >
                                                                <FaLink className="text-xs" />
                                                                Learn More
                                                                <FaArrowRight className="text-xs" />
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden shadow-2xl"
                    >
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
                        </div>

                        <div className="relative z-10">
                            <FaBell className="text-4xl text-amber-400 mx-auto mb-6" />
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Don&apos;t Miss Any Updates!
                            </h2>
                            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
                                Contact us directly to stay informed about the latest admissions, scholarships, and important deadlines.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/contact"
                                    className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all hover:scale-105 inline-flex items-center justify-center gap-2"
                                >
                                    Contact Us <FaArrowRight />
                                </Link>
                                <a
                                    href="tel:+919789446100"
                                    className="border-2 border-white/30 px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all hover:scale-105"
                                >
                                    Call: +91 97 89 44 61 00
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
}
