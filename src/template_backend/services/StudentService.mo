import Types "../types/Student";
module {
  private stable var students: [Types.Student] = [];

  public func addStudent(s: Types.Student): async () {
    students := Array.append(students, [s]);
  };

  public func getAllStudents(): async [Types.Student] {
    return students;
  };
}
