import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UploadCloud, FileText, CheckCircle } from "lucide-react"

export default function AssignmentPage() {
  const [file, setFile] = useState(null)
  const [uploadTime, setUploadTime] = useState(null)
  const grade = "A-"

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0]
    if (uploadedFile) {
      setFile(uploadedFile)
      setUploadTime(new Date().toLocaleString())
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Assignment: Research Report
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-gray-700">
              **Question**: Write a 2-page research report on the impact of AI in education. You should cite at least 3 sources. Submit your report in PDF format.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="upload">Your Submission</Label>
            <Input id="upload" type="file" accept=".pdf" onChange={handleFileChange} />
            {file && (
              <div className="text-sm text-gray-600">
                <p>📄 File: <strong>{file.name}</strong></p>
                <p>📅 Uploaded: {uploadTime}</p>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <Label>Grade</Label>
            {grade ? (
              <div className="flex items-center text-green-600 font-semibold">
                <CheckCircle className="h-4 w-4 mr-2" />
                {grade}
              </div>
            ) : (
              <p className="text-gray-500 italic">Not graded yet</p>
            )}
          </div>

          <Button className="mt-4" disabled={!file}>
            <UploadCloud className="h-4 w-4 mr-2" />
            Submit Assignment
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
