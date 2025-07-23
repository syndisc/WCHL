import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Users, Star, Play, Download, AlertCircle, BookOpen, Award, TrendingUp, Filter, Search, Calendar, User } from "lucide-react"

// Dummy data for enrolled courses
const dummyEnrolledCourses = [
  {
    course: {
      course_id: "cs101",
      course_name: "Introduction to Computer Science",
      course_description: "Learn the fundamentals of programming and computer science concepts including algorithms, data structures, and problem-solving techniques.",
      course_thumbnail: "/placeholder.svg?height=200&width=300",
      duration_days: 90,
      student_count: 1247,
      rating: 4.8,
      instructor: "Dr. Sarah Johnson",
      category: "Technology",
      level: "Beginner"
    },
    progress: 75,
    enrollment_status: "active",
    enrolled_date: "2024-09-15",
    last_accessed: "2 hours ago"
  },
  {
    course: {
      course_id: "math201",
      course_name: "Advanced Calculus",
      course_description: "Master advanced calculus concepts including multivariable calculus, vector analysis, and differential equations.",
      course_thumbnail: "/placeholder.svg?height=200&width=300",
      duration_days: 120,
      student_count: 892,
      rating: 4.6,
      instructor: "Prof. Michael Chen",
      category: "Mathematics",
      level: "Advanced"
    },
    progress: 45,
    enrollment_status: "active",
    enrolled_date: "2024-10-01",
    last_accessed: "1 day ago"
  },
  {
    course: {
      course_id: "eng150",
      course_name: "Business Communication",
      course_description: "Develop professional communication skills for the workplace including presentations, reports, and interpersonal communication.",
      course_thumbnail: "/placeholder.svg?height=200&width=300",
      duration_days: 60,
      student_count: 2156,
      rating: 4.7,
      instructor: "Dr. Lisa Martinez",
      category: "Business",
      level: "Intermediate"
    },
    progress: 100,
    enrollment_status: "completed",
    enrolled_date: "2024-08-10",
    last_accessed: "Completed",
    completion_date: "2024-10-15"
  },
  {
    course: {
      course_id: "art101",
      course_name: "Digital Design Fundamentals",
      course_description: "Explore the principles of digital design, typography, color theory, and modern design tools.",
      course_thumbnail: "/placeholder.svg?height=200&width=300",
      duration_days: 75,
      student_count: 1834,
      rating: 4.9,
      instructor: "Emma Rodriguez",
      category: "Design",
      level: "Beginner"
    },
    progress: 100,
    enrollment_status: "completed",
    enrolled_date: "2024-07-20",
    last_accessed: "Completed",
    completion_date: "2024-09-28"
  },
  {
    course: {
      course_id: "py201",
      course_name: "Python for Data Science",
      course_description: "Learn Python programming specifically for data analysis, visualization, and machine learning applications.",
      course_thumbnail: "/placeholder.svg?height=200&width=300",
      duration_days: 100,
      student_count: 3421,
      rating: 4.8,
      instructor: "Dr. James Wilson",
      category: "Technology",
      level: "Intermediate"
    },
    progress: 30,
    enrollment_status: "active",
    enrolled_date: "2024-10-20",
    last_accessed: "3 hours ago"
  }
];

