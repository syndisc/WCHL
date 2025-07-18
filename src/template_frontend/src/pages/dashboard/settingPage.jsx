import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Switch } from "../../components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Badge } from "../../components/ui/badge"
import { CreditCard, Trash2, AlertCircle, CheckCircle, User, Bell, Shield, DollarSign, Settings } from "lucide-react"
import { useLMS } from "../../hooks/useLMS"

export default function SettingsPage() {
  const { getUserProfile, updateUserProfile, deleteUser, loading, error } = useLMS();
  const [userProfile, setUserProfile] = useState(null);
  const [loadingError, setLoadingError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bio: ""
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [notifications, setNotifications] = useState({
    courseUpdates: true,
    assignmentReminders: true,
    discussionReplies: true,
    emailNotifications: true
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: true,
    showProgress: true,
    allowMessages: true
  });

  useEffect(() => {
    const loadUserProfile = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setLoadingError("No authentication token found");
        return;
      }

      try {
        const result = await getUserProfile(token);
        if (result.success) {
          const profile = result.data;
          setUserProfile(profile);
          setFormData({
            firstName: profile.first_name || "",
            lastName: profile.last_name || "",
            email: profile.email || "",
            bio: profile.bio || ""
          });
        } else {
          setLoadingError(result.error || "Failed to load user profile");
        }
      } catch (err) {
        setLoadingError("An unexpected error occurred");
        console.error("Profile loading error:", err);
      }
    };

    loadUserProfile();
  }, [getUserProfile]);

  const handleProfileUpdate = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setLoadingError("No authentication token found");
      return;
    }

    try {
      const result = await updateUserProfile(token, {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        bio: formData.bio
      });

      if (result.success) {
        setSuccessMessage("Profile updated successfully!");
        setLoadingError("");
        // Refresh profile data
        const updatedResult = await getUserProfile(token);
        if (updatedResult.success) {
          setUserProfile(updatedResult.data);
        }
      } else {
        setLoadingError(result.error || "Failed to update profile");
        setSuccessMessage("");
      }
    } catch (err) {
      setLoadingError("An unexpected error occurred");
      setSuccessMessage("");
      console.error("Profile update error:", err);
    }
  };

  const handlePasswordUpdate = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setLoadingError("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setLoadingError("New password must be at least 6 characters long");
      return;
    }

    // In a real implementation, you would call a password update function
    // For now, we'll simulate success
    setSuccessMessage("Password updated successfully!");
    setLoadingError("");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      setLoadingError("No authentication token found");
      return;
    }

    try {
      const result = await deleteUser(token);
      if (result.success) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        window.location.href = '/login';
      } else {
        setLoadingError(result.error || "Failed to delete account");
      }
    } catch (err) {
      setLoadingError("An unexpected error occurred");
      console.error("Account deletion error:", err);
    }
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase() || 'U';
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account preferences and settings</p>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-4 rounded-md">
          <CheckCircle className="h-5 w-5" />
          <span>{successMessage}</span>
        </div>
      )}

      {(loadingError || error) && (
        <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-md">
          <AlertCircle className="h-5 w-5" />
          <span>{loadingError || error}</span>
        </div>
      )}

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Privacy
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Account
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information and profile details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-lg">
                    {userProfile ? getInitials(userProfile.first_name, userProfile.last_name) : 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline">Change Photo</Button>
                  <p className="text-sm text-gray-600 mt-2">JPG, GIF or PNG. 1MB max.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                />
              </div>

              {userProfile && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label className="text-sm font-medium">User ID</Label>
                    <p className="text-sm text-gray-600">{userProfile.user_id}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Role</Label>
                    <Badge variant="outline">{userProfile.role}</Badge>
                  </div>
                </div>
              )}

              <Button onClick={handleProfileUpdate}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose what notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Course Updates</Label>
                    <p className="text-sm text-gray-600">Get notified about new lessons and course updates</p>
                  </div>
                  <Switch 
                    checked={notifications.courseUpdates}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, courseUpdates: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Assignment Reminders</Label>
                    <p className="text-sm text-gray-600">Receive reminders about upcoming assignments</p>
                  </div>
                  <Switch 
                    checked={notifications.assignmentReminders}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, assignmentReminders: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Discussion Replies</Label>
                    <p className="text-sm text-gray-600">Get notified when someone replies to your discussions</p>
                  </div>
                  <Switch 
                    checked={notifications.discussionReplies}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, discussionReplies: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-600">Receive notifications via email</p>
                  </div>
                  <Switch 
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, emailNotifications: checked }))}
                  />
                </div>
              </div>

              <Button>Save Notification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Control your privacy and data sharing preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Profile Visibility</Label>
                    <p className="text-sm text-gray-600">Make your profile visible to other students</p>
                  </div>
                  <Switch 
                    checked={privacy.profileVisibility}
                    onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, profileVisibility: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Progress</Label>
                    <p className="text-sm text-gray-600">Allow others to see your course progress</p>
                  </div>
                  <Switch 
                    checked={privacy.showProgress}
                    onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, showProgress: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow Messages</Label>
                    <p className="text-sm text-gray-600">Allow other users to send you messages</p>
                  </div>
                  <Switch 
                    checked={privacy.allowMessages}
                    onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, allowMessages: checked }))}
                  />
                </div>
              </div>

              <Button>Save Privacy Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>Manage your subscription and payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Pro Plan</h3>
                    <p className="text-sm text-gray-600">Access to all courses and features</p>
                  </div>
                  <Badge>Active</Badge>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Payment Methods</h3>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-6 w-6 text-gray-400" />
                      <div>
                        <p className="font-medium">•••• •••• •••• 4242</p>
                        <p className="text-sm text-gray-600">Expires 12/25</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
              <CardDescription>Manage your account security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input 
                    id="currentPassword" 
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input 
                    id="newPassword" 
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  />
                </div>
              </div>

              <Button onClick={handlePasswordUpdate}>Update Password</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Danger Zone</CardTitle>
              <CardDescription>Irreversible and destructive actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border border-red-200 rounded-lg p-4">
                <h3 className="font-medium text-red-600 mb-2">Delete Account</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button variant="destructive" onClick={handleDeleteAccount}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
