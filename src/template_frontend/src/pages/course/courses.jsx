import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Play, Clock, Users, Star, Download, BookOpen, CheckCircle, Lock, MessageSquare, Award, AlertCircle, Loader2 } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { useLMS } from "../../hooks/useLMS";

export default function CourseDetailPage() {
    const { courseId } = useParams();
    const { getCourse, getCourseModules, enrollInCourse, getCourseProgress, loading, error } = useLMS();
    const [course, setCourse] = useState(null);
    const [modules, setModules] = useState([]);
    const [progress, setProgress] = useState(null);
    const [loadingError, setLoadingError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isEnrolling, setIsEnrolling] = useState(false);
    const [isEnrolled, setIsEnrolled] = useState(false);

    useEffect(() => {
        if (courseId) {
            loadCourseDetails();
        }
    }, [courseId]);

    const loadCourseDetails = async () => {
        const token = localStorage.getItem('authToken');
        
        try {
            // Load course details
            const courseResult = await getCourse(courseId);
            if (courseResult.success) {
                setCourse(courseResult.data);
            } else {
                setLoadingError(courseResult.error || "Failed to load course details");
                return;
            }

            // Load course modules
            const modulesResult = await getCourseModules(courseId);
            if (modulesResult.success) {
                setModules(modulesResult.data);
            }

            // If user is logged in, check enrollment and progress
            if (token) {
                const progressResult = await getCourseProgress(token, courseId);
                if (progressResult.success) {
                    setProgress(progressResult.data);
                    setIsEnrolled(true);
                }
            }
        } catch (err) {
            setLoadingError("An unexpected error occurred");
            console.error("Course details loading error:", err);
        }
    };

    const handleEnrollment = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            setLoadingError("Please log in to enroll in this course");
            return;
        }

        setIsEnrolling(true);
        setLoadingError('');
        setSuccessMessage('');

        try {
            const result = await enrollInCourse(token, courseId);
            if (result.success) {
                setSuccessMessage('Successfully enrolled in course!');
                setIsEnrolled(true);
                // Reload progress after enrollment
                const progressResult = await getCourseProgress(token, courseId);
                if (progressResult.success) {
                    setProgress(progressResult.data);
                }
            } else {
                setLoadingError(result.error || 'Failed to enroll in course');
            }
        } catch (err) {
            setLoadingError('An unexpected error occurred during enrollment');
            console.error('Enrollment error:', err);
        } finally {
            setIsEnrolling(false);
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

    const calculateProgressPercentage = () => {
        if (!progress || !progress.total_modules) return 0;
        return Math.round((progress.completed_modules / progress.total_modules) * 100);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="animate-pulse">
                    <div className="bg-gray-900 h-64"></div>
                    <div className="container mx-auto px-4 py-8">
                        <div className="grid lg:grid-cols-2 gap-8">
                            <div className="space-y-8">
                                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                                <div className="h-64 bg-gray-200 rounded"></div>
                            </div>
                            <div className="h-96 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!course && !loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardContent className="text-center py-12">
                        <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Course Not Found</h3>
                        <p className="text-gray-600 mb-4">The course you're looking for doesn't exist or has been removed.</p>
                        <Link to="/dashboard/browse">
                            <Button>Browse Courses</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Course Header */}
            <div className="bg-gray-900 text-white">
                <div className="container mx-auto px-4 py-12">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <div className="space-y-6">
                            <div className="flex items-center space-x-2">
                                {course.category && (
                                    <Badge className={getCategoryColor(course.category)}>
                                        {course.category}
                                    </Badge>
                                )}
                                {course.level && (
                                    <Badge variant="outline" className={getLevelColor(course.level)}>
                                        {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                                    </Badge>
                                )}
                            </div>
                            <h1 className="text-4xl font-bold">{course.title || 'Advanced Course'}</h1>
                            <p className="text-xl text-gray-300">
                                {course.description || 'Master advanced concepts and techniques with comprehensive hands-on learning experience.'}
                            </p>
                            <div className="flex items-center space-x-6 text-sm">
                                <div className="flex items-center space-x-1">
                                    <Clock className="h-4 w-4" />
                                    <span>{formatDuration(course.duration)}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Users className="h-4 w-4" />
                                    <span>{course.enrolled_count || 1234} students</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span>{course.rating || '4.8'} ({course.review_count || 456} reviews)</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src="/placeholder.svg?height=48&width=48" />
                                    <AvatarFallback>
                                        {course.instructor_name ? course.instructor_name.charAt(0).toUpperCase() : 'SJ'}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium">{course.instructor_name || 'Sarah Johnson'}</p>
                                    <p className="text-sm text-gray-300">Senior Developer & Course Instructor</p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:justify-self-end">
                            <Card className="w-full max-w-sm">
                                <div className="aspect-video relative">
                                    {course.thumbnail ? (
                                        <img
                                            src={course.thumbnail}
                                            alt={course.title}
                                            className="w-full h-full object-cover rounded-t-lg"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 rounded-t-lg">
                                            <BookOpen className="h-16 w-16 text-blue-600" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Button size="lg" className="rounded-full">
                                            <Play className="h-6 w-6 mr-2" />
                                            Preview Course
                                        </Button>
                                    </div>
                                </div>
                                <CardContent className="p-6 space-y-4">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-green-600">
                                            {formatPrice(course.price)}
                                        </div>
                                        {course.original_price && course.original_price > course.price && (
                                            <div className="text-sm text-gray-500 line-through">
                                                ${course.original_price}
                                            </div>
                                        )}
                                    </div>

                                    {/* Success/Error Messages */}
                                    {successMessage && (
                                        <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-md text-sm">
                                            <CheckCircle className="h-4 w-4" />
                                            <span>{successMessage}</span>
                                        </div>
                                    )}

                                    {loadingError && (
                                        <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-md text-sm">
                                            <AlertCircle className="h-4 w-4" />
                                            <span>{loadingError}</span>
                                        </div>
                                    )}

                                    {isEnrolled ? (
                                        <Link to={`/course/${courseId}/learn`}>
                                            <Button className="w-full" size="lg">
                                                <Play className="h-4 w-4 mr-2" />
                                                Continue Learning
                                            </Button>
                                        </Link>
                                    ) : (
                                        <Button 
                                            className="w-full" 
                                            size="lg"
                                            onClick={handleEnrollment}
                                            disabled={isEnrolling}
                                        >
                                            {isEnrolling ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                    Enrolling...
                                                </>
                                            ) : (
                                                'Enroll Now'
                                            )}
                                        </Button>
                                    )}
                                    
                                    <Button variant="outline" className="w-full bg-transparent">
                                        Add to Wishlist
                                    </Button>
                                    <div className="text-center text-sm text-gray-600">30-day money-back guarantee</div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <Tabs defaultValue="overview" className="space-y-6">
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                            </TabsList>

                            <TabsContent value="overview" className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>What you'll learn</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="flex items-start space-x-2">
                                                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                                                <span className="text-sm">Advanced patterns and techniques</span>
                                            </div>
                                            <div className="flex items-start space-x-2">
                                                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                                                <span className="text-sm">Custom hooks and context optimization</span>
                                            </div>
                                            <div className="flex items-start space-x-2">
                                                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                                                <span className="text-sm">Performance optimization strategies</span>
                                            </div>
                                            <div className="flex items-start space-x-2">
                                                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                                                <span className="text-sm">Testing advanced components</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Course Description</CardTitle>
                                    </CardHeader>
                                    <CardContent className="prose max-w-none">
                                        <p>
                                            {course.description || 'This comprehensive course takes your skills to the next level by covering advanced patterns and techniques used in production applications. You\'ll learn how to build scalable, maintainable applications using modern best practices.'}
                                        </p>
                                        <p>
                                            Throughout the course, you'll work on real-world projects that demonstrate the concepts you're
                                            learning. By the end, you'll have the confidence to tackle complex challenges and optimize
                                            your applications for performance.
                                        </p>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="curriculum" className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Course Curriculum</CardTitle>
                                        <CardDescription>
                                            {modules.length || 8} sections • {course.lesson_count || 45} lectures • {formatDuration(course.duration)} total length
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {modules.length > 0 ? (
                                            modules.map((module, index) => (
                                                <div key={module.module_id} className="border rounded-lg">
                                                    <div className="p-4 border-b bg-gray-50">
                                                        <div className="flex items-center justify-between">
                                                            <h3 className="font-medium">
                                                                Section {index + 1}: {module.title}
                                                            </h3>
                                                            <span className="text-sm text-gray-600">
                                                                {module.lesson_count || 6} lectures • {formatDuration(module.duration)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="divide-y">
                                                        <div className="p-4 flex items-center justify-between">
                                                            <div className="flex items-center space-x-3">
                                                                <Play className="h-4 w-4 text-blue-600" />
                                                                <span className="text-sm">Course Introduction</span>
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                <span className="text-sm text-gray-600">5:30</span>
                                                                <Button variant="ghost" size="sm">
                                                                    Preview
                                                                </Button>
                                                            </div>
                                                        </div>
                                                        <div className="p-4 flex items-center justify-between">
                                                            <div className="flex items-center space-x-3">
                                                                <Lock className="h-4 w-4 text-gray-400" />
                                                                <span className="text-sm">Setting up the Development Environment</span>
                                                            </div>
                                                            <span className="text-sm text-gray-600">12:45</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="border rounded-lg">
                                                <div className="p-4 border-b bg-gray-50">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="font-medium">Section 1: Introduction to Advanced Patterns</h3>
                                                        <span className="text-sm text-gray-600">6 lectures • 1h 30m</span>
                                                    </div>
                                                </div>
                                                <div className="divide-y">
                                                    <div className="p-4 flex items-center justify-between">
                                                        <div className="flex items-center space-x-3">
                                                            <Play className="h-4 w-4 text-blue-600" />
                                                            <span className="text-sm">Course Introduction</span>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <span className="text-sm text-gray-600">5:30</span>
                                                            <Button variant="ghost" size="sm">
                                                                Preview
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <div className="p-4 flex items-center justify-between">
                                                        <div className="flex items-center space-x-3">
                                                            <Lock className="h-4 w-4 text-gray-400" />
                                                            <span className="text-sm">Setting up the Development Environment</span>
                                                        </div>
                                                        <span className="text-sm text-gray-600">12:45</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="reviews" className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Student Reviews</CardTitle>
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center space-x-1">
                                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                                <span className="text-lg font-bold">{course.rating || '4.8'}</span>
                                            </div>
                                            <span className="text-gray-600">{course.review_count || 456} reviews</span>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center space-x-4">
                                                <Avatar>
                                                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                                                    <AvatarFallback>JD</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-2 mb-1">
                                                        <span className="font-medium">John Doe</span>
                                                        <div className="flex">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-gray-600">
                                                        Excellent course! The instructor explains complex concepts in a very clear way.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="instructor" className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>About the Instructor</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-start space-x-4">
                                            <Avatar className="h-16 w-16">
                                                <AvatarImage src="/placeholder.svg?height=64&width=64" />
                                                <AvatarFallback>
                                                    {course.instructor_name ? course.instructor_name.charAt(0).toUpperCase() : 'SJ'}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold">{course.instructor_name || 'Sarah Johnson'}</h3>
                                                <p className="text-gray-600 mb-4">Senior Developer & Course Instructor</p>
                                                <p className="text-sm text-gray-700">
                                                    {course.instructor_bio || 'Sarah has over 8 years of experience in frontend development and has been working with modern frameworks since their early days. She\'s passionate about teaching and helping developers grow their skills.'}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Course Features</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center space-x-2 text-sm">
                                    <Clock className="h-4 w-4 text-gray-600" />
                                    <span>{formatDuration(course.duration)} on-demand video</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm">
                                    <Download className="h-4 w-4 text-gray-600" />
                                    <span>Downloadable resources</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm">
                                    <BookOpen className="h-4 w-4 text-gray-600" />
                                    <span>{course.lesson_count || 45} coding exercises</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm">
                                    <Award className="h-4 w-4 text-gray-600" />
                                    <span>Certificate of completion</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm">
                                    <MessageSquare className="h-4 w-4 text-gray-600" />
                                    <span>Q&A support</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
