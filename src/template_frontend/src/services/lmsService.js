// src/services/lmsService.js
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from 'declarations/template_backend';

// Get the canister ID from environment or dfx
const canisterId = "uxrrr-q7777-77774-qaaaq-cai"

// Create an agent for local development
const agent = new HttpAgent({
//   host: process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:4943' : 'https://ic0.app',
    host: 'http://127.0.0.1:4943'
});

// For local development, fetch root key
if (process.env.NODE_ENV === 'development') {
  agent.fetchRootKey().catch(err => {
    console.warn('Unable to fetch root key. Check to ensure that your local replica is running');
    console.error(err);
  });
}

// Create the actor
const lmsActor = Actor.createActor(idlFactory, {
  agent,
  canisterId,
});

// Helper function to handle Result types from Motoko
const handleResult = (result) => {
  if (result.ok !== undefined) {
    return { success: true, data: result.ok };
  } else if (result.err !== undefined) {
    return { success: false, error: result.err };
  }
  return { success: true, data: result };
};

export class LMSService {
  // ===== AUTHENTICATION =====
  static async login(email, password) {
    try {
      const result = await lmsActor.login(email, password);
      return handleResult(result);
    } catch (error) {
      console.error('Error logging in:', error);
      return { success: false, error: error.message };
    }
  }

  static async register(userData) {
    try {
      const result = await lmsActor.register(userData);
      return handleResult(result);
    } catch (error) {
      console.error('Error registering:', error);
      return { success: false, error: error.message };
    }
  }

  static async logout(token) {
    try {
      const result = await lmsActor.logout(token);
      return handleResult(result);
    } catch (error) {
      console.error('Error logging out:', error);
      return { success: false, error: error.message };
    }
  }

  // ===== MIDDLEWARE/VALIDATION =====
  static async validateStudent(token) {
    try {
      const result = await lmsActor.validateStudent(token);
      return handleResult(result);
    } catch (error) {
      console.error('Error validating student:', error);
      return { success: false, error: error.message };
    }
  }

  static async validateInstructor(token) {
    try {
      const result = await lmsActor.validateInstructor(token);
      return handleResult(result);
    } catch (error) {
      console.error('Error validating instructor:', error);
      return { success: false, error: error.message };
    }
  }

  static async validateAdmin(token) {
    try {
      const result = await lmsActor.validateAdmin(token);
      return handleResult(result);
    } catch (error) {
      console.error('Error validating admin:', error);
      return { success: false, error: error.message };
    }
  }

  // ===== USER ATTRIBUTES =====
  static async getUserAttribute(token) {
    try {
      const result = await lmsActor.getUserAttribute(token);
      return handleResult(result);
    } catch (error) {
      console.error('Error getting user attribute:', error);
      return { success: false, error: error.message };
    }
  }

  // ===== FAQ & HELP =====
  static async getFAQs() {
    try {
      const result = await lmsActor.getFAQs();
      return { success: true, data: result };
    } catch (error) {
      console.error('Error getting FAQs:', error);
      return { success: false, error: error.message };
    }
  }

  static async getHelp(category) {
    try {
      const result = await lmsActor.getHelp(category);
      return { success: true, data: result };
    } catch (error) {
      console.error('Error getting help:', error);
      return { success: false, error: error.message };
    }
  }

  // ===== STUDENT DASHBOARD =====
  static async getStudentDashboard(token) {
    try {
      const result = await lmsActor.getStudentDashboard(token);
      return handleResult(result);
    } catch (error) {
      console.error('Error getting student dashboard:', error);
      return { success: false, error: error.message };
    }
  }

  static async getMyCourses(token) {
    try {
      const result = await lmsActor.getMyCourses(token);
      return handleResult(result);
    } catch (error) {
      console.error('Error getting my courses:', error);
      return { success: false, error: error.message };
    }
  }

  static async getMyAssignments(token) {
    try {
      const result = await lmsActor.getMyAssignments(token);
      return handleResult(result);
    } catch (error) {
      console.error('Error getting my assignments:', error);
      return { success: false, error: error.message };
    }
  }

  static async browseCourses(token) {
    try {
      const result = await lmsActor.browseCourses(token);
      return handleResult(result);
    } catch (error) {
      console.error('Error browsing courses:', error);
      return { success: false, error: error.message };
    }
  }

  // ===== INSTRUCTOR DASHBOARD =====
  static async getInstructorDashboard(token) {
    try {
      const result = await lmsActor.getInstructorDashboard(token);
      return handleResult(result);
    } catch (error) {
      console.error('Error getting instructor dashboard:', error);
      return { success: false, error: error.message };
    }
  }

  // ===== ADMIN DASHBOARD =====
  static async getAdminDashboard(token) {
    try {
      const result = await lmsActor.getAdminDashboard(token);
      return handleResult(result);
    } catch (error) {
      console.error('Error getting admin dashboard:', error);
      return { success: false, error: error.message };
    }
  }

