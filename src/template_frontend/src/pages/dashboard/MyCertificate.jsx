import React, { useState, useEffect } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Download, Award, Calendar, Trophy, Star, Medal, BookOpen, GraduationCap, Filter, Search, Shield, Hash, Clock } from "lucide-react";
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
    course_image: "/api/placeholder/300/200",
    blockchain_hash: "0x8f4a2b1c9d7e5f8a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0",
    mint_timestamp: new Date('2024-06-15T14:30:00').getTime(),
    issuer_address: "0x742d35Cc6635C0532925a3b8D8C8b8e3C5D5f1B2"
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
    course_image: "/api/placeholder/300/200",
    blockchain_hash: "0x7e3b4a8c2f1d9e5a4b7c1f0e3d2a5b8c4f1e9d6a3b2c8f5e1a4b7c9d2e6f3a",
    mint_timestamp: new Date('2024-05-20T09:15:00').getTime(),
    issuer_address: "0x742d35Cc6635C0532925a3b8D8C8b8e3C5D5f1B2"
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
    course_image: "/api/placeholder/300/200",
    blockchain_hash: "0x9a5d2c8e4f7b1a3c6e9f2b5a8c1d4e7f3a6b9c2e5f8a1d4b7c3e6f9a2c5d8e",
    mint_timestamp: new Date('2024-04-10T16:45:00').getTime(),
    issuer_address: "0x742d35Cc6635C0532925a3b8D8C8b8e3C5D5f1B2"
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
    course_image: "/api/placeholder/300/200",
    blockchain_hash: "0x4b8f1a7d3c6e9f2a5b8c1d4e7f3a6b9c2e5f8a1d4b7c3e6f9a2c5d8e4b7f1a",
    mint_timestamp: new Date('2024-03-25T11:20:00').getTime(),
    issuer_address: "0x742d35Cc6635C0532925a3b8D8C8b8e3C5D5f1B2"
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
    course_image: "/api/placeholder/300/200",
    blockchain_hash: "0x1c7a4e8f2b5d9a3c6e1f4b7a8c2d5e9f3a6b1c4e7f9a2d5b8c3e6f1a4b7c9d",
    mint_timestamp: new Date('2024-02-14T13:30:00').getTime(),
    issuer_address: "0x742d35Cc6635C0532925a3b8D8C8b8e3C5D5f1B2"
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
    course_image: "/api/placeholder/300/200",
    blockchain_hash: "0x6f2b8d4a1c7e3f9a2b5c8d1e4f7a3b6c9d2e5f8a1b4c7d3e6f9a2c5d8e1f4b",
    mint_timestamp: new Date('2024-01-30T10:00:00').getTime(),
    issuer_address: "0x742d35Cc6635C0532925a3b8D8C8b8e3C5D5f1B2"
  }
];

