import React, { useState } from 'react';
import { PlusCircle, Search, User, Mail, Trash2, Pencil, X, Filter } from 'lucide-react';

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

const Input = ({ type = "text", placeholder, className, value, onChange, label }) => (
    <div className="space-y-2">
        {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
        <input
            type={type}
            placeholder={placeholder}
            className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            value={value}
            onChange={onChange}
        />
    </div>
);

const Select = ({ label, className, value, onChange, options }) => (
    <div className="space-y-2">
        {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
        <select
            className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            value={value}
            onChange={onChange}
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
    const [users, setUsers] = useState([
        { id: '1', name: 'Alice Johnson', email: 'alice.j@example.com', role: 'Student', status: 'Active' },
        { id: '2', name: 'Bob Smith', email: 'bob.s@example.com', role: 'Instructor', status: 'Active' },
        { id: '3', name: 'Charlie Brown', email: 'charlie.b@example.com', role: 'Student', status: 'Inactive' },
        { id: '4', name: 'Diana Prince', email: 'diana.p@example.com', role: 'Admin', status: 'Active' },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userRole, setUserRole] = useState('Student');
    const [userStatus, setUserStatus] = useState('Active');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('');

    const roles = [
        { value: '', label: 'All Roles' },
        { value: 'Student', label: 'Student' },
        { value: 'Instructor', label: 'Instructor' },
        { value: 'Admin', label: 'Admin' },
    ];

    const statuses = [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
    ];

    // Open modal for adding a new user
    const handleAddUserClick = () => {
        setEditingUser(null);
        setUserName('');
        setUserEmail('');
        setUserRole('Student');
        setUserStatus('Active');
        setIsModalOpen(true);
    };

    // Open modal for editing an existing user
    const handleEditUserClick = (user) => {
        setEditingUser(user);
        setUserName(user.name);
        setUserEmail(user.email);
        setUserRole(user.role);
        setUserStatus(user.status);
        setIsModalOpen(true);
    };

    // Close modal and reset form fields
    const closeModal = () => {
        setIsModalOpen(false);
        setEditingUser(null);
        setUserName('');
        setUserEmail('');
        setUserRole('Student');
        setUserStatus('Active');
    };

    // Handle form submission (Add or Edit User)
    const handleSubmitUser = (e) => {
        e.preventDefault();

        if (!userName.trim() || !userEmail.trim()) {
            alert('Name and Email are required.');
        return;
    }

    if (editingUser) {
        // Edit existing user
        setUsers(users.map(user =>
        user.id === editingUser.id
            ? { ...user, name: userName, email: userEmail, role: userRole, status: userStatus }
            : user
        ));
        console.log('User updated:', { id: editingUser.id, name: userName, email: userEmail, role: userRole, status: userStatus });
    } else {
        // Add new user
        const newUser = {
            id: String(Date.now()),
            name: userName,
            email: userEmail,
            role: userRole,
            status: userStatus,
        };
        setUsers([...users, newUser]);
        console.log('New user added:', newUser);
    }
    closeModal();
  };

    // Handle user deletion
    const handleDeleteUser = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setUsers(users.filter(user => user.id !== id));
            console.log(`User with ID ${id} deleted.`);
        }
    };

    // Filtered users based on search term and role filter
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === '' || user.role === filterRole;
        return matchesSearch && matchesRole;
    });

    return (
        <div className="min-h-screen bg-gray-50 p-8 font-sans">
            <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-8">
                <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">User Management</h1>

                {/* Search and Filter Section */}
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="relative w-full sm:w-1/2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                    type="text"
                    placeholder="Search by name or email..."
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
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Role
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUsers.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                No users found.
                                </td>
                            </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                    <User className="h-6 w-6 text-gray-500 mr-3" />
                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{user.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    user.role === 'Admin' ? 'bg-purple-100 text-purple-800' :
                                    user.role === 'Instructor' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-blue-100 text-blue-800'
                                    }`}>
                                    {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                    {user.status}
                                    </span>
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
                                    onClick={() => handleDeleteUser(user.id)}
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
            </div>

            {/* Add/Edit User Modal */}
            <Modal isOpen={isModalOpen} onClose={closeModal} title={editingUser ? 'Edit User' : 'Add New User'}>
                <form onSubmit={handleSubmitUser} className="space-y-4">
                <Input
                    label="Full Name"
                    placeholder="e.g., Jane Doe"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
                <Input
                    label="Email Address"
                    type="email"
                    placeholder="e.g., jane.doe@example.com"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    required
                />
                <Select
                    label="Role"
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value)}
                    options={roles.filter(role => role.value !== '')}
                />
                <Select
                    label="Status"
                    value={userStatus}
                    onChange={(e) => setUserStatus(e.target.value)}
                    options={statuses}
                />
                <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={closeModal}>Cancel</Button>
                    <Button type="submit">{editingUser ? 'Save Changes' : 'Add User'}</Button>
                </div>
                </form>
            </Modal>
        </div>
    );
}
