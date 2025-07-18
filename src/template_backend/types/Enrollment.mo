module {
  public type Enrollment = {
    enrollment_id: Text;
    class_id: Text;
    student_id: Text;
    enrollment_status: Text; // ENUM
    enrollment_grade: Text; // ENUM
  };
}