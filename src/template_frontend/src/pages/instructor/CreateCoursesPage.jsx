import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, X, Image, PlayCircle, FileText, SquarePen, MoreHorizontal, Pencil } from 'lucide-react';
import BackgrounImage from '../../assets/free-online-animation-courses.webp'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        {/* Added max-h and overflow-y-auto here */}
        <div className="p-4 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export function CreateCoursesPage() {
  const navigate = useNavigate();

  const [courseDescription, setCourseDescription] = useState('');
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
        {/* <div className="flex items-center space-x-2 text-gray-700">
          <span className="font-medium">Step 1 :</span>
          <span className="text-blue-600 font-semibold">Learning Path Overview</span>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 text-gray-500">
            <Button className="bg-white hover:bg-gray-200">
              <ChevronsLeft className="text-black" />
            </Button>
            <Button className="px-6 py-2 rounded-lg font-semibold text-md">Continue</Button>
          </div>
        </div> */}
      </nav>

      {/* Course */}
      <div className="m-auto px-6 pt-24 pb-8 w-[60%]">
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
            <Label htmlFor="courseTitle" className="text-xl">Course Title</Label>
            <Input
              id="courseTitle"
              placeholder="e.g., Introduction to React Hooks"
              className="text-lg font-semibold"
            />
          </div>

          {/* Course Description */}
          <div className="space-y-2">
            <Label htmlFor="courseDesc" className="text-xl">Course Description</Label>
            <Textarea
              id="courseDesc"
              placeholder="Provide a detailed description of your course..."
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              maxLength={MAX_DESCRIPTION_LENGTH}
              className="min-h-[100px]"
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
                />
                <Select>
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
                <Select id="language">
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
            <Label htmlFor="materialTitle" className="text-md">Material Title</Label>
            <Input
              id="materialTitle"
              placeholder="e.g., Introduction to CSS Grid"
              value={newMaterialTitle}
              onChange={(e) => setNewMaterialTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="materialType" className="text-md">Material Type</Label>
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
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-0">Done</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