  // ===== DISCUSSIONS =====
  static async getDiscussions(token) {
    try {
      const result = await lmsActor.getDiscussions(token);
      return handleResult(result);
    } catch (error) {
      console.error('Error getting discussions:', error);
      return { success: false, error: error.message };
    }
  }

  // ===== CLASSMATES =====
  static async getClassmates(token) {
    try {
      const result = await lmsActor.getClassmates(token);
      return handleResult(result);
    } catch (error) {
      console.error('Error getting classmates:', error);
      return { success: false, error: error.message };
    }
  }

  // ===== CERTIFICATES =====
  static async getStudentCertificates(token) {
    try {
      const result = await lmsActor.getStudentCertificates(token);
      return handleResult(result);
    } catch (error) {
      console.error('Error getting student certificates:', error);
      return { success: false, error: error.message };
    }
  }

  // ===== USER SETTINGS =====
  static async getUserSettings(token) {
    try {
      const result = await lmsActor.getUserSettings(token);
      return handleResult(result);
    } catch (error) {
      console.error('Error getting user settings:', error);
      return { success: false, error: error.message };
    }
  }

  static async updateUserSettings(token, settings) {
    try {
      const result = await lmsActor.updateUserSettings(token, settings);
      return handleResult(result);
    } catch (error) {
      console.error('Error updating user settings:', error);
      return { success: false, error: error.message };
    }
  }

  // ===== CREATE COURSE (INSTRUCTOR) =====
  static async createCourseWithMaterials(token, courseData) {
    try {
      const result = await lmsActor.createCourseWithMaterials(token, courseData);
      return handleResult(result);
    } catch (error) {
      console.error('Error creating course with materials:', error);
      return { success: false, error: error.message };
    }
  }

  // ===== QUIZ BUILDER =====
  static async createQuiz(token, quizData) {
    try {
      const result = await lmsActor.createQuiz(token, quizData);
      return handleResult(result);
    } catch (error) {
      console.error('Error creating quiz:', error);
      return { success: false, error: error.message };
    }
  }

  // ===== QUIZ CHECKER =====
  static async getCoursesWithQuizzes(token) {
    try {
      const result = await lmsActor.getCoursesWithQuizzes(token);
      return handleResult(result);
    } catch (error) {
      console.error('Error getting courses with quizzes:', error);
      return { success: false, error: error.message };
    }
  }

  static async getQuizSubmissions(token, quizId) {
    try {
      const result = await lmsActor.getQuizSubmissions(token, quizId);
      return handleResult(result);
    } catch (error) {
      console.error('Error getting quiz submissions:', error);
      return { success: false, error: error.message };
    }
  }

  // ===== STUDENT PAGE (INSTRUCTOR) =====
  static async getStudentsInCourses(token) {
    try {
      const result = await lmsActor.getStudentsInCourses(token);
      return handleResult(result);
    } catch (error) {
      console.error('Error getting students in courses:', error);
      return { success: false, error: error.message };
    }
  }

  // ===== USER MANAGEMENT (ADMIN) =====
  static async getUsersForManagement(token, nameFilter = "") {
    try {
      const result = await lmsActor.getUsersForManagement(token, nameFilter);
      return handleResult(result);
    } catch (error) {
      console.error('Error getting users for management:', error);
      return { success: false, error: error.message };
    }
  }

  static async toggleUserStatus(token, userId) {
    try {
      const result = await lmsActor.toggleUserStatus(token, userId);
      return handleResult(result);
    } catch (error) {
      console.error('Error toggling user status:', error);
      return { success: false, error: error.message };
    }
  }

  // ===== STUDENT REPORTING =====
  static async reportStudent(token, reportData) {
    try {
      const result = await lmsActor.reportStudent(token, reportData);
      return handleResult(result);
    } catch (error) {
      console.error('Error reporting student:', error);
      return { success: false, error: error.message };
    }
  }

  static async getStudentReports(token) {
    try {
      const result = await lmsActor.getStudentReports(token);
      return handleResult(result);
    } catch (error) {
      console.error('Error getting student reports:', error);
      return { success: false, error: error.message };
    }
  }

  static async resolveStudentReport(token, reportId, action) {
    try {
      const result = await lmsActor.resolveStudentReport(token, reportId, action);
      return handleResult(result);
    } catch (error) {
      console.error('Error resolving student report:', error);
      return { success: false, error: error.message };
    }
  }

  // ===== EXISTING CRUD FUNCTIONS =====
  // User methods
  static async createUser(user) {
    try {
      await lmsActor.createUser(user);
      return { success: true };
    } catch (error) {
      console.error('Error creating user:', error);
      return { success: false, error: error.message };
    }
  }

