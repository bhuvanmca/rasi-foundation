import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaBullhorn, FaArrowRight, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationBar = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const res = await fetch('/api/announcements');
                const data = await res.json();
                if (data.success && data.data.length > 0) {
                    setAnnouncements(data.data);
                }
            } catch (error) {
                console.error('Failed to fetch announcements:', error);
            }
        };
        fetchAnnouncements();
    }, []);

    useEffect(() => {
        if (announcements.length > 1) {
            const timer = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % announcements.length);
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [announcements]);

    if (!isVisible || announcements.length === 0) return null;

    const current = announcements[currentIndex];

    return (
        <AnimatePresence>
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="w-full z-[40] relative py-4 bg-transparent overflow-hidden"
            >
                <div className="max-w-6xl mx-auto px-2">
                    <div className="bg-[#0f172a] shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-full border border-white/5 flex items-center p-1.5 overflow-hidden relative group">
                        {/* Static Badge */}
                        <div className="flex-shrink-0 bg-gradient-to-r from-red-600 to-red-700 px-4 py-2 rounded-full flex items-center gap-2 shadow-lg shadow-red-600/20 ml-1">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_10px_white]"></div>
                            <span className="text-white text-[10px] md:text-xs font-black uppercase tracking-tighter whitespace-nowrap">
                                {current.type === 'alert' ? 'High Alert' : 'Live Placements'}
                            </span>
                        </div>

                        {/* Separator */}
                        <div className="w-px h-6 bg-white/10 mx-4 hidden md:block"></div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -50, opacity: 0 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    className="flex items-center gap-2"
                                >
                                    <span className="text-white font-black text-sm md:text-base tracking-tight whitespace-nowrap">
                                        {current.title}
                                    </span>
                                    <span className="text-slate-400 text-xs md:text-sm font-medium">
                                        {current.content}
                                    </span>
                                    <div className="w-4 h-4 bg-green-500/20 rounded-full flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Right Legacy Info */}
                        <div className="hidden lg:flex items-center gap-4 px-6 border-l border-white/10">
                            <div className="flex flex-col items-end">
                                <span className="text-white/40 text-[8px] font-black uppercase tracking-[0.2em] leading-none mb-1">Success Legacy</span>
                                <span className="text-white text-[10px] font-bold">RASI FOUNDATION</span>
                            </div>
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0f172a] bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-[10px] font-black text-white shadow-xl">
                                        {String.fromCharCode(64 + i)}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={() => setIsVisible(false)}
                            className="mr-3 w-8 h-8 rounded-full flex items-center justify-center text-white/20 hover:text-white hover:bg-white/5 transition-all"
                        >
                            <FaTimes className="text-sm" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default NotificationBar;
