import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Progress } from "../../components/ui/progress"
import { Badge } from "../../components/ui/badge"
import { BookOpen, Clock, Award, TrendingUp, Play, Calendar, AlertCircle } from "lucide-react"
import { useLMS } from "../../hooks/useLMS"

export default function DashboardPage() {
  const { getStudentDashboard, getUserAttribute, loading, error } = useLMS();
  const [dashboardData, setDashboardData] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loadingError, setLoadingError] = useState("");

  useEffect(() => {
    const loadDashboardData = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setLoadingError("No authentication token found");
        return;
      }

      try {
        // Get user info
        const userResult = await getUserAttribute(token);
        if (userResult.success) {
          setUserInfo(userResult.data);
        }

        // Get dashboard data
        const dashboardResult = await getStudentDashboard(token);
        if (dashboardResult.success) {
          setDashboardData(dashboardResult.data);
        } else {
          setLoadingError(dashboardResult.error || "Failed to load dashboard data");
        }
      } catch (err) {
        setLoadingError("An unexpected error occurred");
        console.error("Dashboard loading error:", err);
      }
    };

    loadDashboardData();
  }, [getStudentDashboard, getUserAttribute]);

  const formatTimeAgo = (timestamp) => {
    const now = Date.now() * 1000000; // Convert to nanoseconds
    const diff = now - timestamp;
    const days = Math.floor(diff / (24 * 60 * 60 * 1000000000));
    
    if (days === 0) return "Today";
    if (days === 1) return "1 day ago";
    return `${days} days ago`;
  };

  const getDeadlineUrgency = (deadlineTimestamp) => {
    const now = Date.now() * 1000000; // Convert to nanoseconds
    const diff = deadlineTimestamp - now;
    const days = Math.floor(diff / (24 * 60 * 60 * 1000000000));
    
    if (days <= 2) return { variant: "destructive", label: "Urgent" };
    if (days <= 7) return { variant: "secondary", label: "Pending" };
    return { variant: "default", label: "Scheduled" };
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </CardContent>
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

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {userInfo?.name || "Student"}!
        </h1>
        <p className="text-gray-600 mt-2">Continue your learning journey</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData?.enrolled_courses || 0}</div>
            <p className="text-xs text-muted-foreground">Active enrollments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData?.completed_courses || 0}</div>
            <p className="text-xs text-muted-foreground">Courses finished</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData?.pending_assignments || 0}</div>
            <p className="text-xs text-muted-foreground">Assignments due</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificates</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData?.certificates || 0}</div>
            <p className="text-xs text-muted-foreground">Earned certificates</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Continue Learning */}
        <Card>
          <CardHeader>
            <CardTitle>Continue Learning</CardTitle>
            <CardDescription>Pick up where you left off</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {dashboardData?.half_progress_courses?.length > 0 ? (
                dashboardData.half_progress_courses.slice(0, 2).map((course, index) => (
                  <div key={course.course_id} className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${index === 0 ? 'bg-blue-100' : 'bg-green-100'} rounded-lg flex items-center justify-center`}>
                      <BookOpen className={`h-6 w-6 ${index === 0 ? 'text-blue-600' : 'text-green-600'}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{course.course_name}</h3>
                      <p className="text-sm text-gray-600">{course.course_description}</p>
                      <Progress value={Math.floor(course.rating * 20)} className="mt-2" />
                    </div>
                    <Button size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      Continue
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No courses in progress</p>
                  <p className="text-sm">Start a new course to see your progress here</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Don't miss these important dates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {dashboardData?.upcoming_deadlines?.length > 0 ? (
                dashboardData.upcoming_deadlines.slice(0, 3).map((assignment) => {
                  const urgency = getDeadlineUrgency(assignment.deadline_date);
                  const daysLeft = Math.ceil((assignment.deadline_date - Date.now() * 1000000) / (24 * 60 * 60 * 1000000000));
                  
                  return (
                    <div key={assignment.assignment_id} className={`flex items-center justify-between p-3 ${
                      urgency.variant === 'destructive' ? 'bg-red-50' : 
                      urgency.variant === 'secondary' ? 'bg-yellow-50' : 'bg-blue-50'
                    } rounded-lg`}>
                      <div className="flex items-center space-x-3">
                        <Calendar className={`h-5 w-5 ${
                          urgency.variant === 'destructive' ? 'text-red-600' : 
                          urgency.variant === 'secondary' ? 'text-yellow-600' : 'text-blue-600'
                        }`} />
                        <div>
                          <p className="font-medium">Assignment #{assignment.assignment_id.split('_')[1]}</p>
                          <p className="text-sm text-gray-600">Due in {daysLeft} day{daysLeft !== 1 ? 's' : ''}</p>
                        </div>
                      </div>
                      <Badge variant={urgency.variant}>{urgency.label}</Badge>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No upcoming deadlines</p>
                  <p className="text-sm">You're all caught up!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recently Finished Courses</CardTitle>
          <CardDescription>Your completed courses from the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dashboardData?.recent_finished_courses?.length > 0 ? (
              dashboardData.recent_finished_courses.map((course, index) => (
                <div key={course.course_id} className="flex items-center space-x-4">
                  <div className={`w-2 h-2 ${
                    index === 0 ? 'bg-green-500' : 
                    index === 1 ? 'bg-blue-500' : 'bg-purple-500'
                  } rounded-full`}></div>
                  <div className="flex-1">
                    <p className="text-sm">Completed "{course.course_name}" course</p>
                    <p className="text-xs text-gray-500">
                      {course.duration_days} day{course.duration_days !== 1 ? 's' : ''} • 
                      Rating: {course.rating}/5 stars
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Award className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No recently completed courses</p>
                <p className="text-sm">Complete a course to see your achievements here</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
