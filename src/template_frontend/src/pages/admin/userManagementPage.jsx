import React, { useState, useEffect } from 'react';
import { PlusCircle, Search, User, Mail, Trash2, Pencil, X, Filter, AlertCircle, CheckCircle, Users, UserCheck } from 'lucide-react';
import { useLMS } from '../../hooks/useLMS';

const Button = ({ children, className, variant, onClick, disabled, type = "button" }) => {
    let baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    let variantClasses = "bg-blue-600 text-white hover:bg-blue-700"; 
    if (variant === "outline") {
        variantClasses = "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50";
    } else if (variant === "ghost") {
        variantClasses = "hover:bg-gray-100 text-gray-700";
    } else if (variant === "destructive") {
        variantClasses = "bg-red-600 text-white hover:bg-red-700";
    }
    return (
        <button type={type} className={`${baseClasses} ${variantClasses} ${className}`} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};

const Input = ({ type = "text", placeholder, className, value, onChange, label, required }) => (
    <div className="space-y-2">
        {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
        <input
            type={type}
            placeholder={placeholder}
            className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            value={value}
            onChange={onChange}
            required={required}
        />
    </div>
);

const Select = ({ label, className, value, onChange, options, required }) => (
    <div className="space-y-2">
        {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
        <select
            className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
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

// Modal Component
const Modal = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg relative">
            <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-semibold">{title}</h2>
                <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                <X className="h-5 w-5" />
                </Button>
            </div>
            <div className="p-4 max-h-[80vh] overflow-y-auto">
                {children}
            </div>
            </div>
        </div>
    );
};

export default function UserManagementPage() {
    const { getAllUsers, createUser, updateUser, deleteUser, loading, error } = useLMS();
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loadingError, setLoadingError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

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
        loadUsers();
    }, []);

    useEffect(() => {
        filterUsers();
    }, [users, searchTerm, filterRole]);

    const loadUsers = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            setLoadingError("No authentication token found");
            return;
        }

        try {
            const result = await getAllUsers(token);
            if (result.success) {
                setUsers(result.data);
            } else {
                setLoadingError(result.error || "Failed to load users");
            }
        } catch (err) {
            // setLoadingError("An unexpected error occurred");
            console.error("Users loading error:", err);
        }
    };

    const filterUsers = () => {
        let filtered = [...users];

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(user =>
                `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.user_id.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply role filter
        if (filterRole) {
            filtered = filtered.filter(user => user.role === filterRole);
        }

        setFilteredUsers(filtered);
    };

    // Open modal for adding a new user
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
        setLoadingError('');
        setSuccessMessage('');
    };

    // Open modal for editing an existing user
    const handleEditUserClick = (user) => {
        setEditingUser(user);
        setFormData({
            firstName: user.first_name || '',
            lastName: user.last_name || '',
            email: user.email || '',
            role: user.role || 'student',
            password: '' // Don't pre-fill password for security
        });
        setIsModalOpen(true);
        setLoadingError('');
        setSuccessMessage('');
    };

    // Close modal and reset form fields
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
        setLoadingError('');
        setSuccessMessage('');
        setIsSubmitting(false);
    };

    // Handle form submission (Add or Edit User)
    const handleSubmitUser = async (e) => {
        e.preventDefault();

        if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
            setLoadingError('First name, last name, and email are required.');
            return;
        }

        if (!editingUser && !formData.password.trim()) {
            setLoadingError('Password is required for new users.');
            return;
        }

        const token = localStorage.getItem('authToken');
        if (!token) {
            setLoadingError("No authentication token found");
            return;
        }

        setIsSubmitting(true);
        setLoadingError('');

        try {
            let result;
            
            if (editingUser) {
                // Edit existing user
                result = await updateUser(
                    token,
                    editingUser.user_id,
                    {
                        first_name: formData.firstName,
                        last_name: formData.lastName,
                        email: formData.email,
                        role: formData.role,
                        ...(formData.password && { password: formData.password })
                    }
                );
            } else {
                // Add new user
                result = await createUser(
                    token,
                    formData.firstName,
                    formData.lastName,
                    formData.email,
                    formData.password,
                    formData.role
                );
            }

            if (result.success) {
                setSuccessMessage(editingUser ? 'User updated successfully!' : 'User created successfully!');
                setLoadingError('');
                await loadUsers(); // Refresh the user list
                closeModal();
            } else {
                setLoadingError(result.error || `Failed to ${editingUser ? 'update' : 'create'} user`);
                setSuccessMessage('');
            }
        } catch (err) {
            setLoadingError('An unexpected error occurred');
            setSuccessMessage('');
            console.error('User operation error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle user deletion
    const handleDeleteUser = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            return;
        }

        const token = localStorage.getItem('authToken');
        if (!token) {
            setLoadingError("No authentication token found");
            return;
        }

        try {
            const result = await deleteUser(token, userId);
            if (result.success) {
                setSuccessMessage('User deleted successfully!');
                setLoadingError('');
                await loadUsers(); // Refresh the user list
            } else {
                setLoadingError(result.error || 'Failed to delete user');
                setSuccessMessage('');
            }
        } catch (err) {
            setLoadingError('An unexpected error occurred');
            setSuccessMessage('');
            console.error('User deletion error:', err);
        }
    };

    const handleFormChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const getRoleBadgeColor = (role) => {
        switch (role) {
            case 'admin':
                return 'bg-purple-100 text-purple-800';
            case 'instructor':
                return 'bg-yellow-100 text-yellow-800';
            case 'student':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (timestamp) => {
        return new Date(timestamp / 1000000).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-8 font-sans">
                <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
                        <div className="h-12 bg-gray-200 rounded mb-6"></div>
                        <div className="space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="h-16 bg-gray-200 rounded"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8 font-sans">
            <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900">User Management</h1>
                        <p className="text-gray-600 mt-2">Manage platform users and their roles</p>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>{filteredUsers.length} of {users.length} users</span>
                    </div>
                </div>

                {/* Success/Error Messages */}
                {successMessage && (
                    <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-4 rounded-md">
                        <CheckCircle className="h-5 w-5" />
                        <span>{successMessage}</span>
                    </div>
                )}

                {(loadingError || error) && (
                    <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-md">
                        <AlertCircle className="h-5 w-5" />
                        <span>{loadingError || error}</span>
                    </div>
                )}

                {/* Search and Filter Section */}
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="relative w-full sm:w-1/2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                    type="text"
                    placeholder="Search by name, email, or user ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full"
                    />
                </div>
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                    <Select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    options={roles}
                    className="w-full sm:w-40"
                    />
                    <Button onClick={handleAddUserClick} className="flex-shrink-0 px-4 py-2">
                    <PlusCircle className="h-5 w-5 mr-2" />
                    Add User
                    </Button>
                </div>
                </div>

                {/* Users Table */}
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    User
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Role
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Created
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUsers.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-12 whitespace-nowrap text-sm text-gray-500 text-center">
                                    <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                    <div className="text-lg font-medium text-gray-900 mb-2">
                                        {searchTerm || filterRole ? 'No users match your filters' : 'No users found'}
                                    </div>
                                    <div className="text-gray-600">
                                        {searchTerm || filterRole 
                                            ? 'Try adjusting your search or filter criteria' 
                                            : 'Add your first user to get started'}
                                    </div>
                                </td>
                            </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                <tr key={user.user_id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                    <User className="h-6 w-6 text-gray-500 mr-3" />
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">
                                            {user.first_name} {user.last_name}
                                        </div>
                                        <div className="text-xs text-gray-500">ID: {user.user_id}</div>
                                    </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{user.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeColor(user.role)}`}>
                                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {user.created_date ? formatDate(user.created_date) : 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleEditUserClick(user)}
                                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                                    >
                                    <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDeleteUser(user.user_id)}
                                    className="text-red-600 hover:text-red-900"
                                    >
                                    <Trash2 className="h-4 w-4" />
                                    </Button>
                                </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>

                {/* Summary Stats */}
                {users.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg text-center">
                            <div className="text-2xl font-bold text-blue-600">
                                {users.filter(u => u.role === 'student').length}
                            </div>
                            <div className="text-sm text-gray-600">Students</div>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-lg text-center">
                            <div className="text-2xl font-bold text-yellow-600">
                                {users.filter(u => u.role === 'instructor').length}
                            </div>
                            <div className="text-sm text-gray-600">Instructors</div>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg text-center">
                            <div className="text-2xl font-bold text-purple-600">
                                {users.filter(u => u.role === 'admin').length}
                            </div>
                            <div className="text-sm text-gray-600">Admins</div>
                        </div>
                    </div>
                )}
            </div>

            {/* Add/Edit User Modal */}
            <Modal isOpen={isModalOpen} onClose={closeModal} title={editingUser ? 'Edit User' : 'Add New User'}>
                <form onSubmit={handleSubmitUser} className="space-y-4">
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
                    placeholder="e.g., jane.doe@example.com"
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
                <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={closeModal} disabled={isSubmitting}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting 
                            ? (editingUser ? 'Saving...' : 'Creating...') 
                            : (editingUser ? 'Save Changes' : 'Add User')
                        }
                    </Button>
                </div>
                </form>
            </Modal>
        </div>
    );
}
