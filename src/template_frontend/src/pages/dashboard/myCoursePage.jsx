import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Progress } from "../../components/ui/progress"
import { Badge } from "../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Clock, Users, Star, Play, Download, AlertCircle, BookOpen } from "lucide-react"
import { useLMS } from "../../hooks/useLMS"

export default function MyCoursesPage() {
  const { getMyCourses, browseCourses, loading, error } = useLMS();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [loadingError, setLoadingError] = useState("");

  useEffect(() => {
    const loadCourses = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setLoadingError("No authentication token found");
        return;
      }

      try {
        // Get enrolled courses
        const enrolledResult = await getMyCourses(token);
        if (enrolledResult.success) {
          setEnrolledCourses(enrolledResult.data);
        } else {
          setLoadingError(enrolledResult.error || "Failed to load enrolled courses");
        }

        // Get available courses for browsing
        const browseResult = await browseCourses(token);
        if (browseResult.success) {
          setAvailableCourses(browseResult.data);
        }
      } catch (err) {
        setLoadingError("An unexpected error occurred");
        console.error("Courses loading error:", err);
      }
    };

    loadCourses();
  }, [getMyCourses, browseCourses]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge variant="secondary">Completed</Badge>;
      case 'active':
        return <Badge>In Progress</Badge>;
      case 'inactive':
        return <Badge variant="outline">Paused</Badge>;
      default:
        return <Badge>Enrolled</Badge>;
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 50) return "bg-blue-500";
    if (progress >= 20) return "bg-yellow-500";
    return "bg-gray-300";
  };

  const CourseCard = ({ courseData, isEnrolled = true }) => {
    const { course, progress, enrollment_status } = courseData;
    
    return (
      <Card>
        <div className="aspect-video relative">
          <img
            src={course.course_thumbnail || "/placeholder.svg?height=200&width=300"}
            alt="Course thumbnail"
            className="w-full h-full object-cover rounded-t-lg"
          />
          <div className="absolute top-2 right-2">
            {isEnrolled ? getStatusBadge(enrollment_status) : <Badge variant="outline">Available</Badge>}
          </div>
        </div>
        <CardHeader>
          <CardTitle className="text-lg">{course.course_name}</CardTitle>
          <CardDescription>{course.course_description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration_days} days</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{course.student_count} students</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{course.rating.toFixed(1)}</span>
            </div>
          </div>
          
          {isEnrolled && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          )}
          
          <div className="flex space-x-2">
            {isEnrolled ? (
              <>
                <Button className="flex-1">
                  <Play className="h-4 w-4 mr-2" />
                  {enrollment_status === 'completed' ? 'Review' : 'Continue'}
                </Button>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button className="flex-1">Enroll Now</Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <div className="animate-pulse">
                <div className="aspect-video bg-gray-200 rounded-t-lg"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (loadingError || error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-md">
          <AlertCircle className="h-5 w-5" />
          <span>{loadingError || error}</span>
        </div>
      </div>
    );
  }

  const enrolledCoursesData = enrolledCourses || [];
  const completedCourses = enrolledCoursesData.filter(c => c.enrollment_status === 'completed');
  const activeCourses = enrolledCoursesData.filter(c => c.enrollment_status !== 'completed');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
        <p className="text-gray-600 mt-2">Manage your enrolled courses and track progress</p>
      </div>

      <Tabs defaultValue="enrolled" className="space-y-6">
        <TabsList>
          <TabsTrigger value="enrolled">Enrolled ({activeCourses.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedCourses.length})</TabsTrigger>
          <TabsTrigger value="browse">Browse ({availableCourses.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="enrolled" className="space-y-6">
          {activeCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeCourses.map((courseData) => (
                <CourseCard key={courseData.course.course_id} courseData={courseData} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No enrolled courses</h3>
              <p className="text-gray-600 mb-4">Start your learning journey by enrolling in a course</p>
              <Button>Browse Courses</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          {completedCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedCourses.map((courseData) => (
                <CourseCard key={courseData.course.course_id} courseData={courseData} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Star className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No completed courses yet</h3>
              <p className="text-gray-600 mb-4">Complete your first course to earn certificates</p>
              <Button>View Enrolled Courses</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="browse" className="space-y-6">
          {availableCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableCourses.map((course) => (
                <CourseCard 
                  key={course.course_id} 
                  courseData={{ course, progress: 0, enrollment_status: 'available' }} 
                  isEnrolled={false}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses available</h3>
              <p className="text-gray-600">Check back later for new courses</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
