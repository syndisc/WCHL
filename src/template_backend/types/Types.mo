// Types.mo - Common types and data structures
import Time "mo:base/Time";

module {
    // Basic types
    public type StudentId = Text;
    public type LecturerId = Text;
    public type CourseId = Text;
    public type AssignmentId = Text;
    public type ReviewId = Text;
    public type CertificateId = Text;
    public type EnrollmentId = Text;

    // Student record
    public type Student = {
        student_id: StudentId;
        name: Text;
        email: Text;
        enrolled_date: Int; // Unix timestamp
        last_login: Int; // Unix timestamp
    };

    // Lecturer record
    public type Lecturer = {
        lecturer_id: LecturerId;
        name: Text;
        email: Text;
    };

    // Course record
    public type Course = {
        course_id: CourseId;
        course_name: Text;
        course_hours: Nat;
        course_length: Text;
        lecturer_id: LecturerId;
    };

    // Assignment record
    public type Assignment = {
        assignment_id: AssignmentId;
        assignment_name: Text;
        class_id: CourseId;
        student_id: StudentId;
        assignment_grade: Float;
        submitted_date: Int; // Unix timestamp
        deadline_date: Int; // Unix timestamp
    };

    // Review record
    public type Review = {
        review_id: ReviewId;
        student_id: StudentId;
        course_id: CourseId;
        rating: Float;
        description: Text;
    };

    // Certificate record
    public type Certificate = {
        certificate_id: CertificateId;
        course_id: CourseId;
        student_id: StudentId;
        issued_date: Int; // Unix timestamp
    };

    // Enrollment record
    public type Enrollment = {
        enrollment_id: EnrollmentId;
        student_id: StudentId;
        class_id: CourseId;
        enrolled_date: Int; // Unix timestamp
        enrollment_status: Text; // "active", "completed", "dropped"
        enrollment_grade: ?Float; // Optional final grade
    };

    // Input types for creation (without auto-generated IDs)
    public type StudentInput = {
        name: Text;
        email: Text;
    };

    public type LecturerInput = {
        name: Text;
        email: Text;
    };

    public type CourseInput = {
        course_name: Text;
        course_hours: Nat;
        course_length: Text;
        lecturer_id: LecturerId;
    };

    public type AssignmentInput = {
        assignment_name: Text;
        class_id: CourseId;
        student_id: StudentId;
        assignment_grade: Float;
        deadline_date: Int;
    };

    public type ReviewInput = {
        student_id: StudentId;
        course_id: CourseId;
        rating: Float;
        description: Text;
    };

    public type EnrollmentInput = {
        student_id: StudentId;
        class_id: CourseId;
        enrollment_status: Text;
        enrollment_grade: ?Float;
    };
}