import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Progress } from "../../components/ui/progress"
import { BookOpen, Users, DollarSign, Plus, Eye, MessageSquare, Star, AlertCircle, TrendingUp, Clock } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useLMS } from "../../hooks/useLMS"

export default function InstructorDashboard() {
  const navigate = useNavigate();
  const { getInstructorDashboard, getInstructorCourses, loading, error } = useLMS();
  const [dashboardData, setDashboardData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loadingError, setLoadingError] = useState("");

  useEffect(() => {
    const loadDashboardData = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setLoadingError("No authentication token found");
        return;
      }

      try {
        // Load dashboard statistics
        const dashboardResult = await getInstructorDashboard(token);
        if (dashboardResult.success) {
          setDashboardData(dashboardResult.data);
        } else {
          setLoadingError(dashboardResult.error || "Failed to load dashboard data");
        }

        // Load instructor courses
        const coursesResult = await getInstructorCourses(token);
        if (coursesResult.success) {
          setCourses(coursesResult.data);
        }
      } catch (err) {
        setLoadingError("An unexpected error occurred");
        console.error("Dashboard loading error:", err);
      }
    };

    loadDashboardData();
  }, [getInstructorDashboard, getInstructorCourses]);

  const handleCreateCourse = () => {
    navigate("/instructor/create-course");
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp / 1000000).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-100 text-green-800">Published</Badge>;
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending Review</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Instructor Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your courses and track your teaching performance</p>
          </div>
          <Button onClick={handleCreateCourse}>
            <Plus className="h-4 w-4 mr-2" />
            Create New Course
          </Button>
        </div>

        {/* Error Display */}
        {(loadingError || error) && (
          <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-md">
            <AlertCircle className="h-5 w-5" />
            <span>{loadingError || error}</span>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardData?.total_students || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Across all your courses
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {courses.filter(course => course.status === 'published').length}
              </div>
              <p className="text-xs text-muted-foreground">
                {courses.filter(course => course.status === 'pending').length} pending review
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${dashboardData?.total_revenue || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                This month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardData?.average_rating ? dashboardData.average_rating.toFixed(1) : 'N/A'}
              </div>
              <p className="text-xs text-muted-foreground">
                Based on {dashboardData?.total_reviews || 0} reviews
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Course Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Course Performance</CardTitle>
              <CardDescription>Your top performing courses this month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {courses.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No courses created yet</p>
                  <Button className="mt-4" onClick={handleCreateCourse}>
                    Create Your First Course
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {courses.slice(0, 3).map((course) => (
                    <div key={course.course_id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium">{course.title}</h3>
                        <p className="text-sm text-gray-600">
                          {course.enrolled_students || 0} students enrolled
                        </p>
                        <Progress value={course.completion_rate || 0} className="mt-2" />
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-lg font-bold text-green-600">
                          ${course.revenue || 0}
                        </div>
                        <div className="text-sm text-gray-600">Revenue</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates from your courses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {dashboardData?.recent_activities?.length > 0 ? (
                <div className="space-y-3">
                  {dashboardData.recent_activities.slice(0, 5).map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">{activity.description}</p>
                        <p className="text-xs text-gray-500">
                          <Clock className="h-3 w-3 inline mr-1" />
                          {formatDate(activity.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No recent activity</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Course Management */}
        <Card>
          <CardHeader>
            <CardTitle>My Courses</CardTitle>
            <CardDescription>Manage and monitor your published courses</CardDescription>
          </CardHeader>
          <CardContent>
            {courses.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No courses yet</h3>
                <p className="text-gray-600 mb-4">Create your first course to start teaching</p>
                <Button onClick={handleCreateCourse}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Course
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {courses.map((course) => (
                  <div key={course.course_id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{course.title}</h3>
                        <p className="text-sm text-gray-600">
                          {course.enrolled_students || 0} students • {course.rating ? `${course.rating} rating` : 'No ratings yet'}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          {getStatusBadge(course.status)}
                          <Badge variant="outline">{course.category || 'General'}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Q&A
                      </Button>
                      <Button size="sm">Edit</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
