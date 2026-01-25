import Layout from '@/frontend/components/Layout';
import { useState } from 'react';
import Link from 'next/link';
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
  FaCheckCircle,
  FaSpinner,
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaUser,
  FaGraduationCap,
  FaArrowRight,
  FaHeadset
} from 'react-icons/fa';

export default function Contact() {
  // Page SEO structured data for local business
  const contactStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Rasi Foundation',
    description: 'Elite Career Guidance & Education Consultancy',
    telephone: '+91-9789446100',
    email: 'rasipuramrasifoundation@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Rasipuram',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'IN'
    },
    openingHours: 'Mo-Sa 09:00-18:00'
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const contactInfo = [
    {
      icon: FaUser,
      title: 'Strategic Advisor',
      name: 'Prof. P. Gunasekaran',
      credentials: 'M.Sc., M.Phil.',
      role: 'Career Guidance Advisor & Analyst',
      phone: '+91 97 89 44 61 00',
      color: 'red'
    },
    {
      icon: FaUser,
      title: 'Administrative Director',
      name: 'P. Yuvaraj Kumar',
      credentials: 'MBA',
      role: 'Career Guidance Advisor',
      phone: '+91 92 94 96 91 96',
      color: 'green'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout
      title="Contact Us"
      description="Connect with Rasi Foundation for career guidance. Our experts provide counseling for MBBS, Engineering, and Admissions."
      keywords="career guidance, education consultancy, medical admission, engineering career advisor"
      structuredData={contactStructuredData}
    >
      {/* Hero Section - Restored Red/Green Theme with Premium Feel */}
      <section className="relative pt-32 pb-20 bg-gray-50 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-8 border border-red-200">
              <FaEnvelope className="text-[10px]" />
              <span>Get In Touch</span>
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-8 tracking-tighter leading-none">
              Contact <span className="text-green-600 italic">Us</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed font-medium">
              Have questions about admissions or need career guidance? Reach out to us
              and take the first step towards your dream career.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-16">

            {/* Left Column: Form Container */}
            <div className="lg:col-span-7">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600/10 to-green-600/10 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>

                <div className="relative bg-white border border-gray-100 rounded-[2rem] p-8 md:p-12 shadow-2xl">
                  <h2 className="text-3xl font-black text-gray-800 mb-2 tracking-tight">Send a Message</h2>
                  <p className="text-gray-500 mb-10 font-medium">Fill out the form below and we&apos;ll get back to you shortly.</p>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] ml-1">Your Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-gray-50 border border-gray-200 text-gray-800 px-6 py-5 rounded-2xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50 outline-none transition-all placeholder:text-gray-300 font-bold"
                          placeholder="Your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] ml-1">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-gray-50 border border-gray-200 text-gray-800 px-6 py-5 rounded-2xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50 outline-none transition-all placeholder:text-gray-300 font-bold"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] ml-1">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-gray-50 border border-gray-200 text-gray-800 px-6 py-5 rounded-2xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50 outline-none transition-all placeholder:text-gray-300 font-bold"
                          placeholder="+91 000 000 0000"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] ml-1">Subject</label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-gray-50 border border-gray-200 text-gray-800 px-6 py-5 rounded-2xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50 outline-none transition-all placeholder:text-gray-300 font-bold"
                          placeholder="How can we help?"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] ml-1">Your Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full bg-gray-50 border border-gray-200 text-gray-800 px-6 py-5 rounded-2xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50 outline-none transition-all placeholder:text-gray-300 font-bold resize-none"
                        placeholder="Tell us about your requirements"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full relative group/btn overflow-hidden rounded-2xl p-[2px] disabled:opacity-50"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-green-600 bg-[length:200%_100%] animate-gradient"></div>
                      <div className="relative bg-[#020617] py-5 rounded-2xl flex items-center justify-center gap-3 font-bold text-white uppercase tracking-[0.2em] text-sm group-hover/btn:bg-transparent transition-colors">
                        {isSubmitting ? (
                          <>
                            <FaSpinner className="animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <FaPaperPlane className="text-xs" /> Send Message
                          </>
                        )}
                      </div>
                    </button>
                  </form>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-4 animate-fadeIn">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <FaCheckCircle className="text-white text-xl" />
                      </div>
                      <div>
                        <p className="font-bold text-green-800 text-sm uppercase tracking-widest">Message Sent!</p>
                        <p className="text-green-600 text-xs font-medium mt-1">We&apos;ll contact you shortly.</p>
                      </div>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-4 animate-fadeIn">
                      <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">!</div>
                      <div>
                        <p className="font-bold text-red-800 text-sm uppercase tracking-widest">Error</p>
                        <p className="text-red-600 text-xs font-medium mt-1">Please try again or call us directly.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Contact Cards */}
            <div className="lg:col-span-5 space-y-8">
              <div className="grid gap-6">
                {contactInfo.map((contact, index) => (
                  <div key={index} className="bg-white border border-gray-100 rounded-3xl p-6 hover:shadow-xl transition-all duration-500 group">
                    <div className="flex items-center gap-6">
                      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg ${contact.color === 'red' ? 'bg-red-600' : 'bg-green-600'
                        }`}>
                        {contact.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                      <div className="flex-1">
                        <span className={`text-[10px] font-black uppercase tracking-widest block mb-1 ${contact.color === 'red' ? 'text-red-600' : 'text-green-600'
                          }`}>{contact.title}</span>
                        <h3 className="text-xl font-black text-gray-800">{contact.name}</h3>
                        <p className="text-xs text-gray-500 font-bold mb-4">{contact.role}</p>
                        <a
                          href={`tel:${contact.phone.replace(/\s/g, '')}`}
                          className="inline-flex items-center gap-2 text-gray-800 font-black hover:text-red-600 transition-colors"
                        >
                          <FaPhone className="text-xs" /> {contact.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Info */}
              <div className="bg-gray-50 border border-gray-100 rounded-[2.5rem] p-10">
                <h3 className="text-2xl font-black text-gray-800 mb-8 tracking-tight">Information</h3>

                <div className="space-y-10">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-gray-200">
                      <FaEnvelope className="text-red-600 text-lg" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Email</h4>
                      <a href="mailto:rasipuramrasifoundation@gmail.com" className="text-gray-800 font-bold hover:text-red-600 transition-colors break-all text-sm">
                        rasipuramrasifoundation@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-gray-200">
                      <FaClock className="text-green-600 text-lg" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Availability</h4>
                      <p className="text-gray-800 font-bold">MON — SAT / 09:00 — 18:00</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 pt-4">
                    <Link href="https://wa.me/919789446100" className="flex items-center gap-3 w-full bg-green-600 text-white p-5 rounded-2xl font-bold uppercase tracking-widest text-xs justify-center hover:bg-green-700 transition-all">
                      <FaWhatsapp className="text-lg" /> WhatsApp Chat
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s linear infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </Layout>
  );
}
