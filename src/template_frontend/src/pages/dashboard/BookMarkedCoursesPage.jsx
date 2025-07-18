import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Clock, Users, Star, Play, Download, BookOpen, AlertCircle, Loader2, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useLMS } from "../../hooks/useLMS";

export default function BookmarkedCoursesPage() {
    const { getEnrolledCourses, getCourseProgress, loading, error } = useLMS();
    const [bookmarkedCourses, setBookmarkedCourses] = useState([]);
    const [coursesWithProgress, setCoursesWithProgress] = useState([]);
    const [loadingError, setLoadingError] = useState('');
    const [isLoadingProgress, setIsLoadingProgress] = useState(false);

    useEffect(() => {
        loadBookmarkedCourses();
    }, []);

    const loadBookmarkedCourses = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            setLoadingError("No authentication token found");
            return;
        }

        try {
            // For now, we'll use enrolled courses as bookmarked courses
            // In a real implementation, you'd have a separate bookmarks system
            const result = await getEnrolledCourses(token);
            if (result.success) {
                setBookmarkedCourses(result.data);
                await loadProgressForCourses(result.data, token);
            } else {
                setLoadingError(result.error || "Failed to load bookmarked courses");
            }
        } catch (err) {
            setLoadingError("An unexpected error occurred");
            console.error("Bookmarked courses loading error:", err);
        }
    };

    const loadProgressForCourses = async (courses, token) => {
        setIsLoadingProgress(true);
        const coursesWithProgressData = [];

        for (const course of courses) {
            try {
                const progressResult = await getCourseProgress(token, course.course_id);
                let progressPercentage = 0;
                
                if (progressResult.success && progressResult.data) {
                    // Calculate progress percentage based on completed modules/lessons
                    const progress = progressResult.data;
                    if (progress.total_modules > 0) {
                        progressPercentage = Math.round((progress.completed_modules / progress.total_modules) * 100);
                    }
                }

                coursesWithProgressData.push({
                    ...course,
                    progress: progressPercentage
                });
            } catch (err) {
                console.error(`Error loading progress for course ${course.course_id}:`, err);
                // Still add the course but with 0 progress
                coursesWithProgressData.push({
                    ...course,
                    progress: 0
                });
            }
        }

        setCoursesWithProgress(coursesWithProgressData);
        setIsLoadingProgress(false);
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

    if (loading || isLoadingProgress) {
        return (
            <div className="space-y-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                    <div className="h-12 bg-gray-200 rounded mb-6"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, i) => (
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
                <h1 className="text-3xl font-bold text-gray-900">Bookmarked Courses</h1>
                <p className="text-gray-600 mt-2">These are the courses you've bookmarked for later</p>
            </div>

            {/* Error Message */}
            {(loadingError || error) && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-md">
                    <AlertCircle className="h-5 w-5" />
                    <span>{loadingError || error}</span>
                </div>
            )}

            <Tabs defaultValue="wishlist" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="wishlist">
                        Bookmarks ({coursesWithProgress.length})
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="wishlist" className="space-y-6">
                    {coursesWithProgress.length === 0 ? (
                        <div className="text-center py-12">
                            <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No Bookmarked Courses</h3>
                            <p className="text-gray-600 mb-4">
                                You haven't bookmarked any courses yet. Start exploring and bookmark courses you're interested in!
                            </p>
                            <Link to="/dashboard/browse">
                                <Button>Browse Courses</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {coursesWithProgress.map((course) => (
                                <Card key={course.course_id} className="hover:shadow-lg transition-shadow">
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
                                        <div className="absolute top-2 left-2 flex gap-2">
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
                                        <div className="absolute top-2 right-2">
                                            <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
                                                <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                                            </Button>
                                        </div>
                                    </div>
                                    <CardHeader>
                                        <CardTitle className="text-lg">
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
                                        
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span>Progress</span>
                                                <span>{course.progress}%</span>
                                            </div>
                                            <Progress value={course.progress} />
                                        </div>
                                        
                                        <p className="text-sm text-gray-600">
                                            By {course.instructor_name || 'Unknown Instructor'}
                                        </p>
                                        
                                        <div className="flex space-x-2">
                                            <Link to={`/course/${course.course_id}`} className="flex-1">
                                                <Button className="w-full">
                                                    <Play className="h-4 w-4 mr-2" />
                                                    {course.progress > 0 ? 'Continue' : 'Start'}
                                                </Button>
                                            </Link>
                                            <Button variant="outline" size="icon">
                                                <Download className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}