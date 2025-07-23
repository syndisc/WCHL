import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Search, Filter, Clock, Users, Star, Heart, BookOpen, AlertCircle, Loader2, CheckCircle } from "lucide-react";
import { useLMS } from "../../hooks/useLMS";
import { Link } from "react-router-dom";

const DUMMY_COURSES = [
    {
        course_id: 'c1',
        course_name: 'Mastering React Hooks',
        course_description: 'Learn to build powerful React applications using Hooks, Context API, and custom hooks.',
        course_status: 'active',
        course_length: '5 hours',
        course_thumbnail: 'https://placehold.co/400x225/E0F2F7/000000?text=React+Hooks',
        language: 'English',
        instructor_id: 'i1',
        duration_days: 12,
        rating: 4.8,
        student_count: 1234
    },
    {
        course_id: 'c2',
        course_name: 'Intro to Data Science',
        course_description: 'Explore data analysis, visualization, and the basics of machine learning.',
        course_status: 'active',
        course_length: '8 hours',
        course_thumbnail: 'https://placehold.co/400x225/FDE68A/000000?text=Data+Science',
        language: 'English',
        instructor_id: 'i2',
        duration_days: 20,
        rating: 4.6,
        student_count: 890
    },
    {
        course_id: 'c3',
        course_name: 'Beginner\'s Guide to Web3',
        course_description: 'Understand the fundamentals of Web3, smart contracts, and blockchain development.',
        course_status: 'inactive',
        course_length: '6 hours',
        course_thumbnail: 'https://placehold.co/400x225/D1FAE5/000000?text=Web3+Basics',
        language: 'English',
        instructor_id: 'i3',
        duration_days: 15,
        rating: 4.3,
        student_count: 540
    },
    {
        course_id: 'c4',
        course_name: 'Python for Absolute Beginners',
        course_description: 'Get started with Python, from syntax to basic data structures and functions.',
        course_status: 'active',
        course_length: '10 hours',
        course_thumbnail: 'https://placehold.co/400x225/FFF5E5/000000?text=Python+Basics',
        language: 'English',
        instructor_id: 'i4',
        duration_days: 10,
        rating: 4.7,
        student_count: 1500
    },
    {
        course_id: 'c5',
        course_name: 'UI/UX Design Principles',
        course_description: 'Learn the core concepts of user interface and user experience design.',
        course_status: 'active',
        course_length: '7 hours',
        course_thumbnail: 'https://placehold.co/400x225/FFE4E1/000000?text=UI%2FUX+Design',
        language: 'English',
        instructor_id: 'i5',
        duration_days: 8,
        rating: 4.5,
        student_count: 740
    },
    {
        course_id: 'c6',
        course_name: 'Machine Learning Crash Course',
        course_description: 'Dive into ML concepts, supervised and unsupervised learning, and model training.',
        course_status: 'inactive',
        course_length: '9 hours',
        course_thumbnail: 'https://placehold.co/400x225/E6E6FA/000000?text=ML+Crash+Course',
        language: 'English',
        instructor_id: 'i6',
        duration_days: 14,
        rating: 4.9,
        student_count: 2020
    },
    {
        course_id: 'c7',
        course_name: 'Effective Public Speaking',
        course_description: 'Gain confidence in speaking and presenting in front of an audience.',
        course_status: 'active',
        course_length: '4 hours',
        course_thumbnail: 'https://placehold.co/400x225/FFDAB9/000000?text=Public+Speaking',
        language: 'English',
        instructor_id: 'i7',
        duration_days: 5,
        rating: 4.4,
        student_count: 680
    },
    {
        course_id: 'c8',
        course_name: 'Git & GitHub Essentials',
        course_description: 'Understand version control systems and how to collaborate on code using GitHub.',
        course_status: 'active',
        course_length: '3 hours',
        course_thumbnail: 'https://placehold.co/400x225/C8E6C9/000000?text=Git+Essentials',
        language: 'English',
        instructor_id: 'i8',
        duration_days: 3,
        rating: 4.2,
        student_count: 450
    },
    {
        course_id: 'c9',
        course_name: 'Advanced JavaScript Techniques',
        course_description: 'Explore asynchronous programming, closures, and ES6+ features in depth.',
        course_status: 'active',
        course_length: '6 hours',
        course_thumbnail: 'https://placehold.co/400x225/E0E0E0/000000?text=JavaScript+Advanced',
        language: 'English',
        instructor_id: 'i9',
        duration_days: 9,
        rating: 4.6,
        student_count: 980
    },
    {
        course_id: 'c10',
        course_name: 'SQL for Data Analysis',
        course_description: 'Write powerful SQL queries to analyze and visualize real-world data sets.',
        course_status: 'inactive',
        course_length: '5 hours',
        course_thumbnail: 'https://placehold.co/400x225/FFEBCD/000000?text=SQL+Data+Analysis',
        language: 'English',
        instructor_id: 'i10',
        duration_days: 7,
        rating: 4.3,
        student_count: 620
    },
    {
        course_id: 'c11',
        course_name: 'Docker & Kubernetes Fundamentals',
        course_description: 'Containerize your applications and orchestrate them using Kubernetes.',
        course_status: 'active',
        course_length: '11 hours',
        course_thumbnail: 'https://placehold.co/400x225/B0E0E6/000000?text=Docker+K8s',
        language: 'English',
        instructor_id: 'i11',
        duration_days: 16,
        rating: 4.7,
        student_count: 1340
    },
    {
        course_id: 'c12',
        course_name: 'Digital Marketing Strategy',
        course_description: 'Create comprehensive digital marketing campaigns for online success.',
        course_status: 'active',
        course_length: '6 hours',
        course_thumbnail: 'https://placehold.co/400x225/F5DEB3/000000?text=Marketing+Strategy',
        language: 'English',
        instructor_id: 'i12',
        duration_days: 10,
        rating: 4.5,
        student_count: 1110
    }
];


