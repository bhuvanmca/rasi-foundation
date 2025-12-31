import { useState, useEffect } from 'react';
import AdminLayout from '@/frontend/components/AdminLayout';
import {
    FaSearch,
    FaFilter,
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
    FaClock,
    FaHourglass,
    FaExclamationTriangle,
    FaDownload,
    FaAtom,
    FaFlask,
    FaCalculator,
    FaLeaf,
    FaDna
} from 'react-icons/fa';

export default function AdminScholarshipResults() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [statistics, setStatistics] = useState(null);
    const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
    const [selectedResult, setSelectedResult] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchResults();
    }, [pagination.page, searchQuery, statusFilter]);

    const fetchResults = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            const params = new URLSearchParams({
                page: pagination.page,
                limit: 20,
                search: searchQuery,
                status: statusFilter,
            });

            const response = await fetch(`/api/admin/scholarship-results?${params}`, {
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
        if (!confirm('Are you sure you want to delete this test result?')) return;

        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`/api/admin/scholarship-results?id=${id}`, {
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

    const getStatusBadge = (status) => {
        const statusStyles = {
            completed: 'bg-green-100 text-green-700',
            in_progress: 'bg-blue-100 text-blue-700',
            pending: 'bg-yellow-100 text-yellow-700',
            expired: 'bg-red-100 text-red-700',
            disqualified: 'bg-gray-100 text-gray-700',
        };

        const statusLabels = {
            completed: 'Completed',
            in_progress: 'In Progress',
            pending: 'Pending',
            expired: 'Expired',
            disqualified: 'Disqualified',
        };

        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-700'}`}>
                {statusLabels[status] || status}
            </span>
        );
    };

    const getPercentage = (score, total) => {
        if (!total) return 0;
        return Math.round((score / total) * 100);
    };

    const formatDate = (date) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatDuration = (startTime, endTime) => {
        if (!startTime || !endTime) return '-';
        const start = new Date(startTime);
        const end = new Date(endTime);
        const diffMs = end - start;
        const minutes = Math.floor(diffMs / 60000);
        const seconds = Math.floor((diffMs % 60000) / 1000);
        return `${minutes}m ${seconds}s`;
    };

    const subjectIcons = {
        'Physics': FaAtom,
        'Chemistry': FaFlask,
        'Mathematics': FaCalculator,
        'Botany': FaLeaf,
        'Zoology': FaDna,
        'Biology': FaDna,
    };

    const exportToCSV = () => {
        if (!results.length) return;

        const headers = [
            'Registration Token',
            'Student Name',
            'Email',
            'Phone',
            'Subjects',
            'Score',
            'Total Questions',
            'Percentage',
            'Status',
            'Date'
        ];

        const rows = results.map(r => [
            r.registrationToken || '',
            r.studentId?.name || '',
            r.studentId?.studentEmail || '',
            r.studentId?.studentMobile || '',
            r.subjects?.join(', ') || '',
            r.score || 0,
            r.totalQuestions || 0,
            getPercentage(r.score, r.totalQuestions),
            r.status || '',
            formatDate(r.createdAt),
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `scholarship-results-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    return (
        <AdminLayout title="Scholarship Test Results">
            {/* Statistics Cards */}
            {statistics && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                <FaUsers className="text-indigo-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800">{statistics.total}</p>
                                <p className="text-xs text-gray-500">Total Tests</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <FaCheckCircle className="text-green-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800">{statistics.completed}</p>
                                <p className="text-xs text-gray-500">Completed</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <FaClock className="text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800">{statistics.inProgress}</p>
                                <p className="text-xs text-gray-500">In Progress</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <FaHourglass className="text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800">{statistics.pending}</p>
                                <p className="text-xs text-gray-500">Pending</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <FaPercent className="text-purple-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800">{statistics.avgScore}%</p>
                                <p className="text-xs text-gray-500">Avg Score</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                                <FaTrophy className="text-amber-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800">{statistics.highestScore}</p>
                                <p className="text-xs text-gray-500">Highest Score</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="relative flex-1">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, email, phone, or token..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setPagination(prev => ({ ...prev, page: 1 }));
                            }}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="relative">
                        <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <select
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(e.target.value);
                                setPagination(prev => ({ ...prev, page: 1 }));
                            }}
                            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white"
                        >
                            <option value="all">All Status</option>
                            <option value="completed">Completed</option>
                            <option value="in_progress">In Progress</option>
                            <option value="pending">Pending</option>
                            <option value="expired">Expired</option>
                        </select>
                    </div>

                    {/* Export Button */}
                    <button
                        onClick={exportToCSV}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        <FaDownload />
                        Export CSV
                    </button>
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
                        <FaTrophy className="text-5xl text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">No scholarship test results found</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Student</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Token</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Subjects</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Score</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Date</th>
                                    <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {results.map((result) => {
                                    const percentage = getPercentage(result.score, result.totalQuestions);
                                    return (
                                        <tr key={result._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-medium text-gray-800">
                                                        {result.studentId?.name || 'Unknown Student'}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {result.studentId?.studentEmail || '-'}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">
                                                    {result.registrationToken}
                                                </code>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-1">
                                                    {result.subjects?.map(subject => {
                                                        const Icon = subjectIcons[subject] || FaAtom;
                                                        return (
                                                            <span
                                                                key={subject}
                                                                className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs"
                                                                title={subject}
                                                            >
                                                                <Icon className="text-xs" />
                                                            </span>
                                                        );
                                                    })}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {result.status === 'completed' ? (
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                            <div
                                                                className={`h-full ${percentage >= 60 ? 'bg-green-500' :
                                                                        percentage >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                                                                    }`}
                                                                style={{ width: `${percentage}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="font-medium text-gray-800">
                                                            {result.score}/{result.totalQuestions}
                                                        </span>
                                                        <span className="text-sm text-gray-500">
                                                            ({percentage}%)
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400">-</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {getStatusBadge(result.status)}
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
                                    );
                                })}
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
                    <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white z-10">
                            <h3 className="text-xl font-semibold text-gray-800">Test Result Details</h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                                <FaTimes className="text-xl" />
                            </button>
                        </div>

                        <div className="p-6">
                            {/* Status Banner */}
                            <div className={`p-4 rounded-xl mb-6 ${selectedResult.status === 'completed' ? 'bg-green-50' :
                                    selectedResult.status === 'in_progress' ? 'bg-blue-50' :
                                        selectedResult.status === 'expired' ? 'bg-red-50' : 'bg-yellow-50'
                                }`}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Status</p>
                                        <p className="text-lg font-bold capitalize">{selectedResult.status?.replace('_', ' ')}</p>
                                    </div>
                                    {selectedResult.status === 'completed' && (
                                        <div className="text-right">
                                            <p className="text-3xl font-bold text-green-600">
                                                {getPercentage(selectedResult.score, selectedResult.totalQuestions)}%
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {selectedResult.score}/{selectedResult.totalQuestions} correct
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Student Info */}
                            <div className="grid md:grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label className="text-sm text-gray-500">Student Name</label>
                                    <p className="font-medium text-gray-800">
                                        {selectedResult.studentId?.name || '-'}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500">Email</label>
                                    <p className="font-medium text-gray-800">
                                        {selectedResult.studentId?.studentEmail || '-'}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500">Phone</label>
                                    <p className="font-medium text-gray-800">
                                        {selectedResult.studentId?.studentMobile || '-'}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500">Registration Token</label>
                                    <p className="font-mono text-sm bg-gray-100 px-2 py-1 rounded inline-block">
                                        {selectedResult.registrationToken}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500">Target Course</label>
                                    <p className="font-medium text-gray-800">
                                        {selectedResult.studentId?.admissionCourse || '-'}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500">Target College</label>
                                    <p className="font-medium text-gray-800">
                                        {selectedResult.studentId?.collegeName || '-'}
                                    </p>
                                </div>
                            </div>

                            {/* Subjects & Scores */}
                            <div className="mb-6">
                                <h4 className="font-semibold text-gray-800 mb-3">Subjects & Scores</h4>
                                <div className="grid grid-cols-3 gap-4">
                                    {selectedResult.subjects?.map(subject => {
                                        const Icon = subjectIcons[subject] || FaAtom;
                                        const subjectScore = selectedResult.subjectWiseScore?.[subject] || 0;
                                        return (
                                            <div key={subject} className="bg-gray-50 rounded-xl p-4 text-center">
                                                <Icon className="text-2xl text-indigo-600 mx-auto mb-2" />
                                                <p className="font-medium text-gray-800">{subject}</p>
                                                <p className="text-2xl font-bold text-gray-800 mt-1">{subjectScore}</p>
                                                <p className="text-xs text-gray-500">correct</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Timing Info */}
                            <div className="grid md:grid-cols-3 gap-4 mb-6">
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <p className="text-sm text-gray-500">Started At</p>
                                    <p className="font-medium text-gray-800">{formatDate(selectedResult.startTime)}</p>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <p className="text-sm text-gray-500">Ended At</p>
                                    <p className="font-medium text-gray-800">{formatDate(selectedResult.endTime)}</p>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <p className="text-sm text-gray-500">Duration</p>
                                    <p className="font-medium text-gray-800">
                                        {formatDuration(selectedResult.startTime, selectedResult.endTime)}
                                    </p>
                                </div>
                            </div>

                            {/* Test Summary */}
                            {selectedResult.status === 'completed' && (
                                <div className="bg-indigo-50 rounded-xl p-6 mb-6">
                                    <h4 className="font-semibold text-gray-800 mb-4">Test Summary</h4>
                                    <div className="grid grid-cols-4 gap-4 text-center">
                                        <div>
                                            <p className="text-2xl font-bold text-gray-800">{selectedResult.totalQuestions}</p>
                                            <p className="text-sm text-gray-500">Total</p>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-green-600">{selectedResult.correctAnswers}</p>
                                            <p className="text-sm text-gray-500">Correct</p>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-red-600">
                                                {selectedResult.attemptedQuestions - selectedResult.correctAnswers}
                                            </p>
                                            <p className="text-sm text-gray-500">Wrong</p>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-gray-600">
                                                {selectedResult.totalQuestions - selectedResult.attemptedQuestions}
                                            </p>
                                            <p className="text-sm text-gray-500">Unanswered</p>
                                        </div>
                                    </div>
                                </div>
                            )}

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
