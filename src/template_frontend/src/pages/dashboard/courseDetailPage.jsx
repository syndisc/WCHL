import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Clock, Users, Star, Play } from "lucide-react"
import { Progress } from "../../components/ui/progress"

const dummyCourses = [
  {
    id: "1",
    title: "React Advanced Patterns",
    description: "Master advanced React concepts and patterns",
    duration: "12 hours",
    students: 1234,
    rating: 4.8,
    progress: 75,
    status: "In Progress",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    title: "Python for Data Science",
    description: "Learn Python programming for data analysis",
    duration: "18 hours",
    students: 2156,
    rating: 4.9,
    progress: 45,
    status: "In Progress",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function courseDetailPage() {
  const { id } = useParams()
  const [course, setCourse] = useState(null)

  useEffect(() => {
    // Simulasi ambil data berdasarkan ID
    const found = dummyCourses.find(c => c.id === id)
    setCourse(found)
  }, [id])

  if (!course) {
    return <div className="p-6 text-center text-gray-600">Course not found</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="aspect-video relative">
        <img
          src={course.image}
          alt="Course banner"
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute top-4 right-4">
          <Badge>{course.status}</Badge>
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{course.title}</h1>
        <p className="text-gray-600">{course.description}</p>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <Clock className="h-4 w-4" />
          <span>{course.duration}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Users className="h-4 w-4" />
          <span>{course.students} students</span>
        </div>
        <div className="flex items-center space-x-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span>{course.rating}</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>{course.progress}%</span>
        </div>
        <Progress value={course.progress} />
      </div>

      <div className="flex space-x-4">
        <Button>
          <Play className="h-4 w-4 mr-2" />
          Continue Learning
        </Button>
        <Button variant="outline">Back to My Courses</Button>
      </div>
    </div>
  )
}
