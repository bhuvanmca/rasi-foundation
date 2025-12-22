import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import Link from 'next/link';
import { 
  FaEnvelope, 
  FaUserGraduate, 
  FaQuestionCircle,
  FaUniversity,
  FaArrowRight,
  FaSpinner,
  FaClock,
  FaCheckCircle,
  FaExclamationCircle
} from 'react-icons/fa';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentItems, setRecentItems] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
        setRecentItems(data.recent);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Contacts',
      value: stats?.contacts?.total || 0,
      new: stats?.contacts?.new || 0,
      icon: FaEnvelope,
      color: 'blue',
      href: '/admin/contacts'
    },
    {
      title: 'Total Enquiries',
      value: stats?.enquiries?.total || 0,
      new: stats?.enquiries?.pending || 0,
      icon: FaUserGraduate,
      color: 'green',
      href: '/admin/enquiries'
    },
    {
      title: 'Total Questions',
      value: stats?.questions?.total || 0,
      new: stats?.questions?.unanswered || 0,
      icon: FaQuestionCircle,
      color: 'purple',
      href: '/admin/questions'
    },
    {
      title: 'Partner Colleges',
      value: stats?.colleges?.total || 0,
      new: stats?.colleges?.active || 0,
      newLabel: 'active',
      icon: FaUniversity,
      color: 'orange',
      href: '/admin/colleges'
    }
  ];

  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      icon: 'bg-blue-500',
      text: 'text-blue-600',
      badge: 'bg-blue-100 text-blue-700'
    },
    green: {
      bg: 'bg-green-50',
      icon: 'bg-green-500',
      text: 'text-green-600',
      badge: 'bg-green-100 text-green-700'
    },
    purple: {
      bg: 'bg-purple-50',
      icon: 'bg-purple-500',
      text: 'text-purple-600',
      badge: 'bg-purple-100 text-purple-700'
    },
    orange: {
      bg: 'bg-orange-50',
      icon: 'bg-orange-500',
      text: 'text-orange-600',
      badge: 'bg-orange-100 text-orange-700'
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Dashboard">
        <div className="flex items-center justify-center h-64">
          <FaSpinner className="animate-spin text-4xl text-red-600" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Dashboard">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-6 mb-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome to Admin Dashboard</h2>
        <p className="text-red-100">Manage contacts, enquiries, questions and colleges.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <div className={`${colorClasses[stat.color].bg} rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                  {stat.new > 0 && (
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full mt-2 ${colorClasses[stat.color].badge}`}>
                      <FaCheckCircle />
                      {stat.new} {stat.newLabel || 'new'}
                    </span>
                  )}
                </div>
                <div className={`w-12 h-12 ${colorClasses[stat.color].icon} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="text-white text-xl" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Contacts */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">Recent Contacts</h3>
            <Link href="/admin/contacts" className="text-red-600 text-sm hover:underline flex items-center gap-1">
              View all <FaArrowRight className="text-xs" />
            </Link>
          </div>
          <div className="divide-y">
            {recentItems?.contacts?.length > 0 ? (
              recentItems.contacts.map((contact) => (
                <div key={contact._id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-800">{contact.name}</p>
                      <p className="text-sm text-gray-500">{contact.subject}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      contact.status === 'new' ? 'bg-red-100 text-red-700' :
                      contact.status === 'read' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {contact.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                    <FaClock /> {new Date(contact.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="p-4 text-gray-500 text-center">No recent contacts</p>
            )}
          </div>
        </div>

        {/* Recent Enquiries */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">Recent Enquiries</h3>
            <Link href="/admin/enquiries" className="text-red-600 text-sm hover:underline flex items-center gap-1">
              View all <FaArrowRight className="text-xs" />
            </Link>
          </div>
          <div className="divide-y">
            {recentItems?.enquiries?.length > 0 ? (
              recentItems.enquiries.map((enquiry) => (
                <div key={enquiry._id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-800">{enquiry.name}</p>
                      <p className="text-sm text-gray-500">{enquiry.course}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      enquiry.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      enquiry.status === 'contacted' ? 'bg-blue-100 text-blue-700' :
                      enquiry.status === 'enrolled' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {enquiry.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                    <FaClock /> {new Date(enquiry.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="p-4 text-gray-500 text-center">No recent enquiries</p>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
