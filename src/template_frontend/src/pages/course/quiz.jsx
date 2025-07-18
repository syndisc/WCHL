import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { FileText, AlertCircle, CheckCircle, Clock, Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";
import { useLMS } from "../../hooks/useLMS";
import { useParams } from "react-router-dom";

export default function QuizPage() {
    const { quizId } = useParams();
    const { getQuiz, submitQuizResponse, loading, error } = useLMS();
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState({});
    const [loadingError, setLoadingError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(null);
    const [quizSubmitted, setQuizSubmitted] = useState(false);

    useEffect(() => {
        if (quizId) {
            loadQuiz();
        }
    }, [quizId]);

    useEffect(() => {
        let timer;
        if (timeRemaining > 0 && !quizSubmitted) {
            timer = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev <= 1) {
                        handleAutoSubmit();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [timeRemaining, quizSubmitted]);

    const loadQuiz = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            setLoadingError("No authentication token found");
            return;
        }

        try {
            const result = await getQuiz(token, quizId);
            if (result.success) {
                setQuiz(result.data);
                // Set timer if quiz has time limit
                if (result.data.time_limit && result.data.time_limit > 0) {
                    setTimeRemaining(result.data.time_limit * 60); // Convert minutes to seconds
                }
            } else {
                setLoadingError(result.error || "Failed to load quiz");
            }
        } catch (err) {
            setLoadingError("An unexpected error occurred");
            console.error("Quiz loading error:", err);
        }
    };

    const handleMCQChange = (questionId, value) => {
        setAnswers((prev) => ({ ...prev, [questionId]: value }));
    };

    const handleEssayChange = (questionId, text) => {
        setAnswers((prev) => ({ ...prev, [questionId]: text }));
    };

    const handleAutoSubmit = async () => {
        if (!quizSubmitted) {
            await handleSubmit(true);
        }
    };

    const handleSubmit = async (isAutoSubmit = false) => {
        if (quizSubmitted) return;

        const token = localStorage.getItem('authToken');
        if (!token) {
            setLoadingError("No authentication token found");
            return;
        }

        // Validate required answers
        const unansweredQuestions = quiz.questions.filter(q => 
            !answers[q.question_id] || 
            (typeof answers[q.question_id] === 'string' && answers[q.question_id].trim() === '')
        );

        if (unansweredQuestions.length > 0 && !isAutoSubmit) {
            setLoadingError(`Please answer all questions. ${unansweredQuestions.length} question(s) remaining.`);
            return;
        }

        setIsSubmitting(true);
        setLoadingError('');

        try {
            // Format answers for submission
            const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => ({
                question_id: questionId,
                answer: answer
            }));

            const result = await submitQuizResponse(token, quizId, formattedAnswers);
            if (result.success) {
                setSuccessMessage(
                    isAutoSubmit 
                        ? 'Quiz auto-submitted due to time limit!' 
                        : 'Quiz submitted successfully!'
                );
                setQuizSubmitted(true);
                setTimeRemaining(0);
            } else {
                setLoadingError(result.error || 'Failed to submit quiz');
            }
        } catch (err) {
            setLoadingError('An unexpected error occurred while submitting');
            console.error('Quiz submission error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const getQuestionTypeLabel = (type) => {
        switch (type) {
            case 'multiple_choice':
                return 'Multiple Choice';
            case 'essay':
                return 'Essay';
            case 'true_false':
                return 'True/False';
            default:
                return 'Question';
        }
    };

    if (loading) {
        return (
            <div className="p-6 max-w-4xl mx-auto">
                <Card>
                    <CardContent className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
                            <p className="text-gray-600">Loading quiz...</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!quiz && !loading) {
        return (
            <div className="p-6 max-w-4xl mx-auto">
                <Card>
                    <CardContent className="text-center py-12">
                        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Quiz Not Found</h3>
                        <p className="text-gray-600">The quiz you're looking for doesn't exist or has been removed.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-xl flex items-center gap-2">
                            <FileText className="w-5 h-5 text-blue-600" />
                            {quiz?.title || 'Quiz'}
                        </CardTitle>
                        {timeRemaining !== null && timeRemaining > 0 && (
                            <div className={cn(
                                "flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium",
                                timeRemaining < 300 ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
                            )}>
                                <Clock className="w-4 h-4" />
                                {formatTime(timeRemaining)}
                            </div>
                        )}
                    </div>
                    {quiz?.description && (
                        <p className="text-gray-600 mt-2">{quiz.description}</p>
                    )}
                </CardHeader>

                <CardContent className="space-y-8">
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

                    {/* Quiz Instructions */}
                    {quiz?.instructions && (
                        <div className="bg-blue-50 p-4 rounded-md">
                            <h3 className="font-medium text-blue-900 mb-2">Instructions:</h3>
                            <p className="text-blue-800 text-sm">{quiz.instructions}</p>
                        </div>
                    )}

                    {/* Questions */}
                    {quiz?.questions?.map((q, index) => (
                        <div key={q.question_id} className="space-y-4 border-b pb-6 last:border-b-0">
                            <div className="flex items-start justify-between">
                                <h2 className="font-semibold text-gray-800 text-lg flex-1">
                                    {index + 1}. {q.question_text}
                                </h2>
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded ml-4">
                                    {getQuestionTypeLabel(q.question_type)}
                                </span>
                            </div>

                            {q.question_type === "multiple_choice" && q.options && (
                                <div className="grid gap-3">
                                    {q.options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            type="button"
                                            onClick={() => handleMCQChange(q.question_id, option)}
                                            disabled={quizSubmitted}
                                            className={cn(
                                                "text-left px-4 py-3 rounded-lg border transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                                                answers[q.question_id] === option
                                                    ? "bg-blue-50 border-blue-500 ring-2 ring-blue-300 text-blue-800 font-medium"
                                                    : "bg-white border-gray-300 hover:bg-gray-50"
                                            )}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {q.question_type === "true_false" && (
                                <div className="grid gap-3">
                                    {['True', 'False'].map((option) => (
                                        <button
                                            key={option}
                                            type="button"
                                            onClick={() => handleMCQChange(q.question_id, option)}
                                            disabled={quizSubmitted}
                                            className={cn(
                                                "text-left px-4 py-3 rounded-lg border transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                                                answers[q.question_id] === option
                                                    ? "bg-blue-50 border-blue-500 ring-2 ring-blue-300 text-blue-800 font-medium"
                                                    : "bg-white border-gray-300 hover:bg-gray-50"
                                            )}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {q.question_type === "essay" && (
                                <Textarea
                                    placeholder="Type your answer here..."
                                    className="min-h-[120px]"
                                    value={answers[q.question_id] || ""}
                                    onChange={(e) => handleEssayChange(q.question_id, e.target.value)}
                                    disabled={quizSubmitted}
                                />
                            )}

                            {q.points && (
                                <div className="text-sm text-gray-500">
                                    Points: {q.points}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Submit Button */}
                    {!quizSubmitted && (
                        <div className="flex justify-center pt-4">
                            <Button 
                                onClick={() => handleSubmit(false)} 
                                disabled={isSubmitting}
                                size="lg"
                                className="px-8"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    'Submit Quiz'
                                )}
                            </Button>
                        </div>
                    )}

                    {/* Quiz Completed Message */}
                    {quizSubmitted && (
                        <div className="text-center py-8 bg-green-50 rounded-lg">
                            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-green-900 mb-2">Quiz Completed!</h3>
                            <p className="text-green-700">Your answers have been submitted successfully.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
