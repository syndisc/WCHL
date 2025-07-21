import React, { useState, useEffect } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { AlertCircle, Download, Award, Calendar } from "lucide-react";
import { useLMS } from "../../hooks/useLMS";

export default function MyCertificate() {
  const { getMyCertificates, loading, error } = useLMS();
  const [certificates, setCertificates] = useState([]);
  const [loadingError, setLoadingError] = useState("");

  useEffect(() => {
    const loadCertificates = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setLoadingError("No authentication token found");
        return;
      }

      try {
        const result = await getMyCertificates(token);
        if (result.success) {
          setCertificates(result.data);
        } else {
          setLoadingError(result.error || "Failed to load certificates");
        }
      } catch (err) {
        // setLoadingError("An unexpected error occurred");
        console.error("Certificates loading error:", err);
      }
    };

    loadCertificates();
  }, [getMyCertificates]);

  const formatDate = (timestamp) => {
    return new Date(timestamp / 1000000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDownloadCertificate = (certificateId) => {
    // In a real implementation, this would download the certificate
    console.log(`Downloading certificate: ${certificateId}`);
    // For now, we'll just show an alert
    alert(`Certificate download would start for ID: ${certificateId}`);
  };

  const getGradeBadgeColor = (grade) => {
    if (grade >= 90) return "bg-green-100 text-green-800";
    if (grade >= 80) return "bg-blue-100 text-blue-800";
    if (grade >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (loadingError || error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Certificates</h1>
          <p className="text-gray-600 mt-2">
            View and download your course certificates below:
          </p>
        </div>
        <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-md">
          <AlertCircle className="h-5 w-5" />
          <span>{loadingError || error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Certificates</h1>
        <p className="text-gray-600 mt-2">
          View and download your course certificates below:
        </p>
      </div>

      {certificates.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Award className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No certificates yet</h3>
            <p className="text-gray-600">
              Complete courses to earn certificates and showcase your achievements
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <Card key={cert.certificate_id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Award className="h-8 w-8 text-yellow-500" />
                  <Badge className={getGradeBadgeColor(cert.final_grade)}>
                    {cert.final_grade}%
                  </Badge>
                </div>
                <CardTitle className="text-lg">{cert.course_name || `Course ${cert.course_id}`}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Completed: {formatDate(cert.issued_date)}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span>Certificate ID: {cert.certificate_id}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Button 
                    className="w-full" 
                    onClick={() => handleDownloadCertificate(cert.certificate_id)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Certificate
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Summary Card */}
      {certificates.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Certificate Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-blue-600">{certificates.length}</div>
                <div className="text-sm text-gray-600">Total Certificates</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-green-600">
                  {Math.round(certificates.reduce((sum, cert) => sum + cert.final_grade, 0) / certificates.length)}%
                </div>
                <div className="text-sm text-gray-600">Average Grade</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-purple-600">
                  {certificates.filter(cert => cert.final_grade >= 90).length}
                </div>
                <div className="text-sm text-gray-600">Excellent Grades (90%+)</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}