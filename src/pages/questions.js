import Layout from '@/components/Layout';
import { useState } from 'react';
import { 
  FaQuestionCircle,
  FaPaperPlane,
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaStethoscope,
  FaCog,
  FaChartLine,
  FaBalanceScale,
  FaGraduationCap,
  FaCheckCircle,
  FaSpinner,
  FaFilter
} from 'react-icons/fa';

export default function Questions() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'other',
    question: ''
  });

  const categories = [
    { id: 'all', name: 'All Questions', icon: FaQuestionCircle },
    { id: 'medical', name: 'Medical', icon: FaStethoscope },
    { id: 'engineering', name: 'Engineering', icon: FaCog },
    { id: 'management', name: 'Management', icon: FaChartLine },
    { id: 'law', name: 'Law', icon: FaBalanceScale },
    { id: 'general', name: 'General', icon: FaGraduationCap },
  ];

  const faqs = [
    {
      id: 1,
      category: 'medical',
      question: 'What is the eligibility criteria for MBBS admission?',
      answer: 'For MBBS admission, candidates must have passed 10+2 with Physics, Chemistry, and Biology with a minimum of 50% marks (40% for reserved categories). Additionally, candidates must qualify NEET-UG examination. Age should be minimum 17 years as on December 31st of the year of admission.'
    },
    {
      id: 2,
      category: 'medical',
      question: 'Is NEET mandatory for all medical courses?',
      answer: 'Yes, NEET is mandatory for admission to all medical courses in India including MBBS, BDS, AYUSH (BAMS, BHMS, BUMS, etc.), and Veterinary courses. It is conducted once a year by NTA (National Testing Agency).'
    },
    {
      id: 3,
      category: 'medical',
      question: 'What are the AYUSH courses available?',
      answer: 'AYUSH includes several traditional medicine systems: Ayurveda (BAMS), Yoga & Naturopathy (BNYS), Unani (BUMS), Siddha (BSMS), and Homeopathy (BHMS). These courses typically span 4.5 to 5.5 years including internship.'
    },
    {
      id: 4,
      category: 'engineering',
      question: 'What entrance exams are required for engineering admission?',
      answer: 'For engineering admissions, the main entrance exams are JEE Main (for NITs, IIITs, and other centrally funded institutions), JEE Advanced (for IITs), and various state-level exams like TNEA in Tamil Nadu. Many private universities also accept JEE Main scores or conduct their own entrance tests.'
    },
    {
      id: 5,
      category: 'engineering',
      question: 'Can I get direct admission to engineering colleges?',
      answer: 'Yes, many private engineering colleges offer direct admission through management quota. We can help you secure admission in reputed colleges based on your 12th marks and entrance exam scores. Contact us for personalized guidance.'
    },
    {
      id: 6,
      category: 'engineering',
      question: 'What is the duration of Architecture course?',
      answer: 'B.Arch (Bachelor of Architecture) is a 5-year undergraduate program. For admission, candidates need to qualify NATA (National Aptitude Test in Architecture) or JEE Main Paper 2, along with 10+2 with Mathematics.'
    },
    {
      id: 7,
      category: 'management',
      question: 'What are the entrance exams for MBA admission?',
      answer: 'Major MBA entrance exams include CAT (for IIMs), XAT, MAT, CMAT, SNAP, NMAT, and TANCET (for Tamil Nadu colleges). Different B-schools accept different exams. We can help you choose the right exams based on your target colleges.'
    },
    {
      id: 8,
      category: 'management',
      question: 'Can I pursue MBA without work experience?',
      answer: 'Yes, you can pursue MBA as a fresher right after graduation. However, some top B-schools prefer candidates with work experience. Many good colleges offer excellent MBA programs for fresh graduates.'
    },
    {
      id: 9,
      category: 'law',
      question: 'What is the difference between 3-year and 5-year LLB?',
      answer: '3-year LLB is for graduates (any discipline) and focuses on core law subjects. 5-year Integrated LLB (BA LLB, BBA LLB, etc.) is for 10+2 passed students and combines undergraduate education with law. Both lead to the same degree and career opportunities.'
    },
    {
      id: 10,
      category: 'law',
      question: 'Is CLAT mandatory for law admission?',
      answer: 'CLAT (Common Law Admission Test) is required for admission to National Law Universities (NLUs). However, many other law colleges have their own entrance exams or accept based on merit. Some state universities also conduct separate entrance tests.'
    },
    {
      id: 11,
      category: 'general',
      question: 'Do you provide scholarship guidance?',
      answer: 'Yes, we provide comprehensive scholarship guidance. We help students identify scholarships they are eligible for (government, private, institution-specific), assist with application processes, and provide documentation support.'
    },
    {
      id: 12,
      category: 'general',
      question: 'What documents are required for college admission?',
      answer: 'Common documents include: 10th & 12th mark sheets and certificates, Transfer Certificate, Migration Certificate, Entrance exam scorecard, Category certificate (if applicable), Passport size photographs, Aadhar card, and Community certificate. Specific requirements may vary by college and course.'
    },
    {
      id: 13,
      category: 'general',
      question: 'How can Rasi Foundation help me?',
      answer: 'We provide end-to-end support including: Career counseling to choose the right course, College selection based on your profile, Entrance exam guidance, Application and documentation assistance, Admission process support, and Scholarship guidance. Contact us for personalized help!'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/questions', {
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
          category: 'other',
          question: ''
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

  // FAQ structured data for SEO
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.slice(0, 10).map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <Layout 
      title="FAQ & Question Corner" 
      description="Get answers to frequently asked questions about MBBS admission, NEET counseling, engineering courses, MBA admission process. Ask our career guidance experts."
      keywords="MBBS admission FAQ, NEET counseling questions, engineering admission queries, MBA admission process, career guidance questions"
      structuredData={faqStructuredData}
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-pink-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <FaQuestionCircle />
              <span>Question Corner</span>
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
              Have <span className="text-purple-600">Questions?</span> We Have Answers!
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Browse through frequently asked questions or submit your own question to get 
              personalized guidance from our experts.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for answers..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 bg-white border-b sticky top-[72px] z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <category.icon className="text-sm" />
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Frequently Asked Questions
            </h2>

            {filteredFAQs.length > 0 ? (
              <div className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <div 
                    key={faq.id} 
                    className="card overflow-hidden"
                  >
                    <button
                      className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-gray-50 transition-colors"
                      onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          faq.category === 'medical' ? 'bg-red-100 text-red-600' :
                          faq.category === 'engineering' ? 'bg-blue-100 text-blue-600' :
                          faq.category === 'management' ? 'bg-green-100 text-green-600' :
                          faq.category === 'law' ? 'bg-purple-100 text-purple-600' :
                          'bg-amber-100 text-amber-600'
                        }`}>
                          <FaQuestionCircle />
                        </div>
                        <span className="text-lg font-semibold text-gray-800">{faq.question}</span>
                      </div>
                      {expandedFAQ === faq.id ? (
                        <FaChevronUp className="text-gray-400 flex-shrink-0 mt-1" />
                      ) : (
                        <FaChevronDown className="text-gray-400 flex-shrink-0 mt-1" />
                      )}
                    </button>
                    
                    {expandedFAQ === faq.id && (
                      <div className="px-6 pb-6">
                        <div className="pl-14 pt-2 border-t">
                          <p className="text-gray-600 leading-relaxed pt-4">{faq.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 card">
                <FaSearch className="text-6xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-600 mb-2">No questions found</h3>
                <p className="text-gray-500">Try adjusting your search or ask a new question</p>
              </div>
            )}
          </div>

          {/* Ask Question Form */}
          <div className="lg:col-span-1">
            <div className="card p-8 sticky top-32">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Ask Your Question</h3>
              <p className="text-gray-600 mb-6">
                Can't find what you're looking for? Submit your question and our experts will respond.
              </p>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                  <FaCheckCircle className="text-green-600 text-xl" />
                  <div>
                    <p className="font-semibold text-green-800">Question Submitted!</p>
                    <p className="text-sm text-green-600">We'll get back to you soon.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="font-semibold text-red-800">Something went wrong!</p>
                  <p className="text-sm text-red-600">Please try again later.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="medical">Medical</option>
                    <option value="engineering">Engineering</option>
                    <option value="management">Management</option>
                    <option value="law">Law</option>
                    <option value="arts">Arts & Science</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Question *</label>
                  <textarea
                    name="question"
                    value={formData.question}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="input-field resize-none"
                    placeholder="Type your question here..."
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
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Submit Question
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need Immediate Assistance?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            For urgent queries, feel free to call us directly. Our team is ready to help you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+919789446100" 
              className="bg-white text-purple-700 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Call: +91 97 89 44 61 00
            </a>
            <a 
              href="tel:+919294969196" 
              className="bg-transparent border-2 border-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-colors"
            >
              Call: +91 92 94 96 91 96
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
