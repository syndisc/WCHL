import React, { useState } from "react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Trash2, Plus, CheckCircle, AlertCircle, Clock, BookOpen } from "lucide-react"
import { useLMS } from "../../hooks/useLMS"

export default function QuizBuilder() {
  const { createQuiz, loading, error } = useLMS();
  const [questions, setQuestions] = useState([]);
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    courseId: '',
    timeLimit: 30,
    passingScore: 70
  });
  const [loadingError, setLoadingError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        points: 1,
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

  const removeOption = (qIndex, optIndex) => {
    const newQuestions = [...questions]
    if (newQuestions[qIndex].options.length > 2) {
      newQuestions[qIndex].options.splice(optIndex, 1)
      // Adjust correct index if necessary
      if (newQuestions[qIndex].correctIndex >= optIndex && newQuestions[qIndex].correctIndex > 0) {
        newQuestions[qIndex].correctIndex--
      }
      setQuestions(newQuestions)
    }
  }

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const validateQuiz = () => {
    if (!quizData.title.trim()) {
      setLoadingError('Quiz title is required');
      return false;
    }

    if (!quizData.courseId.trim()) {
      setLoadingError('Course ID is required');
      return false;
    }

    if (questions.length === 0) {
      setLoadingError('At least one question is required');
      return false;
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question.trim()) {
        setLoadingError(`Question ${i + 1} text is required`);
        return false;
      }

      if (q.type === 'multiple-choice') {
        const validOptions = q.options.filter(opt => opt.trim());
        if (validOptions.length < 2) {
          setLoadingError(`Question ${i + 1} must have at least 2 valid options`);
          return false;
        }
        if (!q.options[q.correctIndex]?.trim()) {
          setLoadingError(`Question ${i + 1} must have a valid correct answer selected`);
          return false;
        }
      }
    }

    return true;
  }

  const handleSubmit = async () => {
    if (!validateQuiz()) {
      return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      setLoadingError("No authentication token found");
      return;
    }

    setIsSubmitting(true);
    setLoadingError('');

    try {
      // Format questions for backend
      const formattedQuestions = questions.map((q, index) => ({
        question_id: `q_${index + 1}`,
        question_text: q.question,
        question_type: q.type,
        options: q.type === 'multiple-choice' ? q.options.filter(opt => opt.trim()) : [],
        correct_answer: q.type === 'multiple-choice' ? q.options[q.correctIndex] : q.answer,
        points: q.points || 1
      }));

      const result = await createQuiz(
        token,
        quizData.title,
        quizData.description,
        quizData.courseId,
        formattedQuestions,
        quizData.timeLimit,
        quizData.passingScore
      );

      if (result.success) {
        setSuccessMessage('Quiz created successfully!');
        setLoadingError('');
        // Reset form
        setQuestions([]);
        setQuizData({
          title: '',
          description: '',
          courseId: '',
          timeLimit: 30,
          passingScore: 70
        });
      } else {
        setLoadingError(result.error || 'Failed to create quiz');
        setSuccessMessage('');
      }
    } catch (err) {
      setLoadingError('An unexpected error occurred');
      setSuccessMessage('');
      console.error('Quiz creation error:', err);
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleQuizDataChange = (field, value) => {
    setQuizData(prev => ({ ...prev, [field]: value }));
  }

  const getTotalPoints = () => {
    return questions.reduce((total, q) => total + (q.points || 1), 0);
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quiz Builder</h1>
          <p className="text-gray-600 mt-1">Create interactive quizzes for your courses</p>
        </div>
        <div className="flex items-center space-x-2">
          {questions.length > 0 && (
            <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              {questions.length} questions • {getTotalPoints()} points
            </div>
          )}
          <Button onClick={addQuestion}>
            <Plus className="h-4 w-4 mr-1" />
            Add Question
          </Button>
        </div>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-4 rounded-md">
          <CheckCircle className="h-5 w-5" />
          <span>{successMessage}</span>
        </div>
      )}

      {(loadingError || error) && (
        <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-md">
          <AlertCircle className="h-5 w-5" />
          <span>{loadingError || error}</span>
        </div>
      )}

      {/* Quiz Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Quiz Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quizTitle">Quiz Title *</Label>
              <Input
                id="quizTitle"
                placeholder="e.g., React Fundamentals Quiz"
                value={quizData.title}
                onChange={(e) => handleQuizDataChange('title', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="courseId">Course ID *</Label>
              <Input
                id="courseId"
                placeholder="e.g., course_123"
                value={quizData.courseId}
                onChange={(e) => handleQuizDataChange('courseId', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quizDescription">Description</Label>
            <Textarea
              id="quizDescription"
              placeholder="Brief description of the quiz..."
              value={quizData.description}
              onChange={(e) => handleQuizDataChange('description', e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
              <Input
                id="timeLimit"
                type="number"
                min="1"
                max="180"
                value={quizData.timeLimit}
                onChange={(e) => handleQuizDataChange('timeLimit', parseInt(e.target.value) || 30)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="passingScore">Passing Score (%)</Label>
              <Input
                id="passingScore"
                type="number"
                min="0"
                max="100"
                value={quizData.passingScore}
                onChange={(e) => handleQuizDataChange('passingScore', parseInt(e.target.value) || 70)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Questions */}
      {questions.map((q, index) => (
        <Card key={q.id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              Question {index + 1}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                {q.points || 1} point{(q.points || 1) !== 1 ? 's' : ''}
              </div>
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeQuestion(index)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Remove
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-3 space-y-2">
                <Label>Question Text *</Label>
                <Textarea
                  value={q.question}
                  onChange={(e) => updateQuestion(index, "question", e.target.value)}
                  placeholder="Enter the question..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Points</Label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={q.points || 1}
                  onChange={(e) => updateQuestion(index, "points", parseInt(e.target.value) || 1)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Question Type</Label>
              <Select
                value={q.type}
                onValueChange={(value) => updateQuestion(index, "type", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                  <SelectItem value="essay">Essay</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {q.type === "multiple-choice" && (
              <div className="space-y-3">
                <Label>Options *</Label>
                {q.options.map((opt, optIndex) => (
                  <div key={optIndex} className="flex items-center gap-2">
                    <Input
                      value={opt}
                      onChange={(e) => updateOption(index, optIndex, e.target.value)}
                      placeholder={`Option ${optIndex + 1}`}
                      className="flex-1"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`correct-${index}`}
                        checked={q.correctIndex === optIndex}
                        onChange={() => updateQuestion(index, "correctIndex", optIndex)}
                        className="w-4 h-4"
                      />
                      <span className="text-xs text-gray-500 whitespace-nowrap">Correct</span>
                    </div>
                    {q.options.length > 2 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeOption(index, optIndex)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => addOption(index)}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Option
                </Button>
              </div>
            )}

            {q.type === "essay" && (
              <div className="space-y-2">
                <Label>Expected Answer (optional)</Label>
                <Textarea
                  value={q.answer}
                  onChange={(e) => updateQuestion(index, "answer", e.target.value)}
                  placeholder="Type model answer (optional)..."
                  rows={4}
                />
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {/* Empty State */}
      {questions.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No questions yet</h3>
            <p className="text-gray-600 mb-4">Start building your quiz by adding questions</p>
            <Button onClick={addQuestion}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Question
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Save Quiz */}
      {questions.length > 0 && (
        <div className="flex justify-end space-x-4 pt-6 border-t">
          <div className="flex items-center text-sm text-gray-600">
            Total: {questions.length} questions, {getTotalPoints()} points
          </div>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting || loading}
            className="bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            {isSubmitting ? 'Creating Quiz...' : 'Save Quiz'}
          </Button>
        </div>
      )}
    </div>
  )
}