export default function MyCertificate() {
  const [certificates, setCertificates] = useState(dummyCertificates);
  const [filteredCertificates, setFilteredCertificates] = useState(dummyCertificates);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [downloadingCerts, setDownloadingCerts] = useState(new Set());

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

  const generateNFTMetadata = (cert) => {
    return {
      name: `${cert.course_name} Certificate`,
      description: `Digital Certificate NFT for completion of ${cert.course_name} course`,
      image: "data:image/svg+xml;base64," + btoa(`
        <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#f59e0b;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#ea580c;stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="url(#bg)"/>
          <text x="400" y="100" text-anchor="middle" fill="white" font-size="36" font-weight="bold">CERTIFICATE</text>
          <text x="400" y="150" text-anchor="middle" fill="white" font-size="24">of Achievement</text>
          <text x="400" y="250" text-anchor="middle" fill="white" font-size="28" font-weight="bold">${cert.course_name}</text>
          <text x="400" y="320" text-anchor="middle" fill="white" font-size="18">Instructor: ${cert.instructor}</text>
          <text x="400" y="350" text-anchor="middle" fill="white" font-size="18">Grade: ${cert.final_grade}%</text>
          <text x="400" y="380" text-anchor="middle" fill="white" font-size="18">Duration: ${cert.duration}</text>
          <text x="400" y="450" text-anchor="middle" fill="white" font-size="16">Certificate ID: ${cert.certificate_id}</text>
          <text x="400" y="500" text-anchor="middle" fill="white" font-size="12">Blockchain Hash: ${cert.blockchain_hash}</text>
        </svg>
      `),
      attributes: [
        {
          trait_type: "Course Name",
          value: cert.course_name
        },
        {
          trait_type: "Certificate Type", 
          value: cert.certificate_type
        },
        {
          trait_type: "Final Grade",
          value: cert.final_grade,
          display_type: "number"
        },
        {
          trait_type: "Instructor",
          value: cert.instructor
        },
        {
          trait_type: "Duration",
          value: cert.duration
        },
        {
          trait_type: "Issue Date",
          value: formatDate(cert.issued_date)
        },
        {
          trait_type: "Skills Count",
          value: cert.skills.length,
          display_type: "number"
        }
      ],
      skills: cert.skills,
      certificate_metadata: {
        certificate_id: cert.certificate_id,
        course_id: cert.course_id,
        blockchain_hash: cert.blockchain_hash,
        mint_timestamp: cert.mint_timestamp,
        issuer_address: cert.issuer_address,
        verification_url: `https://certificates.edu/verify/${cert.certificate_id}`,
        ipfs_hash: `Qm${Math.random().toString(36).substr(2, 44)}`,
        smart_contract_address: "0x1234567890123456789012345678901234567890"
      }
    };
  };

  const createCertificatePDF = (cert) => {
    const metadata = generateNFTMetadata(cert);
    
    // Create certificate content
    const certificateHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Certificate - ${cert.course_name}</title>
        <style>
          body { 
            margin: 0; 
            padding: 40px; 
            font-family: 'Times New Roman', serif; 
            background: linear-gradient(135deg, #f59e0b, #ea580c);
            min-height: 100vh;
            color: white;
          }
          .certificate {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            padding: 60px;
            border-radius: 20px;
            border: 3px solid rgba(255,255,255,0.3);
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
          }
          .header { font-size: 48px; font-weight: bold; margin-bottom: 20px; }
          .subheader { font-size: 24px; margin-bottom: 40px; opacity: 0.9; }
          .course-name { font-size: 36px; font-weight: bold; margin: 30px 0; }
          .details { font-size: 18px; line-height: 2; margin: 20px 0; }
          .nft-section {
            margin-top: 40px;
            padding: 30px;
            background: rgba(0,0,0,0.2);
            border-radius: 15px;
            text-align: left;
          }
          .nft-title { font-size: 24px; font-weight: bold; margin-bottom: 20px; text-align: center; }
          .metadata { font-size: 12px; line-height: 1.6; font-family: 'Courier New', monospace; }
          .hash { word-break: break-all; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 5px; margin: 10px 0; }
          .skills { display: flex; flex-wrap: wrap; gap: 10px; margin: 20px 0; justify-content: center; }
          .skill { background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; font-size: 14px; }
          .qr-placeholder { 
            width: 100px; 
            height: 100px; 
            background: rgba(255,255,255,0.3); 
            margin: 20px auto; 
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="certificate">
          <div class="header">CERTIFICATE</div>
          <div class="subheader">of Achievement</div>
          
          <div class="course-name">${cert.course_name}</div>
          
          <div class="details">
            <div><strong>Instructor:</strong> ${cert.instructor}</div>
            <div><strong>Final Grade:</strong> ${cert.final_grade}%</div>
            <div><strong>Duration:</strong> ${cert.duration}</div>
            <div><strong>Completed:</strong> ${formatDate(cert.issued_date)}</div>
          </div>

          <div class="skills">
            ${cert.skills.map(skill => `<span class="skill">${skill}</span>`).join('')}
          </div>

          <div class="nft-section">
            <div class="nft-title">🏆 NFT Certificate Metadata</div>
            
            <div class="metadata">
              <strong>Certificate ID:</strong> ${cert.certificate_id}<br>
              <strong>Blockchain Hash:</strong><br>
              <div class="hash">${cert.blockchain_hash}</div>
              
              <strong>Smart Contract:</strong><br>
              <div class="hash">${metadata.certificate_metadata.smart_contract_address}</div>
              
              <strong>IPFS Hash:</strong><br>
              <div class="hash">${metadata.certificate_metadata.ipfs_hash}</div>
              
              <strong>Mint Timestamp:</strong> ${new Date(cert.mint_timestamp).toLocaleString()}<br>
              <strong>Issuer Address:</strong> ${cert.issuer_address}<br>
              <strong>Verification URL:</strong> ${metadata.certificate_metadata.verification_url}<br>
              
              <strong>NFT Attributes:</strong><br>
              ${metadata.attributes.map(attr => `• ${attr.trait_type}: ${attr.value}`).join('<br>')}
            </div>

            <div class="qr-placeholder">
              QR Code<br>Verification
            </div>
          </div>
          
          <div style="margin-top: 30px; font-size: 14px; opacity: 0.8;">
            This certificate is a unique NFT (Non-Fungible Token) stored on the blockchain.<br>
            Verify authenticity at: ${metadata.certificate_metadata.verification_url}
          </div>
        </div>

        <script>
          // Add metadata to document for PDF generation
          window.certificateMetadata = ${JSON.stringify(metadata, null, 2)};
        </script>
      </body>
      </html>
    `;

    return certificateHTML;
  };

  const handleDownloadCertificate = async (cert) => {
    setDownloadingCerts(prev => new Set(prev).add(cert.certificate_id));
    
    try {
      // Create the HTML content
      const htmlContent = createCertificatePDF(cert);
      
      // Create a blob with the HTML content
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      
      // Create download link
      const link = document.createElement('a');
      link.href = url;
      link.download = `NFT_Certificate_${cert.course_name.replace(/\s+/g, '_')}_${cert.certificate_id}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      // Also create and download the JSON metadata file
      const metadata = generateNFTMetadata(cert);
      const metadataBlob = new Blob([JSON.stringify(metadata, null, 2)], { type: 'application/json' });
      const metadataUrl = URL.createObjectURL(metadataBlob);
      
      const metadataLink = document.createElement('a');
      metadataLink.href = metadataUrl;
      metadataLink.download = `NFT_Metadata_${cert.certificate_id}.json`;
      document.body.appendChild(metadataLink);
      metadataLink.click();
      document.body.removeChild(metadataLink);
      URL.revokeObjectURL(metadataUrl);
      
      // Show success message
      alert(`NFT Certificate package downloaded!\n\n✅ Certificate HTML file\n✅ NFT Metadata JSON\n\nBlockchain Hash: ${cert.blockchain_hash}`);
      
    } catch (error) {
      alert('Error generating certificate: ' + error.message);
    } finally {
      setDownloadingCerts(prev => {
        const newSet = new Set(prev);
        newSet.delete(cert.certificate_id);
        return newSet;
      });
    }
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
                <h1 className="text-4xl font-bold">My NFT Certificates</h1>
                <p className="text-amber-100 text-lg">Blockchain-verified digital achievements</p>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-white/20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">{totalCertificates}</div>
                <div className="text-amber-100 text-sm">NFT Certificates</div>
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
                  : "Complete courses to earn NFT certificates and showcase your achievements"}
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
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                        <Shield className="h-3 w-3 mr-1" />
                        NFT
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
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
                    <div className="flex items-center text-sm text-gray-600">
                      <Hash className="h-4 w-4 mr-2 text-amber-500" />
                      <span className="truncate" title={cert.blockchain_hash}>
                        {cert.blockchain_hash.slice(0, 20)}...
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-amber-500" />
                      <span>Minted: {new Date(cert.mint_timestamp).toLocaleDateString()}</span>
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
                    className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                    onClick={() => handleDownloadCertificate(cert)}
                    disabled={downloadingCerts.has(cert.certificate_id)}
                  >
                    {downloadingCerts.has(cert.certificate_id) ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        Generating NFT...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        Download NFT Certificate
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* NFT Information Card */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <Shield className="h-6 w-6 text-amber-500" />
              NFT Certificate Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                <Hash className="h-8 w-8 text-purple-600 mb-4" />
                <h4 className="font-semibold text-purple-800 mb-2">Blockchain Verified</h4>
                <p className="text-purple-700 text-sm">Each certificate has a unique blockchain hash for authenticity verification</p>
              </div>
              
              <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                <Shield className="h-8 w-8 text-blue-600 mb-4" />
                <h4 className="font-semibold text-blue-800 mb-2">Tamper Proof</h4>
                <p className="text-blue-700 text-sm">Immutable records stored on distributed ledger technology</p>
              </div>
              
              <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                <Trophy className="h-8 w-8 text-green-600 mb-4" />
                <h4 className="font-semibold text-green-800 mb-2">Digital Ownership</h4>
                <p className="text-green-700 text-sm">True ownership of your achievements with transferable digital assets</p>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-gray-50 rounded-xl">
              <h4 className="font-semibold text-gray-800 mb-4">What's Included in Your NFT Package:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span>Certificate HTML file with embedded metadata</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span>NFT metadata JSON file</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span>Blockchain hash for verification</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span>IPFS hash for decentralized storage</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span>Smart contract address</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span>Verification URL for authenticity</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

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
                  <div className="text-blue-700 font-medium">NFT Certificates</div>
                  <div className="text-blue-600 text-sm mt-1">Blockchain Verified</div>
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