  static async getUser(userId) {
    try {
      const result = await lmsActor.getUser(userId);
      return { success: true, data: result.length > 0 ? result[0] : null };
    } catch (error) {
      console.error('Error getting user:', error);
      return { success: false, error: error.message };
    }
  }

  static async updateUser(user) {
    try {
      await lmsActor.updateUser(user);
      return { success: true };
    } catch (error) {
      console.error('Error updating user:', error);
      return { success: false, error: error.message };
    }
  }

  static async deleteUser(userId) {
    try {
      await lmsActor.deleteUser(userId);
      return { success: true };
    } catch (error) {
      console.error('Error deleting user:', error);
      return { success: false, error: error.message };
    }
  }

  // Student methods
  static async createStudent(student) {
    try {
      await lmsActor.createStudent(student);
      return { success: true };
    } catch (error) {
      console.error('Error creating student:', error);
      return { success: false, error: error.message };
    }
  }

  static async getStudent(studentId) {
    try {
      const result = await lmsActor.getStudent(studentId);
      return { success: true, data: result.length > 0 ? result[0] : null };
    } catch (error) {
      console.error('Error getting student:', error);
      return { success: false, error: error.message };
    }
  }

  static async updateStudent(student) {
    try {
      await lmsActor.updateStudent(student);
      return { success: true };
    } catch (error) {
      console.error('Error updating student:', error);
      return { success: false, error: error.message };
    }
  }

  static async deleteStudent(studentId) {
    try {
      await lmsActor.deleteStudent(studentId);
      return { success: true };
    } catch (error) {
      console.error('Error deleting student:', error);
      return { success: false, error: error.message };
    }
  }

  // Lecturer methods
  static async createLecturer(lecturer) {
    try {
      await lmsActor.createLecturer(lecturer);
      return { success: true };
    } catch (error) {
      console.error('Error creating lecturer:', error);
      return { success: false, error: error.message };
    }
  }

  static async getLecturer(lecturerId) {
    try {
      const result = await lmsActor.getLecturer(lecturerId);
      return { success: true, data: result.length > 0 ? result[0] : null };
    } catch (error) {
      console.error('Error getting lecturer:', error);
      return { success: false, error: error.message };
    }
  }

  static async getLecturerByUserId(userId) {
    try {
      const result = await lmsActor.getLecturerByUserId(userId);
      return { success: true, data: result.length > 0 ? result[0] : null };
    } catch (error) {
      console.error('Error getting lecturer by user ID:', error);
      return { success: false, error: error.message };
    }
  }

  static async updateLecturer(lecturer) {
    try {
      await lmsActor.updateLecturer(lecturer);
      return { success: true };
    } catch (error) {
      console.error('Error updating lecturer:', error);
      return { success: false, error: error.message };
    }
  }

  static async deleteLecturer(lecturerId) {
    try {
      await lmsActor.deleteLecturer(lecturerId);
      return { success: true };
    } catch (error) {
      console.error('Error deleting lecturer:', error);
      return { success: false, error: error.message };
    }
  }

  // Course methods
  static async createCourse(course) {
    try {
      await lmsActor.createCourse(course);
      return { success: true };
    } catch (error) {
      console.error('Error creating course:', error);
      return { success: false, error: error.message };
    }
  }

  static async getCourse(courseId) {
    try {
      const result = await lmsActor.getCourse(courseId);
      return { success: true, data: result.length > 0 ? result[0] : null };
    } catch (error) {
      console.error('Error getting course:', error);
      return { success: false, error: error.message };
    }
  }

  static async getAllCourses() {
    try {
      const result = await lmsActor.getAllCourses();
      return { success: true, data: result };
    } catch (error) {
      console.error('Error getting all courses:', error);
      return { success: false, error: error.message };
    }
  }

  static async updateCourse(course) {
    try {
      await lmsActor.updateCourse(course);
      return { success: true };
    } catch (error) {
      console.error('Error updating course:', error);
      return { success: false, error: error.message };
    }
  }

  static async deleteCourse(courseId) {
    try {
      await lmsActor.deleteCourse(courseId);
      return { success: true };
    } catch (error) {
      console.error('Error deleting course:', error);
      return { success: false, error: error.message };
    }
  }

  // Class methods
  static async createClass(classData) {
    try {
      await lmsActor.createClass(classData);
      return { success: true };
    } catch (error) {
      console.error('Error creating class:', error);
      return { success: false, error: error.message };
    }
  }

  static async getClass(classId) {
    try {
      const result = await lmsActor.getClass(classId);
      return { success: true, data: result.length > 0 ? result[0] : null };
    } catch (error) {
      console.error('Error getting class:', error);
      return { success: false, error: error.message };
    }
  }

