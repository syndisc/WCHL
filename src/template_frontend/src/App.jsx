import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/auth/login';
import RegisterPage from './pages/auth/register';
import HomePage from './pages/home/home';
import DashboardPage from './pages/dashboard/dashboardPage';
import MyCoursesPage from './pages/dashboard/myCoursePage';
import BrowseCoursesPage from './pages/dashboard/browseCoursePage';
import DiscussionsPage from './pages/dashboard/discussionPage';
import SettingsPage from './pages/dashboard/settingPage';
import InstructorDashboard from './pages/instructor/instructorDashboard';
import NotFoundPage from './pages/error/404page';
import DashboardLayout from './layouts/dashboardLayout';
import AssignmentPage from './pages/course/assignment';
import ClassmatesPage from './pages/course/classmate';
import QuizPage from './pages/course/quiz';
import MyCertificate from './pages/dashboard/myCertificate';
import CourseDetailPage from './pages/dashboard/CourseDetailPage';
import BookmarkedCoursesPage from "./pages/dashboard/bookmarkedCoursesPage";
import { CreateCoursesPage } from './pages/instructor/CreateCoursesPage';
import UserManagementPage from './pages/admin/userManagementPage';


export default function App() {
  return (
    <div className="h-screen w-screen">
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="courses" element={<MyCoursesPage />} />
            <Route path="assignments" element={<AssignmentPage />} />
            <Route path="classmates" element={<ClassmatesPage />} />
            <Route path="quiz" element={<QuizPage />} />
            <Route path="browse" element={<BrowseCoursesPage />} />
            <Route path="discussions" element={<DiscussionsPage />} />
            <Route path="certificate" element={<MyCertificate />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="/dashboard/bookmarked" element={<BookmarkedCoursesPage />} 
            />

          </Route>

          {/* Instructor Routes */}
          <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
          <Route path="/instructor/courses/create" element={<CreateCoursesPage />} />

          {/* Admin Routes */}
          <Route path="/admin/user_management" element={<UserManagementPage />} />

          {/* Error Pages */}
          <Route path="*" element={<NotFoundPage />} />

          <Route path="/courses/:slug" element={<CourseDetailPage />} />

        </Routes>
    </BrowserRouter>
    </div>
  );
}
