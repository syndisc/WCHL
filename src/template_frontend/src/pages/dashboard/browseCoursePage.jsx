import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Search, Filter, Clock, Users, Star, Heart, BookOpen } from "lucide-react"

export default function BrowseCoursesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Browse Courses</h1>
        <p className="text-gray-600 mt-2">Discover new courses to expand your knowledge</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search for courses, topics, or instructors..." className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="programming">Programming</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="popular">Most Popular</TabsTrigger>
          <TabsTrigger value="new">New Releases</TabsTrigger>
          <TabsTrigger value="free">Free Courses</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Course Card 1 */}
            <Card className="group hover:shadow-lg transition-shadow">
              <div className="aspect-video relative">
                <img
                  src="/placeholder.svg?height=200&width=300"
                  alt="Course thumbnail"
                  className="w-full h-full object-cover rounded-t-lg"
                />
                <div className="absolute top-2 left-2">
                  <Badge>Programming</Badge>
                </div>
                <div className="absolute top-2 right-2">
                  <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Intermediate</Badge>
                  <span className="text-lg font-bold text-green-600">$49</span>
                </div>
                <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                  Full Stack Web Development
                </CardTitle>
                <CardDescription>Learn to build complete web applications from frontend to backend</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>32 hours</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>2,345 students</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>4.8</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">By Sarah Johnson</p>
                <Button className="w-full">Enroll Now</Button>
              </CardContent>
            </Card>

            {/* Course Card 2 */}
            <Card className="group hover:shadow-lg transition-shadow">
              <div className="aspect-video relative">
                <img
                  src="/placeholder.svg?height=200&width=300"
                  alt="Course thumbnail"
                  className="w-full h-full object-cover rounded-t-lg"
                />
                <div className="absolute top-2 left-2">
                  <Badge>Design</Badge>
                </div>
                <div className="absolute top-2 right-2">
                  <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Beginner</Badge>
                  <span className="text-lg font-bold text-green-600">Free</span>
                </div>
                <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                  UI/UX Design Fundamentals
                </CardTitle>
                <CardDescription>Master the principles of user interface and user experience design</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>16 hours</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>5,678 students</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>4.9</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">By Michael Chen</p>
                <Button className="w-full">Enroll Now</Button>
              </CardContent>
            </Card>
          </div>

          {/* Load More */}
          <div className="text-center">
            <Button variant="outline" size="lg">
              Load More Courses
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="popular">
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Most Popular Courses</h3>
            <p className="text-gray-600">Discover the courses that students love most</p>
          </div>
        </TabsContent>

        <TabsContent value="new">
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">New Releases</h3>
            <p className="text-gray-600">Check out the latest courses added to our platform</p>
          </div>
        </TabsContent>

        <TabsContent value="free">
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Free Courses</h3>
            <p className="text-gray-600">Start learning with our collection of free courses</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
