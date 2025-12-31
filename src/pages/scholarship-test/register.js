import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/frontend/components/Layout';
import Link from 'next/link';
import {
    FaUser,
    FaCalendar,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaGraduationCap,
    FaSchool,
    FaUserFriends,
    FaArrowRight,
    FaArrowLeft,
    FaCheckCircle,
    FaExclamationTriangle
} from 'react-icons/fa';

export default function RegisterPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(null);

    const [formData, setFormData] = useState({
        // Personal Details
        name: '',
        dateOfBirth: '',
        fatherName: '',
        community: '',
        address: '',

        // Contact Details
        studentEmail: '',
        studentMobile: '',
        fatherMobile: '',
        motherMobile: '',

        // Academic Details
        admissionCourse: '',
        collegeName: '',
        plus2Group: '',
        plus2ExamNumber: '',
        expectedCutOff: '',
        lastStudiedSchool: '',
        studiedInGovtSchool: false,
        firstGenerationGraduate: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        setError('');
    };

    const validateStep = (stepNum) => {
        switch (stepNum) {
            case 1:
                if (!formData.name || !formData.dateOfBirth || !formData.fatherName || !formData.community || !formData.address) {
                    setError('Please fill all required fields');
                    return false;
                }
                break;
            case 2:
                if (!formData.studentEmail || !formData.studentMobile || !formData.fatherMobile) {
                    setError('Please fill all required fields');
                    return false;
                }
                // Email validation
                if (!/^\S+@\S+\.\S+$/.test(formData.studentEmail)) {
                    setError('Please enter a valid email address');
                    return false;
                }
                // Mobile validation
                if (!/^[6-9]\d{9}$/.test(formData.studentMobile)) {
                    setError('Please enter a valid 10-digit student mobile number');
                    return false;
                }
                if (!/^[6-9]\d{9}$/.test(formData.fatherMobile)) {
                    setError('Please enter a valid 10-digit father mobile number');
                    return false;
                }
                break;
            case 3:
                if (!formData.admissionCourse || !formData.collegeName || !formData.plus2Group ||
                    !formData.plus2ExamNumber || !formData.expectedCutOff || !formData.lastStudiedSchool) {
                    setError('Please fill all required fields');
                    return false;
                }
                break;
        }
        return true;
    };

    const handleNext = () => {
        if (validateStep(step)) {
            setStep(prev => Math.min(prev + 1, 3));
        }
    };

    const handlePrev = () => {
        setStep(prev => Math.max(prev - 1, 1));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateStep(3)) return;

        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/scholarship/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            setSuccess(data.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const communities = ['OC', 'BC', 'BCM', 'MBC', 'SC', 'SCA', 'ST', 'Other'];
    const courses = [
        'B.E/B.Tech - Computer Science',
        'B.E/B.Tech - Electronics',
        'B.E/B.Tech - Mechanical',
        'B.E/B.Tech - Civil',
        'B.E/B.Tech - EEE',
        'B.E/B.Tech - IT',
        'B.E/B.Tech - Other',
        'MBBS',
        'BDS',
        'B.Pharm',
        'B.Sc Nursing',
        'MBA',
        'MCA',
        'BBA',
        'B.Com',
        'B.Sc',
        'B.A',
        'Other',
    ];

    if (success) {
        return (
            <Layout title="Registration Successful" description="RASI Foundation Scholarship Test Registration Complete">
                <section className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-2xl p-8 text-center">
                            <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                                <FaCheckCircle className="text-4xl text-green-600" />
                            </div>

                            <h1 className="text-3xl font-bold text-gray-800 mb-4">Registration Successful!</h1>
                            <p className="text-gray-600 mb-8">
                                Thank you for registering for the RASI Foundation Scholarship Test.
                            </p>

                            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 mb-8">
                                <p className="text-sm text-gray-600 mb-2">Your Registration Token</p>
                                <p className="text-2xl font-bold text-indigo-700 font-mono tracking-wider">
                                    {success.registrationToken}
                                </p>
                                <p className="text-xs text-gray-500 mt-2">
                                    Save this token! You'll need it to start and resume your test.
                                </p>
                            </div>

                            <div className="space-y-3 text-left mb-8 bg-gray-50 rounded-xl p-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Name:</span>
                                    <span className="font-medium text-gray-800">{success.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Email:</span>
                                    <span className="font-medium text-gray-800">{success.email}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">+2 Group:</span>
                                    <span className="font-medium text-gray-800">{success.plus2Group}</span>
                                </div>
                            </div>

                            <Link
                                href={`/scholarship-test/select-subject?token=${success.registrationToken}`}
                                className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300"
                            >
                                Continue to Subject Selection
                                <FaArrowRight />
                            </Link>
                        </div>
                    </div>
                </section>
            </Layout>
        );
    }

    return (
        <Layout
            title="Register for Scholarship Test"
            description="Register for RASI Foundation Online Scholarship Test"
        >
            <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <Link href="/scholarship-test" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-4">
                                <FaArrowLeft /> Back to Scholarship Test
                            </Link>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                                Student <span className="text-indigo-600">Registration</span>
                            </h1>
                            <p className="text-gray-600 mt-2">Complete the registration to get your test token</p>
                        </div>

                        {/* Progress Steps */}
                        <div className="flex justify-center mb-8">
                            <div className="flex items-center gap-4">
                                {[1, 2, 3].map((s) => (
                                    <div key={s} className="flex items-center">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${step >= s
                                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                                                : 'bg-gray-200 text-gray-500'
                                            }`}>
                                            {s}
                                        </div>
                                        {s < 3 && (
                                            <div className={`w-16 h-1 mx-2 rounded transition-all duration-300 ${step > s ? 'bg-indigo-600' : 'bg-gray-200'
                                                }`}></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Step Labels */}
                        <div className="flex justify-between max-w-md mx-auto mb-8 text-sm text-gray-600">
                            <span className={step >= 1 ? 'text-indigo-600 font-medium' : ''}>Personal</span>
                            <span className={step >= 2 ? 'text-indigo-600 font-medium' : ''}>Contact</span>
                            <span className={step >= 3 ? 'text-indigo-600 font-medium' : ''}>Academic</span>
                        </div>

                        {/* Form Card */}
                        <div className="bg-white rounded-3xl shadow-xl p-8">
                            <form onSubmit={handleSubmit}>
                                {/* Step 1: Personal Details */}
                                {step === 1 && (
                                    <div className="space-y-6 animate-fadeIn">
                                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
                                            <FaUser className="text-indigo-600" />
                                            Personal Details
                                        </h2>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-gray-700 font-medium mb-2">Full Name *</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                                    placeholder="Enter your full name"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-700 font-medium mb-2">Date of Birth *</label>
                                                <input
                                                    type="date"
                                                    name="dateOfBirth"
                                                    value={formData.dateOfBirth}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-gray-700 font-medium mb-2">Father's Name *</label>
                                                <input
                                                    type="text"
                                                    name="fatherName"
                                                    value={formData.fatherName}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                                    placeholder="Enter father's name"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-700 font-medium mb-2">Community *</label>
                                                <select
                                                    name="community"
                                                    value={formData.community}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                                >
                                                    <option value="">Select Community</option>
                                                    {communities.map(c => (
                                                        <option key={c} value={c}>{c}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-gray-700 font-medium mb-2">Full Address *</label>
                                            <textarea
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                rows={3}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                                                placeholder="Enter your complete address"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Contact Details */}
                                {step === 2 && (
                                    <div className="space-y-6 animate-fadeIn">
                                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
                                            <FaPhone className="text-indigo-600" />
                                            Contact Details
                                        </h2>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-gray-700 font-medium mb-2">Student Email *</label>
                                                <div className="relative">
                                                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                    <input
                                                        type="email"
                                                        name="studentEmail"
                                                        value={formData.studentEmail}
                                                        onChange={handleChange}
                                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                                        placeholder="student@email.com"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-gray-700 font-medium mb-2">Student Mobile *</label>
                                                <div className="relative">
                                                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                    <input
                                                        type="tel"
                                                        name="studentMobile"
                                                        value={formData.studentMobile}
                                                        onChange={handleChange}
                                                        maxLength={10}
                                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                                        placeholder="9876543210"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-gray-700 font-medium mb-2">Father's Mobile *</label>
                                                <div className="relative">
                                                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                    <input
                                                        type="tel"
                                                        name="fatherMobile"
                                                        value={formData.fatherMobile}
                                                        onChange={handleChange}
                                                        maxLength={10}
                                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                                        placeholder="9876543210"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-gray-700 font-medium mb-2">Mother's Mobile</label>
                                                <div className="relative">
                                                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                    <input
                                                        type="tel"
                                                        name="motherMobile"
                                                        value={formData.motherMobile}
                                                        onChange={handleChange}
                                                        maxLength={10}
                                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                                        placeholder="9876543210 (Optional)"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Academic Details */}
                                {step === 3 && (
                                    <div className="space-y-6 animate-fadeIn">
                                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
                                            <FaGraduationCap className="text-indigo-600" />
                                            Academic Details
                                        </h2>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-gray-700 font-medium mb-2">Course Applied For *</label>
                                                <select
                                                    name="admissionCourse"
                                                    value={formData.admissionCourse}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                                >
                                                    <option value="">Select Course</option>
                                                    {courses.map(c => (
                                                        <option key={c} value={c}>{c}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-gray-700 font-medium mb-2">College Name *</label>
                                                <input
                                                    type="text"
                                                    name="collegeName"
                                                    value={formData.collegeName}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                                    placeholder="Enter target college name"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-gray-700 font-medium mb-2">+2 Group *</label>
                                                <select
                                                    name="plus2Group"
                                                    value={formData.plus2Group}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                                >
                                                    <option value="">Select Group</option>
                                                    <option value="Academic">Academic</option>
                                                    <option value="Vocational">Vocational</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-gray-700 font-medium mb-2">+2 Exam Number *</label>
                                                <input
                                                    type="text"
                                                    name="plus2ExamNumber"
                                                    value={formData.plus2ExamNumber}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                                    placeholder="Enter your +2 exam number"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-gray-700 font-medium mb-2">12th Expected Cut Off *</label>
                                                <input
                                                    type="number"
                                                    name="expectedCutOff"
                                                    value={formData.expectedCutOff}
                                                    onChange={handleChange}
                                                    min="0"
                                                    max="200"
                                                    step="0.1"
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                                    placeholder="e.g., 195.5"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-700 font-medium mb-2">Last Studied School & Place *</label>
                                                <input
                                                    type="text"
                                                    name="lastStudiedSchool"
                                                    value={formData.lastStudiedSchool}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                                    placeholder="School name, Place"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                                <input
                                                    type="checkbox"
                                                    name="studiedInGovtSchool"
                                                    id="studiedInGovtSchool"
                                                    checked={formData.studiedInGovtSchool}
                                                    onChange={handleChange}
                                                    className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                                                />
                                                <label htmlFor="studiedInGovtSchool" className="text-gray-700 cursor-pointer">
                                                    Studied in Government School (6th to 12th)
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                                <input
                                                    type="checkbox"
                                                    name="firstGenerationGraduate"
                                                    id="firstGenerationGraduate"
                                                    checked={formData.firstGenerationGraduate}
                                                    onChange={handleChange}
                                                    className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                                                />
                                                <label htmlFor="firstGenerationGraduate" className="text-gray-700 cursor-pointer">
                                                    First Generation Graduate
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Error Message */}
                                {error && (
                                    <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
                                        <FaExclamationTriangle />
                                        <span>{error}</span>
                                    </div>
                                )}

                                {/* Navigation Buttons */}
                                <div className="flex justify-between mt-8">
                                    {step > 1 ? (
                                        <button
                                            type="button"
                                            onClick={handlePrev}
                                            className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-medium hover:border-indigo-500 hover:text-indigo-600 transition-all"
                                        >
                                            <FaArrowLeft />
                                            Previous
                                        </button>
                                    ) : (
                                        <div></div>
                                    )}

                                    {step < 3 ? (
                                        <button
                                            type="button"
                                            onClick={handleNext}
                                            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                                        >
                                            Next
                                            <FaArrowRight />
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50"
                                        >
                                            {loading ? 'Submitting...' : 'Complete Registration'}
                                            <FaCheckCircle />
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
