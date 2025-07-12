import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Progress } from "../../components/ui/progress"
import { Badge } from "../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Clock, Users, Star, Play, Download } from "lucide-react"
import { Link } from "react-router-dom"

export default function bookmarkedCoursesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Bookmarked Courses</h1>
        <p className="text-gray-600 mt-2">These are the courses you've bookmarked for later</p>
      </div>

      <Tabs defaultValue="wishlist" className="space-y-6">
        <TabsList>
          <TabsTrigger value="wishlist">Bookmarks (2)</TabsTrigger>
        </TabsList>

        <TabsContent value="wishlist" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/courses/react-advanced-patterns">
              <Card>
                <div className="aspect-video relative">
                  <img
                    src="/placeholder.svg?height=200&width=300"
                    alt="Course thumbnail"
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">React Advanced Patterns</CardTitle>
                  <CardDescription>Master advanced React concepts and patterns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
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
                      <span>4.8</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} />
                  </div>
                  <div className="flex space-x-2">
                    <Button className="flex-1">
                      <Play className="h-4 w-4 mr-2" />
                      Continue
                    </Button>
                    <Button variant="outline" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/courses/python-for-data-science">
              <Card>
                <div className="aspect-video relative">
                  <img
                    src="/placeholder.svg?height=200&width=300"
                    alt="Course thumbnail"
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">Python for Data Science</CardTitle>
                  <CardDescription>Learn Python programming for data analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>18 hours</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>2,156 students</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>4.9</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} />
                  </div>
                  <div className="flex space-x-2">
                    <Button className="flex-1">
                      <Play className="h-4 w-4 mr-2" />
                      Continue
                    </Button>
                    <Button variant="outline" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}