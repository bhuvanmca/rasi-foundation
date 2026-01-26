import { useState, useEffect } from 'react';
import Layout from '@/frontend/components/Layout';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTrophy,
  FaUserGraduate,
  FaUniversity,
  FaStar,
  FaQuoteLeft,
  FaArrowRight,
  FaMedal,
  FaAward,
  FaHandshake,
  FaChartLine,
  FaHeart,
  FaUsers,
  FaGraduationCap,
  FaStethoscope,
  FaCog,
  FaBalanceScale,
  FaSpinner
} from 'react-icons/fa';

export default function Achievements() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const [data, setData] = useState({
    stats: [],
    milestones: [],
    success_stories: [],
    recognitions: [],
    placements: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await fetch('/api/achievements');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  const statIcons = [FaUserGraduate, FaUniversity, FaTrophy, FaStar];
  const milestoneIcons = [FaHeart, FaChartLine, FaUserGraduate, FaHandshake, FaTrophy, FaMedal];
  const recognitionIcons = [FaTrophy, FaStar, FaAward, FaMedal];
  const placementIcons = [FaStethoscope, FaCog, FaChartLine, FaBalanceScale, FaGraduationCap, FaUsers];

  return (
    <Layout
      title="Achievements"
      description="Rasi Foundation achievements: 5000+ students guided, 100+ partner colleges, 15+ years excellence. Read success stories of students placed in top Medical, Engineering & Management colleges."
      keywords="student success stories, education consultancy achievements, MBBS admission success, engineering placement stories, career guidance testimonials"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 via-white to-red-50 py-24 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-red-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-8 border border-amber-200"
            >
              <FaTrophy className="text-[10px]" />
              <span>Our Achievements</span>
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-8 tracking-tighter leading-none"
            >
              Celebrating <br /><span className="text-amber-600 italic">Success</span> Stories
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 leading-relaxed font-medium max-w-2xl mx-auto"
            >
              Over the years, Rasi Foundation has helped thousands of students achieve their
              educational dreams. Here&apos;s a glimpse of our journey and accomplishments.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white relative -mt-10 mb-10 overflow-hidden">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center py-12">
              <FaSpinner className="animate-spin text-4xl text-amber-600" />
            </div>
          ) : (
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {data.stats.map((stat, index) => {
                const Icon = statIcons[index % statIcons.length];
                return (
                  <motion.div
                    key={stat._id}
                    variants={fadeInUp}
                    className="text-center group"
                  >
                    <div className={`w-24 h-24 mx-auto mb-6 rounded-3xl flex items-center justify-center transition-all duration-500 shadow-xl group-hover:scale-110 group-hover:rotate-6 ${stat.color === 'red' ? 'bg-red-50 text-red-600' :
                      stat.color === 'green' ? 'bg-green-50 text-green-600' :
                        stat.color === 'amber' ? 'bg-amber-50 text-amber-600' :
                          'bg-blue-50 text-blue-600'
                      }`}>
                      <Icon className="text-4xl" />
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-2 tracking-tight">{stat.value}</h3>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">{stat.title}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>

      {/* Placement Highlights */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-red-600 font-black uppercase tracking-[0.2em] text-xs">Placement Stats</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4 mb-6 tracking-tighter">
              Category-wise <span className="text-green-600">Placements</span>
            </h2>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-8">
              <FaSpinner className="animate-spin text-2xl text-green-600" />
            </div>
          ) : (
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
            >
              {data.placements.map((item, index) => {
                const Icon = placementIcons[index % placementIcons.length];
                return (
                  <motion.div
                    variants={fadeInUp}
                    key={item._id}
                    className="bg-white p-8 rounded-[2rem] text-center shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 group"
                  >
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 ${item.color === 'red' ? 'bg-red-50 text-red-600' :
                      item.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                        item.color === 'green' ? 'bg-green-50 text-green-600' :
                          item.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                            item.color === 'amber' ? 'bg-amber-50 text-amber-600' :
                              'bg-teal-50 text-teal-600'
                      }`}>
                      <Icon className="text-2xl" />
                    </div>
                    <h4 className="text-3xl font-black text-gray-900 mb-1">{item.value}</h4>
                    <p className="text-gray-500 font-bold text-[10px] uppercase tracking-[0.2em]">{item.course}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <span className="text-amber-600 font-black uppercase tracking-[0.2em] text-xs">Our Journey</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4 mb-6 tracking-tighter">
              Key <span className="text-green-600 italic">Milestones</span>
            </h2>
          </motion.div>

          <div className="max-w-5xl mx-auto relative px-4">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 via-amber-500 to-green-500 rounded-full opacity-20"></div>

            <div className="space-y-24">
              {data.milestones.map((milestone, index) => {
                const Icon = milestoneIcons[index % milestoneIcons.length];
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={milestone._id}
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className={`relative flex items-center md:justify-between ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    {/* Content */}
                    <div className="flex-1 md:w-5/12 pl-16 md:pl-0">
                      <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-50 relative group transition-all duration-500 hover:shadow-2xl hover:border-amber-200">
                        <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 ${index % 6 === 0 ? 'bg-red-100 text-red-600' :
                          index % 6 === 1 ? 'bg-orange-100 text-orange-600' :
                            index % 6 === 2 ? 'bg-amber-100 text-amber-600' :
                              index % 6 === 3 ? 'bg-lime-100 text-lime-600' :
                                index % 6 === 4 ? 'bg-green-100 text-green-600' :
                                  'bg-emerald-100 text-emerald-600'
                          }`}>
                          {milestone.year}
                        </span>
                        <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">{milestone.title}</h3>
                        <p className="text-gray-600 leading-relaxed font-medium">{milestone.description}</p>
                      </div>
                    </div>

                    {/* Center Icon */}
                    <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-2xl z-10 transition-transform duration-500 group-hover:scale-125
                      ${index % 6 === 0 ? 'bg-red-500' :
                        index % 6 === 1 ? 'bg-orange-500' :
                          index % 6 === 2 ? 'bg-amber-500' :
                            index % 6 === 3 ? 'bg-lime-500' :
                              index % 6 === 4 ? 'bg-green-500' :
                                'bg-emerald-500'
                      }">
                      <Icon className="text-xl" />
                    </div>

                    {/* Spacer for MD screens */}
                    <div className="hidden md:block md:w-5/12"></div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <span className="text-amber-400 font-black uppercase tracking-[0.2em] text-xs">Success Stories</span>
            <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6 tracking-tighter">
              Our Students, Our <span className="text-green-500 italic">Pride</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-medium text-lg">
              Real stories from real students who achieved their dreams with our guidance.
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {data.success_stories.map((story, index) => (
              <motion.div
                key={story._id}
                variants={fadeInUp}
                className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/10 hover:bg-white/10 transition-all duration-500 group"
              >
                <FaQuoteLeft className="text-4xl text-amber-400/20 mb-8" />
                <p className="text-gray-200 italic mb-10 leading-relaxed font-medium text-lg">&quot;{story.quote}&quot;</p>
                <div className="flex items-center gap-5">
                  <div className={`w-16 h-16 rounded-3xl flex items-center justify-center text-white font-black text-xl shadow-2xl group-hover:scale-110 transition-transform duration-500 ${story.color === 'red' ? 'bg-gradient-to-br from-red-500 to-red-600' :
                    story.color === 'blue' ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                      story.color === 'green' ? 'bg-gradient-to-br from-green-500 to-green-600' :
                        story.color === 'purple' ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                          'bg-gradient-to-br from-amber-500 to-amber-600'
                    }`}>
                    {story.image}
                  </div>
                  <div>
                    <h4 className="font-black text-white text-xl tracking-tight">{story.name}</h4>
                    <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${story.color === 'red' ? 'text-red-400' :
                      story.color === 'blue' ? 'text-blue-400' :
                        story.color === 'green' ? 'text-green-400' :
                          story.color === 'purple' ? 'text-purple-400' :
                            'text-amber-400'
                      }`}>{story.achievement}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Recognitions */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <span className="text-red-600 font-black uppercase tracking-[0.2em] text-xs">Recognition</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4 mb-6 tracking-tighter">
              Awards & <span className="text-green-600 italic">Accolades</span>
            </h2>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {data.recognitions.map((item, index) => {
              const Icon = recognitionIcons[index % recognitionIcons.length];
              return (
                <motion.div
                  key={item._id}
                  variants={fadeInUp}
                  className="bg-gray-50 p-10 rounded-[2.5rem] text-center shadow-lg border border-gray-100 hover:shadow-2xl hover:bg-white transition-all duration-500 group"
                >
                  <div className={`w-20 h-20 mx-auto mb-8 bg-gradient-to-br ${item.color === 'amber' ? 'from-amber-400 to-amber-600' : 'from-yellow-400 to-yellow-600'} rounded-3xl flex items-center justify-center text-white shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <Icon className="text-3xl" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight uppercase tracking-tight">{item.title}</h3>
                  <p className="text-gray-500 font-medium">{item.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-amber-500 to-amber-600 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter"
          >
            Be Our Next Success <br /><span className="text-white/80 italic">Story!</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/90 mb-12 max-w-2xl mx-auto font-medium"
          >
            Join the thousands of students who have achieved their dreams with Rasi Foundation.
            Your success story could be next!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link href="/contact" className="bg-white text-amber-700 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:shadow-2xl transition-all hover:scale-105 inline-flex items-center justify-center gap-3">
              Start Your Journey <FaArrowRight />
            </Link>
            <Link href="/courses" className="bg-transparent border-2 border-white text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all hover:scale-105">
              Explore Courses
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
