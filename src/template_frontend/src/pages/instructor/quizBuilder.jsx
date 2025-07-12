import { useState } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Label } from "../../components/ui/label"
import { Trash2, Plus, CheckCircle } from "lucide-react"

export default function QuizBuilder() {
  const [questions, setQuestions] = useState([])

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: Date.now(),
        type: "multiple-choice",
        question: "",
        options: ["", ""],
        correctIndex: 0,
        answer: "",
      },
    ])
  }

  const updateQuestion = (index, field, value) => {
    const newQuestions = [...questions]
    newQuestions[index][field] = value
    setQuestions(newQuestions)
  }

  const updateOption = (qIndex, optIndex, value) => {
    const newQuestions = [...questions]
    newQuestions[qIndex].options[optIndex] = value
    setQuestions(newQuestions)
  }

  const addOption = (qIndex) => {
    const newQuestions = [...questions]
    newQuestions[qIndex].options.push("")
    setQuestions(newQuestions)
  }

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    console.log("Quiz Data:", questions)
    alert("Quiz saved to console!")
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Quiz Builder</h1>
        <Button onClick={addQuestion}>
          <Plus className="h-4 w-4 mr-1" />
          Add Question
        </Button>
      </div>

      {questions.map((q, index) => (
        <Card key={q.id}>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Question {index + 1}</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeQuestion(index)}
              className="text-red-600"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Remove
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Question Text</Label>
              <Textarea
                value={q.question}
                onChange={(e) => updateQuestion(index, "question", e.target.value)}
                placeholder="Enter the question..."
              />
            </div>

            <div>
              <Label>Question Type</Label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                value={q.type}
                onChange={(e) => updateQuestion(index, "type", e.target.value)}
              >
                <option value="multiple-choice">Multiple Choice</option>
                <option value="essay">Essay</option>
              </select>
            </div>

            {q.type === "multiple-choice" && (
              <div className="space-y-3">
                <Label>Options</Label>
                {q.options.map((opt, optIndex) => (
                  <div key={optIndex} className="flex items-center gap-2">
                    <Input
                      value={opt}
                      onChange={(e) => updateOption(index, optIndex, e.target.value)}
                      placeholder={`Option ${optIndex + 1}`}
                    />
                    <input
                      type="radio"
                      name={`correct-${index}`}
                      checked={q.correctIndex === optIndex}
                      onChange={() => updateQuestion(index, "correctIndex", optIndex)}
                    />
                    <span className="text-xs text-gray-500">Correct</span>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => addOption(index)}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Option
                </Button>
              </div>
            )}

            {q.type === "essay" && (
              <div>
                <Label>Expected Answer (optional)</Label>
                <Textarea
                  value={q.answer}
                  onChange={(e) => updateQuestion(index, "answer", e.target.value)}
                  placeholder="Type model answer (optional)..."
                />
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {questions.length > 0 && (
        <div className="flex justify-end">
          <Button onClick={handleSubmit} className="mt-4">
            <CheckCircle className="w-4 h-4 mr-2" />
            Save Quiz
          </Button>
        </div>
      )}
    </div>
  )
}
