import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, X, Image, PlayCircle, FileText, SquarePen, MoreHorizontal, Pencil, AlertCircle, CheckCircle, FileUp } from 'lucide-react';
import BackgrounImage from '../../assets/free-online-animation-courses.webp'
import { useNavigate } from "react-router-dom";
import { useLMS } from "../../hooks/useLMS";

// Modal Component
const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg relative">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-4 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default function CreateCoursesPage() {
  const navigate = useNavigate();
  const { createCourse, loading, error } = useLMS();

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
  const MAX_DESCRIPTION_LENGTH = 300;

  const [courseSessions, setCourseSessions] = useState([
    {
      id: 'session-1',
      title: 'Session 1: Introduction',
      materials: [
        {
          id: 'mat-1',
          title: 'Welcome to the Course',
          type: 'Page',
          description: 'Overview of the course and what to expect.',
          status: 'Published',
          content: 'Welcome text for page 1'
        },
        {
          id: 'mat-2',
          title: 'Course Introduction Video',
          type: 'Video',
          description: 'A short video introducing the instructor and course.',
          status: 'Published',
          content: 'intro_video.mp4',
          previewUrl: 'https://placehold.co/100x60/FF0000/FFFFFF?text=Video+Preview'
        },
      ]
    }
  ]);

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
        return <PlayCircle className="h-6 w-6 text-red-600" />;
      case 'Document/PDF':
        return <FileText className="h-6 w-6 text-blue-600" />;
      case 'Page':
        return <FileText className="h-6 w-6 text-orange-600" />;
      case 'Quiz':
        return <SquarePen className="h-6 w-6 text-purple-600" />;
      default:
        return <FileText className="h-6 w-6 text-gray-600" />;
    }
  };

  const [isAddMaterialModalOpen, setIsAddMaterialModalOpen] = useState(false);
  const [newMaterialTitle, setNewMaterialTitle] = useState('');
  const [newMaterialType, setNewMaterialType] = useState('');
  const [newMaterialChapter, setNewMaterialChapter] = useState('');
  const [newMaterialDescription, setNewMaterialDescription] = useState('');
  const [newMaterialFile, setNewMaterialFile] = useState(null);
  const [newMaterialTextContent, setNewMaterialTextContent] = useState('');
  const [targetSessionId, setTargetSessionId] = useState('');

  // Material Modal Handlers
  const openAddMaterialModal = () => {
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

    // VAlidation type
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
      type: newMaterialType === 'document' ? 'Document/PDF' : 'Video',
      chapter: newMaterialChapter,
      updated: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
      description: newMaterialDescription,
      status: 'Published',
      content: materialContentValue,
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
    console.log("New Material Added:", newMaterial);

    // Reset form fields
    setNewMaterialTitle('');
    setNewMaterialType('');
    setNewMaterialDescription('');
    setNewMaterialChapter('');
    setNewMaterialFile(null);
    setNewMaterialTextContent('');
  };

  const handleCourseSubmit = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setLoadingError("No authentication token found");
      return;
    }

    // Validate required fields
    if (!courseData.title.trim() || !courseDescription.trim()) {
      setLoadingError('Please fill in all required fields (title and description)');
      return;
    }

    setIsSubmitting(true);
    setLoadingError('');

    try {
      const result = await createCourse(
        token,
        courseData.title,
        courseDescription,
        courseData.category,
        courseData.price,
        courseData.language
      );

      if (result.success) {
        setSuccessMessage('Course created successfully!');
        setLoadingError('');
        // Rredirect after a delay
        setTimeout(() => {
          navigate('/instructor/dashboard');
        }, 2000);
      } else {
        setLoadingError(result.error || 'Failed to create course');
        setSuccessMessage('');
      }
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 p-4 flex items-center justify-between">
        <div className="flex item-center space-x-4">
          <Button onClick={() => navigate(-1)} className="py-2 px-3 bg-gray-200 hover:bg-gray-400">
            <X className="text-black"/>
          </Button>
          <span className="h-fit text-center text-lg font-semibold text-gray-800">Create Course</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            onClick={handleCourseSubmit}
            disabled={isSubmitting || loading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? 'Creating...' : 'Create Course'}
          </Button>
        </div>
      </nav>

      {/* Course */}
      <div className="m-auto px-6 pt-24 pb-8 w-[60%]">
        {/* Success/Error Messages */}
        {successMessage && (
          <div className="mb-6 flex items-center space-x-2 text-green-600 bg-green-50 p-4 rounded-md">
            <CheckCircle className="h-5 w-5" />
            <span>{successMessage}</span>
          </div>
        )}

        {(loadingError || error) && (
          <div className="mb-6 flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-md">
            <AlertCircle className="h-5 w-5" />
            <span>{loadingError || error}</span>
          </div>
        )}

        <section
          className="p-4 h-[350px] bg-cover bg-[90%_40%] rounded-t-[20px] flex justify-end items-end"
          style={{ backgroundImage: `url(${BackgrounImage})` }}
        >
          <Button variant="outline" className="mb-4 flex justify-between">
            <Image />
            <span className="text-black">Update Thumbnail</span>
          </Button>
        </section>

        {/* Course Information */}
        <section className="mt-8 space-y-6">
          {/* Course Title */}
          <div className="space-y-2">
            <Label htmlFor="courseTitle" className="text-xl">Course Title *</Label>
            <Input
              id="courseTitle"
              placeholder="e.g., Introduction to React Hooks"
              className="text-lg font-semibold"
              value={courseData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              required
            />
          </div>

          {/* Course Description */}
          <div className="space-y-2">
            <Label htmlFor="courseDesc" className="text-xl">Course Description *</Label>
            <Textarea
              id="courseDesc"
              placeholder="Provide a detailed description of your course..."
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              maxLength={MAX_DESCRIPTION_LENGTH}
              className="min-h-[100px]"
              required
            />
            <div className="text-right text-sm text-gray-500">
              {courseDescription.length}/{MAX_DESCRIPTION_LENGTH}
            </div>
          </div>

          <div className="flex space-x-6">
            {/* Course Session */}
            <div className="w-[50%] space-y-2">
              <Label htmlFor="numSessions" className="text-lg font-semibold">Number of Sessions</Label>
              <Input
                id="numSessions"
                type="number"
                placeholder="1"
                min="1"
                value={numSessions}
                onChange={(e) => setNumSessions(Math.max(1, parseInt(e.target.value) || 1))}
                className="text-lg font-medium text-gray-700"
              />
            </div>

            {/* Course Language */}
            <div className="w-[50%] space-y-2">
              <Label htmlFor="language" className="text-xl">Language</Label>
              <div className="flex justify-start items-center space-x-2">
                <Select 
                  id="language"
                  value={courseData.language}
                  onValueChange={(value) => handleInputChange('language', value)}
                >
                  <SelectTrigger className="w-[100%]">
                    <SelectValue placeholder="Language"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="chinese">Chinese (Simplified)</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Additional Course Settings */}
          <div className="flex space-x-6">
            <div className="w-[50%] space-y-2">
              <Label htmlFor="category" className="text-xl">Category</Label>
              <Select 
                value={courseData.category}
                onValueChange={(value) => handleInputChange('category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="programming">Programming</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="data-science">Data Science</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-[50%] space-y-2">
              <Label htmlFor="price" className="text-xl">Price ($)</Label>
              <Input
                id="price"
                type="number"
                placeholder="0"
                min="0"
                step="0.01"
                value={courseData.price}
                onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>
        </section>
      
        {/* Sessions & Materials */}
        <section className="mt-[70px] bg-white p-6 sm:p-8 rounded-xl shadow-lg space-y-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Sessions & Materials</h2>
          
          {courseSessions.map((session, sessionIndex) => (
            <div key={session.id} className="border border-gray-200 rounded-lg p-4 space-y-4 bg-gray-50">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">{session.title}</h3>
                <Button 
                  onClick={() => openAddMaterialModal(session.id)} 
                  className="px-4 py-2 rounded-lg text-sm font-semibold"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Material
                </Button>
              </div>

              {session.materials.length === 0 ? (
                <div className="text-center text-gray-500 p-4 border border-dashed rounded-lg bg-white">
                  No materials in this session yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {session.materials.map((material) => (
                    <Card
                      key={material.id} 
                      id={material.id}
                      className={`flex flex-col sm:flex-row items-start sm:items-center p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group`}
                    >
                      {/* Material Icon */}
                      <div className="flex-shrink-0 bg-blue-50 p-3 rounded-lg mr-4 mb-3 sm:mb-0">
                        {getMaterialIcon(material.type)}
                      </div>

                      {/* Material Details */}
                      <div className="flex-grow">
                        <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                          {material.title}
                          <Badge variant="secondary" className="ml-3 px-2 py-0.5 text-xs rounded-full bg-gray-200 text-gray-700">
                            {material.type}
                          </Badge>
                        </CardTitle>
                        <CardDescription className="text-gray-600 mt-1 text-base">
                          {material.chapter} • Updated {material.updated}
                          {material.content && (
                              <span className="ml-2 text-xs text-gray-500 italic">({material.content})</span>
                          )}
                        </CardDescription>
                        <p className="text-gray-500 mt-2 text-sm">{material.description}</p>
                      </div>

                      {/* Actions */}
                      <div className="flex-shrink-0 flex items-center space-x-2 ml-0 sm:ml-4 mt-4 sm:mt-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Badge variant={material.status === 'Published' ? 'success' : 'warning'} className="px-2 py-0.5 text-xs rounded-full">
                          {material.status}
                        </Badge>
                        <Button variant="ghost" size="icon" className="text-gray-600 hover:bg-gray-100 rounded-full h-8 w-8">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-gray-600 hover:bg-gray-100 rounded-full h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      </div>

      {/* Add New Material Modal */}
      <Modal isOpen={isAddMaterialModalOpen} onClose={closeAddMaterialModal} title="Add New Course Material">
        <form form onSubmit={handleAddMaterialSubmit} className="space-y-4">
          {/* Material Title */}
          <div className="space-y-1">
            <Label htmlFor="materialTitle" className="text-md">Material Title *</Label>
            <Input
              id="materialTitle"
              placeholder="e.g., Introduction to CSS Grid"
              value={newMaterialTitle}
              onChange={(e) => setNewMaterialTitle(e.target.value)}
              required
            />
          </div>

          {/* Target Session */}
          <div className="space-y-1">
            <Label htmlFor="targetSession">Add to Session</Label>
            <Select value={targetSessionId} onValueChange={(value) => setTargetSessionId(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a session" />
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

          {/* Material Type */}
          <div className="space-y-1">
            <Label htmlFor="materialType" className="text-md font-semibold">Material Type</Label>
            <Select
              value={newMaterialType}
              onValueChange={(value) => {
                  setNewMaterialType(value);
                  setNewMaterialFile(null);
                  setNewMaterialTextContent('');
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a session" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="document">Document/PDF</SelectItem>
                <SelectItem value="video">Video</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Conditional Content Input based on Material Type */}
          {newMaterialType === 'document' ? (
            <div className="space-y-1">
              <Label htmlFor="uploadMaterial">Upload Document/PDF File</Label>
              <div className="relative w-full h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors bg-gray-50">
                <Input
                  id="uploadMaterial"
                  type="file"
                  accept=".pdf"
                  onChange={handleMaterialFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                {newMaterialFile ? (
                  <span className="text-gray-700 text-sm flex items-center">
                    <FileUp className="h-5 w-5 mr-2" /> {newMaterialFile.name}
                  </span>
                ) : (
                  <div className="text-center text-gray-500">
                    <FileUp className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="mt-1 text-sm">Click to upload PDF</p>
                  </div>
                )}
              </div>
              {newMaterialFile && (
                <div className="text-right">
                  <Button variant="ghost" onClick={() => { setNewMaterialFile(null); }} className="text-red-500 hover:bg-red-50">Remove File</Button>
                </div>
              )}
            </div>
          ) : newMaterialType === 'video' ? (
            <div className="space-y-1">
              <Label htmlFor="videoLink">Video Link (YouTube, Vimeo, etc.)</Label>
              <Input
                id="videoLink"
                type="url"
                placeholder="e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                value={newMaterialTextContent}
                onChange={(e) => setNewMaterialTextContent(e.target.value)}
                required
              />
              {newMaterialTextContent && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Video Preview:</h4>
                  <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
                    <iframe
                      src={newMaterialTextContent.replace("watch?v=", "embed/")} 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
                    ></iframe>
                  </div>
                </div>
              )}
            </div>
          ) : null}

          {/* Chapter/Section Input */}
          <div className="space-y-1">
            <Label htmlFor="newMaterialChapter" className="text-md font-semibold">Chapter/Section</Label>
            <Input
              id="newMaterialChapter"
              placeholder="e.g., Chapter 1, Section 2.1"
              value={newMaterialChapter}
              onChange={(e) => setNewMaterialChapter(e.target.value)}
            />
          </div>

          {/* Material Description */}
          <div className="space-y-1">
            <Label htmlFor="materialDesc">Material Description</Label>
            <Textarea
              id="materialDesc"
              label="Material Description (Optional)"
              placeholder="Briefly describe this material..."
              value={newMaterialDescription}
              onChange={(e) => setNewMaterialDescription(e.target.value)}
              maxLength={200}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="submit" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-0">Add Material</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
