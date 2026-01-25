import { useState, useEffect } from 'react';
import Layout from '@/frontend/components/Layout';
import Link from 'next/link';
import Script from 'next/script';
import {
  FaCreditCard,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaRupeeSign,
  FaCheckCircle,
  FaShieldAlt,
  FaLock,
  FaGraduationCap,
  FaHandHoldingHeart,
  FaBook,
  FaUserGraduate,
  FaClipboardList,
  FaExclamationTriangle
} from 'react-icons/fa';

export default function PaymentPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    amount: '',
    purpose: '',
    studentName: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [paymentId, setPaymentId] = useState('');

  const paymentPurposes = [
    { id: 'counseling', label: 'Career Counseling Fee', icon: FaClipboardList, color: 'blue' },
    { id: 'admission', label: 'Admission Assistance Fee', icon: FaGraduationCap, color: 'green' },
    { id: 'scholarship_test', label: 'Scholarship Test Fee', icon: FaBook, color: 'purple' },
    { id: 'course_fee', label: 'Course Fee', icon: FaUserGraduate, color: 'amber' },
    { id: 'donation', label: 'Donation', icon: FaHandHoldingHeart, color: 'pink' },
    { id: 'other', label: 'Other Payment', icon: FaCreditCard, color: 'gray' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Please enter your name';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) return 'Please enter a valid email';
    if (!formData.phone.trim() || !/^[6-9]\d{9}$/.test(formData.phone)) return 'Please enter a valid 10-digit phone number';
    if (!formData.amount || parseFloat(formData.amount) < 1) return 'Please enter a valid amount (minimum ₹1)';
    if (!formData.purpose) return 'Please select a payment purpose';
    return null;
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Create order
      const orderResponse = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(formData.amount),
          receipt: `rasi_${Date.now()}`,
          notes: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            purpose: formData.purpose,
          },
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(orderData.message || 'Failed to create order');
      }

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'RASI Foundation',
        description: `Payment for ${paymentPurposes.find(p => p.id === formData.purpose)?.label || 'Services'}`,
        order_id: orderData.order.id,
        handler: async function (response) {
          // Verify payment
          try {
            const verifyResponse = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                paymentDetails: {
                  amount: parseFloat(formData.amount),
                  currency: 'INR',
                  name: formData.name,
                  email: formData.email,
                  phone: formData.phone,
                  purpose: formData.purpose,
                  studentName: formData.studentName,
                  notes: formData.notes,
                },
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              setSuccess(true);
              setPaymentId(response.razorpay_payment_id);
            } else {
              setError('Payment verification failed. Please contact support.');
            }
          } catch (err) {
            setError('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          purpose: formData.purpose,
          studentName: formData.studentName,
        },
        theme: {
          color: '#dc2626',
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', function (response) {
        setError(`Payment failed: ${response.error.description}`);
        setLoading(false);
      });
      razorpay.open();

    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Layout
        title="Payment Successful"
        description="Your payment to RASI Foundation was successful"
      >
        <section className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-16 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto bg-white rounded-3xl shadow-2xl p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheckCircle className="text-5xl text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
              <p className="text-gray-600 mb-6">
                Thank you for your payment. Your transaction has been completed successfully.
              </p>

              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-500">Payment ID</p>
                <p className="font-mono font-bold text-green-600">{paymentId}</p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                <p className="text-green-700">
                  A confirmation email has been sent to <strong>{formData.email}</strong>
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  href="/"
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all text-center"
                >
                  Back to Home
                </Link>
                <Link
                  href="/contact"
                  className="w-full border-2 border-green-600 text-green-600 py-3 rounded-xl font-bold hover:bg-green-50 transition-all text-center"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout
      title="Make Payment"
      description="Secure online payment for RASI Foundation services - Career counseling, admission assistance, and more"
      keywords="RASI Foundation payment, online payment, career counseling fee, admission fee payment"
    >
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-600 via-red-700 to-green-700 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <FaLock className="text-amber-300" />
              <span className="text-sm font-medium">Secure Payment Gateway</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Make a <span className="text-amber-300">Payment</span>
            </h1>
            <p className="text-xl text-white/90">
              Secure online payment for counseling, admission assistance, and other services
            </p>
          </div>
        </div>
      </section>

      {/* Payment Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Payment Form */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <FaCreditCard className="text-red-600" />
                    Payment Details
                  </h2>

                  <form onSubmit={handlePayment} className="space-y-5">
                    {/* Purpose Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Payment Purpose *
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {paymentPurposes.map((purpose) => (
                          <button
                            key={purpose.id}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, purpose: purpose.id }))}
                            className={`p-3 rounded-xl border-2 text-left transition-all ${formData.purpose === purpose.id
                              ? 'border-red-500 bg-red-50 text-red-700'
                              : 'border-gray-200 hover:border-red-300 text-gray-600'
                              }`}
                          >
                            <purpose.icon className={`text-xl mb-1 ${formData.purpose === purpose.id ? 'text-red-600' : 'text-gray-400'}`} />
                            <p className="text-xs font-medium">{purpose.label}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Amount */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Amount (₹) *
                      </label>
                      <div className="relative">
                        <FaRupeeSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="number"
                          name="amount"
                          value={formData.amount}
                          onChange={handleChange}
                          placeholder="Enter amount"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                          min="1"
                        />
                      </div>
                    </div>

                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <div className="relative">
                        <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter 10-digit phone number"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                          maxLength="10"
                        />
                      </div>
                    </div>

                    {/* Student Name (Optional) */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Student Name (if different)
                      </label>
                      <div className="relative">
                        <FaUserGraduate className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="studentName"
                          value={formData.studentName}
                          onChange={handleChange}
                          placeholder="Enter student's name (optional)"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Notes
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Any additional information..."
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all resize-none"
                      ></textarea>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
                        <FaExclamationTriangle />
                        <span>{error}</span>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-red-600 to-green-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <FaLock />
                          Pay ₹{formData.amount || '0'} Securely
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-2 space-y-6">
                {/* Security Badge */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <FaShieldAlt className="text-2xl text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">Secure Payment</h3>
                      <p className="text-sm text-gray-500">Powered by Razorpay</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500" />
                      256-bit SSL encryption
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500" />
                      PCI DSS compliant
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500" />
                      Instant payment confirmation
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500" />
                      Multiple payment options
                    </li>
                  </ul>
                </div>

                {/* Payment Methods */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="font-bold text-gray-800 mb-4">Accepted Payment Methods</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-xs font-medium text-gray-600">UPI</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-xs font-medium text-gray-600">Cards</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-xs font-medium text-gray-600">NetBanking</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-xs font-medium text-gray-600">Wallets</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-xs font-medium text-gray-600">EMI</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-xs font-medium text-gray-600">Pay Later</p>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="bg-gradient-to-r from-red-500 to-green-500 rounded-2xl shadow-lg p-6 text-white">
                  <h3 className="font-bold mb-2">Need Help?</h3>
                  <p className="text-sm text-white/80 mb-4">
                    Contact us for any payment related queries
                  </p>
                  <a
                    href="tel:+919789446100"
                    className="block bg-white text-red-600 py-2 rounded-lg font-bold text-center hover:bg-gray-100 transition-colors"
                  >
                    Call: +91 97894 46100
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
