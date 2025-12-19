import { FaWhatsapp, FaPhone } from 'react-icons/fa';

const FloatingButtons = () => {
  const phoneNumber = '+919789446100';
  const whatsappNumber = '919789446100';
  const whatsappMessage = 'Hello! I would like to inquire about your services.';

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-3">
      {/* Call Button */}
      <a
        href={`tel:${phoneNumber}`}
        className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-bounce-slow"
        aria-label="Call us"
      >
        <FaPhone className="text-2xl group-hover:rotate-12 transition-transform duration-300" />
        {/* Pulse ring animation */}
        <span className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-30"></span>
        {/* Tooltip */}
        <span className="absolute right-16 bg-gray-800 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Call Now
        </span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-bounce-slow animation-delay-150"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="text-3xl group-hover:rotate-12 transition-transform duration-300" />
        {/* Pulse ring animation */}
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30"></span>
        {/* Tooltip */}
        <span className="absolute right-16 bg-gray-800 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
};

export default FloatingButtons;