  static async updateClass(classData) {
    try {
      await lmsActor.updateClass(classData);
      return { success: true };
    } catch (error) {
      console.error('Error updating class:', error);
      return { success: false, error: error.message };
    }
  }

  static async deleteClass(classId) {
    try {
      await lmsActor.deleteClass(classId);
      return { success: true };
    } catch (error) {
      console.error('Error deleting class:', error);
      return { success: false, error: error.message };
    }
  }

  // Enrollment methods
  static async createEnrollment(enrollment) {
    try {
      await lmsActor.createEnrollment(enrollment);
      return { success: true };
    } catch (error) {
      console.error('Error creating enrollment:', error);
      return { success: false, error: error.message };
    }
  }

  static async getEnrollment(enrollmentId) {
    try {
      const result = await lmsActor.getEnrollment(enrollmentId);
      return { success: true, data: result.length > 0 ? result[0] : null };
    } catch (error) {
      console.error('Error getting enrollment:', error);
      return { success: false, error: error.message };
    }
  }

  static async updateEnrollment(enrollment) {
    try {
      await lmsActor.updateEnrollment(enrollment);
      return { success: true };
    } catch (error) {
      console.error('Error updating enrollment:', error);
      return { success: false, error: error.message };
    }
  }

  static async deleteEnrollment(enrollmentId) {
    try {
      await lmsActor.deleteEnrollment(enrollmentId);
      return { success: true };
    } catch (error) {
      console.error('Error deleting enrollment:', error);
      return { success: false, error: error.message };
    }
  }

  // Assignment methods
  static async createAssignment(assignment) {
    try {
      await lmsActor.createAssignment(assignment);
      return { success: true };
    } catch (error) {
      console.error('Error creating assignment:', error);
      return { success: false, error: error.message };
    }
  }

  static async getAssignment(assignmentId) {
    try {
      const result = await lmsActor.getAssignment(assignmentId);
      return { success: true, data: result.length > 0 ? result[0] : null };
    } catch (error) {
      console.error('Error getting assignment:', error);
      return { success: false, error: error.message };
    }
  }

  static async updateAssignment(assignment) {
    try {
      await lmsActor.updateAssignment(assignment);
      return { success: true };
    } catch (error) {
      console.error('Error updating assignment:', error);
      return { success: false, error: error.message };
    }
  }

  static async deleteAssignment(assignmentId) {
    try {
      await lmsActor.deleteAssignment(assignmentId);
      return { success: true };
    } catch (error) {
      console.error('Error deleting assignment:', error);
      return { success: false, error: error.message };
    }
  }

  // Certificate methods
  static async createCertificate(certificate) {
    try {
      await lmsActor.createCertificate(certificate);
      return { success: true };
    } catch (error) {
      console.error('Error creating certificate:', error);
      return { success: false, error: error.message };
    }
  }

  static async getCertificate(certificateId) {
    try {
      const result = await lmsActor.getCertificate(certificateId);
      return { success: true, data: result.length > 0 ? result[0] : null };
    } catch (error) {
      console.error('Error getting certificate:', error);
      return { success: false, error: error.message };
    }
  }

  static async updateCertificate(certificate) {
    try {
      await lmsActor.updateCertificate(certificate);
      return { success: true };
    } catch (error) {
      console.error('Error updating certificate:', error);
      return { success: false, error: error.message };
    }
  }

  static async deleteCertificate(certificateId) {
    try {
      await lmsActor.deleteCertificate(certificateId);
      return { success: true };
    } catch (error) {
      console.error('Error deleting certificate:', error);
      return { success: false, error: error.message };
    }
  }

  // Review methods
  static async createReview(review) {
    try {
      await lmsActor.createReview(review);
      return { success: true };
    } catch (error) {
      console.error('Error creating review:', error);
      return { success: false, error: error.message };
    }
  }

  static async getReview(reviewId) {
    try {
      const result = await lmsActor.getReview(reviewId);
      return { success: true, data: result.length > 0 ? result[0] : null };
    } catch (error) {
      console.error('Error getting review:', error);
      return { success: false, error: error.message };
    }
  }

  static async updateReview(review) {
    try {
      await lmsActor.updateReview(review);
      return { success: true };
    } catch (error) {
      console.error('Error updating review:', error);
      return { success: false, error: error.message };
    }
  }

  static async deleteReview(reviewId) {
    try {
      await lmsActor.deleteReview(reviewId);
      return { success: true };
    } catch (error) {
      console.error('Error deleting review:', error);
      return { success: false, error: error.message };
    }
  }

  // ===== PAYMENT METHODS =====
  static async addCurrency(user_id, amount) {
    try {
      const result = await lmsActor.addCurrency(user_id, amount);
      return { success: true, data: result };
    } catch (error) {
      console.error('Error adding currency:', error);
      return { success: false, error: error.message };
    }
  }

}

export default LMSService;