import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Trash2, Eye, Search, Users, AlertCircle, UserCheck, UserX, Filter, X } from "lucide-react"

// Mock data for demonstration
const dummyStudents = [
  {
    student_id: "STU001",
    name: "Alice Johnson",
    email: "alice.johnson@email.com",
    course_id: "CS101",
    course_title: "Introduction to Computer Science",
    enrollment_status: "active",
    progress: 75,
    enrollment_date: Date.now() * 1000000 - (30 * 24 * 60 * 60 * 1000 * 1000000),
    avatar: null
  },
  {
    student_id: "STU002",
    name: "Bob Smith",
    email: "bob.smith@email.com",
    course_id: "CS101",
    course_title: "Introduction to Computer Science",
    enrollment_status: "completed",
    progress: 100,
    enrollment_date: Date.now() * 1000000 - (60 * 24 * 60 * 60 * 1000 * 1000000),
    avatar: null
  },
  {
    student_id: "STU003",
    name: "Carol Davis",
    email: "carol.davis@email.com",
    course_id: "MATH201",
    course_title: "Advanced Mathematics",
    enrollment_status: "active",
    progress: 45,
    enrollment_date: Date.now() * 1000000 - (15 * 24 * 60 * 60 * 1000 * 1000000),
    avatar: null
  },
  {
    student_id: "STU004",
    name: "David Wilson",
    email: "david.wilson@email.com",
    course_id: "CS102",
    course_title: "Data Structures and Algorithms",
    enrollment_status: "pending",
    progress: 0,
    enrollment_date: Date.now() * 1000000 - (2 * 24 * 60 * 60 * 1000 * 1000000),
    avatar: null
  },
  {
    student_id: "STU005",
    name: "Emma Brown",
    email: "emma.brown@email.com",
    course_id: "CS101",
    course_title: "Introduction to Computer Science",
    enrollment_status: "active",
    progress: 92,
    enrollment_date: Date.now() * 1000000 - (45 * 24 * 60 * 60 * 1000 * 1000000),
    avatar: null
  }
];

export default function StudentManagementPage() {
  const [students, setStudents] = useState(dummyStudents);
  const [filteredStudents, setFilteredStudents] = useState(dummyStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  // Modal state
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [studentToRemove, setStudentToRemove] = useState(null);
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    filterStudents();
  }, [students, searchTerm, courseFilter, statusFilter]);

  const filterStudents = () => {
    let filtered = [...students];

    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.student_id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (courseFilter !== "all") {
      filtered = filtered.filter(student => student.course_id === courseFilter);
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(student => student.enrollment_status === statusFilter);
    }

    setFilteredStudents(filtered);
  };

  const openRemoveModal = (student) => {
    setStudentToRemove(student);
    setShowRemoveModal(true);
  };

  const closeRemoveModal = () => {
    setShowRemoveModal(false);
    setStudentToRemove(null);
    setIsRemoving(false);
  };

  const confirmRemoveStudent = async () => {
    if (!studentToRemove) return;

    setIsRemoving(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Remove student from list
      setStudents(prev => prev.filter(student => 
        !(student.student_id === studentToRemove.student_id && student.course_id === studentToRemove.course_id)
      ));
      
      setSuccessMessage(`${studentToRemove.name} has been removed from ${studentToRemove.course_title}`);
      setLoadingError("");
      closeRemoveModal();
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(""), 5000);
      
    } catch (err) {
      setLoadingError("Failed to remove student. Please try again.");
      setSuccessMessage("");
      setIsRemoving(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>;
      case 'dropped':
        return <Badge className="bg-red-100 text-red-800">Dropped</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const getUniqueValues = (key) => {
    return [...new Set(students.map(student => student[key]))].filter(Boolean);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp / 1000000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
          <p className="text-gray-600 mt-2">Manage students enrolled in your courses</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Users className="h-4 w-4" />
          <span>{filteredStudents.length} of {students.length} students</span>
        </div>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="flex items-center justify-between space-x-2 text-green-600 bg-green-50 p-4 rounded-md">
          <div className="flex items-center space-x-2">
            <UserCheck className="h-5 w-5" />
            <span>{successMessage}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSuccessMessage("")}
            className="h-6 w-6 p-0 text-green-600 hover:text-green-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {loadingError && (
        <div className="flex items-center justify-between space-x-2 text-red-600 bg-red-50 p-4 rounded-md">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5" />
            <span>{loadingError}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLoadingError("")}
            className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, email, or student ID..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={courseFilter} onValueChange={setCourseFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Courses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {getUniqueValues('course_id').map(courseId => (
                    <SelectItem key={courseId} value={courseId}>
                      {courseId}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {getUniqueValues('enrollment_status').map(status => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Students ({filteredStudents.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredStudents.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm || courseFilter !== "all" || statusFilter !== "all" 
                  ? "No students match your filters" 
                  : "No students enrolled yet"}
              </h3>
              <p className="text-gray-600">
                {searchTerm || courseFilter !== "all" || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Students will appear here once they enroll in your courses"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-600 border-b">
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-4">Course</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Progress</th>
                    <th className="py-3 px-4">Enrolled</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student, index) => (
                    <tr key={`${student.student_id}-${student.course_id}-${index}`} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={student.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {getInitials(student.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-gray-800">{student.name}</div>
                            <div className="text-gray-500 text-xs">{student.email}</div>
                            <div className="text-gray-400 text-xs">ID: {student.student_id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium">{student.course_title || student.course_id}</div>
                        <div className="text-gray-500 text-xs">{student.course_id}</div>
                      </td>
                      <td className="py-3 px-4">
                        {getStatusBadge(student.enrollment_status)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${student.progress || 0}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-600">{student.progress || 0}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        {student.enrollment_date ? formatDate(student.enrollment_date) : 'N/A'}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => openRemoveModal(student)}
                            disabled={student.enrollment_status === 'completed'}
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary Stats */}
      {students.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {students.filter(s => s.enrollment_status === 'active').length}
              </div>
              <div className="text-sm text-gray-600">Active Students</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {students.filter(s => s.enrollment_status === 'completed').length}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {students.filter(s => s.enrollment_status === 'pending').length}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">
                {Math.round(students.reduce((sum, s) => sum + (s.progress || 0), 0) / students.length) || 0}%
              </div>
              <div className="text-sm text-gray-600">Avg Progress</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Remove Student Modal */}
      <AlertDialog open={showRemoveModal} onOpenChange={setShowRemoveModal}>
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <UserX className="h-5 w-5 text-red-600" />
              Remove Student
            </AlertDialogTitle>
            <AlertDialogDescription>
              {studentToRemove && (
                <div className="space-y-3">
                  <p>
                    Are you sure you want to remove <strong>{studentToRemove.name}</strong> from the course?
                  </p>
                  <div className="bg-gray-50 p-3 rounded-md text-sm">
                    <div className="font-medium text-gray-900">{studentToRemove.course_title}</div>
                    <div className="text-gray-600">Course ID: {studentToRemove.course_id}</div>
                    <div className="text-gray-600">Student ID: {studentToRemove.student_id}</div>
                    <div className="text-gray-600">Progress: {studentToRemove.progress}%</div>
                  </div>
                  <p className="text-red-600 text-sm">
                    This action cannot be undone. The student will lose access to the course and all progress data.
                  </p>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeRemoveModal} disabled={isRemoving}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmRemoveStudent}
              disabled={isRemoving}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              {isRemoving ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Removing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Trash2 className="w-4 h-4" />
                  Remove Student
                </div>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}