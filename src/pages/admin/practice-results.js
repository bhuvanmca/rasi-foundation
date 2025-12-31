import { useState, useEffect } from 'react';
import AdminLayout from '@/frontend/components/AdminLayout';
import {
    FaSearch,
    FaChartBar,
    FaTrash,
    FaSpinner,
    FaTrophy,
    FaUsers,
    FaPercent,
    FaCalendarAlt,
    FaEye,
    FaTimes,
    FaCheckCircle,
    FaTimesCircle,
    FaArrowUp,
    FaArrowDown
} from 'react-icons/fa';

export default function AdminPracticeResults() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statistics, setStatistics] = useState(null);
    const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
    const [selectedResult, setSelectedResult] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [viewingDetails, setViewingDetails] = useState(null);

    useEffect(() => {
        fetchResults();
    }, [pagination.page, searchQuery]);

    const fetchResults = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            const params = new URLSearchParams({
                page: pagination.page,
                limit: 20,
                search: searchQuery,
            });

            const response = await fetch(`/api/admin/practice-results?${params}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setResults(data.results);
                setPagination(data.pagination);
                setStatistics(data.statistics);
            }
        } catch (error) {
            console.error('Failed to fetch results:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteResult = async (id) => {
        if (!confirm('Are you sure you want to delete this result?')) return;

        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`/api/admin/practice-results?id=${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.ok) {
                setResults(results.filter(r => r._id !== id));
                setShowModal(false);
            }
        } catch (error) {
            console.error('Failed to delete result:', error);
        }
    };

    const openDetails = (result) => {
        setSelectedResult(result);
        setShowModal(true);
    };

    const getGradeColor = (percentage) => {
        if (percentage >= 80) return 'text-green-600 bg-green-100';
        if (percentage >= 60) return 'text-blue-600 bg-blue-100';
        if (percentage >= 40) return 'text-yellow-600 bg-yellow-100';
        return 'text-red-600 bg-red-100';
    };

    const getGrade = (percentage) => {
        if (percentage >= 90) return 'A+';
        if (percentage >= 80) return 'A';
        if (percentage >= 70) return 'B+';
        if (percentage >= 60) return 'B';
        if (percentage >= 50) return 'C';
        if (percentage >= 40) return 'D';
        return 'F';
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    };

    return (
        <AdminLayout title="Practice Test Results">
            {/* Statistics Cards */}
            {statistics && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Total Tests Taken</p>
                                <p className="text-2xl font-bold text-gray-800 mt-1">{statistics.total}</p>
                            </div>
                            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                                <FaUsers className="text-indigo-600 text-xl" />
                            </div>
                        </div>
                        <div className="mt-3 text-sm text-green-600 flex items-center gap-1">
                            <FaArrowUp />
                            <span>{statistics.last7Days.count} in last 7 days</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Average Score</p>
                                <p className="text-2xl font-bold text-gray-800 mt-1">{statistics.avgPercentage}%</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <FaPercent className="text-green-600 text-xl" />
                            </div>
                        </div>
                        <div className="mt-3 text-sm text-gray-500">
                            Last 7 days avg: {statistics.last7Days.avgPercentage}%
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Highest Score</p>
                                <p className="text-2xl font-bold text-gray-800 mt-1">{statistics.highestPercentage}%</p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <FaTrophy className="text-yellow-600 text-xl" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Lowest Score</p>
                                <p className="text-2xl font-bold text-gray-800 mt-1">{statistics.lowestPercentage}%</p>
                            </div>
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                <FaArrowDown className="text-red-600 text-xl" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Search Bar */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setPagination(prev => ({ ...prev, page: 1 }));
                        }}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Results Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <FaSpinner className="animate-spin text-4xl text-indigo-600" />
                    </div>
                ) : results.length === 0 ? (
                    <div className="text-center py-12">
                        <FaChartBar className="text-5xl text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">No practice test results found</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Student</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Score</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Correct/Wrong</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Grade</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Time</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Date</th>
                                    <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {results.map((result) => (
                                    <tr key={result._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-medium text-gray-800">{result.studentName}</p>
                                                <p className="text-sm text-gray-500">{result.email}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full ${result.percentage >= 60 ? 'bg-green-500' :
                                                                result.percentage >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                                                            }`}
                                                        style={{ width: `${result.percentage}%` }}
                                                    ></div>
                                                </div>
                                                <span className="font-medium text-gray-800">{result.percentage}%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <span className="flex items-center gap-1 text-green-600">
                                                    <FaCheckCircle />
                                                    {result.correctAnswers}
                                                </span>
                                                <span className="flex items-center gap-1 text-red-600">
                                                    <FaTimesCircle />
                                                    {result.wrongAnswers}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(result.percentage)}`}>
                                                {getGrade(result.percentage)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {formatTime(result.timeTaken)}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 text-sm">
                                            {formatDate(result.createdAt)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => openDetails(result)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="View Details"
                                                >
                                                    <FaEye />
                                                </button>
                                                <button
                                                    onClick={() => deleteResult(result._id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                {pagination.pages > 1 && (
                    <div className="p-4 border-t flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            Showing {((pagination.page - 1) * 20) + 1} - {Math.min(pagination.page * 20, pagination.total)} of {pagination.total}
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                                disabled={pagination.page === 1}
                                className="px-4 py-2 border rounded-lg text-sm disabled:opacity-50 hover:bg-gray-50"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                                disabled={pagination.page === pagination.pages}
                                className="px-4 py-2 border rounded-lg text-sm disabled:opacity-50 hover:bg-gray-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            {showModal && selectedResult && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white">
                            <h3 className="text-xl font-semibold text-gray-800">Result Details</h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                                <FaTimes className="text-xl" />
                            </button>
                        </div>

                        <div className="p-6">
                            {/* Student Info */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label className="text-sm text-gray-500">Student Name</label>
                                    <p className="font-medium text-gray-800">{selectedResult.studentName}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500">Email</label>
                                    <p className="font-medium text-gray-800">{selectedResult.email}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500">Phone</label>
                                    <p className="font-medium text-gray-800">{selectedResult.phone || '-'}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500">Date</label>
                                    <p className="font-medium text-gray-800">{formatDate(selectedResult.createdAt)}</p>
                                </div>
                            </div>

                            {/* Score Summary */}
                            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-6">
                                <div className="grid grid-cols-4 gap-4 text-center">
                                    <div>
                                        <p className="text-3xl font-bold text-indigo-600">{selectedResult.percentage}%</p>
                                        <p className="text-sm text-gray-600">Score</p>
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold text-green-600">{selectedResult.correctAnswers}</p>
                                        <p className="text-sm text-gray-600">Correct</p>
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold text-red-600">{selectedResult.wrongAnswers}</p>
                                        <p className="text-sm text-gray-600">Wrong</p>
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold text-gray-600">{selectedResult.unanswered}</p>
                                        <p className="text-sm text-gray-600">Unanswered</p>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-4">
                                <button
                                    onClick={() => deleteResult(selectedResult._id)}
                                    className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 flex items-center justify-center gap-2"
                                >
                                    <FaTrash />
                                    Delete Result
                                </button>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:border-gray-400"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
