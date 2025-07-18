import React, { useState, useEffect } from "react"
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { MessageSquare, ThumbsUp, Reply, Search, Plus, Pin, AlertCircle, Clock } from "lucide-react"
import { useLMS } from "../../hooks/useLMS"

export default function DiscussionsPage() {
  const { getDiscussions, createDiscussion, loading, error } = useLMS();
  const [discussions, setDiscussions] = useState([]);
  const [filteredDiscussions, setFilteredDiscussions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("recent");
  const [loadingError, setLoadingError] = useState("");
  const [showNewDiscussion, setShowNewDiscussion] = useState(false);
  const [newDiscussion, setNewDiscussion] = useState({
    title: "",
    content: "",
    courseId: ""
  });

  useEffect(() => {
    const loadDiscussions = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setLoadingError("No authentication token found");
        return;
      }

      try {
        const result = await getDiscussions(token);
        if (result.success) {
          setDiscussions(result.data);
          setFilteredDiscussions(result.data);
        } else {
          setLoadingError(result.error || "Failed to load discussions");
        }
      } catch (err) {
        setLoadingError("An unexpected error occurred");
        console.error("Discussions loading error:", err);
      }
    };

    loadDiscussions();
  }, [getDiscussions]);

  useEffect(() => {
    filterDiscussions();
  }, [discussions, searchTerm, activeTab]);

  const filterDiscussions = () => {
    let filtered = [...discussions];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(discussion =>
        discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        discussion.content.toLowerCase().includes(searchTerm.toLowerCase())
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
        const currentUserId = localStorage.getItem('userId');
        filtered = filtered.filter(discussion => discussion.author_id === currentUserId);
        break;
      default:
        break;
    }

    setFilteredDiscussions(filtered);
  };

  const handleCreateDiscussion = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setLoadingError("No authentication token found");
      return;
    }

    if (!newDiscussion.title.trim() || !newDiscussion.content.trim()) {
      setLoadingError("Please fill in all required fields");
      return;
    }

    try {
      const result = await createDiscussion(
        token,
        newDiscussion.title,
        newDiscussion.content,
        newDiscussion.courseId || "general"
      );

      if (result.success) {
        // Refresh discussions
        const updatedResult = await getDiscussions(token);
        if (updatedResult.success) {
          setDiscussions(updatedResult.data);
        }
        
        // Reset form
        setNewDiscussion({ title: "", content: "", courseId: "" });
        setShowNewDiscussion(false);
        setLoadingError("");
      } else {
        setLoadingError(result.error || "Failed to create discussion");
      }
    } catch (err) {
      setLoadingError("An unexpected error occurred");
      console.error("Discussion creation error:", err);
    }
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
    const now = Date.now() * 1000000; // Convert to nanoseconds
    const diff = now - timestamp;
    const hours = Math.floor(diff / (60 * 60 * 1000000000));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return "Just now";
  };

  const getAuthorInitials = (authorId) => {
    return authorId.substring(0, 2).toUpperCase();
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Discussions</h1>
          <p className="text-gray-600 mt-2">Connect with fellow learners and instructors</p>
        </div>
        <Button onClick={() => setShowNewDiscussion(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Discussion
        </Button>
      </div>

      {/* Error Display */}
      {(loadingError || error) && (
        <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-md">
          <AlertCircle className="h-5 w-5" />
          <span>{loadingError || error}</span>
        </div>
      )}

      {/* New Discussion Form */}
      {showNewDiscussion && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Create New Discussion</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <Input
                  placeholder="Enter discussion title..."
                  value={newDiscussion.title}
                  onChange={(e) => setNewDiscussion(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Content</label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-md resize-none"
                  rows={4}
                  placeholder="What would you like to discuss?"
                  value={newDiscussion.content}
                  onChange={(e) => setNewDiscussion(prev => ({ ...prev, content: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Course (Optional)</label>
                <Input
                  placeholder="Enter course ID or leave blank for general discussion"
                  value={newDiscussion.courseId}
                  onChange={(e) => setNewDiscussion(prev => ({ ...prev, courseId: e.target.value }))}
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleCreateDiscussion}>
                  Create Discussion
                </Button>
                <Button variant="outline" onClick={() => setShowNewDiscussion(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search discussions..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">All Courses</Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
          <TabsTrigger value="my-posts">My Posts</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredDiscussions.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? "No discussions found" : 
                 activeTab === "my-posts" ? "You haven't created any discussions yet" :
                 activeTab === "unanswered" ? "All discussions have been answered" :
                 "No discussions available"}
              </h3>
              <p className="text-gray-600">
                {searchTerm ? "Try adjusting your search terms" :
                 activeTab === "my-posts" ? "Start a new discussion to engage with the community" :
                 "Be the first to start a discussion!"}
              </p>
            </div>
          ) : (
            filteredDiscussions.map((discussion) => (
              <Card key={discussion.discussion_id}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarFallback>{getAuthorInitials(discussion.author_id)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center space-x-2">
                        {discussion.is_pinned && <Pin className="h-4 w-4 text-blue-600" />}
                        <Badge>{discussion.course_id || "General"}</Badge>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{getTimeAgo(discussion.created_date)}</span>
                      </div>
                      <h3 className="text-lg font-medium">{discussion.title}</h3>
                      <p className="text-gray-700 line-clamp-3">
                        {discussion.content}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{discussion.replies || 0} replies</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{discussion.likes || 0} likes</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{formatDate(discussion.created_date)}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Reply className="h-4 w-4 mr-1" />
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
  )
}
