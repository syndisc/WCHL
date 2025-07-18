import Types "../types/Lecturer";
module {
  private stable var lecturers: [Types.Lecturer] = [];

  public func addLecturer(l: Types.Lecturer): async () {
    lecturers := Array.append(lecturers, [l]);
  };

  public func getAllLecturers(): async [Types.Lecturer] {
    return lecturers;
  };
}