import Layout from '@/frontend/components/Layout';
import { useState } from 'react';
import { 
  FaCreditCard,
  FaRupeeSign,
  FaShieldAlt,
  FaCheckCircle,
  FaSpinner,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaLock,
  FaInfoCircle
} from 'react-icons/fa';

export default function Payment() {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    purpose: '',
    amount: '',
    customAmount: ''
  });

  const paymentOptions = [
    { id: 'consultation', name: 'Career Consultation', amount: 500, description: 'One-on-one career guidance session' },
    { id: 'counseling', name: 'Admission Counseling', amount: 1000, description: 'Complete admission guidance package' },
    { id: 'premium', name: 'Premium Package', amount: 2500, description: 'End-to-end admission support' },
    { id: 'custom', name: 'Custom Amount', amount: 0, description: 'Enter your own amount' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'purpose') {
      const selected = paymentOptions.find(opt => opt.id === value);
      if (selected && selected.amount > 0) {
        setFormData(prev => ({ ...prev, amount: selected.amount.toString(), customAmount: '' }));
      } else {
        setFormData(prev => ({ ...prev, amount: '', customAmount: '' }));
      }
    }
  };

  const getPaymentAmount = () => {
    if (formData.purpose === 'custom') {
      return parseInt(formData.customAmount) || 0;
    }
    return parseInt(formData.amount) || 0;
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setError('');
    
    const amount = getPaymentAmount();
    if (amount < 1) {
      setError('Please enter a valid amount');
      return;
    }

    setIsLoading(true);

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load payment gateway');
      }

      // Create order
      const response = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          purpose: formData.purpose
        })
      });

      const order = await response.json();

      if (!response.ok) {
        throw new Error(order.message || 'Failed to create order');
      }

      // Open Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_xxxxx',
        amount: order.amount,
        currency: 'INR',
        name: 'Rasi Foundation',
        description: paymentOptions.find(opt => opt.id === formData.purpose)?.name || 'Payment',
        order_id: order.id,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: '#dc2626'
        },
        handler: async function (response) {
          // Verify payment
          try {
            const verifyResponse = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            });

            if (verifyResponse.ok) {
              setPaymentSuccess(true);
            } else {
              setError('Payment verification failed. Please contact support.');
            }
          } catch (err) {
            setError('Payment verification failed. Please contact support.');
          }
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      setIsLoading(false);

    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  if (paymentSuccess) {
    return (
      <Layout 
        title="Payment Successful" 
        description="Your payment to Rasi Foundation has been completed successfully."
        noIndex={true}
      >
        <section className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheckCircle className="text-5xl text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
              <p className="text-gray-600 mb-8">
                Thank you for your payment. A confirmation email has been sent to {formData.email}.
                Our team will contact you shortly.
              </p>
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{formData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Amount Paid</p>
                    <p className="font-medium text-green-600">₹{getPaymentAmount()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Purpose</p>
                    <p className="font-medium">{paymentOptions.find(opt => opt.id === formData.purpose)?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{formData.email}</p>
                  </div>
                </div>
              </div>
              <a href="/" className="btn-primary inline-flex items-center gap-2">
                Back to Home
              </a>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout 
      title="Make Payment" 
      description="Secure online payment for Rasi Foundation services. Pay for career consultation, admission counseling, and more."
      keywords="Rasi Foundation payment, education consultancy fees, career guidance payment"
      noIndex={true}
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 via-white to-green-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <FaCreditCard />
              <span>Secure Payment</span>
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Make a <span className="text-red-600">Payment</span>
            </h1>
            <p className="text-lg text-gray-600">
              Complete your payment securely using our trusted payment gateway.
            </p>
          </div>
        </div>
      </section>

      {/* Payment Form */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Form */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Payment Details</h2>
                  
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
                      <FaInfoCircle />
                      {error}
                    </div>
                  )}

                  <form onSubmit={handlePayment} className="space-y-5">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <div className="relative">
                        <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <div className="relative">
                        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                      <div className="relative">
                        <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>
                    </div>

                    {/* Purpose */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Payment Purpose *</label>
                      <div className="relative">
                        <FaGraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <select
                          name="purpose"
                          value={formData.purpose}
                          onChange={handleInputChange}
                          className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none bg-white"
                          required
                        >
                          <option value="">Select payment purpose</option>
                          {paymentOptions.map(option => (
                            <option key={option.id} value={option.id}>
                              {option.name} {option.amount > 0 ? `- ₹${option.amount}` : ''}
                            </option>
                          ))}
                        </select>
                      </div>
                      {formData.purpose && (
                        <p className="text-sm text-gray-500 mt-1">
                          {paymentOptions.find(opt => opt.id === formData.purpose)?.description}
                        </p>
                      )}
                    </div>

                    {/* Custom Amount */}
                    {formData.purpose === 'custom' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Enter Amount *</label>
                        <div className="relative">
                          <FaRupeeSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="number"
                            name="customAmount"
                            value={formData.customAmount}
                            onChange={handleInputChange}
                            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="Enter amount in INR"
                            min="1"
                            required
                          />
                        </div>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading || !formData.purpose || (formData.purpose === 'custom' && !formData.customAmount)}
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <FaSpinner className="animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <FaLock />
                          Pay ₹{getPaymentAmount() || '---'}
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Summary & Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Order Summary */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Order Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Service</span>
                      <span>{formData.purpose ? paymentOptions.find(opt => opt.id === formData.purpose)?.name : '---'}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Amount</span>
                      <span>₹{getPaymentAmount() || '---'}</span>
                    </div>
                    <hr className="border-gray-200" />
                    <div className="flex justify-between font-semibold text-gray-800 text-lg">
                      <span>Total</span>
                      <span className="text-red-600">₹{getPaymentAmount() || '---'}</span>
                    </div>
                  </div>
                </div>

                {/* Security Info */}
                <div className="bg-green-50 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <FaShieldAlt className="text-2xl text-green-600" />
                    <h3 className="font-semibold text-gray-800">Secure Payment</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-600" />
                      256-bit SSL encryption
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-600" />
                      PCI DSS compliant
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-600" />
                      Powered by Razorpay
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-600" />
                      Instant confirmation
                    </li>
                  </ul>
                </div>

                {/* Contact Info */}
                <div className="bg-blue-50 rounded-2xl p-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Need Help?</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    If you face any issues with payment, please contact us:
                  </p>
                  <p className="text-sm">
                    <strong>Phone:</strong> +91 97 89 44 61 00
                  </p>
                  <p className="text-sm">
                    <strong>Email:</strong> rasifoundation@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