export default function BrowseCoursesPage() {
    const { getAllCourses, enrollInCourse, loading, error } = useLMS();
    const [courses, setCourses] = useState([]); // Start with dummy data
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [loadingError, setLoadingError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [enrollingCourses, setEnrollingCourses] = useState(new Set());

    // Filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        console.log("Courses loaded:", courses);
        console.log("Courses length:", courses.length);
        console.log("Dummy courses used:", DUMMY_COURSES);
        console.log("About to filter courses...");
        filterCourses();
    }, [courses, searchTerm, selectedLanguage, activeTab]);

    const loadCourses = async () => {
        try {
            const result = await getAllCourses();
            console.log("getAllCourses result:", result);
            if (result.success && result.data && result.data.length > 0) {
                console.log("Loaded courses from API:", result.data);
                console.log("API courses length:", result.data.length);
                setCourses(result.data);
            } else {
                console.log("Using dummy data - no courses from API or empty result");
                console.log("Result success:", result?.success);
                console.log("Result data:", result?.data);
                console.log("Result data length:", result?.data?.length);
                // Keep using dummy data if API fails or returns empty
            }
        } catch (err) {
            console.error("Courses loading error:", err);
            // Keep using dummy data on error
        }
    };

    useEffect(() => {
        console.log("Component mounted, loading courses...");
        loadCourses();
        // setCourses(DUMMY_COURSES); // For testing, use dummy data
    }, []);

    const filterCourses = () => {
        console.log("Starting filterCourses with courses:", courses);
        console.log("Current filters:", { searchTerm, selectedLanguage, activeTab });

        let filtered = [...courses];
        console.log("Initial filtered array:", filtered);

        // Filter out inactive courses unless specifically searching for them, commented since Candid UI generate random status
        const beforeStatusFilter = filtered.length;
        // filtered = filtered.filter(course => course.course_status === 'active');
        console.log(`After status filter: ${beforeStatusFilter} -> ${filtered.length} courses`);

        // Apply search filter
        if (searchTerm) {
            const beforeSearchFilter = filtered.length;
            filtered = filtered.filter(course =>
                course.course_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.course_description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.instructor_id?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            console.log(`After search filter: ${beforeSearchFilter} -> ${filtered.length} courses`);
        }

        // Apply language filter
        if (selectedLanguage && selectedLanguage !== 'all') {
            const beforeLanguageFilter = filtered.length;
            filtered = filtered.filter(course =>
                course.language?.toLowerCase() === selectedLanguage.toLowerCase()
            );
            console.log(`After language filter: ${beforeLanguageFilter} -> ${filtered.length} courses`);
        }

        // Apply tab filters
        switch (activeTab) {
            case 'popular':
                filtered = filtered.sort((a, b) => (b.student_count || 0) - (a.student_count || 0));
                break;
            case 'highest-rated':
                filtered = filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            case 'shortest':
                filtered = filtered.sort((a, b) => (a.duration_days || 0) - (b.duration_days || 0));
                break;
            case 'longest':
                filtered = filtered.sort((a, b) => (b.duration_days || 0) - (a.duration_days || 0));
                break;
            default:
                // 'all' - sort by popularity by default
                filtered = filtered.sort((a, b) => {
                    const countA = a.student_count || 0n;
                    const countB = b.student_count || 0n;
                    return countB > countA ? 1 : countB < countA ? -1 : 0;
                });

                break;
        }

        console.log("Final filtered courses:", filtered);
        console.log("Setting filteredCourses to:", filtered.length, "items");
        setFilteredCourses(filtered);
    };

    const handleEnrollment = async (courseId) => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            setLoadingError("Please log in to enroll in courses");
            return;
        }

        setEnrollingCourses(prev => new Set([...prev, courseId]));
        setLoadingError('');
        setSuccessMessage('');

        /*  public type Enrollment = {
            enrollment_id : Text;
            class_id : Text;
            student_id : Text;
            enrollment_status : Text;
            enrollment_grade : Text;
            progress_percentage : Nat;
            enrollment_date : Int;
        };*/

        try {
            const result = await enrollInCourse(token, courseId);
            if (result.success) {
                setSuccessMessage('Successfully enrolled in course!');
                // Update the course in the list to reflect enrollment
                setCourses(prev => prev.map(course =>
                    course.course_id === courseId
                        ? { ...course, student_count: (course.student_count || 0) + 1 }
                        : course
                ));
            } else {
                setLoadingError(result.error || 'Failed to enroll in course');
            }
        } catch (err) {
            setLoadingError('An unexpected error occurred during enrollment');
            console.error('Enrollment error:', err);
        } finally {
            setEnrollingCourses(prev => {
                const newSet = new Set(prev);
                newSet.delete(courseId);
                return newSet;
            });
        }
    };

    const formatDuration = (course_length) => {
        if (!course_length) return 'N/A';
        return course_length;
    };

    const formatDurationDays = (duration_days) => {
        if (!duration_days) return 'N/A';
        if (duration_days === 1) return '1 day';
        return `${duration_days} days`;
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'active':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'inactive':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getLanguageFlag = (language) => {
        switch (language?.toLowerCase()) {
            case 'english':
                return '🇺🇸';
            case 'spanish':
                return '🇪🇸';
            case 'french':
                return '🇫🇷';
            case 'german':
                return '🇩🇪';
            case 'portuguese':
                return '🇵🇹';
            case 'italian':
                return '🇮🇹';
            case 'japanese':
                return '🇯🇵';
            case 'chinese':
                return '🇨🇳';
            default:
                return '🌐';
        }
    };

    // Get unique languages for filters
    const languages = [...new Set(courses.map(course => course.language).filter(Boolean))];

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                    <div className="h-12 bg-gray-200 rounded mb-6"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-80 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Browse Courses</h1>
                <p className="text-gray-600 mt-2">Discover new courses to expand your knowledge and skills</p>
            </div>

            {/* Success/Error Messages */}
            {successMessage && (
                <div className="flex items-center space-x-2 text-green-600 bg-green-50 border border-green-200 p-4 rounded-md">
                    <CheckCircle className="h-5 w-5" />
                    <span>{successMessage}</span>
                </div>
            )}

            {(loadingError || error) && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 border border-red-200 p-4 rounded-md">
                    <AlertCircle className="h-5 w-5" />
                    <span>{loadingError || error}</span>
                </div>
            )}

            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search for courses, topics, or instructor ID..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 flex-wrap">
                    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Languages</SelectItem>
                            {languages.map(language => (
                                <SelectItem key={language} value={language}>
                                    {getLanguageFlag(language)} {language}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button variant="outline" onClick={() => {
                        setSearchTerm('');
                        setSelectedLanguage('');
                    }}>
                        <Filter className="h-4 w-4 mr-2" />
                        Clear
                    </Button>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="space-x-2">
                    <TabsTrigger value="all" className="bg-white">All Courses ({filteredCourses.length})</TabsTrigger>
                    <TabsTrigger value="popular" className="bg-white">Most Popular</TabsTrigger>
                    <TabsTrigger value="highest-rated" className="bg-white">Highest Rated</TabsTrigger>
                    <TabsTrigger value="shortest" className="bg-white">Shortest Duration</TabsTrigger>
                    <TabsTrigger value="longest" className="bg-white">Longest Duration</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="space-y-6">
                    {filteredCourses.length === 0 ? (
                        <div className="text-center py-12">
                            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                {searchTerm || selectedLanguage
                                    ? 'No courses match your filters'
                                    : 'No courses available'
                                }
                            </h3>
                            <p className="text-gray-600">
                                {searchTerm || selectedLanguage
                                    ? 'Try adjusting your search or filter criteria'
                                    : 'Check back later for new courses'
                                }
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCourses.map((course) => (
                                <Card key={course.course_id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                    <div className="aspect-video relative bg-gray-100 overflow-hidden">
                                        <img
                                            src={course.course_thumbnail}
                                            alt={course.course_name}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "/thumbnail.jpg";
                                            }}
                                            className="w-full h-full object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute top-3 left-3">
                                            <Badge className={getStatusColor(course.course_status)}>
                                                {course.course_status === 'active' ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </div>
                                        <div className="absolute top-3 right-3">
                                            <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white backdrop-blur-sm">
                                                <Heart className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <div className="absolute bottom-3 left-3">
                                            <Badge variant="secondary" className="bg-black/60 text-white border-none">
                                                <Clock className="h-3 w-3 mr-1" />
                                                {formatDuration(course.course_length)}
                                            </Badge>
                                        </div>
                                        <div className="absolute bottom-3 right-3">
                                            <Badge variant="secondary" className="bg-black/60 text-white border-none">
                                                {getLanguageFlag(course.language)} {course.language}
                                            </Badge>
                                        </div>
                                    </div>
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center justify-between mb-2">
                                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                                {formatDurationDays(course.duration_days)}
                                            </Badge>
                                            <div className="flex items-center space-x-1">
                                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                <span className="text-sm font-medium">{course.rating}</span>
                                            </div>
                                        </div>
                                        <CardTitle className="text-lg group-hover:text-blue-600 transition-colors leading-tight">
                                            {course.course_name}
                                        </CardTitle>
                                        <CardDescription className="text-sm line-clamp-2">
                                            {course.course_description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center justify-between text-sm text-gray-600">
                                            <div className="flex items-center space-x-1">
                                                <Users className="h-4 w-4" />
                                                <span>{course.student_count?.toLocaleString()} students</span>
                                            </div>
                                            <span className="text-sm text-gray-500">
                                                ID: {course.instructor_id}
                                            </span>
                                        </div>
                                        <Button
                                            className="w-full group-hover:bg-blue-600 transition-colors"
                                            onClick={() => handleEnrollment(course.course_id)}
                                            disabled={enrollingCourses.has(course.course_id)}
                                        >
                                            {enrollingCourses.has(course.course_id) ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                    Enrolling...
                                                </>
                                            ) : (
                                                'Enroll Now'
                                            )}
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}

                    {/* Load More Button */}
                    {filteredCourses.length > 0 && filteredCourses.length >= 9 && (
                        <div className="text-center">
                            <Button variant="outline" size="lg" className="px-8">
                                Load More Courses
                                <BookOpen className="h-4 w-4 ml-2" />
                            </Button>
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}