// Dummy data for available courses
const dummyAvailableCourses = [
  {
    course_id: "web301",
    course_name: "Full-Stack Web Development",
    course_description: "Build complete web applications using modern frameworks including React, Node.js, and database integration.",
    course_thumbnail: "/placeholder.svg?height=200&width=300",
    duration_days: 150,
    student_count: 2847,
    rating: 4.9,
    instructor: "Alex Thompson",
    category: "Technology",
    level: "Advanced",
    price: "$199"
  },
  {
    course_id: "mkt201",
    course_name: "Digital Marketing Mastery",
    course_description: "Master digital marketing strategies including SEO, social media marketing, content creation, and analytics.",
    course_thumbnail: "/placeholder.svg?height=200&width=300",
    duration_days: 80,
    student_count: 1956,
    rating: 4.7,
    instructor: "Maria Garcia",
    category: "Marketing",
    level: "Intermediate",
    price: "$149"
  },
  {
    course_id: "ai101",
    course_name: "Artificial Intelligence Basics",
    course_description: "Introduction to AI concepts, machine learning fundamentals, and practical applications in various industries.",
    course_thumbnail: "/placeholder.svg?height=200&width=300",
    duration_days: 110,
    student_count: 4321,
    rating: 4.8,
    instructor: "Dr. Kevin Park",
    category: "Technology",
    level: "Beginner",
    price: "$299"
  },
  {
    course_id: "fin101",
    course_name: "Personal Finance Management",
    course_description: "Learn essential personal finance skills including budgeting, investing, retirement planning, and wealth building.",
    course_thumbnail: "/placeholder.svg?height=200&width=300",
    duration_days: 45,
    student_count: 1643,
    rating: 4.6,
    instructor: "Robert Kim",
    category: "Finance",
    level: "Beginner",
    price: "$99"
  },
  {
    course_id: "photo201",
    course_name: "Professional Photography",
    course_description: "Master photography techniques, composition, lighting, and post-processing for professional-quality images.",
    course_thumbnail: "/placeholder.svg?height=200&width=300",
    duration_days: 90,
    student_count: 987,
    rating: 4.9,
    instructor: "Sophie Anderson",
    category: "Creative",
    level: "Intermediate",
    price: "$179"
  },
  {
    course_id: "lang101",
    course_name: "Spanish for Beginners",
    course_description: "Start your Spanish learning journey with practical conversations, grammar basics, and cultural insights.",
    course_thumbnail: "/placeholder.svg?height=200&width=300",
    duration_days: 120,
    student_count: 2134,
    rating: 4.5,
    instructor: "Carlos Hernandez",
    category: "Language",
    level: "Beginner",
    price: "$129"
  }
];

