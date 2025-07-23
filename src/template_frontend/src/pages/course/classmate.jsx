import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, AlertCircle, BookOpen, Loader2, Search, Mail, Star, Clock, GraduationCap } from "lucide-react";

// Dummy data
const dummyCoursesWithClassmates = [
    {
        course_id: "cs101",
        title: "Introduction to Computer Science",
        course_code: "CS 101",
        instructor: "Dr. Sarah Johnson",
        semester: "Fall 2024",
        classmates: [
            {
                user_id: "user1",
                first_name: "Alex",
                last_name: "Chen",
                email: "alex.chen@university.edu",
                avatar: "/placeholder.svg",
                role: "student",
                year: "Sophomore",
                major: "Computer Science",
                last_active: "2 hours ago"
            },
            {
                user_id: "user2",
                first_name: "Maria",
                last_name: "Rodriguez",
                email: "maria.rodriguez@university.edu",
                avatar: "/placeholder.svg",
                role: "student",
                year: "Junior",
                major: "Information Technology",
                last_active: "1 day ago"
            },
            {
                user_id: "user3",
                first_name: "James",
                last_name: "Wilson",
                email: "james.wilson@university.edu",
                avatar: "/placeholder.svg",
                role: "student",
                year: "Freshman",
                major: "Computer Science",
                last_active: "3 hours ago"
            },
            {
                user_id: "user4",
                first_name: "Emily",
                last_name: "Davis",
                email: "emily.davis@university.edu",
                avatar: "/placeholder.svg",
                role: "student",
                year: "Sophomore",
                major: "Software Engineering",
                last_active: "5 minutes ago"
            }
        ]
    },
    {
        course_id: "math201",
        title: "Calculus II",
        course_code: "MATH 201",
        instructor: "Prof. Michael Thompson",
        semester: "Fall 2024",
        classmates: [
            {
                user_id: "user5",
                first_name: "David",
                last_name: "Kim",
                email: "david.kim@university.edu",
                avatar: "/placeholder.svg",
                role: "student",
                year: "Sophomore",
                major: "Mathematics",
                last_active: "1 hour ago"
            },
            {
                user_id: "user6",
                first_name: "Sophie",
                last_name: "Anderson",
                email: "sophie.anderson@university.edu",
                avatar: "/placeholder.svg",
                role: "student",
                year: "Junior",
                major: "Engineering",
                last_active: "30 minutes ago"
            }
        ]
    },
    {
        course_id: "eng150",
        title: "Academic Writing & Research",
        course_code: "ENG 150",
        instructor: "Dr. Lisa Martinez",
        semester: "Fall 2024",
        classmates: [
            {
                user_id: "user7",
                first_name: "Ryan",
                last_name: "O'Connor",
                email: "ryan.oconnor@university.edu",
                avatar: "/placeholder.svg",
                role: "student",
                year: "Freshman",
                major: "English Literature",
                last_active: "2 days ago"
            },
            {
                user_id: "user8",
                first_name: "Aisha",
                last_name: "Patel",
                email: "aisha.patel@university.edu",
                avatar: "/placeholder.svg",
                role: "student",
                year: "Sophomore",
                major: "Communications",
                last_active: "4 hours ago"
            },
            {
                user_id: "user9",
                first_name: "Carlos",
                last_name: "Hernandez",
                email: "carlos.hernandez@university.edu",
                avatar: "/placeholder.svg",
                role: "student",
                year: "Junior",
                major: "Business Administration",
                last_active: "1 hour ago"
            }
        ]
    }
];

