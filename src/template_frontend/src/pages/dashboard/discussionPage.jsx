import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, ThumbsUp, Reply, Search, Plus, Pin, AlertCircle, Clock, Sparkles, TrendingUp, Users, BookOpen } from "lucide-react"

// Dummy data
const dummyDiscussions = [
  {
    discussion_id: "1",
    title: "How to implement async/await in JavaScript effectively?",
    content: "I've been working on a project and I'm struggling with understanding the best practices for using async/await. Can someone explain when to use Promise.all() vs individual awaits? Also, how do you handle error handling in complex async operations?",
    author_id: "sarah_chen",
    author_name: "Sarah Chen",
    author_avatar: "/api/placeholder/32/32",
    course_id: "javascript-advanced",
    course_name: "Advanced JavaScript",
    created_date: Date.now() * 1000000 - 3600000000000, // 1 hour ago
    replies: 15,
    likes: 23,
    is_pinned: true,
    tags: ["javascript", "async", "promises"]
  },
  {
    discussion_id: "2", 
    title: "Best resources for learning React Hooks?",
    content: "I'm transitioning from class components to functional components with hooks. What are the best tutorials, documentation, or courses you'd recommend? I'm particularly interested in useEffect and custom hooks.",
    author_id: "mike_dev",
    author_name: "Mike Johnson",
    author_avatar: "/api/placeholder/32/32",
    course_id: "react-fundamentals",
    course_name: "React Fundamentals",
    created_date: Date.now() * 1000000 - 7200000000000, // 2 hours ago
    replies: 8,
    likes: 12,
    is_pinned: false,
    tags: ["react", "hooks", "learning"]
  },
  {
    discussion_id: "3",
    title: "Database design patterns for scalable applications",
    content: "I'm working on designing a database schema for a social media application that needs to handle millions of users. What are the best practices for designing user relationships, posts, and comments tables? Should I consider NoSQL or stick with PostgreSQL?",
    author_id: "alex_data",
    author_name: "Alex Rodriguez",
    author_avatar: "/api/placeholder/32/32",
    course_id: "database-design",
    course_name: "Database Design",
    created_date: Date.now() * 1000000 - 14400000000000, // 4 hours ago
    replies: 22,
    likes: 35,
    is_pinned: false,
    tags: ["database", "postgresql", "scalability"]
  },
  {
    discussion_id: "4",
    title: "Career advice: Frontend vs Full-stack developer path?",
    content: "I've been working as a frontend developer for 2 years and I'm considering whether to specialize deeper in frontend technologies or transition to full-stack. What are the pros and cons of each path in the current market?",
    author_id: "emma_career",
    author_name: "Emma Wilson",
    author_avatar: "/api/placeholder/32/32",
    course_id: "career-development",
    course_name: "Career Development",
    created_date: Date.now() * 1000000 - 21600000000000, // 6 hours ago
    replies: 31,
    likes: 18,
    is_pinned: false,
    tags: ["career", "frontend", "fullstack"]
  },
  {
    discussion_id: "5",
    title: "Understanding Docker containerization for beginners",
    content: "I keep hearing about Docker and containerization everywhere, but I'm not sure where to start. Can someone explain the basics and provide a simple example of dockerizing a Node.js application?",
    author_id: "tom_newbie",
    author_name: "Tom Anderson",
    author_avatar: "/api/placeholder/32/32",
    course_id: "devops-basics",
    course_name: "DevOps Basics",
    created_date: Date.now() * 1000000 - 86400000000000, // 1 day ago
    replies: 0,
    likes: 5,
    is_pinned: false,
    tags: ["docker", "devops", "nodejs"]
  },
  {
    discussion_id: "6",
    title: "CSS Grid vs Flexbox: When to use which?",
    content: "I'm often confused about when to use CSS Grid versus Flexbox. Both seem to solve similar layout problems. Can someone provide clear examples of scenarios where one is better than the other?",
    author_id: "lisa_css",
    author_name: "Lisa Park",
    author_avatar: "/api/placeholder/32/32",
    course_id: "css-mastery",
    course_name: "CSS Mastery",
    created_date: Date.now() * 1000000 - 172800000000000, // 2 days ago
    replies: 12,
    likes: 28,
    is_pinned: false,
    tags: ["css", "grid", "flexbox"]
  }
];

