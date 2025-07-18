import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, User, MessageCircle, Send, Users, Zap, Search, BookOpen, HelpCircle, Phone, Clock, AlertCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useLMS } from '../../hooks/useLMS';

const defaultTopics = [
  { 
    icon: <User />, 
    title: 'Account Management', 
    description: 'Create and manage your account, update profile information, and account settings', 
    slug: 'account-management',
    articleCount: 8
  },
  { 
    icon: <BookOpen />, 
    title: 'Courses & Learning', 
    description: 'Everything about enrolling, accessing courses, and tracking your learning progress', 
    slug: 'courses-learning',
    articleCount: 12
  },
  { 
    icon: <MessageCircle />, 
    title: 'Communication & Support', 
    description: 'Connect with instructors, join discussions, and get help when you need it', 
    slug: 'communication-support',
    articleCount: 6
  },
  { 
    icon: <Send />, 
    title: 'Assignments & Quizzes', 
    description: 'Submit assignments, take quizzes, and understand grading and feedback', 
    slug: 'assignments-quizzes',
    articleCount: 10
  },
  { 
    icon: <Users />, 
    title: 'Community & Networking', 
    description: 'Connect with classmates, join study groups, and build your professional network', 
    slug: 'community-networking',
    articleCount: 5
  },
  { 
    icon: <Zap />, 
    title: 'Technical Issues', 
    description: 'Troubleshoot technical problems, browser compatibility, and platform issues', 
    slug: 'technical-issues',
    articleCount: 15
  },
];

export default function HelpCenter() {
  const { getHelpTopics, loading, error } = useLMS();
  const [topics, setTopics] = useState(defaultTopics);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTopics, setFilteredTopics] = useState(defaultTopics);
  const [loadingError, setLoadingError] = useState('');

  useEffect(() => {
    loadHelpTopics();
  }, []);

  useEffect(() => {
    filterTopics();
  }, [topics, searchTerm]);

  const loadHelpTopics = async () => {
    try {
      const result = await getHelpTopics();
      if (result.success && result.data && result.data.length > 0) {
        setTopics(result.data);
      }
      // If no topics from backend, keep using default topics
    } catch (err) {
      console.error("Help topics loading error:", err);
      // Keep using default topics on error
    }
  };

  const filterTopics = () => {
    if (!searchTerm) {
      setFilteredTopics(topics);
      return;
    }

    const filtered = topics.filter(topic =>
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTopics(filtered);
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="text-center mb-8">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <h1 className="text-2xl font-bold">Loading Help Center...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <HelpCircle className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">How can we help you?</h1>
        <p className="text-xl text-gray-600 mb-8">Find answers, get support, and learn how to make the most of our platform</p>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search help articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Error Message */}
      {(loadingError || error) && (
        <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-md mb-6 max-w-2xl mx-auto">
          <AlertCircle className="h-5 w-5" />
          <span>{loadingError || error}</span>
        </div>
      )}

      {/* Help Topics */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Browse Help Topics</h2>
        
        {filteredTopics.length === 0 ? (
          <div className="text-center py-12">
            <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? 'No topics match your search' : 'No help topics available'}
            </h3>
            <p className="text-gray-600">
              {searchTerm 
                ? 'Try adjusting your search terms or browse all topics' 
                : 'Check back later for help topics'
              }
            </p>
            {searchTerm && (
              <Button 
                variant="outline" 
                onClick={() => setSearchTerm('')}
                className="mt-4"
              >
                Clear Search
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTopics.map((topic, index) => (
              <Link
                key={topic.slug || index}
                to={`/help/${topic.slug}`}
                className="group"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-200 group-hover:scale-105 border-2 border-gray-100 group-hover:border-blue-200">
                  <CardHeader className="text-center pb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                      <div className="text-blue-600 w-6 h-6">{topic.icon}</div>
                    </div>
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                      {topic.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-gray-600 mb-4 leading-relaxed">
                      {topic.description}
                    </CardDescription>
                    {topic.articleCount && (
                      <div className="text-sm text-blue-600 font-medium">
                        {topic.articleCount} articles
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <MessageCircle className="h-10 w-10 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
          <p className="text-gray-600 mb-4">Get instant help from our support team</p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Start Chat
          </Button>
        </Card>

        <Card className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <Mail className="h-10 w-10 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
          <p className="text-gray-600 mb-4">Send us a detailed message</p>
          <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">
            Send Email
          </Button>
        </Card>

        <Card className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <Phone className="h-10 w-10 text-purple-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone Support</h3>
          <p className="text-gray-600 mb-4">Call us for urgent issues</p>
          <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
            Call Now
          </Button>
        </Card>
      </div>

      {/* Popular Articles */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Popular Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/help/getting-started" className="group">
            <Card className="p-4 hover:shadow-md transition-shadow group-hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <div>
                  <h3 className="font-medium group-hover:text-blue-600 transition-colors">Getting Started Guide</h3>
                  <p className="text-sm text-gray-600">Learn the basics of using our platform</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/help/course-enrollment" className="group">
            <Card className="p-4 hover:shadow-md transition-shadow group-hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-green-600" />
                <div>
                  <h3 className="font-medium group-hover:text-blue-600 transition-colors">How to Enroll in Courses</h3>
                  <p className="text-sm text-gray-600">Step-by-step enrollment process</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/help/certificates" className="group">
            <Card className="p-4 hover:shadow-md transition-shadow group-hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <Zap className="h-5 w-5 text-purple-600" />
                <div>
                  <h3 className="font-medium group-hover:text-blue-600 transition-colors">Earning Certificates</h3>
                  <p className="text-sm text-gray-600">How to complete courses and get certified</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/help/technical-requirements" className="group">
            <Card className="p-4 hover:shadow-md transition-shadow group-hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <Send className="h-5 w-5 text-orange-600" />
                <div>
                  <h3 className="font-medium group-hover:text-blue-600 transition-colors">Technical Requirements</h3>
                  <p className="text-sm text-gray-600">System requirements and browser compatibility</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>

      {/* Contact Information */}
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="p-8 text-center">
          <Clock className="h-8 w-8 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Support Hours</h3>
          <p className="text-gray-600 mb-4">
            Our support team is available to help you Monday through Friday, 9 AM to 6 PM (EST)
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="text-sm text-gray-600">
              <strong>Email:</strong> support@edulearn.com
            </div>
            <div className="text-sm text-gray-600">
              <strong>Phone:</strong> 1-800-EDU-LEARN
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
