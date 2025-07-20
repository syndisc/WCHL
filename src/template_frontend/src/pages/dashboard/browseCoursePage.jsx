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

export default function BrowseCoursesPage() {
    const { getAllCourses, enrollInCourse, loading, error } = useLMS();
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [loadingError, setLoadingError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [enrollingCourses, setEnrollingCourses] = useState(new Set());

    // Filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        loadCourses();
    }, []);

    useEffect(() => {
        filterCourses();
    }, [courses, searchTerm, selectedCategory, selectedLevel, activeTab]);

    const loadCourses = async () => {
        try {
            const result = await getAllCourses();
            if (result.success) {
                setCourses(result.data);
            } else {
                setLoadingError(result.error || "Failed to load courses");
            }
        } catch (err) {
            // setLoadingError("An unexpected error occurred");
            console.error("Courses loading error:", err);
        }
    };

    const filterCourses = () => {
        let filtered = [...courses];

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(course =>
                course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.instructor_name?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply category filter
        if (selectedCategory) {
            filtered = filtered.filter(course => 
                course.category?.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        // Apply level filter
        if (selectedLevel) {
            filtered = filtered.filter(course => 
                course.level?.toLowerCase() === selectedLevel.toLowerCase()
            );
        }

        // Apply tab filters
        switch (activeTab) {
            case 'popular':
                filtered = filtered.sort((a, b) => (b.enrolled_count || 0) - (a.enrolled_count || 0));
                break;
            case 'new':
                filtered = filtered.sort((a, b) => 
                    new Date(b.created_date || 0) - new Date(a.created_date || 0)
                );
                break;
            case 'free':
                filtered = filtered.filter(course => !course.price || course.price === 0);
                break;
            default:
                // 'all' - no additional filtering
                break;
        }

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

        try {
            const result = await enrollInCourse(token, courseId);
            if (result.success) {
                setSuccessMessage('Successfully enrolled in course!');
                // Update the course in the list to reflect enrollment
                setCourses(prev => prev.map(course => 
                    course.course_id === courseId 
                        ? { ...course, enrolled_count: (course.enrolled_count || 0) + 1 }
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

    const formatPrice = (price) => {
        if (!price || price === 0) return 'Free';
        return `$${price}`;
    };

    const formatDuration = (duration) => {
        if (!duration) return 'N/A';
        return `${duration} hours`;
    };

    const getLevelColor = (level) => {
        switch (level?.toLowerCase()) {
            case 'beginner':
                return 'bg-green-100 text-green-800';
            case 'intermediate':
                return 'bg-yellow-100 text-yellow-800';
            case 'advanced':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getCategoryColor = (category) => {
        switch (category?.toLowerCase()) {
            case 'programming':
                return 'bg-blue-100 text-blue-800';
            case 'design':
                return 'bg-purple-100 text-purple-800';
            case 'business':
                return 'bg-orange-100 text-orange-800';
            case 'marketing':
                return 'bg-pink-100 text-pink-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Get unique categories and levels for filters
    const categories = [...new Set(courses.map(course => course.category).filter(Boolean))];
    const levels = [...new Set(courses.map(course => course.level).filter(Boolean))];

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
                <p className="text-gray-600 mt-2">Discover new courses to expand your knowledge</p>
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

            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                        placeholder="Search for courses, topics, or instructors..." 
                        className="pl-10" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All Categories</SelectItem>
                            {categories.map(category => (
                                <SelectItem key={category} value={category}>
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                        <SelectTrigger className="w-32">
                            <SelectValue placeholder="Level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All Levels</SelectItem>
                            {levels.map(level => (
                                <SelectItem key={level} value={level}>
                                    {level.charAt(0).toUpperCase() + level.slice(1)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button variant="outline" onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('');
                        setSelectedLevel('');
                    }}>
                        <Filter className="h-4 w-4 mr-2" />
                        Clear Filters
                    </Button>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="space-x-2">
                    <TabsTrigger value="all">All Courses ({filteredCourses.length})</TabsTrigger>
                    <TabsTrigger value="popular">Most Popular</TabsTrigger>
                    <TabsTrigger value="new">New Releases</TabsTrigger>
                    <TabsTrigger value="free">Free Courses</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="space-y-6">
                    {filteredCourses.length === 0 ? (
                        <div className="text-center py-12">
                            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                {searchTerm || selectedCategory || selectedLevel 
                                    ? 'No courses match your filters' 
                                    : 'No courses available'
                                }
                            </h3>
                            <p className="text-gray-600">
                                {searchTerm || selectedCategory || selectedLevel 
                                    ? 'Try adjusting your search or filter criteria' 
                                    : 'Check back later for new courses'
                                }
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCourses.map((course) => (
                                <Card key={course.course_id} className="group hover:shadow-lg transition-shadow">
                                    <div className="aspect-video relative bg-gray-100">
                                        {course.thumbnail ? (
                                            <img
                                                src={course.thumbnail}
                                                alt={course.title}
                                                className="w-full h-full object-cover rounded-t-lg"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 rounded-t-lg">
                                                <BookOpen className="h-12 w-12 text-blue-600" />
                                            </div>
                                        )}
                                        <div className="absolute top-2 left-2">
                                            {course.category && (
                                                <Badge className={getCategoryColor(course.category)}>
                                                    {course.category}
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="absolute top-2 right-2">
                                            <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
                                                <Heart className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            {course.level && (
                                                <Badge variant="outline" className={getLevelColor(course.level)}>
                                                    {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                                                </Badge>
                                            )}
                                            <span className="text-lg font-bold text-green-600">
                                                {formatPrice(course.price)}
                                            </span>
                                        </div>
                                        <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                                            {course.title || 'Untitled Course'}
                                        </CardTitle>
                                        <CardDescription>
                                            {course.description || 'No description available'}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center justify-between text-sm text-gray-600">
                                            <div className="flex items-center space-x-1">
                                                <Clock className="h-4 w-4" />
                                                <span>{formatDuration(course.duration)}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Users className="h-4 w-4" />
                                                <span>{course.enrolled_count || 0} students</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                <span>{course.rating || '4.5'}</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            By {course.instructor_name || 'Unknown Instructor'}
                                        </p>
                                        <Button 
                                            className="w-full" 
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
                    {filteredCourses.length > 0 && filteredCourses.length >= 12 && (
                        <div className="text-center">
                            <Button variant="outline" size="lg">
                                Load More Courses
                            </Button>
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
