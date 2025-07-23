import React, { useState, useEffect } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Download, Award, Calendar, Trophy, Star, Medal, BookOpen, GraduationCap, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// Dummy certificates data
const dummyCertificates = [
  {
    certificate_id: "CERT-2024-001",
    course_id: "js-advanced",
    course_name: "Advanced JavaScript & ES6+",
    course_description: "Master modern JavaScript concepts including async/await, modules, and advanced patterns",
    final_grade: 95,
    issued_date: new Date('2024-06-15').getTime() * 1000000,
    instructor: "Sarah Johnson",
    duration: "12 weeks",
    skills: ["JavaScript", "ES6+", "Async Programming", "Module Systems"],
    certificate_type: "Professional",
    course_image: "/api/placeholder/300/200"
  },
  {
    certificate_id: "CERT-2024-002", 
    course_id: "react-mastery",
    course_name: "React Mastery: Hooks & State Management",
    course_description: "Complete guide to React including hooks, context, and modern state management",
    final_grade: 88,
    issued_date: new Date('2024-05-20').getTime() * 1000000,
    instructor: "Mike Chen",
    duration: "10 weeks",
    skills: ["React", "Hooks", "State Management", "Component Architecture"],
    certificate_type: "Professional",
    course_image: "/api/placeholder/300/200"
  },
  {
    certificate_id: "CERT-2024-003",
    course_id: "node-backend",
    course_name: "Node.js Backend Development",
    course_description: "Build scalable backend applications with Node.js, Express, and MongoDB",
    final_grade: 92,
    issued_date: new Date('2024-04-10').getTime() * 1000000,
    instructor: "Alex Rodriguez",
    duration: "14 weeks", 
    skills: ["Node.js", "Express", "MongoDB", "API Development"],
    certificate_type: "Professional",
    course_image: "/api/placeholder/300/200"
  },
  {
    certificate_id: "CERT-2024-004",
    course_id: "css-design",
    course_name: "Modern CSS & Design Systems",
    course_description: "Create beautiful, responsive designs with modern CSS techniques",
    final_grade: 85,
    issued_date: new Date('2024-03-25').getTime() * 1000000,
    instructor: "Emma Wilson",
    duration: "8 weeks",
    skills: ["CSS Grid", "Flexbox", "Animations", "Design Systems"],
    certificate_type: "Specialization",
    course_image: "/api/placeholder/300/200"
  },
  {
    certificate_id: "CERT-2024-005",
    course_id: "python-data",
    course_name: "Python for Data Science",
    course_description: "Learn data analysis and visualization with Python, Pandas, and Matplotlib",
    final_grade: 94,
    issued_date: new Date('2024-02-14').getTime() * 1000000,
    instructor: "Dr. Lisa Park",
    duration: "16 weeks",
    skills: ["Python", "Pandas", "NumPy", "Data Visualization"],
    certificate_type: "Professional",
    course_image: "/api/placeholder/300/200"
  },
  {
    certificate_id: "CERT-2024-006",
    course_id: "docker-k8s",
    course_name: "Docker & Kubernetes Fundamentals",
    course_description: "Master containerization and orchestration for modern applications",
    final_grade: 78,
    issued_date: new Date('2024-01-30').getTime() * 1000000,
    instructor: "Tom Anderson",
    duration: "6 weeks",
    skills: ["Docker", "Kubernetes", "DevOps", "Container Orchestration"],
    certificate_type: "Fundamentals",
    course_image: "/api/placeholder/300/200"
  }
];

