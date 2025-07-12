  import { useParams } from "react-router-dom";
  import { useEffect, useState } from "react";
  import { Badge } from "../../components/ui/badge";
  import { Button } from "../../components/ui/button";
  import { Clock, Users, Star, Play } from "lucide-react";
  import { Progress } from "../../components/ui/progress";

  const dummyCourses = [
    {
      id: "1",
      slug: "react-advanced-patterns",
      title: "React Advanced Patterns",
      description: "Master advanced React concepts and patterns",
      duration: "12 hours",
      students: 1234,
      rating: 4.8,
      progress: 75,
      status: "In Progress",
      image: "/placeholder.svg?height=200&width=300",
      sections: [
        { title: "Introduction", duration: "12min", lectures: 3 },
        { title: "Advanced Hooks", duration: "48min", lectures: 5 },
        { title: "Patterns in Practice", duration: "1hr 20min", lectures: 6 },
      ]
    },
    {
      id: "2",
      slug: "python-for-data-science",
      title: "Python For Data Science",
      description: "Master advanced React concepts and patterns",
      duration: "12 hours",
      students: 1234,
      rating: 4.8,
      progress: 75,
      status: "In Progress",
      image: "/placeholder.svg?height=200&width=300",
      sections: [
        { title: "Introduction", duration: "12min", lectures: 3 },
        { title: "Advanced Hooks", duration: "48min", lectures: 5 },
        { title: "Patterns in Practice", duration: "1hr 20min", lectures: 6 },
      ]
    },
  ];

  export default function CourseDetailPage() {
    const { slug } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
      const found = dummyCourses.find((c) => c.slug === slug);
      setCourse(found);
    }, [slug]);

    if (!course) {
      return <div className="p-6 text-center text-gray-600">Course not found</div>;
    }

    return (
      <div className="max-w-7xl mx-auto px-4 py-6 bg-white">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <aside className="w-full md:w-1/3 lg:w-1/4 border-r bg-gray-50 p-4 space-y-4">
            <h2 className="font-semibold text-lg">Course content</h2>
            {course.sections.map((section, idx) => (
              <div key={idx} className="border-b pb-2 mb-2">
                <p className="font-medium">{section.title}</p>
                <p className="text-sm text-gray-600">
                  {section.lectures} lectures • {section.duration}
                </p>
              </div>
            ))}
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6 space-y-6 bg-white text-black">
            {/* Video or Image Preview */}
            <div className="aspect-video relative rounded-lg overflow-hidden bg-gray-100">
              <img
                src={course.image}
                alt="Course preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <Badge>{course.status}</Badge>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-6 text-sm font-medium border-b">
              <div className="pb-2 border-b-2 border-blue-600 text-blue-600">Lecture Article</div>
              <div className="pb-2 text-gray-600">Q&A</div>
              <div className="pb-2 text-gray-600">Notes</div>
              <div className="pb-2 text-gray-600">Reviews</div>
              <div className="pb-2 text-gray-600">Learning Tools</div>
            </div>

            {/* Course Info */}
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

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>
              <Progress value={course.progress} />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button>
                <Play className="h-4 w-4 mr-2" />
                Continue Learning
              </Button>
              <Button variant="outline">Back to My Courses</Button>
            </div>
          </main>
        </div>
      </div>
    );
  }
