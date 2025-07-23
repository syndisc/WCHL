import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { UploadCloud, FileText, CheckCircle, Clock, AlertCircle, Calendar, BookOpen, Award, Target, Users } from "lucide-react"

// Dummy data
const dummyAssignments = [
  {
    assignment_id: "assignment_001",
    class_id: "CS101",
    class_name: "Introduction to Programming",
    title: "Basic Python Functions",
    description: "Create a comprehensive Python program that demonstrates understanding of functions, loops, and data structures. Include proper documentation and error handling.",
    deadline_date: Date.now() * 1000000 + (2 * 24 * 60 * 60 * 1000 * 1000000), // 2 days from now
    status: "not_done",
    submission_file: null,
    submitted_date: null,
    assignment_grade: null,
    max_grade: 100,
    instructor: "Dr. Sarah Chen",
    difficulty: "Beginner"
  },
  {
    assignment_id: "assignment_002", 
    class_id: "MATH201",
    class_name: "Calculus II",
    title: "Integration Techniques",
    description: "Solve 20 integration problems using various techniques including substitution, integration by parts, and partial fractions. Show all work clearly.",
    deadline_date: Date.now() * 1000000 - (1 * 24 * 60 * 60 * 1000 * 1000000), // 1 day overdue
    status: "submitted",
    submission_file: "math201_integration_solutions.pdf",
    submitted_date: Date.now() * 1000000 - (2 * 24 * 60 * 60 * 1000 * 1000000),
    assignment_grade: null,
    max_grade: 100,
    instructor: "Prof. Michael Rodriguez",
    difficulty: "Intermediate"
  },
  {
    assignment_id: "assignment_003",
    class_id: "ENG102", 
    class_name: "Academic Writing",
    title: "Research Essay on Climate Change",
    description: "Write a 1500-word research essay analyzing the economic impacts of climate change on developing nations. Use at least 8 scholarly sources and follow APA format.",
    deadline_date: Date.now() * 1000000 + (7 * 24 * 60 * 60 * 1000 * 1000000), // 7 days from now
    status: "graded",
    submission_file: "climate_change_essay_final.docx",
    submitted_date: Date.now() * 1000000 - (10 * 24 * 60 * 60 * 1000 * 1000000),
    assignment_grade: 88,
    max_grade: 100,
    instructor: "Dr. Amanda Foster",
    difficulty: "Advanced"
  },
  {
    assignment_id: "assignment_004",
    class_id: "PHYS150",
    class_name: "General Physics I", 
    title: "Lab Report: Pendulum Motion",
    description: "Conduct pendulum experiments and write a detailed lab report analyzing the relationship between period and length. Include data analysis and error calculations.",
    deadline_date: Date.now() * 1000000 + (5 * 24 * 60 * 60 * 1000 * 1000000), // 5 days from now
    status: "not_done",
    submission_file: null,
    submitted_date: null,
    assignment_grade: null,
    max_grade: 100,
    instructor: "Dr. James Liu",
    difficulty: "Intermediate"
  },
  {
    assignment_id: "assignment_005",
    class_id: "HIST205",
    class_name: "World History",
    title: "Documentary Analysis",
    description: "Watch the assigned documentary and write a critical analysis examining historical accuracy, bias, and narrative techniques used by the filmmakers.",
    deadline_date: Date.now() * 1000000 + (10 * 24 * 60 * 60 * 1000 * 1000000), // 10 days from now
    status: "graded",
    submission_file: "documentary_analysis_wwii.pdf",
    submitted_date: Date.now() * 1000000 - (5 * 24 * 60 * 60 * 1000 * 1000000),
    assignment_grade: 92,
    max_grade: 100,
    instructor: "Prof. Elena Kowalski",
    difficulty: "Intermediate"
  }
];