export default function MyCertificate() {
  const [certificates, setCertificates] = useState(dummyCertificates);
  const [filteredCertificates, setFilteredCertificates] = useState(dummyCertificates);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  useEffect(() => {
    filterAndSortCertificates();
  }, [searchTerm, filterType, sortBy, certificates]);

  const filterAndSortCertificates = () => {
    let filtered = [...certificates];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(cert =>
        cert.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
        cert.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    if (filterType !== "all") {
      filtered = filtered.filter(cert => cert.certificate_type.toLowerCase() === filterType);
    }

    // Apply sorting
    switch (sortBy) {
      case "recent":
        filtered.sort((a, b) => b.issued_date - a.issued_date);
        break;
      case "grade":
        filtered.sort((a, b) => b.final_grade - a.final_grade);
        break;
      case "name":
        filtered.sort((a, b) => a.course_name.localeCompare(b.course_name));
        break;
      default:
        break;
    }

    setFilteredCertificates(filtered);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp / 1000000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDownloadCertificate = (certificateId, courseName) => {
    // Simulate download
    const link = document.createElement('a');
    link.download = `${courseName.replace(/\s+/g, '_')}_Certificate.pdf`;
    link.href = '#';
    link.click();
    
    // Show success message (in real app, this would be a toast)
    alert(`Certificate for "${courseName}" download started!`);
  };

  const getGradeBadgeColor = (grade) => {
    if (grade >= 90) return "bg-gradient-to-r from-green-500 to-emerald-500 text-white";
    if (grade >= 80) return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white";
    if (grade >= 70) return "bg-gradient-to-r from-yellow-500 to-orange-500 text-white";
    return "bg-gradient-to-r from-gray-500 to-slate-500 text-white";
  };

  const getGradeIcon = (grade) => {
    if (grade >= 90) return <Trophy className="h-4 w-4" />;
    if (grade >= 80) return <Medal className="h-4 w-4" />;
    if (grade >= 70) return <Star className="h-4 w-4" />;
    return <Award className="h-4 w-4" />;
  };

  const getCertificateTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case "professional":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "specialization":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "fundamentals":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const totalCertificates = certificates.length;
  const averageGrade = Math.round(certificates.reduce((sum, cert) => sum + cert.final_grade, 0) / certificates.length);
  const excellentGrades = certificates.filter(cert => cert.final_grade >= 90).length;
  const totalSkills = [...new Set(certificates.flatMap(cert => cert.skills))].length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 p-8 text-white">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <GraduationCap className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">My Certificates</h1>
                <p className="text-amber-100 text-lg">Showcase your learning achievements and skills</p>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-white/20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">{totalCertificates}</div>
                <div className="text-amber-100 text-sm">Certificates</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">{averageGrade}%</div>
                <div className="text-amber-100 text-sm">Avg Grade</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">{excellentGrades}</div>
                <div className="text-amber-100 text-sm">Excellent</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">{totalSkills}</div>
                <div className="text-amber-100 text-sm">Skills</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search certificates, skills, or instructors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 border-2 focus:border-amber-500"
            />
          </div>
          
          <div className="flex gap-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="h-12 px-4 border-2 border-gray-200 rounded-lg bg-white focus:border-amber-500 focus:outline-none"
            >
              <option value="all">All Types</option>
              <option value="professional">Professional</option>
              <option value="specialization">Specialization</option>
              <option value="fundamentals">Fundamentals</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-12 px-4 border-2 border-gray-200 rounded-lg bg-white focus:border-amber-500 focus:outline-none"
            >
              <option value="recent">Most Recent</option>
              <option value="grade">Highest Grade</option>
              <option value="name">Course Name</option>
            </select>
          </div>
        </div>

        {/* Certificates Grid */}
        {filteredCertificates.length === 0 ? (
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-16 text-center">
              <Award className="h-20 w-20 mx-auto mb-6 text-gray-300" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                {searchTerm || filterType !== "all" ? "No certificates match your criteria" : "No certificates yet"}
              </h3>
              <p className="text-gray-600 text-lg">
                {searchTerm || filterType !== "all" 
                  ? "Try adjusting your search or filter settings" 
                  : "Complete courses to earn certificates and showcase your achievements"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCertificates.map((cert) => (
              <Card key={cert.certificate_id} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm hover:bg-white overflow-hidden">
                <div className="relative">
                  <div className="h-32 bg-gradient-to-br from-amber-400 to-orange-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute top-4 right-4">
                      <Badge className={`${getGradeBadgeColor(cert.final_grade)} border-0 shadow-lg`}>
                        <span className="flex items-center gap-1">
                          {getGradeIcon(cert.final_grade)}
                          {cert.final_grade}%
                        </span>
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div className="p-2 bg-white/20 rounded-lg">
                        <Award className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-amber-600 transition-colors line-clamp-2">
                      {cert.course_name}
                    </CardTitle>
                    <Badge className={`${getCertificateTypeColor(cert.certificate_type)} text-xs border shrink-0`}>
                      {cert.certificate_type}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2 mt-2">
                    {cert.course_description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-amber-500" />
                      <span>Completed: {formatDate(cert.issued_date)}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <BookOpen className="h-4 w-4 mr-2 text-amber-500" />
                      <span>{cert.instructor} • {cert.duration}</span>
                    </div>
                  </div>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-1">
                    {cert.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="bg-amber-50 text-amber-700 px-2 py-1 rounded-full text-xs font-medium border border-amber-200"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 3 && (
                      <span className="bg-gray-50 text-gray-600 px-2 py-1 rounded-full text-xs font-medium border border-gray-200">
                        +{cert.skills.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                    Certificate ID: {cert.certificate_id}
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => handleDownloadCertificate(cert.certificate_id, cert.course_name)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Certificate
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Detailed Summary Card */}
        {certificates.length > 0 && (
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <Trophy className="h-6 w-6 text-amber-500" />
                Achievement Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{totalCertificates}</div>
                  <div className="text-blue-700 font-medium">Total Certificates</div>
                  <div className="text-blue-600 text-sm mt-1">Completed Courses</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                  <div className="text-3xl font-bold text-green-600 mb-2">{averageGrade}%</div>
                  <div className="text-green-700 font-medium">Average Grade</div>
                  <div className="text-green-600 text-sm mt-1">Overall Performance</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{excellentGrades}</div>
                  <div className="text-purple-700 font-medium">Excellent Grades</div>
                  <div className="text-purple-600 text-sm mt-1">90% and Above</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl">
                  <div className="text-3xl font-bold text-amber-600 mb-2">{totalSkills}</div>
                  <div className="text-amber-700 font-medium">Skills Acquired</div>
                  <div className="text-amber-600 text-sm mt-1">Unique Technologies</div>
                </div>
              </div>

              {/* Grade Distribution */}
              <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-gray-800 mb-4">Grade Distribution</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-green-500" />
                      Excellent (90%+)
                    </span>
                    <span className="font-medium">{certificates.filter(c => c.final_grade >= 90).length} certificates</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Medal className="h-4 w-4 text-blue-500" />
                      Good (80-89%)
                    </span>
                    <span className="font-medium">{certificates.filter(c => c.final_grade >= 80 && c.final_grade < 90).length} certificates</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      Satisfactory (70-79%)
                    </span>
                    <span className="font-medium">{certificates.filter(c => c.final_grade >= 70 && c.final_grade < 80).length} certificates</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}