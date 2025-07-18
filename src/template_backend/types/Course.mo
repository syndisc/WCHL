module {
  public type Course = {
    course_id: Text;
    course_name: Text;
    course_status: Text; // ENUM - could define as variant
    course_length: Text;
  };
}
