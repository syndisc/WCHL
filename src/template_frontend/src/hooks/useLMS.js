// src/hooks/useLMS.js
import { useState, useCallback } from 'react';
import { LMSService } from '../services/lmsService';

export const useLMS = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeAction = useCallback(async (action) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await action();
      if (!result.success) {
        setError(result.error);
      }
      return result;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // ===== AUTHENTICATION =====
  const login = useCallback((email, password) => {
    return executeAction(() => LMSService.login(email, password));
  }, [executeAction]);

  const register = useCallback((userData) => {
    return executeAction(() => LMSService.register(userData));
  }, [executeAction]);

  const logout = useCallback((token) => {
    return executeAction(() => LMSService.logout(token));
  }, [executeAction]);

  // ===== MIDDLEWARE/VALIDATION =====
  const validateStudent = useCallback((token) => {
    return executeAction(() => LMSService.validateStudent(token));
  }, [executeAction]);

  const validateInstructor = useCallback((token) => {
    return executeAction(() => LMSService.validateInstructor(token));
  }, [executeAction]);

  const validateAdmin = useCallback((token) => {
    return executeAction(() => LMSService.validateAdmin(token));
  }, [executeAction]);

  // ===== USER ATTRIBUTES =====
  const getUserAttribute = useCallback((token) => {
    return executeAction(() => LMSService.getUserAttribute(token));
  }, [executeAction]);

  // ===== FAQ & HELP =====
  const getFAQs = useCallback(() => {
    return executeAction(() => LMSService.getFAQs());
  }, [executeAction]);

  const getHelp = useCallback((category) => {
    return executeAction(() => LMSService.getHelp(category));
  }, [executeAction]);

  // ===== STUDENT DASHBOARD =====
  const getStudentDashboard = useCallback((token) => {
    return executeAction(() => LMSService.getStudentDashboard(token));
  }, [executeAction]);

  const getMyCourses = useCallback((token) => {
    return executeAction(() => LMSService.getMyCourses(token));
  }, [executeAction]);

  const getMyAssignments = useCallback((token) => {
    return executeAction(() => LMSService.getMyAssignments(token));
  }, [executeAction]);

  const browseCourses = useCallback((token) => {
    return executeAction(() => LMSService.browseCourses(token));
  }, [executeAction]);

  // ===== INSTRUCTOR DASHBOARD =====
  const getInstructorDashboard = useCallback((token) => {
    return executeAction(() => LMSService.getInstructorDashboard(token));
  }, [executeAction]);

  // ===== ADMIN DASHBOARD =====
  const getAdminDashboard = useCallback((token) => {
    return executeAction(() => LMSService.getAdminDashboard(token));
  }, [executeAction]);

  // ===== DISCUSSIONS =====
  const getDiscussions = useCallback((token) => {
    return executeAction(() => LMSService.getDiscussions(token));
  }, [executeAction]);

  // ===== CLASSMATES =====
  const getClassmates = useCallback((token) => {
    return executeAction(() => LMSService.getClassmates(token));
  }, [executeAction]);

  // ===== CERTIFICATES =====
  const getStudentCertificates = useCallback((token) => {
    return executeAction(() => LMSService.getStudentCertificates(token));
  }, [executeAction]);

  // ===== USER SETTINGS =====
  const getUserSettings = useCallback((token) => {
    return executeAction(() => LMSService.getUserSettings(token));
  }, [executeAction]);

  const updateUserSettings = useCallback((token, settings) => {
    return executeAction(() => LMSService.updateUserSettings(token, settings));
  }, [executeAction]);

  // ===== CREATE COURSE (INSTRUCTOR) =====
  const createCourseWithMaterials = useCallback((token, courseData) => {
    return executeAction(() => LMSService.createCourseWithMaterials(token, courseData));
  }, [executeAction]);

  // ===== QUIZ BUILDER =====
  const createQuiz = useCallback((token, quizData) => {
    return executeAction(() => LMSService.createQuiz(token, quizData));
  }, [executeAction]);

  // ===== QUIZ CHECKER =====
  const getCoursesWithQuizzes = useCallback((token) => {
    return executeAction(() => LMSService.getCoursesWithQuizzes(token));
  }, [executeAction]);

  const getQuizSubmissions = useCallback((token, quizId) => {
    return executeAction(() => LMSService.getQuizSubmissions(token, quizId));
  }, [executeAction]);

  // ===== STUDENT PAGE (INSTRUCTOR) =====
  const getStudentsInCourses = useCallback((token) => {
    return executeAction(() => LMSService.getStudentsInCourses(token));
  }, [executeAction]);

  // ===== USER MANAGEMENT (ADMIN) =====
  const getUsersForManagement = useCallback((token, nameFilter = "") => {
    return executeAction(() => LMSService.getUsersForManagement(token, nameFilter));
  }, [executeAction]);

  const toggleUserStatus = useCallback((token, userId) => {
    return executeAction(() => LMSService.toggleUserStatus(token, userId));
  }, [executeAction]);

  // ===== STUDENT REPORTING =====
  const reportStudent = useCallback((token, reportData) => {
    return executeAction(() => LMSService.reportStudent(token, reportData));
  }, [executeAction]);

  const getStudentReports = useCallback((token) => {
    return executeAction(() => LMSService.getStudentReports(token));
  }, [executeAction]);

  const resolveStudentReport = useCallback((token, reportId, action) => {
    return executeAction(() => LMSService.resolveStudentReport(token, reportId, action));
  }, [executeAction]);

  // ===== EXISTING CRUD OPERATIONS =====
  // User operations
  const createUser = useCallback((user) => {
    return executeAction(() => LMSService.createUser(user));
  }, [executeAction]);

  const getUser = useCallback((userId) => {
    return executeAction(() => LMSService.getUser(userId));
  }, [executeAction]);

  const updateUser = useCallback((user) => {
    return executeAction(() => LMSService.updateUser(user));
  }, [executeAction]);

  const deleteUser = useCallback((userId) => {
    return executeAction(() => LMSService.deleteUser(userId));
  }, [executeAction]);

  // Student operations
  const createStudent = useCallback((student) => {
    return executeAction(() => LMSService.createStudent(student));
  }, [executeAction]);

  const getStudent = useCallback((studentId) => {
    return executeAction(() => LMSService.getStudent(studentId));
  }, [executeAction]);

  const updateStudent = useCallback((student) => {
    return executeAction(() => LMSService.updateStudent(student));
  }, [executeAction]);

  const deleteStudent = useCallback((studentId) => {
    return executeAction(() => LMSService.deleteStudent(studentId));
  }, [executeAction]);

  // Lecturer operations
  const createLecturer = useCallback((lecturer) => {
    return executeAction(() => LMSService.createLecturer(lecturer));
  }, [executeAction]);

  const getLecturer = useCallback((lecturerId) => {
    return executeAction(() => LMSService.getLecturer(lecturerId));
  }, [executeAction]);

  const updateLecturer = useCallback((lecturer) => {
    return executeAction(() => LMSService.updateLecturer(lecturer));
  }, [executeAction]);

  const deleteLecturer = useCallback((lecturerId) => {
    return executeAction(() => LMSService.deleteLecturer(lecturerId));
  }, [executeAction]);

  // Course operations
  const createCourse = useCallback((course) => {
    return executeAction(() => LMSService.createCourse(course));
  }, [executeAction]);

  const getCourse = useCallback((courseId) => {
    return executeAction(() => LMSService.getCourse(courseId));
  }, [executeAction]);

  const updateCourse = useCallback((course) => {
    return executeAction(() => LMSService.updateCourse(course));
  }, [executeAction]);

  const deleteCourse = useCallback((courseId) => {
    return executeAction(() => LMSService.deleteCourse(courseId));
  }, [executeAction]);

  // Class operations
  const createClass = useCallback((classData) => {
    return executeAction(() => LMSService.createClass(classData));
  }, [executeAction]);

  const getClass = useCallback((classId) => {
    return executeAction(() => LMSService.getClass(classId));
  }, [executeAction]);

  const updateClass = useCallback((classData) => {
    return executeAction(() => LMSService.updateClass(classData));
  }, [executeAction]);

  const deleteClass = useCallback((classId) => {
    return executeAction(() => LMSService.deleteClass(classId));
  }, [executeAction]);

  // Enrollment operations
  const createEnrollment = useCallback((enrollment) => {
    return executeAction(() => LMSService.createEnrollment(enrollment));
  }, [executeAction]);

  const getEnrollment = useCallback((enrollmentId) => {
    return executeAction(() => LMSService.getEnrollment(enrollmentId));
  }, [executeAction]);

  const updateEnrollment = useCallback((enrollment) => {
    return executeAction(() => LMSService.updateEnrollment(enrollment));
  }, [executeAction]);

  const deleteEnrollment = useCallback((enrollmentId) => {
    return executeAction(() => LMSService.deleteEnrollment(enrollmentId));
  }, [executeAction]);

  // Assignment operations
  const createAssignment = useCallback((assignment) => {
    return executeAction(() => LMSService.createAssignment(assignment));
  }, [executeAction]);

  const getAssignment = useCallback((assignmentId) => {
    return executeAction(() => LMSService.getAssignment(assignmentId));
  }, [executeAction]);

  const updateAssignment = useCallback((assignment) => {
    return executeAction(() => LMSService.updateAssignment(assignment));
  }, [executeAction]);

  const deleteAssignment = useCallback((assignmentId) => {
    return executeAction(() => LMSService.deleteAssignment(assignmentId));
  }, [executeAction]);

  // Certificate operations
  const createCertificate = useCallback((certificate) => {
    return executeAction(() => LMSService.createCertificate(certificate));
  }, [executeAction]);

  const getCertificate = useCallback((certificateId) => {
    return executeAction(() => LMSService.getCertificate(certificateId));
  }, [executeAction]);

  const updateCertificate = useCallback((certificate) => {
    return executeAction(() => LMSService.updateCertificate(certificate));
  }, [executeAction]);

  const deleteCertificate = useCallback((certificateId) => {
    return executeAction(() => LMSService.deleteCertificate(certificateId));
  }, [executeAction]);

  // Review operations
  const createReview = useCallback((review) => {
    return executeAction(() => LMSService.createReview(review));
  }, [executeAction]);

  const getReview = useCallback((reviewId) => {
    return executeAction(() => LMSService.getReview(reviewId));
  }, [executeAction]);

  const updateReview = useCallback((review) => {
    return executeAction(() => LMSService.updateReview(review));
  }, [executeAction]);

  const deleteReview = useCallback((reviewId) => {
    return executeAction(() => LMSService.deleteReview(reviewId));
  }, [executeAction]);

  return {
    loading,
    error,
    // Authentication methods
    login,
    register,
    logout,
    // Validation methods
    validateStudent,
    validateInstructor,
    validateAdmin,
    // User attributes
    getUserAttribute,
    // FAQ & Help
    getFAQs,
    getHelp,
    // Student dashboard
    getStudentDashboard,
    getMyCourses,
    getMyAssignments,
    browseCourses,
    // Instructor dashboard
    getInstructorDashboard,
    // Admin dashboard
    getAdminDashboard,
    // Discussions
    getDiscussions,
    // Classmates
    getClassmates,
    // Certificates
    getStudentCertificates,
    // User settings
    getUserSettings,
    updateUserSettings,
    // Course creation
    createCourseWithMaterials,
    // Quiz management
    createQuiz,
    getCoursesWithQuizzes,
    getQuizSubmissions,
    // Student management
    getStudentsInCourses,
    // User management (Admin)
    getUsersForManagement,
    toggleUserStatus,
    // Student reporting
    reportStudent,
    getStudentReports,
    resolveStudentReport,
    // CRUD operations
    // User methods
    createUser,
    getUser,
    updateUser,
    deleteUser,
    // Student methods
    createStudent,
    getStudent,
    updateStudent,
    deleteStudent,
    // Lecturer methods
    createLecturer,
    getLecturer,
    updateLecturer,
    deleteLecturer,
    // Course methods
    createCourse,
    getCourse,
    updateCourse,
    deleteCourse,
    // Class methods
    createClass,
    getClass,
    updateClass,
    deleteClass,
    // Enrollment methods
    createEnrollment,
    getEnrollment,
    updateEnrollment,
    deleteEnrollment,
    // Assignment methods
    createAssignment,
    getAssignment,
    updateAssignment,
    deleteAssignment,
    // Certificate methods
    createCertificate,
    getCertificate,
    updateCertificate,
    deleteCertificate,
    // Review methods
    createReview,
    getReview,
    updateReview,
    deleteReview,
  };
};