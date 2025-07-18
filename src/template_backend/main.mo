// main.mo
import UserService "services/UserService";
import StudentService "services/StudentService";
import LecturerService "services/LecturerService";
import CourseService "services/CourseService";
import ClassService "services/ClassService";
import EnrollmentService "services/EnrollmentService";
import AssignmentService "services/AssignmentService";
import CertificateService "services/CertificateService";
import ReviewService "services/ReviewService";

actor LMS {
  public func ping(): async Text {
    return "LMS backend is running!";
  };

  // User
  public func createUser(user: UserService.Types.User): async () {
    await UserService.createUser(user);
  };
  public func getUsers(): async [UserService.Types.User] {
    await UserService.getUsers();
  };

  // Student
  public func addStudent(s: StudentService.Types.Student): async () {
    await StudentService.addStudent(s);
  };
  public func getStudents(): async [StudentService.Types.Student] {
    await StudentService.getAllStudents();
  };

  // Lecturer
  public func addLecturer(l: LecturerService.Types.Lecturer): async () {
    await LecturerService.addLecturer(l);
  };
  public func getLecturers(): async [LecturerService.Types.Lecturer] {
    await LecturerService.getAllLecturers();
  };

  // Course
  public func addCourse(c: CourseService.Types.Course): async () {
    await CourseService.addCourse(c);
  };
  public func getCourses(): async [CourseService.Types.Course] {
    await CourseService.getAllCourses();
  };

  // Class
  public func addClass(c: ClassService.Types.Class): async () {
    await ClassService.addClass(c);
  };
  public func getClasses(): async [ClassService.Types.Class] {
    await ClassService.getAllClasses();
  };

  // Enrollment
  public func addEnrollment(e: EnrollmentService.Types.Enrollment): async () {
    await EnrollmentService.addEnrollment(e);
  };
  public func getEnrollments(): async [EnrollmentService.Types.Enrollment] {
    await EnrollmentService.getAllEnrollments();
  };

  // Assignment
  public func addAssignment(a: AssignmentService.Types.Assignment): async () {
    await AssignmentService.addAssignment(a);
  };
  public func getAssignments(): async [AssignmentService.Types.Assignment] {
    await AssignmentService.getAllAssignments();
  };

  // Certificate
  public func addCertificate(c: CertificateService.Types.Certificate): async () {
    await CertificateService.addCertificate(c);
  };
  public func getCertificates(): async [CertificateService.Types.Certificate] {
    await CertificateService.getAllCertificates();
  };

  // Review
  public func addReview(r: ReviewService.Types.Review): async () {
    await ReviewService.addReview(r);
  };
  public func getReviews(): async [ReviewService.Types.Review] {
    await ReviewService.getAllReviews();
  };
}
