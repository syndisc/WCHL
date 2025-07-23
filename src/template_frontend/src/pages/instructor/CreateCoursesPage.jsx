import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, X, Image, PlayCircle, FileText, SquarePen, MoreHorizontal, Pencil, AlertCircle, CheckCircle, FileUp, Trash2, Edit3, Save, BookOpen, Clock, Users, Star } from 'lucide-react';

// Modal Component
const Modal = ({ isOpen, onClose, children, title, size = "default" }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    default: "max-w-lg",
    large: "max-w-2xl",
    small: "max-w-md"
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-2xl shadow-2xl w-full ${sizeClasses[size]} relative transform transition-all`}>
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-gray-100">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

// Confirmation Modal Component
const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, type = "danger" }) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="small">
      <div className="space-y-6">
        <div className={`flex items-center space-x-3 p-4 rounded-lg ${
          type === 'danger' ? 'bg-red-50 text-red-800' : 'bg-yellow-50 text-yellow-800'
        }`}>
          <AlertCircle className="h-6 w-6 flex-shrink-0" />
          <p className="text-sm font-medium">{message}</p>
        </div>
        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={onConfirm}
            className={type === 'danger' ? 'bg-red-600 hover:bg-red-700' : 'bg-yellow-600 hover:bg-yellow-700'}
          >
            {type === 'danger' ? 'Delete' : 'Confirm'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default function CreateCoursesPage() {
  // Course form state
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    duration: '',
    durationPeriod: 'week',
    language: 'english',
    category: 'programming',
    price: 0
  });

  const [courseDescription, setCourseDescription] = useState('');
  const [numSessions, setNumSessions] = useState(1);
  const [loadingError, setLoadingError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const MAX_DESCRIPTION_LENGTH = 500;

  const [courseSessions, setCourseSessions] = useState([
    {
      id: 'session-1',
      title: 'Introduction to the Course',
      description: 'Welcome students and introduce the course objectives',
      materials: [
        {
          id: 'mat-1',
          title: 'Welcome to the Course',
          type: 'Page',
          description: 'Overview of the course and what to expect.',
          status: 'Published',
          content: 'Welcome text for page 1',
          duration: '5 min'
        },
        {
          id: 'mat-2',
          title: 'Course Introduction Video',
          type: 'Video',
          description: 'A short video introducing the instructor and course.',
          status: 'Published',
          content: 'intro_video.mp4',
          duration: '10 min',
          previewUrl: 'https://placehold.co/100x60/FF0000/FFFFFF?text=Video+Preview'
        },
      ]
    }
  ]);

  // Session editing state
  const [editingSession, setEditingSession] = useState(null);
  const [editSessionTitle, setEditSessionTitle] = useState('');
  const [editSessionDescription, setEditSessionDescription] = useState('');

  // Material modal states
  const [isAddMaterialModalOpen, setIsAddMaterialModalOpen] = useState(false);
  const [newMaterialTitle, setNewMaterialTitle] = useState('');
  const [newMaterialType, setNewMaterialType] = useState('');
  const [newMaterialChapter, setNewMaterialChapter] = useState('');
  const [newMaterialDescription, setNewMaterialDescription] = useState('');
  const [newMaterialFile, setNewMaterialFile] = useState(null);
  const [newMaterialTextContent, setNewMaterialTextContent] = useState('');
  const [newMaterialDuration, setNewMaterialDuration] = useState('');
  const [targetSessionId, setTargetSessionId] = useState('');

  // Confirmation modal states
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    type: 'danger',
    title: '',
    message: '',
    onConfirm: null
  });

  useEffect(() => {
    setCourseSessions(prevSessions => {
      const newSessions = [];
      for (let i = 1; i <= numSessions; i++) {
        const existingSession = prevSessions.find(s => s.id === `session-${i}`);
        if (existingSession) {
          newSessions.push(existingSession);
        } else {
          newSessions.push({
            id: `session-${i}`,
            title: `Session ${i}`,
            description: 'Add a description for this session',
            materials: []
          });
        }
      }
      return newSessions;
    });
  }, [numSessions]);

  const getMaterialIcon = (type) => {
    switch (type) {
      case 'Video':
        return <PlayCircle className="h-5 w-5 text-red-500" />;
      case 'Document/PDF':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'Page':
        return <BookOpen className="h-5 w-5 text-green-500" />;
      case 'Quiz':
        return <SquarePen className="h-5 w-5 text-purple-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Published':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Archived':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Session editing functions
  const startEditingSession = (session) => {
    setEditingSession(session.id);
    setEditSessionTitle(session.title);
    setEditSessionDescription(session.description);
  };

  const saveSessionEdit = () => {
    setCourseSessions(prevSessions =>
      prevSessions.map(session =>
        session.id === editingSession
          ? { ...session, title: editSessionTitle, description: editSessionDescription }
          : session
      )
    );
    setEditingSession(null);
    setEditSessionTitle('');
    setEditSessionDescription('');
  };

  const cancelSessionEdit = () => {
    setEditingSession(null);
    setEditSessionTitle('');
    setEditSessionDescription('');
  };

  // Material Modal Handlers
  const openAddMaterialModal = (sessionId = '') => {
    setTargetSessionId(sessionId);
    setIsAddMaterialModalOpen(true);
  };

  const closeAddMaterialModal = () => {
    setIsAddMaterialModalOpen(false);
    setNewMaterialTitle('');
    setNewMaterialType('');
    setNewMaterialDescription('');
    setNewMaterialChapter('');
    setNewMaterialFile(null);
    setNewMaterialTextContent('');
    setNewMaterialDuration('');
    setTargetSessionId('');
  };

  const handleMaterialFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewMaterialFile(file);
    } else {
      setNewMaterialFile(null);
    }
  };

  const handleAddMaterialSubmit = (e) => {
    e.preventDefault();

    let materialContentValue = '';

    if (newMaterialType === 'video') {
        materialContentValue = newMaterialTextContent;
    } else if (newMaterialType === 'document' && newMaterialFile) {
        materialContentValue = newMaterialFile.name;
    }

    // Basic validation
    if (!newMaterialTitle.trim()) {
        alert('Please enter a title for the material.');
        return;
    }
    if (!newMaterialType) {
        alert('Please select a material type.');
        return;
    }
    if (!targetSessionId) {
        alert('Please select a session for the material.');
        return;
    }

    // Validation by type
    if (newMaterialType === 'video' && !newMaterialTextContent.trim()) {
        alert('Please enter a video link.');
        return;
    }
    if (newMaterialType === 'document' && !newMaterialFile) {
        alert('Please upload a PDF file.');
        return;
    }

    const newMaterial = {
      id: `mat-${Date.now()}`,
      title: newMaterialTitle,
      type: newMaterialType === 'document' ? 'Document/PDF' : newMaterialType === 'video' ? 'Video' : 'Page',
      chapter: newMaterialChapter,
      updated: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
      description: newMaterialDescription,
      status: 'Published',
      content: materialContentValue,
      duration: newMaterialDuration || '5 min',
      file: newMaterialType === 'document' ? newMaterialFile : null,
      previewUrl: newMaterialType === 'video' ? newMaterialTextContent : null
    };

    setCourseSessions(prevSessions =>
      prevSessions.map(session =>
        session.id === targetSessionId
          ? { ...session, materials: [...session.materials, newMaterial] }
          : session
      )
    );

    closeAddMaterialModal();
  };

  // Material removal function
  const removeMaterial = (sessionId, materialId) => {
    setConfirmModal({
      isOpen: true,
      type: 'danger',
      title: 'Delete Material',
      message: 'Are you sure you want to delete this material? This action cannot be undone.',
      onConfirm: () => {
        setCourseSessions(prevSessions =>
          prevSessions.map(session =>
            session.id === sessionId
              ? { ...session, materials: session.materials.filter(mat => mat.id !== materialId) }
              : session
          )
        );
        setConfirmModal({ ...confirmModal, isOpen: false });
      }
    });
  };

  const handleCourseSubmit = async () => {
    // Validate required fields
    if (!courseData.title.trim() || !courseDescription.trim()) {
      setLoadingError('Please fill in all required fields (title and description)');
      return;
    }

    setIsSubmitting(true);
    setLoadingError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccessMessage('Course created successfully!');
      setLoadingError('');
      
      // Redirect after a delay
      setTimeout(() => {
        // navigate('/instructor/dashboard');
        console.log('Would redirect to dashboard');
      }, 2000);
    } catch (err) {
      setLoadingError('An unexpected error occurred');
      setSuccessMessage('');
      console.error('Course creation error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setCourseData(prev => ({ ...prev, [field]: value }));
  };

  // Calculate course stats
  const totalMaterials = courseSessions.reduce((acc, session) => acc + session.materials.length, 0);
  const totalDuration = courseSessions.reduce((acc, session) => 
    acc + session.materials.reduce((matAcc, material) => {
      const duration = parseInt(material.duration) || 0;
      return matAcc + duration;
    }, 0), 0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg z-50 border-b border-gray-100">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              onClick={() => console.log('Navigate back')} 
              variant="ghost"
              className="rounded-full hover:bg-gray-100 p-2"
            >
              <X className="h-5 w-5 text-gray-600"/>
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Create Course</h1>
                <p className="text-sm text-gray-500">Build your learning experience</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Course Stats */}
            <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <BookOpen className="h-4 w-4" />
                <span>{numSessions} sessions</span>
              </div>
              <div className="flex items-center space-x-1">
                <FileText className="h-4 w-4" />
                <span>{totalMaterials} materials</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{Math.floor(totalDuration / 60)}h {totalDuration % 60}m</span>
              </div>
            </div>

            <Button 
              onClick={handleCourseSubmit}
              disabled={isSubmitting}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg px-6 py-2.5 rounded-xl font-semibold transition-all duration-200"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating...</span>
                </div>
              ) : (
                'Create Course'
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-12">
        {/* Success/Error Messages */}
        {successMessage && (
          <div className="mb-8 flex items-center space-x-3 text-green-700 bg-green-50 border border-green-200 p-4 rounded-xl shadow-sm">
            <CheckCircle className="h-6 w-6 flex-shrink-0" />
            <span className="font-medium">{successMessage}</span>
          </div>
        )}

        {loadingError && (
          <div className="mb-8 flex items-center space-x-3 text-red-700 bg-red-50 border border-red-200 p-4 rounded-xl shadow-sm">
            <AlertCircle className="h-6 w-6 flex-shrink-0" />
            <span className="font-medium">{loadingError}</span>
          </div>
        )}

        {/* Course Header */}
        <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl shadow-xl overflow-hidden mb-8">
          <div 
            className="h-64 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 relative flex items-end justify-end p-8"
            style={{ 
              backgroundImage: 'url(data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="7" cy="7" r="7"/%3E%3Ccircle cx="53" cy="7" r="7"/%3E%3Ccircle cx="30" cy="30" r="7"/%3E%3Ccircle cx="7" cy="53" r="7"/%3E%3Ccircle cx="53" cy="53" r="7"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E)'
            }}
          >
            <Button 
              variant="secondary" 
              className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-200 rounded-xl"
            >
              <Image className="h-4 w-4 mr-2" />
              Update Cover
            </Button>
          </div>

          <div className="p-8 space-y-6">
            {/* Course Title */}
            <div className="space-y-3">
              <Label htmlFor="courseTitle" className="text-lg font-semibold text-gray-900">
                Course Title *
              </Label>
              <Input
                id="courseTitle"
                placeholder="e.g., Complete React Development Masterclass"
                className="text-xl font-bold border-2 border-gray-200 focus:border-blue-500 rounded-xl p-4 transition-all duration-200"
                value={courseData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
            </div>

            {/* Course Description */}
            <div className="space-y-3">
              <Label htmlFor="courseDesc" className="text-lg font-semibold text-gray-900">
                Course Description *
              </Label>
              <Textarea
                id="courseDesc"
                placeholder="Provide a comprehensive description of your course. What will students learn? What makes this course unique?"
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
                maxLength={MAX_DESCRIPTION_LENGTH}
                className="min-h-[120px] border-2 border-gray-200 focus:border-blue-500 rounded-xl p-4 transition-all duration-200 resize-none"
                required
              />
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Write a compelling description to attract students</span>
                <span className={`font-medium ${courseDescription.length > MAX_DESCRIPTION_LENGTH * 0.9 ? 'text-red-500' : 'text-gray-400'}`}>
                  {courseDescription.length}/{MAX_DESCRIPTION_LENGTH}
                </span>
              </div>
            </div>

            {/* Course Settings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
              {/* Number of Sessions */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700 flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Sessions
                </Label>
                <Input
                  type="number"
                  min="1"
                  max="50"
                  value={numSessions}
                  onChange={(e) => setNumSessions(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
                  className="border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-200"
                />
              </div>

              {/* Language */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700">Language</Label>
                <Select 
                  value={courseData.language}
                  onValueChange={(value) => handleInputChange('language', value)}
                >
                  <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">🇺🇸 English</SelectItem>
                    <SelectItem value="chinese">🇨🇳 Chinese</SelectItem>
                    <SelectItem value="spanish">🇪🇸 Spanish</SelectItem>
                    <SelectItem value="french">🇫🇷 French</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Category */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700">Category</Label>
                <Select 
                  value={courseData.category}
                  onValueChange={(value) => handleInputChange('category', value)}
                >
                  <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="programming">💻 Programming</SelectItem>
                    <SelectItem value="design">🎨 Design</SelectItem>
                    <SelectItem value="business">💼 Business</SelectItem>
                    <SelectItem value="marketing">📊 Marketing</SelectItem>
                    <SelectItem value="data-science">📈 Data Science</SelectItem>
                    <SelectItem value="other">📚 Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700">Price ($)</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={courseData.price}
                  onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                  className="border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sessions & Materials */}
        <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Course Curriculum</h2>
              <p className="text-gray-600">Organize your content into sessions and add learning materials</p>
            </div>
            <Button 
              onClick={() => openAddMaterialModal()}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl px-6 py-3 font-semibold shadow-lg transition-all duration-200"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Add Material
            </Button>
          </div>
          
          <div className="space-y-6">
            {courseSessions.map((session, sessionIndex) => (
              <div key={session.id} className="bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-gray-200 rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-lg">
                {/* Session Header */}
                <div className="bg-white/80 backdrop-blur-sm p-6 border-b border-gray-200">
                  {editingSession === session.id ? (
                    <div className="space-y-4">
                      <Input
                        value={editSessionTitle}
                        onChange={(e) => setEditSessionTitle(e.target.value)}
                        className="text-xl font-bold border-2 border-blue-300 rounded-xl"
                        placeholder="Session title..."
                      />
                      <Textarea
                        value={editSessionDescription}
                        onChange={(e) => setEditSessionDescription(e.target.value)}
                        className="border-2 border-blue-300 rounded-xl resize-none"
                        placeholder="Session description..."
                        rows={2}
                      />
                      <div className="flex space-x-2">
                        <Button onClick={saveSessionEdit} size="sm" className="bg-green-600 hover:bg-green-700 text-white rounded-lg">
                          <Save className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                        <Button onClick={cancelSessionEdit} variant="outline" size="sm" className="rounded-lg">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                            {sessionIndex + 1}
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900">{session.title}</h3>
                        </div>
                        <p className="text-gray-600 text-sm ml-11">{session.description}</p>
                        <div className="flex items-center space-x-4 mt-3 ml-11 text-sm text-gray-500">
                          <span className="flex items-center">
                            <FileText className="h-4 w-4 mr-1" />
                            {session.materials.length} materials
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {session.materials.reduce((acc, mat) => acc + (parseInt(mat.duration) || 0), 0)} min
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          onClick={() => startEditingSession(session)}
                          variant="ghost" 
                          size="sm"
                          className="text-gray-600 hover:bg-gray-100 bg-white border rounded-lg"
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button 
                          onClick={() => openAddMaterialModal(session.id)} 
                          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 font-medium shadow-sm transition-all duration-200"
                        >
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Add Material
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Session Materials */}
                <div className="p-6">
                  {session.materials.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl bg-white/50">
                      <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h4 className="text-lg font-medium text-gray-600 mb-2">No materials yet</h4>
                      <p className="text-gray-500 mb-4">Start building your session by adding learning materials</p>
                      <Button 
                        onClick={() => openAddMaterialModal(session.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-3"
                      >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add First Material
                      </Button>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {session.materials.map((material, materialIndex) => (
                        <Card
                          key={material.id}
                          className="bg-white border-2 border-gray-100 hover:border-blue-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group"
                        >
                          <CardContent className="p-5">
                            <div className="flex items-start space-x-4">
                              {/* Material Icon & Index */}
                              <div className="flex-shrink-0 flex items-center space-x-3">
                                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                                  {materialIndex + 1}
                                </div>
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center border border-blue-100">
                                  {getMaterialIcon(material.type)}
                                </div>
                              </div>

                              {/* Material Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                      <h4 className="text-lg font-bold text-gray-900 truncate">{material.title}</h4>
                                      <Badge variant={"outline"} className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(material.status)}`}>
                                        {material.status}
                                      </Badge>
                                      <Badge variant="outline" className="px-2 py-1 text-xs rounded-full bg-gray-50 border-gray-200">
                                        {material.type}
                                      </Badge>
                                    </div>
                                    
                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{material.description}</p>
                                    
                                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                                      {material.chapter && (
                                        <span className="flex items-center">
                                          <BookOpen className="h-3 w-3 mr-1" />
                                          {material.chapter}
                                        </span>
                                      )}
                                      <span className="flex items-center">
                                        <Clock className="h-3 w-3 mr-1" />
                                        {material.duration}
                                      </span>
                                      <span>Updated {material.updated}</span>
                                    </div>
                                  </div>

                                  {/* Material Actions */}
                                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      className="text-gray-600 hover:bg-gray-100 bg-white rounded-lg p-2"
                                    >
                                      <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => removeMaterial(session.id, material.id)}
                                      className="text-red-600 hover:bg-red-50 bg-white rounded-lg p-2"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      className="text-gray-600 hover:bg-gray-100 bg-white rounded-lg p-2"
                                    >
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>

                                {/* Video Preview */}
                                {material.type === 'Video' && material.previewUrl && (
                                  <div className="mt-4 rounded-lg overflow-hidden bg-gray-100">
                                    <div className="aspect-video bg-gray-200 flex items-center justify-center">
                                      <PlayCircle className="h-12 w-12 text-gray-400" />
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Material Modal */}
      <Modal 
        isOpen={isAddMaterialModalOpen} 
        onClose={closeAddMaterialModal} 
        title="Add Learning Material"
        size="large"
      >
        <form onSubmit={handleAddMaterialSubmit} className="space-y-6">
          {/* Material Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Label htmlFor="materialTitle" className="text-sm font-semibold text-gray-700">
                Material Title *
              </Label>
              <Input
                id="materialTitle"
                placeholder="e.g., Introduction to CSS Grid Layout"
                value={newMaterialTitle}
                onChange={(e) => setNewMaterialTitle(e.target.value)}
                className="mt-2 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                required
              />
            </div>

            <div>
              <Label className="text-sm font-semibold text-gray-700">Target Session *</Label>
              <Select value={targetSessionId} onValueChange={setTargetSessionId}>
                <SelectTrigger className="mt-2 border-2 border-gray-200 focus:border-blue-500 rounded-xl">
                  <SelectValue placeholder="Choose session" />
                </SelectTrigger>
                <SelectContent>
                  {courseSessions.map(session => (
                    <SelectItem key={session.id} value={session.id}>
                      {session.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-semibold text-gray-700">Material Type *</Label>
              <Select
                value={newMaterialType}
                onValueChange={(value) => {
                  setNewMaterialType(value);
                  setNewMaterialFile(null);
                  setNewMaterialTextContent('');
                }}
              >
                <SelectTrigger className="mt-2 border-2 border-gray-200 focus:border-blue-500 rounded-xl">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">
                    <div className="flex items-center">
                      <PlayCircle className="h-4 w-4 mr-2 text-red-500" />
                      Video Content
                    </div>
                  </SelectItem>
                  <SelectItem value="document">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-blue-500" />
                      Document/PDF
                    </div>
                  </SelectItem>
                  <SelectItem value="page">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-green-500" />
                      Text Page
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-semibold text-gray-700">Chapter/Section</Label>
              <Input
                placeholder="e.g., Chapter 2.1"
                value={newMaterialChapter}
                onChange={(e) => setNewMaterialChapter(e.target.value)}
                className="mt-2 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
              />
            </div>

            <div>
              <Label className="text-sm font-semibold text-gray-700">Duration</Label>
              <Input
                placeholder="e.g., 15 min"
                value={newMaterialDuration}
                onChange={(e) => setNewMaterialDuration(e.target.value)}
                className="mt-2 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
              />
            </div>
          </div>

          {/* Material Description */}
          <div>
            <Label className="text-sm font-semibold text-gray-700">Description</Label>
            <Textarea
              placeholder="Describe what students will learn from this material..."
              value={newMaterialDescription}
              onChange={(e) => setNewMaterialDescription(e.target.value)}
              maxLength={300}
              className="mt-2 border-2 border-gray-200 focus:border-blue-500 rounded-xl resize-none"
              rows={3}
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {newMaterialDescription.length}/300
            </div>
          </div>

          {/* Content Input based on Material Type */}
          {newMaterialType === 'document' && (
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-gray-700">Upload Document *</Label>
              <div className="relative">
                <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer hover:border-blue-400 transition-colors bg-gray-50 hover:bg-blue-50">
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleMaterialFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  {newMaterialFile ? (
                    <div className="text-center">
                      <FileUp className="mx-auto h-8 w-8 text-blue-500 mb-2" />
                      <p className="text-sm font-medium text-gray-700">{newMaterialFile.name}</p>
                      <p className="text-xs text-gray-500">Click to change file</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <FileUp className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                      <p className="text-sm font-medium text-gray-600">Drop your file here or click to browse</p>
                      <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX up to 10MB</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {newMaterialType === 'video' && (
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-gray-700">Video URL *</Label>
              <Input
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={newMaterialTextContent}
                onChange={(e) => setNewMaterialTextContent(e.target.value)}
                className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                required
              />
              {newMaterialTextContent && (
                <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Video Preview:</h4>
                  <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <PlayCircle className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Video preview will appear here</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {newMaterialType === 'page' && (
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-gray-700">Page Content *</Label>
              <Textarea
                placeholder="Enter your text content here..."
                value={newMaterialTextContent}
                onChange={(e) => setNewMaterialTextContent(e.target.value)}
                className="border-2 border-gray-200 focus:border-blue-500 rounded-xl resize-none"
                rows={6}
                required
              />
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-100">
            <Button 
              type="button" 
              variant="outline" 
              onClick={closeAddMaterialModal}
              className="px-6 py-2.5 rounded-xl"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold"
            >
              Add Material
            </Button>
          </div>
        </form>
      </Modal>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        type={confirmModal.type}
      />
    </div>
  )
}