"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Trash2, Eye } from "lucide-react"

const initialStudents = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    course: "Introduction to AI",
    avatar: "/avatars/alice.png",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    course: "Web Development",
    avatar: "",
  },
  {
    id: 3,
    name: "Charlie Davis",
    email: "charlie@example.com",
    course: "Data Structures",
    avatar: "",
  },
]

export default function StudentManagementPage() {
  const [students, setStudents] = useState(initialStudents)

  const removeStudent = (id) => {
    const confirm = window.confirm("Are you sure you want to remove this student from the course?")
    if (confirm) {
      setStudents((prev) => prev.filter((student) => student.id !== id))
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Student Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600 border-b">
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Course</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={student.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {student.name
                            .split(" ")
                            .map((word) => word[0])
                            .join("")
                            .slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-gray-800">{student.name}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{student.email}</td>
                    <td className="py-3 px-4 text-gray-700">{student.course}</td>
                    <td className="py-3 px-4 text-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeStudent(student.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
                {students.length === 0 && (
                  <tr>
                    <td colSpan="4" className="py-6 text-center text-gray-500 italic">
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
