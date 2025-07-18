module {
  public type Assignment = {
    assignment_id: Text;
    class_id: Text;
    student_id: Text;
    assignment_grade: Nat;
    submitted_date: Text;
    deadline_date: Text;
  };
}