import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaPhone, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Courses', path: '/courses' },
    { name: 'Question Corner', path: '/questions' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Payment', path: '/payment' },
  ];

  const isActive = (path) => router.pathname === path;

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-red-700 via-red-600 to-green-700 text-white py-2 text-sm">
        <div className="container mx-auto px-4 flex flex-wrap justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:+919789446100" className="flex items-center gap-2 hover:text-amber-300 transition-colors">
              <FaPhone className="text-xs" />
              <span>+91 97 89 44 61 00</span>
            </a>
            <a href="mailto:rasipuramrasifoundation@gmail.com" className="hidden md:flex items-center gap-2 hover:text-amber-300 transition-colors">
              <FaEnvelope className="text-xs" />
              <span>rasipuramrasifoundation@gmail.com</span>
            </a>
          </div>
          <div className="hidden md:block">
            <span className="font-semibold italic">"Empowering minds! Igniting future!"</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg' 
          : 'bg-white shadow-md'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <Image 
                src="/logo.jpeg" 
                alt="Rasi Foundation Logo" 
                width={50} 
                height={50}
                className="group-hover:scale-105 transition-transform"
              />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  <span className="text-red-600">RASI</span>
                  <span className="text-green-700 ml-2 font-normal">FOUNDATION</span>
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block">Career Guidance & Education Consultancy</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isActive(link.path)
                      ? 'bg-red-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Link href="/contact" className="btn-secondary text-sm">
                Get Free Counseling
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-2xl text-gray-700 hover:text-red-600 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="container mx-auto px-4 py-4 bg-gray-50 border-t">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`block py-3 px-4 rounded-lg mb-1 font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? 'bg-red-600 text-white'
                    : 'text-gray-700 hover:bg-red-100 hover:text-red-600'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/contact" 
              className="block w-full btn-secondary text-center mt-4"
              onClick={() => setIsOpen(false)}
            >
              Get Free Counseling
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
