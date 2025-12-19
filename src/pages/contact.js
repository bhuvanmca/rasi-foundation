import Layout from '@/components/Layout';
import { useState } from 'react';
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
  FaGraduationCap
} from 'react-icons/fa';

export default function Contact() {
  // Page SEO structured data for local business
  const contactStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Rasi Foundation',
    description: 'Career Guidance & Education Consultancy',
    telephone: '+91-9789446100',
    email: 'rasifoundation@gmail.com',
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
      title: 'Founder',
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
      description="Contact Rasi Foundation for career guidance & education consultancy. Call +91-9789446100 for MBBS, Engineering, MBA admission counseling. Visit us in Rasipuram, Tamil Nadu."
      keywords="contact Rasi Foundation, career counselor phone number, education consultant Rasipuram, admission helpline Tamil Nadu"
      structuredData={contactStructuredData}
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <FaEnvelope />
              <span>Get In Touch</span>
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
              Contact <span className="text-green-600">Us</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Have questions about admissions or need career guidance? We're here to help! 
              Reach out to us through any of the following channels.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto -mt-16 relative z-10">
            {contactInfo.map((contact, index) => (
              <div key={index} className={`card p-8 border-t-4 ${
                contact.color === 'red' ? 'border-red-500' : 'border-green-500'
              }`}>
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 ${
                    contact.color === 'red' 
                      ? 'bg-gradient-to-br from-red-500 to-red-700' 
                      : 'bg-gradient-to-br from-green-500 to-green-700'
                  }`}>
                    {contact.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <span className={`text-sm font-semibold ${
                      contact.color === 'red' ? 'text-red-600' : 'text-green-600'
                    }`}>{contact.title}</span>
                    <h3 className="text-xl font-bold text-gray-800">{contact.name}</h3>
                    <p className="text-gray-500 text-sm">{contact.credentials}</p>
                    <p className="text-gray-600 text-sm mb-3">{contact.role}</p>
                    <a 
                      href={`tel:${contact.phone.replace(/\s/g, '')}`}
                      className={`inline-flex items-center gap-2 font-bold text-lg ${
                        contact.color === 'red' ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'
                      }`}
                    >
                      <FaPhone /> {contact.phone}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="card p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Send Us a Message</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                  <FaCheckCircle className="text-green-600 text-xl flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-green-800">Message Sent Successfully!</p>
                    <p className="text-sm text-green-600">We'll contact you shortly.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="font-semibold text-red-800">Something went wrong!</p>
                  <p className="text-sm text-red-600">Please try again or contact us directly.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                      placeholder="What is this regarding?"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="input-field resize-none"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Quick Contact */}
              <div className="card p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Quick Contact</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaPhone className="text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Phone Numbers</h4>
                      <a href="tel:+919789446100" className="text-gray-600 hover:text-red-600 block">
                        +91 97 89 44 61 00 (Founder)
                      </a>
                      <a href="tel:+919294969196" className="text-gray-600 hover:text-green-600 block">
                        +91 92 94 96 91 96 (Admin Director)
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaEnvelope className="text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Email Address</h4>
                      <a href="mailto:rasipuramrasifoundation@gmail.com" className="text-gray-600 hover:text-green-600 break-all">
                        rasipuramrasifoundation@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaClock className="text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Working Hours</h4>
                      <p className="text-gray-600">Monday - Saturday</p>
                      <p className="text-gray-600">9:00 AM - 7:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="card p-8 bg-gradient-to-br from-green-500 to-green-600 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <FaWhatsapp className="text-4xl" />
                  <div>
                    <h3 className="text-xl font-bold">Chat on WhatsApp</h3>
                    <p className="text-white/80">Quick responses for your queries</p>
                  </div>
                </div>
                <a 
                  href="https://wa.me/919789446100" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full bg-white text-green-600 text-center py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                >
                  Start Chat
                </a>
              </div>

              {/* Social Links */}
              <div className="card p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="#" className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                    <FaFacebook className="text-xl" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity">
                    <FaInstagram className="text-xl" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors">
                    <FaYoutube className="text-xl" />
                  </a>
                  <a 
                    href="https://wa.me/919789446100" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors"
                  >
                    <FaWhatsapp className="text-xl" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Enquiry Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <FaGraduationCap className="text-5xl text-red-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Looking for Course Guidance?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              We offer free career counseling sessions to help you choose the right course and college.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              {[
                { title: 'Medical Courses', desc: 'MBBS, BDS, AYUSH, Nursing' },
                { title: 'Engineering', desc: 'B.E, B.Tech, Architecture' },
                { title: 'Management', desc: 'MBA, MCA, CA, B.Com' },
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-bold text-gray-800 mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-red-600 via-red-700 to-green-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Educational Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Don't wait! Contact us today and take the first step towards your dream career.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+919789446100" 
              className="bg-white text-red-700 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
            >
              <FaPhone /> Call Now
            </a>
            <a 
              href="https://wa.me/919789446100" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-8 py-4 rounded-lg font-bold hover:bg-green-600 transition-colors inline-flex items-center justify-center gap-2"
            >
              <FaWhatsapp /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
