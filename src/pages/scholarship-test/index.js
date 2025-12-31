import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/frontend/components/Layout';
import Link from 'next/link';
import {
    FaGraduationCap,
    FaClipboardCheck,
    FaUserGraduate,
    FaFlask,
    FaAtom,
    FaCalculator,
    FaLeaf,
    FaDna,
    FaArrowRight,
    FaClock,
    FaQuestionCircle,
    FaTrophy,
    FaShieldAlt,
    FaCheckCircle
} from 'react-icons/fa';

export default function ScholarshipTestPage() {
    const router = useRouter();
    const [showTokenInput, setShowTokenInput] = useState(false);
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleTokenSubmit = async (e) => {
        e.preventDefault();
        if (!token.trim()) {
            setError('Please enter your registration token');
            return;
        }
        setLoading(true);
        setError('');

        // Navigate to subject selection with token
        router.push(`/scholarship-test/select-subject?token=${token.trim()}`);
    };

    const features = [
        {
            icon: FaClipboardCheck,
            title: 'Multiple Choice Questions',
            description: 'Simple choose-the-best-answer format with 1 mark per question',
            color: 'from-blue-500 to-indigo-600'
        },
        {
            icon: FaClock,
            title: '90 Minutes Duration',
            description: 'Ample time to complete all questions at your own pace',
            color: 'from-green-500 to-emerald-600'
        },
        {
            icon: FaQuestionCircle,
            title: 'Random Questions',
            description: 'Unique question set for each student ensuring fairness',
            color: 'from-purple-500 to-violet-600'
        },
        {
            icon: FaTrophy,
            title: 'Instant Results',
            description: 'Get your score immediately after completing the test',
            color: 'from-amber-500 to-orange-600'
        },
    ];

    const subjects = [
        { name: 'Physics', icon: FaAtom, color: 'bg-blue-100 text-blue-600', required: true },
        { name: 'Chemistry', icon: FaFlask, color: 'bg-green-100 text-green-600', required: true },
        { name: 'Mathematics', icon: FaCalculator, color: 'bg-purple-100 text-purple-600', required: false },
        { name: 'Botany', icon: FaLeaf, color: 'bg-emerald-100 text-emerald-600', required: false },
        { name: 'Zoology', icon: FaDna, color: 'bg-rose-100 text-rose-600', required: false },
        { name: 'Biology', icon: FaDna, color: 'bg-amber-100 text-amber-600', required: false },
    ];

    return (
        <Layout
            title="Scholarship Test"
            description="RASI Foundation Online Scholarship Test - Fair and transparent scholarship selection for students in Tamil Nadu"
            keywords="scholarship test, RASI Foundation scholarship, online exam, engineering scholarship Tamil Nadu"
        >
            {/* Hero Section */}
            <section className="relative min-h-[70vh] bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                {/* Floating Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <FaAtom className="absolute top-20 right-1/4 text-6xl text-white/10 animate-float" />
                    <FaFlask className="absolute bottom-32 left-1/4 text-5xl text-white/10 animate-float" style={{ animationDelay: '1s' }} />
                    <FaCalculator className="absolute top-1/3 right-20 text-4xl text-white/10 animate-float" style={{ animationDelay: '2s' }} />
                    <FaLeaf className="absolute bottom-1/4 right-1/3 text-5xl text-white/10 animate-float" style={{ animationDelay: '0.5s' }} />
                </div>

                <div className="container mx-auto px-4 py-20 relative z-10">
                    <div className="max-w-4xl mx-auto text-center text-white">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full text-sm font-semibold mb-6 border border-white/20">
                            <FaGraduationCap className="text-amber-400" />
                            <span>RASI Foundation Scholarship</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            Online <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-amber-400">Scholarship Test</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto">
                            Your gateway to educational excellence. Take our online scholarship test and
                            unlock opportunities for your future.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                            <Link
                                href="/scholarship-test/register"
                                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-amber-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-pink-500/30 transition-all duration-300 hover:scale-105"
                            >
                                <FaUserGraduate />
                                Register for Test
                                <FaArrowRight />
                            </Link>

                            <button
                                onClick={() => setShowTokenInput(!showTokenInput)}
                                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg border border-white/30 hover:bg-white/20 transition-all duration-300"
                            >
                                <FaClipboardCheck />
                                Already Registered?
                            </button>
                        </div>

                        {/* Token Input */}
                        {showTokenInput && (
                            <div className="max-w-md mx-auto bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 animate-fadeIn">
                                <form onSubmit={handleTokenSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-white/80 text-sm font-medium mb-2 text-left">
                                            Enter Your Registration Token
                                        </label>
                                        <input
                                            type="text"
                                            value={token}
                                            onChange={(e) => setToken(e.target.value.toUpperCase())}
                                            placeholder="e.g., RASI-ABC123-XYZ789"
                                            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                                        />
                                    </div>
                                    {error && (
                                        <p className="text-red-300 text-sm">{error}</p>
                                    )}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-gradient-to-r from-pink-500 to-amber-500 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                                    >
                                        {loading ? 'Please wait...' : 'Continue to Test'}
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>

                {/* Wave Divider */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
                    </svg>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-indigo-600 font-semibold uppercase tracking-wider">Test Features</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">
                            Fair & Transparent <span className="text-pink-600">Evaluation</span>
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Our online scholarship test is designed to provide equal opportunity for all students
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group p-6 bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    <feature.icon className="text-2xl text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Subjects Section */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-indigo-600 font-semibold uppercase tracking-wider">Test Subjects</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">
                            Subject <span className="text-pink-600">Pattern</span>
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Physics and Chemistry are compulsory. Choose one elective subject as your third subject.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Compulsory Subjects */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-indigo-200">
                                <h3 className="text-lg font-bold text-indigo-700 mb-4 flex items-center gap-2">
                                    <FaShieldAlt />
                                    Compulsory Subjects
                                </h3>
                                <div className="space-y-3">
                                    {subjects.filter(s => s.required).map((subject, index) => (
                                        <div key={index} className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg">
                                            <div className={`w-10 h-10 rounded-lg ${subject.color} flex items-center justify-center`}>
                                                <subject.icon className="text-lg" />
                                            </div>
                                            <span className="font-semibold text-gray-800">{subject.name}</span>
                                            <span className="ml-auto text-xs bg-indigo-600 text-white px-2 py-1 rounded-full">Required</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Elective Subjects */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-pink-200">
                                <h3 className="text-lg font-bold text-pink-700 mb-4 flex items-center gap-2">
                                    <FaCheckCircle />
                                    Elective Subjects (Choose 1)
                                </h3>
                                <div className="space-y-3">
                                    {subjects.filter(s => !s.required).map((subject, index) => (
                                        <div key={index} className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg">
                                            <div className={`w-10 h-10 rounded-lg ${subject.color} flex items-center justify-center`}>
                                                <subject.icon className="text-lg" />
                                            </div>
                                            <span className="font-semibold text-gray-800">{subject.name}</span>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-sm text-pink-600 mt-4 italic">
                                    * Vocational students must select Mathematics
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Instructions Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <span className="text-indigo-600 font-semibold uppercase tracking-wider">How It Works</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">
                                Test <span className="text-pink-600">Instructions</span>
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    step: '01',
                                    title: 'Register',
                                    description: 'Fill in your personal and academic details in the registration form',
                                    color: 'from-blue-500 to-indigo-600',
                                },
                                {
                                    step: '02',
                                    title: 'Select Subject',
                                    description: 'Choose your third elective subject based on your +2 group',
                                    color: 'from-purple-500 to-pink-600',
                                },
                                {
                                    step: '03',
                                    title: 'Take Test',
                                    description: 'Answer all questions within 90 minutes and submit to get your result',
                                    color: 'from-pink-500 to-amber-500',
                                },
                            ].map((item, index) => (
                                <div key={index} className="relative">
                                    <div className="text-center">
                                        <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                                            {item.step}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                                        <p className="text-gray-600">{item.description}</p>
                                    </div>
                                    {index < 2 && (
                                        <div className="hidden md:block absolute top-10 left-full w-full">
                                            <div className="w-full border-t-2 border-dashed border-gray-300"></div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                <div className="container mx-auto px-4 text-center text-white">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to Begin Your Journey?
                    </h2>
                    <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                        Register now and take the first step towards securing your scholarship
                    </p>
                    <Link
                        href="/scholarship-test/register"
                        className="inline-flex items-center gap-2 bg-white text-indigo-700 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                    >
                        <FaUserGraduate />
                        Start Registration
                        <FaArrowRight />
                    </Link>
                </div>
            </section>
        </Layout>
    );
}
