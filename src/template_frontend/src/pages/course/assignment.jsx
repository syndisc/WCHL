import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { UploadCloud, FileText, CheckCircle, Clock, AlertCircle, Calendar } from "lucide-react"
import { useLMS } from "@/hooks/useLMS"

export default function AssignmentPage() {
  const { getMyAssignments, loading, error } = useLMS();
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadTime, setUploadTime] = useState(null);
  const [loadingError, setLoadingError] = useState("");

  useEffect(() => {
    const loadAssignments = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setLoadingError("No authentication token found");
        return;
      }

      try {
        const result = await getMyAssignments(token);
        if (result.success) {
          setAssignments(result.data);
          if (result.data.length > 0) {
            setSelectedAssignment(result.data[0]);
          }
        } else {
          setLoadingError(result.error || "Failed to load assignments");
        }
      } catch (err) {
        setLoadingError("An unexpected error occurred");
        console.error("Assignments loading error:", err);
      }
    };

    loadAssignments();
  }, [getMyAssignments]);

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
        return <Badge variant="destructive">Not Done</Badge>;
      case 'submitted':
        return <Badge variant="secondary">Submitted</Badge>;
      case 'graded':
        return <Badge>Graded</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getDaysUntilDeadline = (deadlineTimestamp) => {
    const now = Date.now() * 1000000; // Convert to nanoseconds
    const diff = deadlineTimestamp - now;
    const days = Math.floor(diff / (24 * 60 * 60 * 1000000000));
    return days;
  };

  const getUrgencyColor = (days) => {
    if (days < 0) return "text-red-600 bg-red-50";
    if (days <= 2) return "text-orange-600 bg-orange-50";
    if (days <= 7) return "text-yellow-600 bg-yellow-50";
    return "text-green-600 bg-green-50";
  };

  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="h-96 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loadingError || error) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-md">
          <AlertCircle className="h-5 w-5" />
          <span>{loadingError || error}</span>
        </div>
      </div>
    );
  }

  if (assignments.length === 0) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-center py-12">
          <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No assignments found</h3>
          <p className="text-gray-600">You don't have any assignments at the moment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Assignments</h1>
        <p className="text-gray-600 mt-2">View and submit your course assignments</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Assignment List */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">All Assignments ({assignments.length})</h2>
          <div className="space-y-3">
            {assignments.map((assignment) => {
              const daysLeft = getDaysUntilDeadline(assignment.deadline_date);
              const isSelected = selectedAssignment?.assignment_id === assignment.assignment_id;
              
              return (
                <Card 
                  key={assignment.assignment_id}
                  className={`cursor-pointer transition-colors ${isSelected ? 'ring-2 ring-blue-500' : 'hover:bg-gray-50'}`}
                  onClick={() => setSelectedAssignment(assignment)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-sm">Assignment #{assignment.assignment_id.split('_')[1]}</h3>
                        {getStatusBadge(assignment.status)}
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full ${getUrgencyColor(daysLeft)}`}>
                        {daysLeft < 0 ? `Overdue by ${Math.abs(daysLeft)} days` : 
                         daysLeft === 0 ? 'Due today' : 
                         `${daysLeft} days left`}
                      </div>
                      {assignment.status === 'graded' && (
                        <div className="text-sm font-medium text-green-600">
                          Grade: {assignment.assignment_grade}/100
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
        <div className="lg:col-span-2">
          {selectedAssignment ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Assignment #{selectedAssignment.assignment_id.split('_')[1]}
                  {getStatusBadge(selectedAssignment.status)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Assignment Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Due Date</p>
                      <p className="text-sm text-gray-600">{formatDate(selectedAssignment.deadline_date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Status</p>
                      <p className="text-sm text-gray-600">{selectedAssignment.status.replace('_', ' ').toUpperCase()}</p>
                    </div>
                  </div>
                </div>

                {/* Assignment Description */}
                <div>
                  <h3 className="font-medium mb-2">Assignment Description</h3>
                  <p className="text-gray-700">
                    Complete the assignment for class {selectedAssignment.class_id}. 
                    Submit your work before the deadline to receive full credit.
                  </p>
                </div>

                {/* Current Submission */}
                {selectedAssignment.submission_file && (
                  <div className="space-y-2">
                    <Label>Current Submission</Label>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">{selectedAssignment.submission_file}</span>
                      </div>
                      {selectedAssignment.submitted_date && (
                        <p className="text-xs text-gray-600 mt-1">
                          Submitted: {formatDate(selectedAssignment.submitted_date)}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* File Upload (only if not graded) */}
                {selectedAssignment.status !== 'graded' && (
                  <div className="space-y-2">
                    <Label htmlFor="upload">
                      {selectedAssignment.status === 'submitted' ? 'Resubmit Assignment' : 'Submit Assignment'}
                    </Label>
                    <Input 
                      id="upload" 
                      type="file" 
                      accept=".pdf,.doc,.docx,.txt" 
                      onChange={handleFileChange} 
                    />
                    {file && (
                      <div className="text-sm text-gray-600 p-2 bg-gray-50 rounded">
                        <p>📄 File: <strong>{file.name}</strong></p>
                        <p>📅 Selected: {uploadTime}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Grade Display */}
                <div className="space-y-1">
                  <Label>Grade</Label>
                  {selectedAssignment.status === 'graded' ? (
                    <div className="flex items-center text-green-600 font-semibold">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {selectedAssignment.assignment_grade}/100
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">
                      {selectedAssignment.status === 'submitted' ? 'Pending grading' : 'Not submitted yet'}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                {selectedAssignment.status !== 'graded' && (
                  <Button 
                    className="mt-4" 
                    disabled={!file}
                  >
                    <UploadCloud className="h-4 w-4 mr-2" />
                    {selectedAssignment.status === 'submitted' ? 'Resubmit Assignment' : 'Submit Assignment'}
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select an Assignment</h3>
                <p className="text-gray-600">Choose an assignment from the list to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
