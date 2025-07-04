import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { MessageSquare, ThumbsUp, Reply, Search, Plus, Pin } from "lucide-react"

export default function DiscussionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Discussions</h1>
          <p className="text-gray-600 mt-2">Connect with fellow learners and instructors</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Discussion
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search discussions..." className="pl-10" />
        </div>
        <Button variant="outline">All Courses</Button>
      </div>

      <Tabs defaultValue="recent" className="space-y-6">
        <TabsList>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
          <TabsTrigger value="my-posts">My Posts</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-4">
          {/* Discussion Thread 1 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Pin className="h-4 w-4 text-blue-600" />
                    <Badge>React Advanced Patterns</Badge>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">2 hours ago</span>
                  </div>
                  <h3 className="text-lg font-medium">How to optimize useEffect dependencies?</h3>
                  <p className="text-gray-700">
                    I'm working on a complex component with multiple useEffect hooks and I'm struggling with dependency
                    optimization. The component re-renders too frequently...
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>12 replies</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ThumbsUp className="h-4 w-4" />
                      <span>8 likes</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Reply className="h-4 w-4 mr-1" />
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Discussion Thread 2 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Badge>Python for Data Science</Badge>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">5 hours ago</span>
                  </div>
                  <h3 className="text-lg font-medium">Best practices for data visualization with matplotlib</h3>
                  <p className="text-gray-700">
                    What are some best practices when creating visualizations with matplotlib? I want to make sure my
                    charts are both informative and visually appealing...
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>7 replies</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ThumbsUp className="h-4 w-4" />
                      <span>15 likes</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Reply className="h-4 w-4 mr-1" />
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="popular">
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Popular Discussions</h3>
            <p className="text-gray-600">Discover the most engaging conversations in the community</p>
          </div>
        </TabsContent>

        <TabsContent value="unanswered">
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Unanswered Questions</h3>
            <p className="text-gray-600">Help fellow students by answering their questions</p>
          </div>
        </TabsContent>

        <TabsContent value="my-posts">
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">My Posts</h3>
            <p className="text-gray-600">View and manage your discussion posts</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
