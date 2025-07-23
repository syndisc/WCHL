import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, Award, TrendingUp, Play, Calendar, AlertCircle, Star, ChevronRight, Target, Zap, Trophy } from "lucide-react"

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dummy data
  const dummyUserInfo = {
    name: "Sarah Johnson",
    avatar: "SJ",
    level: "Advanced Learner",
    streak: 12
  };

  const dummyDashboardData = {
    enrolled_courses: 8,
    completed_courses: 15,
    pending_assignments: 4,
    certificates: 12,
    learning_streak: 12,
    study_hours: 127,
    half_progress_courses: [
      {
        course_id: "course_001",
        course_name: "Advanced React Development",
        course_description: "Master React hooks, context, and advanced patterns",
        rating: 4.2,
        progress: 68,
        thumbnail_color: "bg-gradient-to-br from-blue-500 to-blue-600"
      },
      {
        course_id: "course_002", 
        course_name: "Machine Learning Fundamentals",
        course_description: "Learn the basics of ML algorithms and data science",
        rating: 3.8,
        progress: 45,
        thumbnail_color: "bg-gradient-to-br from-purple-500 to-purple-600"
      },
      {
        course_id: "course_003",
        course_name: "UI/UX Design Principles",
        course_description: "Create beautiful and intuitive user interfaces",
        rating: 4.0,
        progress: 32,
        thumbnail_color: "bg-gradient-to-br from-pink-500 to-pink-600"
      }
    ],
    upcoming_deadlines: [
      {
        assignment_id: "assignment_001",
        title: "React Component Assignment",
        course_name: "Advanced React Development",
        deadline_date: Date.now() * 1000000 + (2 * 24 * 60 * 60 * 1000000000), // 2 days from now
        type: "Project"
      },
      {
        assignment_id: "assignment_002",
        title: "ML Model Training Quiz",
        course_name: "Machine Learning Fundamentals", 
        deadline_date: Date.now() * 1000000 + (5 * 24 * 60 * 60 * 1000000000), // 5 days from now
        type: "Quiz"
      },
      {
        assignment_id: "assignment_003",
        title: "Design System Creation",
        course_name: "UI/UX Design Principles",
        deadline_date: Date.now() * 1000000 + (10 * 24 * 60 * 60 * 1000000000), // 10 days from now
        type: "Portfolio"
      }
    ],
    recent_finished_courses: [
      {
        course_id: "course_finished_001",
        course_name: "JavaScript ES6+ Mastery",
        duration_days: 14,
        rating: 5,
        completed_date: "3 days ago"
      },
      {
        course_id: "course_finished_002", 
        course_name: "CSS Grid & Flexbox",
        duration_days: 7,
        rating: 4,
        completed_date: "1 week ago"
      },
      {
        course_id: "course_finished_003",
        course_name: "Node.js Backend Development",
        duration_days: 21,
        rating: 5,
        completed_date: "2 weeks ago"
      }
    ],
    achievements: [
      { id: 1, title: "Speed Learner", description: "Completed 3 courses this month", icon: "⚡" },
      { id: 2, title: "Consistent", description: "12-day learning streak", icon: "🔥" },
      { id: 3, title: "High Achiever", description: "Maintained 4.5+ rating", icon: "🏆" }
    ]
  };

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setUserInfo(dummyUserInfo);
      setDashboardData(dummyDashboardData);
      setLoading(false);
    }, 1000);
  }, []);

  const getDeadlineUrgency = (deadlineTimestamp) => {
    const now = Date.now() * 1000000;
    const diff = deadlineTimestamp - now;
    const days = Math.floor(diff / (24 * 60 * 60 * 1000000000));
    
    if (days <= 2) return { variant: "destructive", label: "Urgent", bgColor: "bg-red-50 border-red-200", textColor: "text-red-700" };
    if (days <= 7) return { variant: "secondary", label: "Pending", bgColor: "bg-yellow-50 border-yellow-200", textColor: "text-yellow-700" };
    return { variant: "default", label: "Scheduled", bgColor: "bg-blue-50 border-blue-200", textColor: "text-blue-700" };
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-3 w-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="animate-pulse">
            <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl w-1/2 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded-lg w-1/3"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section with Enhanced Design */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center text-2xl font-bold backdrop-blur-sm">
                    {userInfo?.avatar}
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold mb-2">
                      Welcome back, {userInfo?.name}! 🎉
                    </h1>
                    <p className="text-xl text-blue-100 flex items-center">
                      {/* <Fire className="h-5 w-5 mr-2 text-orange-300" /> */}
                      {userInfo?.streak} day learning streak
                    </p>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="flex space-x-4">
                  {dashboardData?.achievements?.slice(0, 2).map((achievement) => (
                    <div key={achievement.id} className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 text-center">
                      <div className="text-2xl mb-2">{achievement.icon}</div>
                      <div className="text-sm font-medium">{achievement.title}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-blue-900">Enrolled Courses</CardTitle>
              <div className="p-2 bg-blue-500 rounded-lg">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900 mb-1">{dashboardData?.enrolled_courses}</div>
              <p className="text-sm text-blue-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +2 this month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-green-900">Completed</CardTitle>
              <div className="p-2 bg-green-500 rounded-lg">
                <Award className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-900 mb-1">{dashboardData?.completed_courses}</div>
              <p className="text-sm text-green-600 flex items-center">
                <Trophy className="h-3 w-3 mr-1" />
                Great progress!
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-orange-900">Pending Tasks</CardTitle>
              <div className="p-2 bg-orange-500 rounded-lg">
                <Clock className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-900 mb-1">{dashboardData?.pending_assignments}</div>
              <p className="text-sm text-orange-600 flex items-center">
                <Target className="h-3 w-3 mr-1" />
                Stay focused
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-purple-900">Certificates</CardTitle>
              <div className="p-2 bg-purple-500 rounded-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-900 mb-1">{dashboardData?.certificates}</div>
              <p className="text-sm text-purple-600 flex items-center">
                <Zap className="h-3 w-3 mr-1" />
                Well earned!
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Enhanced Continue Learning Section */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                <Play className="h-6 w-6 mr-2 text-blue-600" />
                Continue Learning
              </CardTitle>
              <CardDescription className="text-gray-600">Pick up where you left off</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {dashboardData?.half_progress_courses?.map((course, index) => (
                  <div key={course.course_id} className="group hover:bg-gray-50 -mx-2 p-4 rounded-xl transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className={`w-14 h-14 ${course.thumbnail_color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                        <BookOpen className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{course.course_name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{course.course_description}</p>
                        <div className="flex items-center space-x-3 mb-2">
                          <Progress value={course.progress} className="flex-1 h-2" />
                          <span className="text-sm font-medium text-gray-700">{course.progress}%</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {renderStars(course.rating)}
                          <span className="text-sm text-gray-600 ml-2">{course.rating}/5</span>
                        </div>
                      </div>
                      <Button size="sm" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md group-hover:shadow-lg transition-all duration-300">
                        <Play className="h-4 w-4 mr-1" />
                        Continue
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Upcoming Deadlines */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 rounded-t-lg">
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                <Calendar className="h-6 w-6 mr-2 text-orange-600" />
                Upcoming Deadlines
              </CardTitle>
              <CardDescription className="text-gray-600">Don't miss these important dates</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {dashboardData?.upcoming_deadlines?.map((assignment) => {
                  const urgency = getDeadlineUrgency(assignment.deadline_date);
                  const daysLeft = Math.ceil((assignment.deadline_date - Date.now() * 1000000) / (24 * 60 * 60 * 1000000000));
                  
                  return (
                    <div key={assignment.assignment_id} className={`${urgency.bgColor} border rounded-xl p-4 hover:shadow-md transition-all duration-300`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${urgency.variant === 'destructive' ? 'bg-red-100' : urgency.variant === 'secondary' ? 'bg-yellow-100' : 'bg-blue-100'}`}>
                            <Calendar className={`h-5 w-5 ${urgency.variant === 'destructive' ? 'text-red-600' : urgency.variant === 'secondary' ? 'text-yellow-600' : 'text-blue-600'}`} />
                          </div>
                          <div>
                            <p className={`font-semibold ${urgency.textColor}`}>{assignment.title}</p>
                            <p className="text-sm text-gray-600">{assignment.course_name}</p>
                            <p className="text-sm text-gray-500">Due in {daysLeft} day{daysLeft !== 1 ? 's' : ''}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={urgency.variant} className="font-medium">{urgency.label}</Badge>
                          <Badge variant="outline" className="text-xs">{assignment.type}</Badge>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Recent Activity */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
              <Trophy className="h-6 w-6 mr-2 text-green-600" />
              Recent Achievements
            </CardTitle>
            <CardDescription className="text-gray-600">Your completed courses and accomplishments</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dashboardData?.recent_finished_courses?.map((course, index) => (
                <div key={course.course_id} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-green-500' : index === 1 ? 'bg-blue-500' : 'bg-purple-500'} animate-pulse`}></div>
                    <div className="flex items-center space-x-1">
                      {renderStars(course.rating)}
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{course.course_name}</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {course.duration_days} day{course.duration_days !== 1 ? 's' : ''}
                    </p>
                    <p className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Completed {course.completed_date}
                    </p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-green-200">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      ✨ Completed
                    </Badge>
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