import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Progress } from "../../components/ui/progress"
import { BookOpen, Users, DollarSign, Plus, Eye, MessageSquare, Star, AlertCircle, TrendingUp, Clock } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useLMS } from "../../hooks/useLMS"

// Dummy data
const dummyDashboardData = {
  total_students: 847,
  total_revenue: 12450,
  average_rating: 4.7,
  total_reviews: 156,
  recent_activities: [
    {
      description: "New student enrolled in React Advanced Course",
      timestamp: Date.now() * 1000000 - 1800000000000 // 30 minutes ago
    },
    {
      description: "Course 'JavaScript Fundamentals' received a 5-star review",
      timestamp: Date.now() * 1000000 - 3600000000000 // 1 hour ago
    },
    {
      description: "Assignment submitted for Python for Beginners",
      timestamp: Date.now() * 1000000 - 7200000000000 // 2 hours ago
    },
    {
      description: "New Q&A question posted in Data Structures course",
      timestamp: Date.now() * 1000000 - 14400000000000 // 4 hours ago
    },
    {
      description: "Course completion milestone reached: 100 students completed Vue.js Essentials",
      timestamp: Date.now() * 1000000 - 21600000000000 // 6 hours ago
    }
  ]
};

const dummyCourses = [
  {
    course_id: 1,
    title: "React Advanced Patterns",
    enrolled_students: 234,
    completion_rate: 78,
    revenue: 4680,
    rating: 4.8,
    status: "published",
    category: "Web Development"
  },
  {
    course_id: 2,
    title: "JavaScript Fundamentals",
    enrolled_students: 456,
    completion_rate: 92,
    revenue: 3650,
    rating: 4.6,
    status: "published",
    category: "Programming"
  },
  {
    course_id: 3,
    title: "Python for Data Science",
    enrolled_students: 189,
    completion_rate: 65,
    revenue: 2840,
    rating: 4.7,
    status: "published",
    category: "Data Science"
  },
  {
    course_id: 4,
    title: "Vue.js Complete Guide",
    enrolled_students: 123,
    completion_rate: 85,
    revenue: 1950,
    rating: 4.5,
    status: "published",
    category: "Web Development"
  },
  {
    course_id: 5,
    title: "Node.js Backend Development",
    enrolled_students: 67,
    completion_rate: 45,
    revenue: 890,
    rating: 4.3,
    status: "pending",
    category: "Backend Development"
  },
  {
    course_id: 6,
    title: "TypeScript Mastery",
    enrolled_students: 0,
    completion_rate: 0,
    revenue: 0,
    rating: null,
    status: "draft",
    category: "Programming"
  }
];

export default function InstructorDashboard() {
  const navigate = useNavigate();
  const { getInstructorDashboard, getInstructorCourses, loading, error } = useLMS();
  const [dashboardData, setDashboardData] = useState(dummyDashboardData);
  const [courses, setCourses] = useState(dummyCourses);
  const [loadingError, setLoadingError] = useState("");

  useEffect(() => {
    const loadDashboardData = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        // For demo purposes, we'll use dummy data even without token
        console.log("Using dummy data - no auth token");
        return;
      }

      try {
        // Load dashboard statistics
        const dashboardResult = await getInstructorDashboard(token);
        if (dashboardResult.success) {
          setDashboardData(dashboardResult.data);
        } else {
          // Fall back to dummy data on error
          console.log("Using dummy data - dashboard API failed");
        }

        // Load instructor courses
        const coursesResult = await getInstructorCourses(token);
        if (coursesResult.success) {
          setCourses(coursesResult.data);
        } else {
          // Fall back to dummy data on error
          console.log("Using dummy data - courses API failed");
        }
      } catch (err) {
        console.error("Dashboard loading error:", err);
        // Continue using dummy data
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
                {dashboardData?.total_students || 2340}
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
              <div className="text-2xl font-bold flex items-center gap-2">
                <img src="/token.png" className="w-6 h-6" alt="" srcset="" />
                {dashboardData?.total_revenue || 10220}
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
                {dashboardData?.average_rating ? dashboardData.average_rating.toFixed(1) : '2.5'}
              </div>
              <p className="text-xs text-muted-foreground">
                Based on {dashboardData?.total_reviews || 5} reviews
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
                      <div className="text-lg font-bold flex gap-2 text-black">
                        <img src="/token.png" className="w-6 h-6" alt="" srcset="" />
                        {course.revenue || 0}
                      </div>
                      <div className="text-sm text-gray-600">Revenue</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates from your courses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {dashboardData?.recent_activities?.slice(0, 5).map((activity, index) => (
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
          </CardContent>
        </Card>
      </div>
    </div>
  )
}