import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Play, Clock, Users, Star, Download, BookOpen, CheckCircle, Lock, MessageSquare, Award } from "lucide-react"

export default function CourseDetailPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Course Header */}
      <div className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Badge>Programming</Badge>
                <Badge variant="outline">Intermediate</Badge>
              </div>
              <h1 className="text-4xl font-bold">React Advanced Patterns</h1>
              <p className="text-xl text-gray-300">
                Master advanced React concepts including custom hooks, context patterns, and performance optimization
                techniques.
              </p>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>12 hours</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>1,234 students</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>4.8 (456 reviews)</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/placeholder.svg?height=48&width=48" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm text-gray-300">Senior React Developer at TechCorp</p>
                </div>
              </div>
            </div>
            <div className="lg:justify-self-end">
              <Card className="w-full max-w-sm">
                <div className="aspect-video relative">
                  <img
                    src="/placeholder.svg?height=200&width=300"
                    alt="Course preview"
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button size="lg" className="rounded-full">
                      <Play className="h-6 w-6 mr-2" />
                      Preview Course
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">$79</div>
                    <div className="text-sm text-gray-500 line-through">$129</div>
                  </div>
                  <Button className="w-full" size="lg">
                    Enroll Now
                  </Button>
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
                        <span className="text-sm">Advanced React patterns and techniques</span>
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
                        <span className="text-sm">Testing advanced React components</span>
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
                      This comprehensive course takes your React skills to the next level by covering advanced patterns
                      and techniques used in production applications. You'll learn how to build scalable, maintainable
                      React applications using modern best practices.
                    </p>
                    <p>
                      Throughout the course, you'll work on real-world projects that demonstrate the concepts you're
                      learning. By the end, you'll have the confidence to tackle complex React challenges and optimize
                      your applications for performance.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="curriculum" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Curriculum</CardTitle>
                    <CardDescription>8 sections • 45 lectures • 12h 30m total length</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
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
                        <span className="text-lg font-bold">4.8</span>
                      </div>
                      <span className="text-gray-600">456 reviews</span>
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
                        <AvatarFallback>SJ</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold">Sarah Johnson</h3>
                        <p className="text-gray-600 mb-4">Senior React Developer at TechCorp</p>
                        <p className="text-sm text-gray-700">
                          Sarah has over 8 years of experience in frontend development and has been working with React
                          since its early days.
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
                  <span>12 hours on-demand video</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Download className="h-4 w-4 text-gray-600" />
                  <span>Downloadable resources</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <BookOpen className="h-4 w-4 text-gray-600" />
                  <span>45 coding exercises</span>
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
  )
}
