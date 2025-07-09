"use client"

import React, { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import { cn } from "@/lib/utils"

const dummyQuestions = [
  {
    id: 1,
    type: "multiple-choice",
    question: "What does HTML stand for?",
    options: [
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language",
      "HyperText Markup Language",
      "Hyperlinking Text Markup Language",
    ],
  },
  {
    id: 2,
    type: "multiple-choice",
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
  },
  {
    id: 3,
    type: "essay",
    question: "Explain the impact of JavaScript frameworks like React on frontend development.",
  },
]

export default function QuizPage() {
  const [answers, setAnswers] = useState({})

  const handleMCQChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const handleEssayChange = (questionId, text) => {
    setAnswers((prev) => ({ ...prev, [questionId]: text }))
  }

  const handleSubmit = () => {
    console.log("Submitted Answers:", answers)
    alert("Quiz submitted! (check console for answers)")
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Quiz: Web Basics
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-8">
          {dummyQuestions.map((q, index) => (
            <div key={q.id} className="space-y-4">
              <h2 className="font-semibold text-gray-800 text-lg">
                {index + 1}. {q.question}
              </h2>

              {q.type === "multiple-choice" && (
                <div className="grid gap-3">
                  {q.options.map((option, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleMCQChange(q.id, option)}
                      className={cn(
                        "text-left px-4 py-3 rounded-lg border transition-all",
                        answers[q.id] === option
                          ? "bg-blue-50 border-blue-500 ring-2 ring-blue-300 text-blue-800 font-medium"
                          : "bg-white border-gray-300 hover:bg-gray-50"
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {q.type === "essay" && (
                <Textarea
                  placeholder="Type your answer here..."
                  className="min-h-[120px]"
                  value={answers[q.id] || ""}
                  onChange={(e) => handleEssayChange(q.id, e.target.value)}
                />
              )}
            </div>
          ))}

          <Button onClick={handleSubmit}>Submit Quiz</Button>
        </CardContent>
      </Card>
    </div>
  )
}
