import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, X, Image, PlayCircle, FileText, SquarePen, MoreHorizontal, Pencil, AlertCircle, CheckCircle } from 'lucide-react';
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
  const [loadingError, setLoadingError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const MAX_DESCRIPTION_LENGTH = 300;

  const [courseMaterials, setCourseMaterials] = useState([
    {
      id: 'mat-1',
      title: 'Introduction to HTML Basics',
      type: 'Document/PDF',
      chapter: 'Module 1',
      updated: '10 July 2024',
      description: 'A comprehensive guide to HTML fundamentals.',
      status: 'Published',
      content: 'html_basics.pdf'
    },
    {
      id: 'mat-2',
      title: 'React State Management Deep Dive',
      type: 'Video',
      chapter: 'Module 2',
      updated: '05 July 2024',
      description: 'Understanding useState and useEffect hooks.',
      status: 'Published',
      content: 'react_state.mp4'
    },
  ]);

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
  const [newMaterialDescription, setNewMaterialDescription] = useState('');
  const [newMaterialFile, setNewMaterialFile] = useState(null);
  const [newMaterialPreviewUrl, setNewMaterialPreviewUrl] = useState(null);

  // Add Material Modal Handlers
  const openAddMaterialModal = () => {
    setIsAddMaterialModalOpen(true);
  };

  const closeAddMaterialModal = () => {
    setIsAddMaterialModalOpen(false);
    // Reset form fields
    setNewMaterialTitle('');
    setNewMaterialType('');
    setNewMaterialDescription('');
    setNewMaterialFile(null);
  };

  const handleMaterialFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewMaterialFile(file);
      if (newMaterialType === 'video') {
        setNewMaterialPreviewUrl(URL.createObjectURL(file));
      } else {
        setNewMaterialPreviewUrl(null);
      }
    } else {
      setNewMaterialFile(null);
      setNewMaterialPreviewUrl(null);
    }
  };

  const handleAddMaterial = () => {
    if (!newMaterialTitle.trim() || !newMaterialType) {
      setLoadingError('Please fill in all required fields for the material');
      return;
    }

    const newMaterial = {
      id: `mat-${Date.now()}`,
      title: newMaterialTitle,
      type: newMaterialType === 'document' ? 'Document/PDF' : 'Video',
      chapter: 'Module 1', // Default for now
      updated: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
      description: newMaterialDescription || 'No description provided',
      status: 'Draft',
      content: newMaterialFile ? newMaterialFile.name : 'No file uploaded'
    };

    setCourseMaterials(prev => [...prev, newMaterial]);
    closeAddMaterialModal();
    setLoadingError('');
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
        // Optionally redirect after a delay
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
            {/* Course Duration */}
            <div className="w-[50%] space-y-2">
              <Label htmlFor="estimatedDuration" className="text-xl">Estimated Duration</Label>
              <div className="flex justify-start items-center space-x-2">
                <Input
                  id="estimatedDuration"
                  type="number"
                  placeholder="0"
                  className="text-lg font-medium text-gray-500"
                  value={courseData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                />
                <Select 
                  value={courseData.durationPeriod}
                  onValueChange={(value) => handleInputChange('durationPeriod', value)}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Period"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Week</SelectItem>
                    <SelectItem value="month">Month</SelectItem>
                    <SelectItem value="year">Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
      
        {/* Materials */}
        <section className="space-y-6 mt-24">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Course Materials</h2>
            <Button onClick={openAddMaterialModal} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-0">
              <PlusCircle className="h-5 w-5 mr-2" />
              <span>Add New Material</span>
            </Button>
          </div>

          {/* Materials List */}
          <div className="space-y-4">
            {courseMaterials.length === 0 ? (
              <div className="text-center text-gray-500 p-8 border rounded-lg bg-gray-50">
                No materials added yet. Click "Add New Material" to get started!
              </div>
            ) : (
              courseMaterials.map((material, index) => (
                <Card
                  key={material.id} 
                  id={material.id}
                  className={`flex items-center p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-grab`}
                >
                  {/* Material Icon */}
                  <div className="flex-shrink-0 bg-orange-100 p-3 rounded-lg mr-4">
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
                  <div className="flex-shrink-0 flex items-center space-x-2 ml-4">
                    <Badge variant={material.status === 'Published' ? 'success' : 'warning'} className="px-3 py-1 text-sm rounded-full">
                      {material.status}
                    </Badge>
                    <Button variant="ghost" size="icon" className="text-gray-600 hover:bg-gray-100">
                      <Pencil className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-600 hover:bg-gray-100">
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>
        </section>
      </div>

      {/* Add New Material Modal */}
      <Modal isOpen={isAddMaterialModalOpen} onClose={closeAddMaterialModal} title="Add New Course Material">
        <div className="space-y-4">
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
          <div className="space-y-1">
            <Label htmlFor="materialType" className="text-md">Material Type *</Label>
            <Select
              id="materialType"
              value={newMaterialType}
              onValueChange={(value) => setNewMaterialType(value)}
            >
              <SelectTrigger className="w-[100%]">
                <SelectValue placeholder="Select Type"/>
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
              <Input id="uploadMaterial" type="file" accept=".pdf" onChange={handleMaterialFileChange} />
            </div>
          ) : newMaterialType === 'video' ? (
            <div className="space-y-1">
              <Label htmlFor="uploadMaterial">Upload Video</Label>
              <Input id="uploadMaterial" type="file" accept="video/*" onChange={handleMaterialFileChange} />
            </div>
          ) : null}

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

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={closeAddMaterialModal}>Cancel</Button>
            <Button onClick={handleAddMaterial} className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-0">
              Add Material
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
