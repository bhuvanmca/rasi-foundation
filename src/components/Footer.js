import Link from 'next/link';
import Image from 'next/image';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin,
  FaYoutube,
  FaArrowRight
} from 'react-icons/fa';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Courses', path: '/courses' },
    { name: 'Question Corner', path: '/questions' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const courses = [
    'MBBS / AYUSH / BDS',
    'Engineering / Architecture',
    'MBA / MCA / B.Com',
    'B.Ed / M.Ed / D.T.Ed',
    'Law (BL / LLB)',
    'Arts & Science',
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image 
                src="/logo.jpeg" 
                alt="Rasi Foundation Logo" 
                width={45} 
                height={45}
              />
              <div>
                <h3 className="text-2xl font-bold">
                  <span className="text-red-500">RASI</span>
                  <span className="text-green-400 ml-2">FOUNDATION</span>
                </h3>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Empowering students with the right career guidance and helping them achieve their dreams 
              through quality education consultancy services.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <FaFacebook />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 relative">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-red-500 -mb-2"></span>
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    href={link.path} 
                    className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2"
                  >
                    <FaArrowRight className="text-xs text-red-500" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-xl font-bold mb-6 relative">
              Our Courses
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-green-500 -mb-2"></span>
            </h4>
            <ul className="space-y-3">
              {courses.map((course, index) => (
                <li key={index}>
                  <Link 
                    href="/courses" 
                    className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2"
                  >
                    <FaArrowRight className="text-xs text-green-500" />
                    {course}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6 relative">
              Contact Us
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-amber-500 -mb-2"></span>
            </h4>
            <ul className="space-y-4">
              <li>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-red-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <FaPhone className="text-red-500" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Founder:</p>
                    <a href="tel:+919789446100" className="text-white hover:text-red-400 font-semibold">
                      +91 97 89 44 61 00
                    </a>
                    <p className="text-gray-500 text-sm">Prof. P. Gunasekaran</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <FaPhone className="text-green-500" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Admin Director:</p>
                    <a href="tel:+919294969196" className="text-white hover:text-green-400 font-semibold">
                      +91 92 94 96 91 96
                    </a>
                    <p className="text-gray-500 text-sm">P. Yuvaraj Kumar</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-amber-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <FaEnvelope className="text-amber-500" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email:</p>
                    <a href="mailto:rasipuramrasifoundation@gmail.com" className="text-white hover:text-amber-400 text-sm break-all">
                      rasipuramrasifoundation@gmail.com
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Rasi Foundation. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm italic">
              "Empowering minds! Igniting future!"
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
