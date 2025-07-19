import { Outlet } from "react-router-dom"
import { BookOpen, Bell, Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Button } from "../components/ui/button"

export default function InstructorLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="sticky top-0 z-50 bg-white border-b">
        <div className="flex items-center justify-between px-6 h-16">
          <div className="flex items-center space-x-3">
            <BookOpen className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">EduLearn (Instructor)</span>
          </div>
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full pl-10 pr-4 py-2 bg-gray-300 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative bg-white hover:bg-gray-200 focus:outline-none focus:ring-0 active:bg-gray-300">
              <Bell className="h-5 w-5 text-gray-600 hover:text-blue-600" />
              <span className="absolute top-1 right-1 block w-2 h-2 bg-red-500 rounded-full" />
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  )
}
