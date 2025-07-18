import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Users, AlertCircle, BookOpen, Loader2 } from "lucide-react";
import { useLMS } from "../../hooks/useLMS";

export default function ClassmatesPage() {
    const { getEnrolledCourses, getCourseStudents, loading, error } = useLMS();
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [coursesWithClassmates, setCoursesWithClassmates] = useState([]);
    const [loadingError, setLoadingError] = useState('');
    const [isLoadingClassmates, setIsLoadingClassmates] = useState(false);

    useEffect(() => {
        loadEnrolledCourses();
    }, []);

    const loadEnrolledCourses = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            setLoadingError("No authentication token found");
            return;
        }

        try {
            const result = await getEnrolledCourses(token);
            if (result.success) {
                setEnrolledCourses(result.data);
                await loadClassmatesForCourses(result.data, token);
            } else {
                setLoadingError(result.error || "Failed to load enrolled courses");
            }
        } catch (err) {
            setLoadingError("An unexpected error occurred");
            console.error("Enrolled courses loading error:", err);
        }
    };

    const loadClassmatesForCourses = async (courses, token) => {
        setIsLoadingClassmates(true);
        const coursesWithStudents = [];

        for (const course of courses) {
            try {
                const studentsResult = await getCourseStudents(token, course.course_id);
                if (studentsResult.success) {
                    // Filter out the current user from classmates
                    const currentUserId = localStorage.getItem('userId');
                    const classmates = studentsResult.data.filter(student => 
                        student.user_id !== currentUserId
                    );

                    coursesWithStudents.push({
                        ...course,
                        classmates: classmates
                    });
                }
            } catch (err) {
                console.error(`Error loading students for course ${course.course_id}:`, err);
                // Still add the course but with empty classmates
                coursesWithStudents.push({
                    ...course,
                    classmates: []
                });
            }
        }

        setCoursesWithClassmates(coursesWithStudents);
        setIsLoadingClassmates(false);
    };

    const getInitials = (firstName, lastName) => {
        const first = firstName ? firstName.charAt(0).toUpperCase() : '';
        const last = lastName ? lastName.charAt(0).toUpperCase() : '';
        return first + last || 'U';
    };

    if (loading || isLoadingClassmates) {
        return (
            <div className="p-6 max-w-5xl mx-auto space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                            <Users className="w-5 h-5 text-blue-600" />
                            My Classmates
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-center py-12">
                            <div className="text-center">
                                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
                                <p className="text-gray-600">Loading your classmates...</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                        <Users className="w-5 h-5 text-blue-600" />
                        My Classmates
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Error Message */}
                    {(loadingError || error) && (
                        <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-md">
                            <AlertCircle className="h-5 w-5" />
                            <span>{loadingError || error}</span>
                        </div>
                    )}

                    {/* No Courses Message */}
                    {coursesWithClassmates.length === 0 && !loadingError && !error && (
                        <div className="text-center py-12">
                            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No Enrolled Courses</h3>
                            <p className="text-gray-600">
                                You need to enroll in courses to see your classmates.
                            </p>
                        </div>
                    )}

                    {/* Courses with Classmates */}
                    {coursesWithClassmates.map((course, index) => (
                        <div key={course.course_id || index} className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    {course.title || course.course_name || `Course ${index + 1}`}
                                </h2>
                                <span className="text-sm text-gray-500">
                                    {course.classmates.length} classmate{course.classmates.length !== 1 ? 's' : ''}
                                </span>
                            </div>

                            {course.classmates.length === 0 ? (
                                <div className="text-center py-8 bg-gray-50 rounded-lg">
                                    <Users className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-gray-600">No other students in this course yet</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {course.classmates.map((student, idx) => (
                                        <div
                                            key={student.user_id || idx}
                                            className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg border hover:bg-gray-100 transition-colors"
                                        >
                                            <Avatar>
                                                <AvatarImage src={student.avatar || "/placeholder.svg"} />
                                                <AvatarFallback>
                                                    {getInitials(student.first_name, student.last_name)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-gray-800 truncate">
                                                    {student.first_name && student.last_name 
                                                        ? `${student.first_name} ${student.last_name}`
                                                        : student.email || 'Unknown Student'
                                                    }
                                                </p>
                                                <p className="text-sm text-gray-500 truncate">
                                                    {student.email || 'No email available'}
                                                </p>
                                                {student.role && (
                                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                                                        {student.role.charAt(0).toUpperCase() + student.role.slice(1)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