export default function MyCoursesPage() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setEnrolledCourses(dummyEnrolledCourses);
      setAvailableCourses(dummyAvailableCourses);
      setLoading(false);
    }, 1500);
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      case 'active':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">In Progress</Badge>;
      case 'inactive':
        return <Badge variant="outline">Paused</Badge>;
      default:
        return <Badge>Enrolled</Badge>;
    }
  };

  const getLevelBadge = (level) => {
    const colors = {
      'Beginner': 'bg-green-100 text-green-800',
      'Intermediate': 'bg-yellow-100 text-yellow-800',
      'Advanced': 'bg-red-100 text-red-800'
    };
    return <Badge className={`${colors[level]} hover:${colors[level]}`}>{level}</Badge>;
  };

  const CourseCard = ({ courseData, isEnrolled = true }) => {
    const course = courseData.course || courseData;
    const progress = courseData.progress || 0;
    const enrollmentStatus = courseData.enrollment_status || 'available';
    
    return (
      <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md overflow-hidden">
        <div className="aspect-video relative overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-white opacity-80" />
          </div>
          <div className="absolute top-3 right-3 flex gap-2">
            {isEnrolled ? getStatusBadge(enrollmentStatus) : getLevelBadge(course.level)}
          </div>
          <div className="absolute top-3 left-3">
            <Badge className="bg-black/50 text-white hover:bg-black/50">
              {course.category}
            </Badge>
          </div>
        </div>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-xl group-hover:text-blue-600 transition-colors line-clamp-2">
                {course.course_name}
              </CardTitle>
              <CardDescription className="mt-2 line-clamp-2 text-gray-600">
                {course.course_description}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-3">
            <User className="h-4 w-4" />
            <span>{course.instructor}</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration_days} days</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{course.student_count.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{course.rating}</span>
            </div>
          </div>
          
          {isEnrolled && enrollmentStatus !== 'available' && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress 
                value={progress} 
                className="h-2"
              />
              {courseData.last_accessed && (
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Last accessed: {courseData.last_accessed}
                </p>
              )}
            </div>
          )}

          {!isEnrolled && course.price && (
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-green-600">{course.price}</span>
              <span className="text-sm text-gray-500 line-through">$299</span>
            </div>
          )}
          
          <div className="flex space-x-2 pt-2">
            {isEnrolled ? (
              <>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <Play className="h-4 w-4 mr-2" />
                  {enrollmentStatus === 'completed' ? 'Review' : 'Continue'}
                </Button>
                <Button variant="outline" size="icon" className="border-gray-200">
                  <Download className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                Enroll Now
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const filteredAvailableCourses = availableCourses.filter(course => {
    const matchesSearch = course.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.course_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(availableCourses.map(course => course.category))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-200 rounded w-1/3"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="aspect-video bg-gray-200"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const activeCourses = enrolledCourses.filter(c => c.enrollment_status !== 'completed');
  const completedCourses = enrolledCourses.filter(c => c.enrollment_status === 'completed');
  const totalProgress = enrolledCourses.reduce((sum, course) => sum + course.progress, 0) / enrolledCourses.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              My Learning Journey
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track your progress, continue learning, and discover new courses to advance your skills
          </p>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8 max-w-5xl mx-auto">
            <Card className="border-0 shadow-md bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6 text-center">
                <BookOpen className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">{enrolledCourses.length}</div>
                <div className="text-blue-100">Total Courses</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-6 text-center">
                <Award className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">{completedCourses.length}</div>
                <div className="text-green-100">Completed</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">{activeCourses.length}</div>
                <div className="text-purple-100">In Progress</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <CardContent className="p-6 text-center">
                <Star className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">{Math.round(totalProgress)}%</div>
                <div className="text-orange-100">Avg Progress</div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="enrolled" className="space-y-8">
          <div className="flex justify-center">
            <TabsList className="bg-white shadow-lg border space-x-2 h-fit border-gray-200 p-1 rounded-xl">
              <TabsTrigger 
                value="enrolled" 
                className="data-[state=active]:bg-blue-600 bg-white border border-solid border-blue-500 data-[state=active]:text-white px-6 py-3 rounded-lg font-medium transition-all"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Enrolled ({activeCourses.length})
              </TabsTrigger>
              <TabsTrigger 
                value="completed" 
                className="data-[state=active]:bg-green-600 bg-white border border-solid border-blue-500 data-[state=active]:text-white px-6 py-3 rounded-lg font-medium transition-all"
              >
                <Award className="w-4 h-4 mr-2" />
                Completed ({completedCourses.length})
              </TabsTrigger>
              <TabsTrigger 
                value="browse" 
                className="data-[state=active]:bg-purple-600 bg-white border border-solid border-blue-500 data-[state=active]:text-white px-6 py-3 rounded-lg font-medium transition-all"
              >
                <Search className="w-4 h-4 mr-2" />
                Browse ({availableCourses.length})
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="enrolled" className="space-y-6">
            {activeCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activeCourses.map((courseData) => (
                  <CourseCard key={courseData.course.course_id} courseData={courseData} />
                ))}
              </div>
            ) : (
              <Card className="shadow-lg border-0">
                <CardContent className="p-12">
                  <div className="text-center">
                    <BookOpen className="h-16 w-16 mx-auto mb-6 text-gray-300" />
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">No enrolled courses</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      Start your learning journey by enrolling in a course from our extensive catalog
                    </p>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Browse Courses
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            {completedCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {completedCourses.map((courseData) => (
                  <CourseCard key={courseData.course.course_id} courseData={courseData} />
                ))}
              </div>
            ) : (
              <Card className="shadow-lg border-0">
                <CardContent className="p-12">
                  <div className="text-center">
                    <Award className="h-16 w-16 mx-auto mb-6 text-gray-300" />
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">No completed courses yet</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      Complete your first course to earn certificates and showcase your achievements
                    </p>
                    <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                      View Enrolled Courses
                    </Button>
                  </div>  
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="browse" className="space-y-6">
            {/* Search and Filter */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search courses, instructors, or topics..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-gray-400" />
                    <select
                      className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent min-w-40"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category === 'all' ? 'All Categories' : category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {filteredAvailableCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredAvailableCourses.map((course) => (
                  <CourseCard 
                    key={course.course_id} 
                    courseData={course} 
                    isEnrolled={false}
                  />
                ))}
              </div>
            ) : (
              <Card className="shadow-lg border-0">
                <CardContent className="p-12">
                  <div className="text-center">
                    <Search className="h-16 w-16 mx-auto mb-6 text-gray-300" />
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">No courses found</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      Try adjusting your search terms or filter settings to find the perfect course
                    </p>
                    <Button 
                      onClick={() => {setSearchTerm(""); setSelectedCategory("all");}}
                      variant="outline"
                    >
                      Clear Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}