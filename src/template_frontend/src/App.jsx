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
import CourseDetailPage from './pages/course/courses';
import DashboardLayout from './layouts/dashboardLayout';
import AssignmentPage from './pages/course/assignment';
import ClassmatesPage from './pages/course/classmate';
import QuizPage from './pages/course/quiz';
import UserManagementPage from './pages/admin/userManagementPage';
import InstructorLayout from './layouts/instructorLayout';
import QuizBuilder from './pages/instructor/quizBuilder';
import StudentManagementPage from './pages/instructor/studentManagement';
import AdminDashboardPage from './pages/admin/adminDashboardPage';
import AdminLayout from './layouts/adminLayout';
import CreateCoursesPage from './pages/instructor/CreateCoursesPage';
import MyCertificate from './pages/dashboard/MyCertificate';
import BookmMarkedCoursesPage from './pages/dashboard/BookMarkedCoursesPage';
import HelpCenter from './pages/help/helpCenter';
import HelpDetail from './pages/help/helpDetail';
import AboutPage from './pages/about/About';
import ExploreCourses from './pages/course/GuestCourse';
import FAQPage from './pages/faq/faq';

export default function App() {
  return (
    <div className="h-screen w-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<HelpCenter />} />
          <Route path="/contact/:slug" element={<HelpDetail />} />
          <Route path="/courses-guest" element={<ExploreCourses />} />
          <Route path="/courses/:slug" element={<CourseDetailPage />} />

          <Route path="/faq" element={<FAQPage />} />

          <Route path="/help" element={<HelpCenter />} />
          <Route path="/help/:slug" element={<HelpDetail />} />


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
            <Route path="bookmarked" element={<BookmMarkedCoursesPage />} />
          </Route>

          {/* Instructor Routes */}
          <Route path="/instructor" element={<InstructorLayout />}>
            <Route index element={<InstructorDashboard />} />
            <Route path="create-course" element={<CreateCoursesPage />} />
            <Route path="quiz-builder" element={<QuizBuilder />} />
            <Route path="students" element={<StudentManagementPage />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="user_management" element={<UserManagementPage />} />
          </Route>

          {/* Error Pages */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