export default function ClassmatesPage() {
    const [coursesWithClassmates, setCoursesWithClassmates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("all");

    useEffect(() => {
        // Simulate loading
        setTimeout(() => {
            setCoursesWithClassmates(dummyCoursesWithClassmates);
            setLoading(false);
        }, 1500);
    }, []);

    const getInitials = (firstName, lastName) => {
        const first = firstName ? firstName.charAt(0).toUpperCase() : '';
        const last = lastName ? lastName.charAt(0).toUpperCase() : '';
        return first + last || 'U';
    };

    const getStatusColor = (lastActive) => {
        if (lastActive.includes('minute') || lastActive.includes('hour')) {
            return 'bg-green-100 text-green-800';
        } else if (lastActive.includes('day')) {
            return 'bg-yellow-100 text-yellow-800';
        }
        return 'bg-gray-100 text-gray-600';
    };

    const filteredCourses = coursesWithClassmates.filter(course => {
        if (selectedCourse !== "all" && course.course_id !== selectedCourse) return false;
        if (searchTerm) {
            return course.classmates.some(student => 
                `${student.first_name} ${student.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.major.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return true;
    });

    const totalClassmates = coursesWithClassmates.reduce((total, course) => total + course.classmates.length, 0);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
                <div className="max-w-7xl mx-auto">
                    <Card className="shadow-lg border-0">
                        <CardContent className="p-12">
                            <div className="flex items-center justify-center">
                                <div className="text-center">
                                    <Loader2 className="h-12 w-12 animate-spin mx-auto mb-6 text-blue-600" />
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading your classmates...</h3>
                                    <p className="text-gray-600">Gathering student information from your courses</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="p-3 bg-blue-600 rounded-full">
                            <Users className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            My Classmates
                        </h1>
                    </div>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Connect with fellow students across all your enrolled courses
                    </p>
                    
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto">
                        <Card className="border-0 shadow-md bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                            <CardContent className="p-6 text-center">
                                <GraduationCap className="w-8 h-8 mx-auto mb-2" />
                                <div className="text-2xl font-bold">{coursesWithClassmates.length}</div>
                                <div className="text-blue-100">Enrolled Courses</div>
                            </CardContent>
                        </Card>
                        <Card className="border-0 shadow-md bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                            <CardContent className="p-6 text-center">
                                <Users className="w-8 h-8 mx-auto mb-2" />
                                <div className="text-2xl font-bold">{totalClassmates}</div>
                                <div className="text-purple-100">Total Classmates</div>
                            </CardContent>
                        </Card>
                        <Card className="border-0 shadow-md bg-gradient-to-r from-green-500 to-green-600 text-white">
                            <CardContent className="p-6 text-center">
                                <Star className="w-8 h-8 mx-auto mb-2" />
                                <div className="text-2xl font-bold">
                                    {Math.round(totalClassmates / coursesWithClassmates.length)}
                                </div>
                                <div className="text-green-100">Avg per Course</div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Search and Filter Section */}
                <Card className="shadow-lg border-0">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search classmates by name, email, or major..."
                                    className="w-full pl-10 pr-4 py-3 border bg-white border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <select
                                className="px-4 py-3 border bg-white border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent min-w-48"
                                value={selectedCourse}
                                onChange={(e) => setSelectedCourse(e.target.value)}
                            >
                                <option value="all">All Courses</option>
                                {coursesWithClassmates.map(course => (
                                    <option key={course.course_id} value={course.course_id}>
                                        {course.course_code}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </CardContent>
                </Card>

                {/* Courses with Classmates */}
                <div className="space-y-8">
                    {filteredCourses.map((course, index) => (
                        <Card key={course.course_id || index} className="shadow-lg border-0 overflow-hidden">
                            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-2xl text-gray-800 flex items-center gap-3">
                                            <BookOpen className="w-6 h-6 text-blue-600" />
                                            {course.title}
                                        </CardTitle>
                                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                                            <span className="flex items-center gap-1">
                                                <span className="font-medium">Code:</span> {course.course_code}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <span className="font-medium">Instructor:</span> {course.instructor}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <span className="font-medium">Semester:</span> {course.semester}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-blue-600">{course.classmates.length}</div>
                                        <div className="text-sm text-gray-500">classmate{course.classmates.length !== 1 ? 's' : ''}</div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                {course.classmates.length === 0 ? (
                                    <div className="text-center py-12 bg-gray-50 rounded-xl">
                                        <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No classmates yet</h3>
                                        <p className="text-gray-600">Be the first to connect when more students join!</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                        {course.classmates
                                            .filter(student => {
                                                if (!searchTerm) return true;
                                                return `${student.first_name} ${student.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                       student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                       student.major.toLowerCase().includes(searchTerm.toLowerCase());
                                            })
                                            .map((student, idx) => (
                                            <Card key={student.user_id || idx} className="border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 group">
                                                <CardContent className="p-5">
                                                    <div className="flex items-start space-x-4">
                                                        <Avatar className="w-12 h-12 ring-2 ring-gray-100 group-hover:ring-blue-200 transition-all">
                                                            <AvatarImage src={student.avatar} />
                                                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                                                                {getInitials(student.first_name, student.last_name)}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="font-semibold text-gray-900 truncate text-lg">
                                                                {student.first_name} {student.last_name}
                                                            </h4>
                                                            <div className="space-y-2 mt-2">
                                                                <div className="flex items-center text-sm text-gray-600">
                                                                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                                                                    <span className="truncate">{student.email}</span>
                                                                </div>
                                                                <div className="flex flex-wrap gap-2">
                                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                                        {student.year}
                                                                    </span>
                                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                                                        {student.major}
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center text-xs">
                                                                    <Clock className="w-3 h-3 mr-1" />
                                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.last_active)}`}>
                                                                        Active {student.last_active}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredCourses.length === 0 && (
                    <Card className="shadow-lg border-0">
                        <CardContent className="p-12">
                            <div className="text-center">
                                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                                <p className="text-gray-600">
                                    Try adjusting your search terms or filter settings
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}