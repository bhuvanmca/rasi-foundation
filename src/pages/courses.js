import Layout from '@/frontend/components/Layout';
import Link from 'next/link';
import { useState } from 'react';
import {
  FaStethoscope,
  FaCog,
  FaBalanceScale,
  FaChartLine,
  FaPaintBrush,
  FaSeedling,
  FaChalkboardTeacher,
  FaFlask,
  FaGraduationCap,
  FaArrowRight,
  FaPhone,
  FaSearch,
  FaFilter,
  FaHospital,
  FaLaptopCode,
  FaBuilding,
  FaCalculator,
  FaBook,
  FaLeaf,
  FaCheckCircle,
  FaClock,
  FaUsers
} from 'react-icons/fa';

export default function Courses() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Courses', icon: FaGraduationCap },
    { id: 'medical', name: 'Medical', icon: FaStethoscope },
    { id: 'engineering', name: 'Engineering', icon: FaCog },
    { id: 'management', name: 'Management', icon: FaChartLine },
    { id: 'law', name: 'Law', icon: FaBalanceScale },
    { id: 'education', name: 'Education', icon: FaChalkboardTeacher },
    { id: 'arts', name: 'Arts & Science', icon: FaFlask },
    { id: 'agriculture', name: 'Agriculture', icon: FaSeedling },
  ];

  const courses = [
    // Medical Courses
    {
      id: 1,
      name: 'MBBS',
      fullName: 'Bachelor of Medicine, Bachelor of Surgery',
      category: 'medical',
      duration: '5.5 years',
      eligibility: '10+2 with PCB, NEET Qualified',
      description: 'Become a qualified medical doctor with this comprehensive undergraduate medical degree.',
      icon: FaHospital,
      color: 'red'
    },
    {
      id: 2,
      name: 'BDS',
      fullName: 'Bachelor of Dental Surgery',
      category: 'medical',
      duration: '5 years',
      eligibility: '10+2 with PCB, NEET Qualified',
      description: 'Pursue a career in dentistry and oral healthcare with this professional degree.',
      icon: FaStethoscope,
      color: 'red'
    },
    {
      id: 3,
      name: 'BAMS',
      fullName: 'Bachelor of Ayurvedic Medicine and Surgery',
      category: 'medical',
      duration: '5.5 years',
      eligibility: '10+2 with PCB, NEET Qualified',
      description: 'Study traditional Ayurvedic medicine and holistic healthcare practices.',
      icon: FaLeaf,
      color: 'red'
    },
    {
      id: 4,
      name: 'BHMS',
      fullName: 'Bachelor of Homeopathic Medicine and Surgery',
      category: 'medical',
      duration: '5.5 years',
      eligibility: '10+2 with PCB, NEET Qualified',
      description: 'Learn homeopathic medicine and alternative treatment approaches.',
      icon: FaLeaf,
      color: 'red'
    },
    {
      id: 5,
      name: 'BSMS',
      fullName: 'Bachelor of Siddha Medicine and Surgery',
      category: 'medical',
      duration: '5.5 years',
      eligibility: '10+2 with PCB, NEET Qualified',
      description: 'Study traditional Siddha medicine originating from Tamil Nadu.',
      icon: FaLeaf,
      color: 'red'
    },
    {
      id: 6,
      name: 'BNYS',
      fullName: 'Bachelor of Naturopathy and Yogic Sciences',
      category: 'medical',
      duration: '5.5 years',
      eligibility: '10+2 with PCB, NEET Qualified',
      description: 'Combine naturopathy with yoga for holistic healthcare treatment.',
      icon: FaLeaf,
      color: 'red'
    },
    {
      id: 7,
      name: 'B.Sc Nursing',
      fullName: 'Bachelor of Science in Nursing',
      category: 'medical',
      duration: '4 years',
      eligibility: '10+2 with PCB, 45% minimum',
      description: 'Prepare for a rewarding career in patient care and nursing practice.',
      icon: FaHospital,
      color: 'red'
    },
    {
      id: 8,
      name: 'B.Pharm',
      fullName: 'Bachelor of Pharmacy',
      category: 'medical',
      duration: '4 years',
      eligibility: '10+2 with PCM/PCB',
      description: 'Study pharmaceutical sciences, drug formulation, and pharmacology.',
      icon: FaFlask,
      color: 'red'
    },
    {
      id: 9,
      name: 'BPT',
      fullName: 'Bachelor of Physiotherapy',
      category: 'medical',
      duration: '4.5 years',
      eligibility: '10+2 with PCB, 50% minimum',
      description: 'Learn physical rehabilitation and therapeutic movement techniques.',
      icon: FaStethoscope,
      color: 'red'
    },
    {
      id: 10,
      name: 'B.Sc MLT',
      fullName: 'B.Sc Medical Laboratory Technology',
      category: 'medical',
      duration: '3 years',
      eligibility: '10+2 with PCB',
      description: 'Train in diagnostic testing and laboratory analysis techniques.',
      icon: FaFlask,
      color: 'red'
    },
    {
      id: 11,
      name: 'B.Sc Radiology',
      fullName: 'B.Sc Radiology & Imaging Technology',
      category: 'medical',
      duration: '3 years',
      eligibility: '10+2 with PCB',
      description: 'Learn medical imaging including X-ray, CT, MRI, and ultrasound.',
      icon: FaHospital,
      color: 'red'
    },
    {
      id: 12,
      name: 'B.Sc OT Technology',
      fullName: 'B.Sc Operation Theatre & Anaesthesia Technology',
      category: 'medical',
      duration: '3 years',
      eligibility: '10+2 with PCB',
      description: 'Assist surgeons and manage operation theatre procedures.',
      icon: FaHospital,
      color: 'red'
    },
    {
      id: 13,
      name: 'B.Sc Cardiac Technology',
      fullName: 'B.Sc Cardiac Care & Perfusion Technology',
      category: 'medical',
      duration: '3-4 years',
      eligibility: '10+2 with PCB',
      description: 'Specialization in cardiac diagnostics and heart-lung machine operation.',
      icon: FaStethoscope,
      color: 'red'
    },
    {
      id: 14,
      name: 'B.Sc Dialysis Technology',
      fullName: 'B.Sc Renal Dialysis Technology',
      category: 'medical',
      duration: '3 years',
      eligibility: '10+2 with PCB',
      description: 'Specialize in kidney dialysis treatment and renal care.',
      icon: FaHospital,
      color: 'red'
    },
    {
      id: 15,
      name: 'Physician Assistant',
      fullName: 'B.Sc Physician Assistant',
      category: 'medical',
      duration: '3 years',
      eligibility: '10+2 with PCB',
      description: 'Train to assist physicians in diagnosis and patient management.',
      icon: FaStethoscope,
      color: 'red'
    },
    {
      id: 16,
      name: 'B.Sc Optometry',
      fullName: 'Bachelor of Optometry',
      category: 'medical',
      duration: '4 years',
      eligibility: '10+2 with PCB/PCM',
      description: 'Study eye care, vision correction, and optical science.',
      icon: FaStethoscope,
      color: 'red'
    },

    // Engineering Courses
    {
      id: 17,
      name: 'B.E. CSE',
      fullName: 'B.E. Computer Science and Engineering',
      category: 'engineering',
      duration: '4 years',
      eligibility: '10+2 with PCM, TNEA/JEE',
      description: 'Core computer science covering programming, algorithms, databases, and software development.',
      icon: FaLaptopCode,
      color: 'blue'
    },
    {
      id: 18,
      name: 'B.E. CSE (AI & ML)',
      fullName: 'CSE - Artificial Intelligence & Machine Learning',
      category: 'engineering',
      duration: '4 years',
      eligibility: '10+2 with PCM, TNEA/JEE',
      description: 'Specialize in AI, machine learning, deep learning, and intelligent systems.',
      icon: FaLaptopCode,
      color: 'blue'
    },
    {
      id: 19,
      name: 'B.Tech AI & DS',
      fullName: 'B.Tech Artificial Intelligence & Data Science',
      category: 'engineering',
      duration: '4 years',
      eligibility: '10+2 with PCM, TNEA/JEE',
      description: 'Focus on data analytics, big data, AI applications, and data-driven solutions.',
      icon: FaLaptopCode,
      color: 'blue'
    },
    {
      id: 20,
      name: 'B.E. Cyber Security',
      fullName: 'B.E. CSE (Cyber Security)',
      category: 'engineering',
      duration: '4 years',
      eligibility: '10+2 with PCM, TNEA/JEE',
      description: 'Learn network security, ethical hacking, cryptography, and digital forensics.',
      icon: FaLaptopCode,
      color: 'blue'
    },
    {
      id: 21,
      name: 'B.E. IoT',
      fullName: 'B.E. CSE (Internet of Things)',
      category: 'engineering',
      duration: '4 years',
      eligibility: '10+2 with PCM, TNEA/JEE',
      description: 'Connected devices, sensors, embedded systems, and smart technology.',
      icon: FaLaptopCode,
      color: 'blue'
    },
    {
      id: 22,
      name: 'B.Tech IT',
      fullName: 'B.Tech Information Technology',
      category: 'engineering',
      duration: '4 years',
      eligibility: '10+2 with PCM, TNEA/JEE',
      description: 'Information systems, networking, web technologies, and IT infrastructure.',
      icon: FaLaptopCode,
      color: 'blue'
    },
    {
      id: 23,
      name: 'B.E. ECE',
      fullName: 'B.E. Electronics & Communication Engineering',
      category: 'engineering',
      duration: '4 years',
      eligibility: '10+2 with PCM, TNEA/JEE',
      description: 'Electronic circuits, communication systems, VLSI, and embedded systems.',
      icon: FaCog,
      color: 'blue'
    },
    {
      id: 24,
      name: 'B.E. EEE',
      fullName: 'B.E. Electrical & Electronics Engineering',
      category: 'engineering',
      duration: '4 years',
      eligibility: '10+2 with PCM, TNEA/JEE',
      description: 'Power systems, electrical machines, control systems, and renewable energy.',
      icon: FaCog,
      color: 'blue'
    },
    {
      id: 25,
      name: 'B.E. Mechanical',
      fullName: 'B.E. Mechanical Engineering',
      category: 'engineering',
      duration: '4 years',
      eligibility: '10+2 with PCM, TNEA/JEE',
      description: 'Design, manufacturing, thermodynamics, and mechanical systems.',
      icon: FaCog,
      color: 'blue'
    },
    {
      id: 26,
      name: 'B.E. Civil',
      fullName: 'B.E. Civil Engineering',
      category: 'engineering',
      duration: '4 years',
      eligibility: '10+2 with PCM, TNEA/JEE',
      description: 'Structural engineering, construction, transportation, and infrastructure.',
      icon: FaBuilding,
      color: 'blue'
    },
    {
      id: 27,
      name: 'B.E. Mechatronics',
      fullName: 'B.E. Mechatronics Engineering',
      category: 'engineering',
      duration: '4 years',
      eligibility: '10+2 with PCM, TNEA/JEE',
      description: 'Integration of mechanical, electronics, and computer engineering.',
      icon: FaCog,
      color: 'blue'
    },
    {
      id: 28,
      name: 'B.E. Robotics',
      fullName: 'B.E. Robotics & Automation',
      category: 'engineering',
      duration: '4 years',
      eligibility: '10+2 with PCM, TNEA/JEE',
      description: 'Industrial robots, automation systems, and intelligent manufacturing.',
      icon: FaCog,
      color: 'blue'
    },
    {
      id: 29,
      name: 'B.E. Biomedical',
      fullName: 'B.E. Biomedical Engineering',
      category: 'engineering',
      duration: '4 years',
      eligibility: '10+2 with PCM/PCB, TNEA/JEE',
      description: 'Medical devices, healthcare technology, and biological systems.',
      icon: FaStethoscope,
      color: 'blue'
    },
    {
      id: 30,
      name: 'B.E. Aeronautical',
      fullName: 'B.E. Aeronautical Engineering',
      category: 'engineering',
      duration: '4 years',
      eligibility: '10+2 with PCM, TNEA/JEE',
      description: 'Aircraft design, propulsion systems, and aerospace technology.',
      icon: FaCog,
      color: 'blue'
    },
    {
      id: 31,
      name: 'B.Tech Biotechnology',
      fullName: 'B.Tech Biotechnology',
      category: 'engineering',
      duration: '4 years',
      eligibility: '10+2 with PCM/PCB, TNEA/JEE',
      description: 'Genetic engineering, bioinformatics, and bioprocess technology.',
      icon: FaFlask,
      color: 'blue'
    },
    {
      id: 32,
      name: 'B.Tech Chemical',
      fullName: 'B.Tech Chemical Engineering',
      category: 'engineering',
      duration: '4 years',
      eligibility: '10+2 with PCM, TNEA/JEE',
      description: 'Chemical processes, plant design, and process engineering.',
      icon: FaFlask,
      color: 'blue'
    },
    {
      id: 33,
      name: 'B.Tech Food Tech',
      fullName: 'B.Tech Food Technology',
      category: 'engineering',
      duration: '4 years',
      eligibility: '10+2 with PCM/PCB, TNEA/JEE',
      description: 'Food processing, preservation, quality control, and food safety.',
      icon: FaSeedling,
      color: 'blue'
    },
    {
      id: 34,
      name: 'B.E. VLSI',
      fullName: 'B.E. VLSI Design & Technology',
      category: 'engineering',
      duration: '4 years',
      eligibility: '10+2 with PCM, TNEA/JEE',
      description: 'Chip design, integrated circuits, and semiconductor technology.',
      icon: FaCog,
      color: 'blue'
    },
    {
      id: 35,
      name: 'B.Tech CSBS',
      fullName: 'B.Tech Computer Science & Business Systems',
      category: 'engineering',
      duration: '4 years',
      eligibility: '10+2 with PCM, TNEA/JEE',
      description: 'TCS-sponsored program combining CS with business analytics.',
      icon: FaLaptopCode,
      color: 'blue'
    },
    {
      id: 36,
      name: 'B.Tech Agriculture',
      fullName: 'B.Tech Agricultural Engineering',
      category: 'engineering',
      duration: '4 years',
      eligibility: '10+2 with PCM/PCB, TNEA/JEE',
      description: 'Farm machinery, irrigation systems, and agricultural technology.',
      icon: FaSeedling,
      color: 'blue'
    },
    {
      id: 37,
      name: 'B.Arch',
      fullName: 'Bachelor of Architecture',
      category: 'engineering',
      duration: '5 years',
      eligibility: '10+2 with Maths, NATA Qualified',
      description: 'Design buildings and spaces with this professional architecture degree.',
      icon: FaBuilding,
      color: 'blue'
    },
    {
      id: 38,
      name: 'Polytechnic',
      fullName: 'Diploma in Engineering',
      category: 'engineering',
      duration: '3 years',
      eligibility: '10th Pass',
      description: 'Technical diploma courses in various engineering branches.',
      icon: FaCog,
      color: 'blue'
    },

    // Management Courses
    {
      id: 39,
      name: 'MBA',
      fullName: 'Master of Business Administration',
      category: 'management',
      duration: '2 years',
      eligibility: 'Any Degree, CAT/MAT/TANCET',
      description: 'Advanced management degree with Finance, Marketing, HR, Operations specializations.',
      icon: FaChartLine,
      color: 'green'
    },
    {
      id: 40,
      name: 'BBA',
      fullName: 'Bachelor of Business Administration',
      category: 'management',
      duration: '3 years',
      eligibility: '10+2 Pass',
      description: 'Undergraduate degree in business management and administration.',
      icon: FaChartLine,
      color: 'green'
    },
    {
      id: 41,
      name: 'MCA',
      fullName: 'Master of Computer Applications',
      category: 'management',
      duration: '2 years',
      eligibility: 'BCA or Any Degree with Maths',
      description: 'Advanced computer science and applications program.',
      icon: FaLaptopCode,
      color: 'green'
    },
    {
      id: 42,
      name: 'BCA',
      fullName: 'Bachelor of Computer Applications',
      category: 'management',
      duration: '3 years',
      eligibility: '10+2 Pass',
      description: 'Undergraduate computer science program with practical applications.',
      icon: FaLaptopCode,
      color: 'green'
    },
    {
      id: 43,
      name: 'CA',
      fullName: 'Chartered Accountancy',
      category: 'management',
      duration: '3-5 years',
      eligibility: '10+2 Pass / Commerce Graduate',
      description: 'Prestigious professional course in accounting, taxation, and finance.',
      icon: FaCalculator,
      color: 'green'
    },
    {
      id: 44,
      name: 'B.Com',
      fullName: 'Bachelor of Commerce',
      category: 'management',
      duration: '3 years',
      eligibility: '10+2 Pass',
      description: 'Study accounting, economics, business law, and commerce.',
      icon: FaCalculator,
      color: 'green'
    },
    {
      id: 45,
      name: 'M.Com',
      fullName: 'Master of Commerce',
      category: 'management',
      duration: '2 years',
      eligibility: 'B.Com Degree',
      description: 'Advanced studies in commerce, accounting, and financial management.',
      icon: FaCalculator,
      color: 'green'
    },

    // Law Courses
    {
      id: 46,
      name: 'BA LLB',
      fullName: 'Integrated BA LLB (Hons)',
      category: 'law',
      duration: '5 years',
      eligibility: '10+2 Pass, CLAT/LSAT',
      description: '5-year integrated law program combining Arts with Law.',
      icon: FaBalanceScale,
      color: 'purple'
    },
    {
      id: 47,
      name: 'BBA LLB',
      fullName: 'Integrated BBA LLB (Hons)',
      category: 'law',
      duration: '5 years',
      eligibility: '10+2 Pass, CLAT/LSAT',
      description: 'Integrated program combining Business Administration with Law.',
      icon: FaBalanceScale,
      color: 'purple'
    },
    {
      id: 48,
      name: 'LLB',
      fullName: 'Bachelor of Laws (3 Years)',
      category: 'law',
      duration: '3 years',
      eligibility: 'Any Bachelor\'s Degree',
      description: 'Professional law degree for graduates from any discipline.',
      icon: FaBalanceScale,
      color: 'purple'
    },
    {
      id: 49,
      name: 'LLM',
      fullName: 'Master of Laws',
      category: 'law',
      duration: '1-2 years',
      eligibility: 'LLB Degree',
      description: 'Postgraduate specialization in various branches of law.',
      icon: FaBalanceScale,
      color: 'purple'
    },

    // Education Courses
    {
      id: 50,
      name: 'B.Ed',
      fullName: 'Bachelor of Education',
      category: 'education',
      duration: '2 years',
      eligibility: 'Any Degree, TET Qualified',
      description: 'Become a qualified teacher with this professional education degree.',
      icon: FaChalkboardTeacher,
      color: 'amber'
    },
    {
      id: 51,
      name: 'M.Ed',
      fullName: 'Master of Education',
      category: 'education',
      duration: '2 years',
      eligibility: 'B.Ed Degree',
      description: 'Advanced degree in education for teaching and research.',
      icon: FaBook,
      color: 'amber'
    },
    {
      id: 52,
      name: 'D.T.Ed',
      fullName: 'Diploma in Teacher Education',
      category: 'education',
      duration: '2 years',
      eligibility: '10+2 Pass',
      description: 'Diploma course for primary school teaching.',
      icon: FaChalkboardTeacher,
      color: 'amber'
    },
    {
      id: 53,
      name: 'D.El.Ed',
      fullName: 'Diploma in Elementary Education',
      category: 'education',
      duration: '2 years',
      eligibility: '10+2 Pass',
      description: 'Prepare for teaching at elementary school level.',
      icon: FaChalkboardTeacher,
      color: 'amber'
    },

    // Arts & Science
    {
      id: 54,
      name: 'B.Sc',
      fullName: 'Bachelor of Science',
      category: 'arts',
      duration: '3 years',
      eligibility: '10+2 with Science',
      description: 'Physics, Chemistry, Mathematics, Biology, Computer Science and more.',
      icon: FaFlask,
      color: 'teal'
    },
    {
      id: 55,
      name: 'B.A.',
      fullName: 'Bachelor of Arts',
      category: 'arts',
      duration: '3 years',
      eligibility: '10+2 Pass',
      description: 'English, Tamil, History, Political Science, Economics and more.',
      icon: FaBook,
      color: 'teal'
    },
    {
      id: 56,
      name: 'M.Sc',
      fullName: 'Master of Science',
      category: 'arts',
      duration: '2 years',
      eligibility: 'B.Sc in relevant subject',
      description: 'Postgraduate science programs in various specializations.',
      icon: FaFlask,
      color: 'teal'
    },
    {
      id: 57,
      name: 'M.A.',
      fullName: 'Master of Arts',
      category: 'arts',
      duration: '2 years',
      eligibility: 'B.A. in relevant subject',
      description: 'Postgraduate arts and humanities programs.',
      icon: FaBook,
      color: 'teal'
    },

    // Agriculture
    {
      id: 58,
      name: 'B.Sc Agriculture',
      fullName: 'B.Sc (Hons) Agriculture',
      category: 'agriculture',
      duration: '4 years',
      eligibility: '10+2 with PCB/PCM',
      description: 'Study agricultural sciences, crop production, and farm management.',
      icon: FaSeedling,
      color: 'emerald'
    },
    {
      id: 59,
      name: 'B.Sc Horticulture',
      fullName: 'B.Sc Horticulture',
      category: 'agriculture',
      duration: '4 years',
      eligibility: '10+2 with PCB',
      description: 'Cultivation of fruits, vegetables, and ornamental plants.',
      icon: FaSeedling,
      color: 'emerald'
    },
    {
      id: 60,
      name: 'B.Sc Forestry',
      fullName: 'B.Sc Forestry',
      category: 'agriculture',
      duration: '4 years',
      eligibility: '10+2 with PCB',
      description: 'Forest management, conservation, and environmental science.',
      icon: FaSeedling,
      color: 'emerald'
    },
    {
      id: 61,
      name: 'B.V.Sc',
      fullName: 'Bachelor of Veterinary Science',
      category: 'agriculture',
      duration: '5.5 years',
      eligibility: '10+2 with PCB, NEET Qualified',
      description: 'Become a veterinary doctor for animal healthcare and surgery.',
      icon: FaLeaf,
      color: 'emerald'
    },
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeCategory === 'all' || course.category === activeCategory;
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.fullName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const colorClasses = {
    red: {
      bg: 'bg-red-100',
      text: 'text-red-600',
      border: 'border-red-200',
      hover: 'hover:border-red-400'
    },
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-600',
      border: 'border-blue-200',
      hover: 'hover:border-blue-400'
    },
    green: {
      bg: 'bg-green-100',
      text: 'text-green-600',
      border: 'border-green-200',
      hover: 'hover:border-green-400'
    },
    purple: {
      bg: 'bg-purple-100',
      text: 'text-purple-600',
      border: 'border-purple-200',
      hover: 'hover:border-purple-400'
    },
    amber: {
      bg: 'bg-amber-100',
      text: 'text-amber-600',
      border: 'border-amber-200',
      hover: 'hover:border-amber-400'
    },
    teal: {
      bg: 'bg-teal-100',
      text: 'text-teal-600',
      border: 'border-teal-200',
      hover: 'hover:border-teal-400'
    },
    emerald: {
      bg: 'bg-emerald-100',
      text: 'text-emerald-600',
      border: 'border-emerald-200',
      hover: 'hover:border-emerald-400'
    }
  };

  return (
    <Layout
      title="Courses"
      description="Explore 50+ courses: MBBS, BDS, B.Tech, MBA, LLB, B.Ed & more. Rasi Foundation provides expert admission guidance for Medical, Engineering, Management, Law courses in Tamil Nadu."
      keywords="MBBS course admission, engineering courses Tamil Nadu, MBA admission guidance, law courses India, B.Ed admission, NEET coaching, medical courses, polytechnic admission"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-white to-amber-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <FaGraduationCap />
              <span>Course Offerings</span>
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
              Explore Our <span className="text-green-600">Courses</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              We provide guidance and admission assistance for a comprehensive range of professional
              courses in top colleges across India.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for a course..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b sticky top-[72px] z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all duration-300 ${activeCategory === category.id
                  ? 'bg-green-600 text-white shadow-lg'
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

      {/* Courses Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {filteredCourses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className={`card p-6 border-2 ${colorClasses[course.color].border} ${colorClasses[course.color].hover} transition-all duration-300 card-hover`}
                >
                  <div className={`w-14 h-14 rounded-xl ${colorClasses[course.color].bg} ${colorClasses[course.color].text} flex items-center justify-center mb-4`}>
                    <course.icon className="text-2xl" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 mb-1">{course.name}</h3>
                  <p className={`text-sm ${colorClasses[course.color].text} font-medium mb-3`}>{course.fullName}</p>

                  <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FaClock className={colorClasses[course.color].text} />
                      <span><strong>Duration:</strong> {course.duration}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-gray-500">
                      <FaCheckCircle className={`${colorClasses[course.color].text} mt-0.5 flex-shrink-0`} />
                      <span><strong>Eligibility:</strong> {course.eligibility}</span>
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className={`inline-flex items-center gap-2 font-semibold ${colorClasses[course.color].text} hover:underline`}
                  >
                    Enquire Now <FaArrowRight />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <FaSearch className="text-6xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-600 mb-2">No courses found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>


      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Rasi Foundation for Your Education?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: FaUsers, title: 'Expert Counselors', desc: 'Experienced team to guide you through every step' },
              { icon: FaGraduationCap, title: '100+ Partner Colleges', desc: 'Wide network of prestigious institutions' },
              { icon: FaCheckCircle, title: 'Complete Support', desc: 'From course selection to admission' },
            ].map((item, index) => (
              <div key={index} className="text-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                <item.icon className="text-4xl mx-auto mb-4 text-amber-300" />
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-white/80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Need Help Choosing the Right Course?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Our expert counselors are here to help you make the best decision for your career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary inline-flex items-center justify-center gap-2">
                Get Free Counseling <FaArrowRight />
              </Link>
              <a href="tel:+919789446100" className="btn-secondary inline-flex items-center justify-center gap-2">
                <FaPhone /> Call Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
