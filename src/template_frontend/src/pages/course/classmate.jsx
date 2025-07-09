import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users } from "lucide-react"

const dummyData = [
  {
    courseName: "Introduction to Artificial Intelligence",
    classmates: [
      { name: "Alice Johnson", email: "alice@example.com", avatar: "/avatars/alice.png" },
      { name: "Bob Smith", email: "bob@example.com", avatar: "/avatars/bob.png" },
      { name: "Bob Smith", email: "bob@example.com", avatar: "/avatars/bob.png" },
      { name: "Bob Smith", email: "bob@example.com", avatar: "/avatars/bob.png" },
      { name: "Bob Smith", email: "bob@example.com", avatar: "/avatars/bob.png" },
      { name: "Bob Smith", email: "bob@example.com", avatar: "/avatars/bob.png" },
      { name: "Bob Smith", email: "bob@example.com", avatar: "/avatars/bob.png" },
    ],
  },
  {
    courseName: "Web Development Bootcamp",
    classmates: [
      { name: "Charlie Davis", email: "charlie@example.com", avatar: "" },
      { name: "Dana Lee", email: "dana@example.com", avatar: "/avatars/dana.png" },
      { name: "Dana Lee", email: "dana@example.com", avatar: "/avatars/dana.png" },
      { name: "Dana Lee", email: "dana@example.com", avatar: "/avatars/dana.png" },
      { name: "Dana Lee", email: "dana@example.com", avatar: "/avatars/dana.png" },
      { name: "Dana Lee", email: "dana@example.com", avatar: "/avatars/dana.png" },
      { name: "Dana Lee", email: "dana@example.com", avatar: "/avatars/dana.png" },
    ],
  },
]

export default function ClassmatesPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            My Classmates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {dummyData.map((course, index) => (
            <div key={index} className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-800">{course.courseName}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {course.classmates.map((student, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg border"
                  >
                    <Avatar>
                      <AvatarImage src={student.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-800">{student.name}</p>
                      <p className="text-sm text-gray-500">{student.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
