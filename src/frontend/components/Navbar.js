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
    { name: 'Colleges', path: '/colleges' },
    { name: 'Scholarship Test', path: '/scholarship-test' },
    { name: 'Payment', path: '/payment' },
    { name: 'Contact Us', path: '/contact' },
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
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/95 backdrop-blur-lg shadow-lg'
        : 'bg-white shadow-md'
        }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2">
            {/* Logo */}
            <Link href="/" className="flex items-center group flex-shrink-0">
              <Image
                src="/logo.png"
                alt="RASI FOUNDATION - Career Guidance & Education Consultancy"
                width={220}
                height={50}
                className="group-hover:scale-105 transition-transform h-10 md:h-12 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-3 py-1.5 rounded text-sm font-medium transition-all duration-200 ${isActive(link.path)
                    ? 'bg-green-600 text-white'
                    : 'text-gray-700 hover:text-green-600'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block flex-shrink-0">
              <Link href="/contact" className="bg-green-600 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-green-700 transition-colors">
                Get Counselling
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-2xl text-gray-700 hover:text-green-600 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
          <div className="container mx-auto px-4 py-4 bg-gray-50 border-t">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`block py-3 px-4 rounded-lg mb-1 font-medium transition-all duration-300 ${isActive(link.path)
                  ? 'bg-green-600 text-white'
                  : 'text-gray-700 hover:bg-green-100 hover:text-green-600'
                  }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="block w-full bg-green-600 text-white text-center py-3 rounded-lg font-semibold mt-4 hover:bg-green-700"
              onClick={() => setIsOpen(false)}
            >
              Get Counselling
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
