import { FaPhone, FaWhatsapp } from 'react-icons/fa';

const FloatingButtons = () => {
  const phoneNumber = '+919789446100';
  const whatsappNumber = '919789446100';
  const whatsappMessage = 'Hi! I would like to know more about Rasi Foundation services.';

  return (
    <div className="fixed right-4 bottom-4 md:right-6 md:bottom-6 flex flex-col gap-3 z-50">
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="text-2xl" />
        <span className="absolute right-16 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          Chat on WhatsApp
        </span>
      </a>

      {/* Call Button */}
      <a
        href={`tel:${phoneNumber}`}
        className="group flex items-center justify-center w-14 h-14 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-pulse hover:animate-none"
        aria-label="Call Us"
      >
        <FaPhone className="text-xl" />
        <span className="absolute right-16 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          Call Us Now
        </span>
      </a>
    </div>
  );
};

export default FloatingButtons;