export default function AssignmentPage() {
  const [assignments, setAssignments] = useState(dummyAssignments);
  const [selectedAssignment, setSelectedAssignment] = useState(dummyAssignments[0]);
  const [file, setFile] = useState(null);
  const [uploadTime, setUploadTime] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setUploadTime(new Date().toLocaleString());
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp / 1000000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'not_done':
        return <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-200">Not Done</Badge>;
      case 'submitted':
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">Submitted</Badge>;
      case 'graded':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Graded</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getDifficultyBadge = (difficulty) => {
    const styles = {
      'Beginner': 'bg-green-50 text-green-600 border-green-200',
      'Intermediate': 'bg-yellow-50 text-yellow-600 border-yellow-200', 
      'Advanced': 'bg-red-50 text-red-600 border-red-200'
    };
    return <Badge variant="outline" className={styles[difficulty] || 'bg-gray-50 text-gray-600'}>{difficulty}</Badge>;
  };

  const getDaysUntilDeadline = (deadlineTimestamp) => {
    const now = Date.now() * 1000000;
    const diff = deadlineTimestamp - now;
    const days = Math.floor(diff / (24 * 60 * 60 * 1000000000));
    return days;
  };

  const getUrgencyColor = (days) => {
    if (days < 0) return "text-red-700 bg-red-100 border-red-200";
    if (days <= 2) return "text-orange-700 bg-orange-100 border-orange-200";
    if (days <= 7) return "text-yellow-700 bg-yellow-100 border-yellow-200";
    return "text-green-700 bg-green-100 border-green-200";
  };

  const getGradeColor = (grade) => {
    if (grade >= 90) return "text-green-600";
    if (grade >= 80) return "text-blue-600";
    if (grade >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const handleSubmit = () => {
    setLoading(true);
    // Simulate submission
    setTimeout(() => {
      setLoading(false);
      // Update assignment status
      const updatedAssignments = assignments.map(a => 
        a.assignment_id === selectedAssignment.assignment_id 
          ? { ...a, status: 'submitted', submission_file: file.name, submitted_date: Date.now() * 1000000 }
          : a
      );
      setAssignments(updatedAssignments);
      setSelectedAssignment({ ...selectedAssignment, status: 'submitted', submission_file: file.name, submitted_date: Date.now() * 1000000 });
      setFile(null);
      setUploadTime(null);
    }, 2000);
  };

  // Statistics
  const stats = {
    total: assignments.length,
    completed: assignments.filter(a => a.status === 'graded').length,
    pending: assignments.filter(a => a.status === 'submitted').length,
    notDone: assignments.filter(a => a.status === 'not_done').length,
    avgGrade: Math.round(assignments.filter(a => a.assignment_grade).reduce((sum, a) => sum + a.assignment_grade, 0) / assignments.filter(a => a.assignment_grade).length) || 0
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                My Assignments
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Track your progress and submit your coursework</p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                <div className="text-sm text-gray-500">Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                <div className="text-sm text-gray-500">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.pending}</div>
                <div className="text-sm text-gray-500">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{stats.notDone}</div>
                <div className="text-sm text-gray-500">To Do</div>
              </div>
              {stats.avgGrade > 0 && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{stats.avgGrade}%</div>
                  <div className="text-sm text-gray-500">Avg Grade</div>
                </div>
              )}
            </div>
          </div>

          {/* Stats Cards for Mobile */}
          <div className="grid grid-cols-2 md:hidden gap-4 mb-6">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{stats.total}</div>
                <div className="text-sm opacity-90">Total Assignments</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{stats.completed}</div>
                <div className="text-sm opacity-90">Completed</div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Assignment List */}
          <div className="xl:col-span-1 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                All Assignments ({assignments.length})
              </h2>
            </div>
            
            <div className="space-y-4">
              {assignments.map((assignment) => {
                const daysLeft = getDaysUntilDeadline(assignment.deadline_date);
                const isSelected = selectedAssignment?.assignment_id === assignment.assignment_id;
                
                return (
                  <Card 
                    key={assignment.assignment_id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1 ${
                      isSelected 
                        ? 'ring-2 ring-blue-500 shadow-lg bg-blue-50/50' 
                        : 'hover:bg-gray-50 shadow-md'
                    }`}
                    onClick={() => setSelectedAssignment(assignment)}
                  >
                    <CardContent className="p-5">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{assignment.title}</h3>
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {assignment.class_name}
                            </p>
                          </div>
                          {getStatusBadge(assignment.status)}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className={`text-xs px-3 py-1 rounded-full border ${getUrgencyColor(daysLeft)}`}>
                            {daysLeft < 0 ? `Overdue by ${Math.abs(daysLeft)} days` : 
                             daysLeft === 0 ? 'Due today' : 
                             `${daysLeft} days left`}
                          </div>
                          {getDifficultyBadge(assignment.difficulty)}
                        </div>

                        {assignment.status === 'graded' && (
                          <div className="flex items-center justify-between bg-white rounded-lg p-2 border">
                            <span className="text-sm font-medium text-gray-700">Grade:</span>
                            <span className={`text-sm font-bold ${getGradeColor(assignment.assignment_grade)}`}>
                              {assignment.assignment_grade}/{assignment.max_grade}
                            </span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Assignment Details */}
          <div className="xl:col-span-2">
            {selectedAssignment ? (
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <FileText className="w-6 h-6" />
                    <div className="flex-1">
                      <div>{selectedAssignment.title}</div>
                      <div className="text-blue-100 text-sm font-normal mt-1">{selectedAssignment.class_name}</div>
                    </div>
                    {getStatusBadge(selectedAssignment.status)}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-8 p-8">
                  {/* Assignment Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="text-sm font-semibold text-blue-900">Due Date</p>
                          <p className="text-sm text-blue-700">{formatDate(selectedAssignment.deadline_date)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <Target className="h-5 w-5 text-purple-600" />
                        <div>
                          <p className="text-sm font-semibold text-purple-900">Difficulty</p>
                          <p className="text-sm text-purple-700">{selectedAssignment.difficulty}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                        <Clock className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="text-sm font-semibold text-green-900">Status</p>
                          <p className="text-sm text-green-700">{selectedAssignment.status.replace('_', ' ').toUpperCase()}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                        <Award className="h-5 w-5 text-orange-600" />
                        <div>
                          <p className="text-sm font-semibold text-orange-900">Instructor</p>
                          <p className="text-sm text-orange-700">{selectedAssignment.instructor}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Assignment Description */}
                  <div className="bg-gray-50 rounded-lg p-6 border">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      Assignment Description
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{selectedAssignment.description}</p>
                  </div>

                  {/* Current Submission */}
                  {selectedAssignment.submission_file && (
                    <div className="space-y-3">
                      <Label className="text-base font-semibold flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Current Submission
                      </Label>
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <div className="flex-1">
                            <span className="text-sm font-medium text-blue-900">{selectedAssignment.submission_file}</span>
                            {selectedAssignment.submitted_date && (
                              <p className="text-xs text-blue-700 mt-1">
                                Submitted: {formatDate(selectedAssignment.submitted_date)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Grade Display */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold flex items-center gap-2">
                      <Award className="w-4 h-4 text-purple-600" />
                      Grade
                    </Label>
                    {selectedAssignment.status === 'graded' ? (
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className={`flex items-center ${getGradeColor(selectedAssignment.assignment_grade)} text-lg font-bold`}>
                          <CheckCircle className="h-5 w-5 mr-3" />
                          {selectedAssignment.assignment_grade}/{selectedAssignment.max_grade}
                          <span className="ml-2 text-sm font-normal">
                            ({Math.round((selectedAssignment.assignment_grade / selectedAssignment.max_grade) * 100)}%)
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-gray-600 italic flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {selectedAssignment.status === 'submitted' ? 'Pending grading' : 'Not submitted yet'}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* File Upload (only if not graded) */}
                  {selectedAssignment.status !== 'graded' && (
                    <div className="space-y-4 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                      <Label htmlFor="upload" className="text-base font-semibold flex items-center gap-2">
                        <UploadCloud className="w-4 h-4 text-blue-600" />
                        {selectedAssignment.status === 'submitted' ? 'Resubmit Assignment' : 'Submit Assignment'}
                      </Label>
                      <Input 
                        id="upload" 
                        type="file" 
                        accept=".pdf,.doc,.docx,.txt" 
                        onChange={handleFileChange}
                        className="bg-white border-2 border-dashed border-blue-300 hover:border-blue-400 transition-colors"
                      />
                      {file && (
                        <div className="text-sm bg-white p-4 rounded-lg border border-blue-200">
                          <div className="flex items-center gap-2 text-blue-700 font-medium mb-2">
                            <FileText className="w-4 h-4" />
                            File Selected
                          </div>
                          <p><strong>Name:</strong> {file.name}</p>
                          <p><strong>Size:</strong> {(file.size / 1024).toFixed(1)} KB</p>
                          <p><strong>Selected:</strong> {uploadTime}</p>
                        </div>
                      )}
                      
                      <Button 
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 transition-all duration-200 transform hover:scale-105"
                        disabled={!file || loading}
                        onClick={handleSubmit}
                      >
                        {loading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Submitting...
                          </div>
                        ) : (
                          <>
                            <UploadCloud className="h-4 w-4 mr-2" />
                            {selectedAssignment.status === 'submitted' ? 'Resubmit Assignment' : 'Submit Assignment'}
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-xl bg-white/80 backdrop-blur-sm">
                <CardContent className="p-16 text-center">
                  <FileText className="h-20 w-20 mx-auto mb-6 text-gray-300" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Select an Assignment</h3>
                  <p className="text-gray-600">Choose an assignment from the list to view details and submit your work</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}