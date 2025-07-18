import Types "../types/Course";
module {
  private stable var courses: [Types.Course] = [];

  public func addCourse(c: Types.Course): async () {
    courses := Array.append(courses, [c]);
  };

  public func getAllCourses(): async [Types.Course] {
    return courses;
  };
}