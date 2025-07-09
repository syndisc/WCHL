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

export default function App() {
  return (
    <div className="h-screen w-screen">
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/course/:id" element={<CourseDetailPage />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="courses" element={<MyCoursesPage />} />
            <Route path="assignments" element={<AssignmentPage />} />
            <Route path="classmates" element={<ClassmatesPage />} />
            <Route path="quiz" element={<QuizPage />} />
            <Route path="browse" element={<BrowseCoursesPage />} />
            <Route path="discussions" element={<DiscussionsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Instructor Routes */}
          <Route path="/instructor/dashboard" element={<InstructorDashboard />} />

          {/* Error Pages */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </BrowserRouter>
    </div>
  );
}