export default function DiscussionsPage() {
  const [discussions, setDiscussions] = useState(dummyDiscussions);
  const [filteredDiscussions, setFilteredDiscussions] = useState(dummyDiscussions);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("recent");
  const [showNewDiscussion, setShowNewDiscussion] = useState(false);
  const [newDiscussion, setNewDiscussion] = useState({
    title: "",
    content: "",
    courseId: "",
    tags: ""
  });

  useEffect(() => {
    filterDiscussions();
  }, [discussions, searchTerm, activeTab]);

  const filterDiscussions = () => {
    let filtered = [...discussions];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(discussion =>
        discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        discussion.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        discussion.author_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        discussion.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply tab filter
    switch (activeTab) {
      case "recent":
        filtered.sort((a, b) => b.created_date - a.created_date);
        break;
      case "popular":
        filtered.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        break;
      case "unanswered":
        filtered = filtered.filter(discussion => (discussion.replies || 0) === 0);
        break;
      case "my-posts":
        filtered = filtered.filter(discussion => discussion.author_id === "sarah_chen");
        break;
      default:
        break;
    }

    setFilteredDiscussions(filtered);
  };

  const handleCreateDiscussion = () => {
    if (!newDiscussion.title.trim() || !newDiscussion.content.trim()) {
      return;
    }

    const newPost = {
      discussion_id: Date.now().toString(),
      title: newDiscussion.title,
      content: newDiscussion.content,
      author_id: "current_user",
      author_name: "You",
      author_avatar: "/api/placeholder/32/32",
      course_id: newDiscussion.courseId || "general",
      course_name: newDiscussion.courseId || "General Discussion",
      created_date: Date.now() * 1000000,
      replies: 0,
      likes: 0,
      is_pinned: false,
      tags: newDiscussion.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    setDiscussions([newPost, ...discussions]);
    setNewDiscussion({ title: "", content: "", courseId: "", tags: "" });
    setShowNewDiscussion(false);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp / 1000000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeAgo = (timestamp) => {
    const now = Date.now() * 1000000;
    const diff = now - timestamp;
    const hours = Math.floor(diff / (60 * 60 * 1000000000));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return "Just now";
  };

  const getAuthorInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  const getTabIcon = (tab) => {
    switch(tab) {
      case "recent": return <Clock className="h-4 w-4" />;
      case "popular": return <TrendingUp className="h-4 w-4" />;
      case "unanswered": return <MessageSquare className="h-4 w-4" />;
      case "my-posts": return <Users className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <Sparkles className="h-8 w-8" />
                Discussions
              </h1>
              <p className="text-blue-100 text-lg">Connect, learn, and grow with our vibrant community</p>
              <div className="flex items-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>1,234 members</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>456 discussions</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>12 courses</span>
                </div>
              </div>
            </div>
            <Button 
              onClick={() => setShowNewDiscussion(true)}
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold shadow-lg"
              size="lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              Start Discussion
            </Button>
          </div>
        </div>

        {/* New Discussion Form */}
        {showNewDiscussion && (
          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Start a New Discussion</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-3 text-gray-700">Discussion Title</label>
                  <Input
                    placeholder="What would you like to discuss?"
                    value={newDiscussion.title}
                    onChange={(e) => setNewDiscussion(prev => ({ ...prev, title: e.target.value }))}
                    className="h-12 text-lg border-2 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-3 text-gray-700">Content</label>
                  <textarea
                    className="w-full p-4 border-2 border-gray-200 rounded-lg resize-none focus:border-blue-500 focus:outline-none text-lg"
                    rows={6}
                    placeholder="Share your thoughts, questions, or insights..."
                    value={newDiscussion.content}
                    onChange={(e) => setNewDiscussion(prev => ({ ...prev, content: e.target.value }))}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-3 text-gray-700">Course (Optional)</label>
                    <Input
                      placeholder="e.g., React Fundamentals"
                      value={newDiscussion.courseId}
                      onChange={(e) => setNewDiscussion(prev => ({ ...prev, courseId: e.target.value }))}
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-3 text-gray-700">Tags (Optional)</label>
                    <Input
                      placeholder="javascript, react, beginners"
                      value={newDiscussion.tags}
                      onChange={(e) => setNewDiscussion(prev => ({ ...prev, tags: e.target.value }))}
                      className="h-12"
                    />
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <Button onClick={handleCreateDiscussion} size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Create Discussion
                  </Button>
                  <Button variant="outline" onClick={() => setShowNewDiscussion(false)} size="lg">
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input 
              placeholder="Search discussions, topics, or authors..." 
              className="pl-12 h-14 text-lg border-2 focus:border-blue-500 bg-white/80 backdrop-blur-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="lg" className="bg-white/80 backdrop-blur-sm border-2">
            <BookOpen className="h-4 w-4 mr-2" />
            All Courses
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 space-x-4 h-fit bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl p-2">
            <TabsTrigger value="recent" className="flex bg-white border-1 border-blue-500 border-solid items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              {getTabIcon("recent")}
              Recent
            </TabsTrigger>
            <TabsTrigger value="popular" className="flex bg-white border-1 border-blue-500 border-solid items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              {getTabIcon("popular")}
              Popular
            </TabsTrigger>
            <TabsTrigger value="unanswered" className="flex bg-white border-1 border-blue-500 border-solid items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              {getTabIcon("unanswered")}
              Unanswered
            </TabsTrigger>
            <TabsTrigger value="my-posts" className="flex bg-white border-1 border-blue-500 border-solid items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              {getTabIcon("my-posts")}
              My Posts
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-6">
            {filteredDiscussions.length === 0 ? (
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardContent className="text-center py-16">
                  <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                    {searchTerm ? "No discussions found" : 
                     activeTab === "my-posts" ? "You haven't created any discussions yet" :
                     activeTab === "unanswered" ? "All discussions have been answered" :
                     "No discussions available"}
                  </h3>
                  <p className="text-gray-600 text-lg">
                    {searchTerm ? "Try adjusting your search terms" :
                     activeTab === "my-posts" ? "Start a new discussion to engage with the community" :
                     "Be the first to start a discussion!"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredDiscussions.map((discussion) => (
                <Card key={discussion.discussion_id} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm hover:bg-white">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      <Avatar className="h-12 w-12 ring-2 ring-blue-100">
                        <AvatarImage src={discussion.author_avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                          {getAuthorInitials(discussion.author_name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-4">
                        <div className="flex items-center flex-wrap gap-3">
                          {discussion.is_pinned && (
                            <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                              <Pin className="h-3 w-3" />
                              Pinned
                            </div>
                          )}
                          <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600">
                            {discussion.course_name}
                          </Badge>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm font-medium text-gray-700">{discussion.author_name}</span>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{getTimeAgo(discussion.created_date)}</span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors cursor-pointer">
                          {discussion.title}
                        </h3>
                        
                        <p className="text-gray-700 leading-relaxed line-clamp-3">
                          {discussion.content}
                        </p>

                        {discussion.tags && discussion.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {discussion.tags.map((tag, index) => (
                              <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center space-x-6 text-sm text-gray-600">
                            <div className="flex items-center space-x-2 hover:text-blue-600 transition-colors cursor-pointer">
                              <MessageSquare className="h-4 w-4" />
                              <span className="font-medium">{discussion.replies}</span>
                              <span>replies</span>
                            </div>
                            <div className="flex items-center space-x-2 hover:text-red-500 transition-colors cursor-pointer">
                              <ThumbsUp className="h-4 w-4" />
                              <span className="font-medium">{discussion.likes}</span>
                              <span>likes</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4" />
                              <span>{formatDate(discussion.created_date)}</span>
                            </div>
                          </div>
                          <Button variant="ghost" className="text-blue-600 bg-white border-1 border-blue-500 border-solid hover:text-blue-700 hover:bg-blue-50">
                            <Reply className="h-4 w-4 mr-2" />
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}