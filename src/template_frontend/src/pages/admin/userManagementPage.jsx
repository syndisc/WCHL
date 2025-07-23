import React, { useState, useEffect } from 'react';
import { PlusCircle, Search, User, Mail, Trash2, Pencil, X, Filter, AlertCircle, CheckCircle, Users, UserCheck, Shield, GraduationCap, Star } from 'lucide-react';

const Button = ({ children, className, variant, onClick, disabled, type = "button" }) => {
    let baseClasses = "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none shadow-sm";
    let variantClasses = "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-md"; 
    
    if (variant === "outline") {
        variantClasses = "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400";
    } else if (variant === "ghost") {
        variantClasses = "hover:bg-gray-100 text-gray-700 hover:text-gray-900";
    } else if (variant === "destructive") {
        variantClasses = "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 hover:shadow-md";
    }
    
    return (
        <button type={type} className={`${baseClasses} ${variantClasses} ${className} px-4 py-2`} onClick={onClick} disabled={disabled}>
            {children}
        </button>
        );
    };

const Input = ({ type = "text", placeholder, className, value, onChange, label, required }) => (
    <div className="space-y-2">
        {label && <label className="text-sm font-semibold text-gray-700">{label}</label>}
        <input
            type={type}
            placeholder={placeholder}
            className={`flex h-11 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm transition-all duration-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            value={value}
            onChange={onChange}
            required={required}
        />
    </div>
);

const Select = ({ label, className, value, onChange, options, required }) => (
    <div className="space-y-2">
        {label && <label className="text-sm font-semibold text-gray-700">{label}</label>}
        <select
            className={`flex h-11 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            value={value}
            onChange={onChange}
            required={required}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
);

const Modal = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative transform transition-all duration-300 scale-100">
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                    <Button variant="ghost" onClick={onClose} className="rounded-full p-2 bg-white hover:bg-gray-100">
                        <X className="h-5 w-5" />
                    </Button>
                </div>
                <div className="p-6 max-h-[80vh] overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

// Dummy data
const dummyUsers = [
    {
        user_id: "USR001",
        first_name: "Sarah",
        last_name: "Johnson",
        email: "sarah.johnson@university.edu",
        role: "admin",
        created_date: Date.now() * 1000000 - (30 * 24 * 60 * 60 * 1000 * 1000000),
        last_login: Date.now() * 1000000 - (2 * 24 * 60 * 60 * 1000 * 1000000),
        status: "active"
    },
    {
        user_id: "USR002",
        first_name: "Michael",
        last_name: "Chen",
        email: "m.chen@university.edu",
        role: "instructor",
        created_date: Date.now() * 1000000 - (25 * 24 * 60 * 60 * 1000 * 1000000),
        last_login: Date.now() * 1000000 - (1 * 24 * 60 * 60 * 1000 * 1000000),
        status: "active"
    },
    {
        user_id: "USR003",
        first_name: "Emily",
        last_name: "Rodriguez",
        email: "emily.rodriguez@student.edu",
        role: "student",
        created_date: Date.now() * 1000000 - (20 * 24 * 60 * 60 * 1000 * 1000000),
        last_login: Date.now() * 1000000 - (3 * 60 * 60 * 1000 * 1000000),
        status: "active"
    },
    {
        user_id: "USR004",
        first_name: "David",
        last_name: "Thompson",
        email: "d.thompson@university.edu",
        role: "instructor",
        created_date: Date.now() * 1000000 - (18 * 24 * 60 * 60 * 1000 * 1000000),
        last_login: Date.now() * 1000000 - (5 * 24 * 60 * 60 * 1000 * 1000000),
        status: "active"
    },
    {
        user_id: "USR005",
        first_name: "Jessica",
        last_name: "Williams",
        email: "j.williams@student.edu",
        role: "student",
        created_date: Date.now() * 1000000 - (15 * 24 * 60 * 60 * 1000 * 1000000),
        last_login: Date.now() * 1000000 - (6 * 60 * 60 * 1000 * 1000000),
        status: "active"
    },
    {
        user_id: "USR006",
        first_name: "Robert",
        last_name: "Garcia",
        email: "robert.garcia@student.edu",
        role: "student",
        created_date: Date.now() * 1000000 - (12 * 24 * 60 * 60 * 1000 * 1000000),
        last_login: Date.now() * 1000000 - (1 * 60 * 60 * 1000 * 1000000),
        status: "active"
    },
    {
        user_id: "USR007",
        first_name: "Amanda",
        last_name: "Davis",
        email: "amanda.davis@university.edu",
        role: "admin",
        created_date: Date.now() * 1000000 - (10 * 24 * 60 * 60 * 1000 * 1000000),
        last_login: Date.now() * 1000000 - (4 * 24 * 60 * 60 * 1000 * 1000000),
        status: "inactive"
    },
    {
        user_id: "USR008",
        first_name: "James",
        last_name: "Martinez",
        email: "j.martinez@student.edu",
        role: "student",
        created_date: Date.now() * 1000000 - (8 * 24 * 60 * 60 * 1000 * 1000000),
        last_login: Date.now() * 1000000 - (2 * 60 * 60 * 1000 * 1000000),
        status: "active"
    },
    {
        user_id: "USR009",
        first_name: "Lisa",
        last_name: "Anderson",
        email: "lisa.anderson@university.edu",
        role: "instructor",
        created_date: Date.now() * 1000000 - (5 * 24 * 60 * 60 * 1000 * 1000000),
        last_login: Date.now() * 1000000 - (30 * 60 * 1000 * 1000000),
        status: "active"
    },
    {
        user_id: "USR010",
        first_name: "Kevin",
        last_name: "Brown",
        email: "k.brown@student.edu",
        role: "student",
        created_date: Date.now() * 1000000 - (3 * 24 * 60 * 60 * 1000 * 1000000),
        last_login: Date.now() * 1000000 - (15 * 60 * 1000 * 1000000),
        status: "active"
    }
];

export default function UserManagementPage() {
    const [users, setUsers] = useState(dummyUsers);
    const [filteredUsers, setFilteredUsers] = useState(dummyUsers);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Form state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: 'student',
        password: ''
    });
    
    // Filter state
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('');

    const roles = [
        { value: '', label: 'All Roles' },
        { value: 'student', label: 'Student' },
        { value: 'instructor', label: 'Instructor' },
        { value: 'admin', label: 'Admin' },
    ];

    const roleOptions = [
        { value: 'student', label: 'Student' },
        { value: 'instructor', label: 'Instructor' },
        { value: 'admin', label: 'Admin' },
    ];

    useEffect(() => {
        filterUsers();
    }, [users, searchTerm, filterRole]);

    const filterUsers = () => {
        let filtered = [...users];

        if (searchTerm) {
            filtered = filtered.filter(user =>
                `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.user_id.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filterRole) {
            filtered = filtered.filter(user => user.role === filterRole);
        }

        setFilteredUsers(filtered);
    };

    const handleAddUserClick = () => {
        setEditingUser(null);
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            role: 'student',
            password: ''
        });
        setIsModalOpen(true);
        setErrorMessage('');
        setSuccessMessage('');
    };

    const handleEditUserClick = (user) => {
        setEditingUser(user);
        setFormData({
            firstName: user.first_name || '',
            lastName: user.last_name || '',
            email: user.email || '',
            role: user.role || 'student',
            password: ''
        });
        setIsModalOpen(true);
        setErrorMessage('');
        setSuccessMessage('');
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingUser(null);
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            role: 'student',
            password: ''
        });
        setErrorMessage('');
        setSuccessMessage('');
        setIsSubmitting(false);
    };

    const handleSubmitUser = async (e) => {
        e.preventDefault();

        if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
            setErrorMessage('First name, last name, and email are required.');
            return;
        }

        if (!editingUser && !formData.password.trim()) {
            setErrorMessage('Password is required for new users.');
            return;
        }

        setIsSubmitting(true);
        setErrorMessage('');

        // Simulate API call
        setTimeout(() => {
            if (editingUser) {
                // Update existing user
                const updatedUsers = users.map(user =>
                    user.user_id === editingUser.user_id
                        ? {
                            ...user,
                            first_name: formData.firstName,
                            last_name: formData.lastName,
                            email: formData.email,
                            role: formData.role
                        }
                        : user
                );
                setUsers(updatedUsers);
                setSuccessMessage('User updated successfully!');
            } else {
                // Add new user
                const newUser = {
                    user_id: `USR${String(users.length + 1).padStart(3, '0')}`,
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    email: formData.email,
                    role: formData.role,
                    created_date: Date.now() * 1000000,
                    last_login: null,
                    status: 'active'
                };
                setUsers([...users, newUser]);
                setSuccessMessage('User created successfully!');
            }
            
            setIsSubmitting(false);
            closeModal();
            
            setTimeout(() => setSuccessMessage(''), 5000);
        }, 1500);
    };

    const handleDeleteUser = (userId) => {
        if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            return;
        }

        const updatedUsers = users.filter(user => user.user_id !== userId);
        setUsers(updatedUsers);
        setSuccessMessage('User deleted successfully!');
        setTimeout(() => setSuccessMessage(''), 5000);
    };

    const handleFormChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const getRoleBadgeColor = (role) => {
        switch (role) {
            case 'admin':
                return 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border border-purple-200';
            case 'instructor':
                return 'bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 border border-emerald-200';
            case 'student':
                return 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-200';
            default:
                return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-200';
        }
    };

    const getRoleIcon = (role) => {
        switch (role) {
            case 'admin':
                return <Shield className="h-4 w-4" />;
            case 'instructor':
                return <GraduationCap className="h-4 w-4" />;
            case 'student':
                return <User className="h-4 w-4" />;
            default:
                return <User className="h-4 w-4" />;
        }
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return 'Never';
        return new Date(timestamp / 1000000).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatLastLogin = (timestamp) => {
        if (!timestamp) return 'Never';
        const diff = Date.now() - (timestamp / 1000000);
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    };

    const getStatusBadge = (status) => {
        return status === 'active' 
            ? <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>
            : <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Inactive</span>;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-6 lg:space-y-0">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                User Management
                            </h1>
                            <p className="text-gray-600 text-lg">Manage platform users and their roles efficiently</p>
                        </div>
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
                                <Users className="h-4 w-4" />
                                <span className="font-medium">{filteredUsers.length} of {users.length} users</span>
                            </div>
                            <Button onClick={handleAddUserClick} className="px-6 py-3">
                                <PlusCircle className="h-5 w-5 mr-2" />
                                Add User
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Success/Error Messages */}
                {successMessage && (
                    <div className="flex items-center space-x-3 text-green-700 bg-green-50 border border-green-200 p-4 rounded-xl mb-6 shadow-sm">
                        <CheckCircle className="h-5 w-5 flex-shrink-0" />
                        <span className="font-medium">{successMessage}</span>
                    </div>
                )}

                {errorMessage && (
                    <div className="flex items-center space-x-3 text-red-700 bg-red-50 border border-red-200 p-4 rounded-xl mb-6 shadow-sm">
                        <AlertCircle className="h-5 w-5 flex-shrink-0" />
                        <span className="font-medium">{errorMessage}</span>
                    </div>
                )}

                {/* Search and Filter Section */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
                    <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search by name, email, or user ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-12 w-full"
                            />
                        </div>
                        <div className="w-full lg:w-48">
                            <Select
                                value={filterRole}
                                onChange={(e) => setFilterRole(e.target.value)}
                                options={roles}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                        User Details
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                        Role & Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                        Activity
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-16 text-center">
                                            <div className="flex flex-col items-center space-y-4">
                                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                                    <Users className="h-8 w-8 text-gray-400" />
                                                </div>
                                                <div className="space-y-2">
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        {searchTerm || filterRole ? 'No users match your filters' : 'No users found'}
                                                    </h3>
                                                    <p className="text-gray-600">
                                                        {searchTerm || filterRole 
                                                            ? 'Try adjusting your search or filter criteria' 
                                                            : 'Add your first user to get started'}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((user) => (
                                        <tr key={user.user_id} className="hover:bg-gray-50 transition-colors duration-200">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                                                        {user.first_name[0]}{user.last_name[0]}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-semibold text-gray-900">
                                                            {user.first_name} {user.last_name}
                                                        </div>
                                                        <div className="text-sm text-gray-600">{user.email}</div>
                                                        <div className="text-xs text-gray-400">ID: {user.user_id}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-2">
                                                    <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadgeColor(user.role)}`}>
                                                        {getRoleIcon(user.role)}
                                                        <span>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
                                                    </span>
                                                    {getStatusBadge(user.status)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900">
                                                    <div>Joined: {formatDate(user.created_date)}</div>
                                                    <div className="text-gray-600">Last login: {formatLastLogin(user.last_login)}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <Button
                                                        variant="ghost"
                                                        onClick={() => handleEditUserClick(user)}
                                                        className="text-blue-600 hover:text-blue-800 bg-white hover:bg-blue-50 p-2 rounded-lg"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        onClick={() => handleDeleteUser(user.user_id)}
                                                        className="text-red-600 hover:text-red-800 bg-white hover:bg-red-50 p-2 rounded-lg"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Summary Stats */}
                {users.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200 shadow-lg">
                            <div className="flex items-center space-x-3">
                                <User className="h-8 w-8 text-blue-600" />
                                <div>
                                    <div className="text-2xl font-bold text-blue-700">
                                        {users.filter(u => u.role === 'student').length}
                                    </div>
                                    <div className="text-sm font-medium text-blue-600">Students</div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-2xl border border-emerald-200 shadow-lg">
                            <div className="flex items-center space-x-3">
                                <GraduationCap className="h-8 w-8 text-emerald-600" />
                                <div>
                                    <div className="text-2xl font-bold text-emerald-700">
                                        {users.filter(u => u.role === 'instructor').length}
                                    </div>
                                    <div className="text-sm font-medium text-emerald-600">Instructors</div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200 shadow-lg">
                            <div className="flex items-center space-x-3">
                                <Shield className="h-8 w-8 text-purple-600" />
                                <div>
                                    <div className="text-2xl font-bold text-purple-700">
                                        {users.filter(u => u.role === 'admin').length}
                                    </div>
                                    <div className="text-sm font-medium text-purple-600">Admins</div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl border border-gray-200 shadow-lg">
                            <div className="flex items-center space-x-3">
                                <UserCheck className="h-8 w-8 text-gray-600" />
                                <div>
                                    <div className="text-2xl font-bold text-gray-700">
                                        {users.filter(u => u.status === 'active').length}
                                    </div>
                                    <div className="text-sm font-medium text-gray-600">Active Users</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Add/Edit User Modal */}
            <Modal isOpen={isModalOpen} onClose={closeModal} title={editingUser ? 'Edit User' : 'Add New User'}>
                <form onSubmit={handleSubmitUser} className="space-y-6 ">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="First Name"
                            placeholder="e.g., Jane"
                            value={formData.firstName}
                            onChange={(e) => handleFormChange('firstName', e.target.value)}
                            required
                        />
                        <Input
                            label="Last Name"
                            placeholder="e.g., Doe"
                            value={formData.lastName}
                            onChange={(e) => handleFormChange('lastName', e.target.value)}
                            required
                        />
                    </div>
                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="e.g., jane.doe@university.edu"
                        value={formData.email}
                        onChange={(e) => handleFormChange('email', e.target.value)}
                        required
                    />
                    <Input
                        label={editingUser ? "New Password (leave blank to keep current)" : "Password"}
                        type="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={(e) => handleFormChange('password', e.target.value)}
                        required={!editingUser}
                    />
                    <Select
                        label="Role"
                        value={formData.role}
                        onChange={(e) => handleFormChange('role', e.target.value)}
                        options={roleOptions}
                        required
                    />
                    
                    {/* Error Message in Modal */}
                    {errorMessage && (
                        <div className="flex items-center space-x-2 text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg">
                            <AlertCircle className="h-4 w-4 flex-shrink-0" />
                            <span className="text-sm">{errorMessage}</span>
                        </div>
                    )}
                    
                    <div className="flex justify-end space-x-3 pt-6 border-t border-gray-100">
                        <Button variant="outline" onClick={closeModal} disabled={isSubmitting} className="px-6">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting} className="px-6">
                            {isSubmitting 
                                ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>{editingUser ? 'Saving...' : 'Creating...'}</span>
                                    </div>
                                ) 
                                : (editingUser ? 'Save Changes' : 'Add User')
                            }
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}