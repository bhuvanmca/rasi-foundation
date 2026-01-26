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
                className={`w-full z-[60] relative overflow-hidden ${current.type === 'urgent' ? 'bg-red-600' : 'bg-slate-900'
                    }`}
            >
                <div className="container mx-auto px-4 py-2 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1 overflow-hidden">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${current.type === 'urgent' ? 'bg-white/20' : 'bg-red-500/20'
                            }`}>
                            <FaBullhorn className={current.type === 'urgent' ? 'text-white' : 'text-red-500'} />
                        </div>

                        <motion.div
                            key={currentIndex}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="flex-1 flex items-center gap-3 overflow-hidden"
                        >
                            <span className="text-white text-xs md:text-sm font-black uppercase tracking-widest whitespace-nowrap">
                                {current.title}:
                            </span>
                            <span className="text-white/80 text-xs md:text-sm font-medium truncate">
                                {current.content}
                            </span>
                        </motion.div>
                    </div>

                    <div className="flex items-center gap-4">
                        {current.link && (
                            <Link href={current.link} className="flex-shrink-0 bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all">
                                View <FaArrowRight />
                            </Link>
                        )}
                        <button
                            onClick={() => setIsVisible(false)}
                            className="text-white/40 hover:text-white transition-colors"
                        >
                            <FaTimes />
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default NotificationBar;
