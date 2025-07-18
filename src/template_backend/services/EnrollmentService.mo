import Types "../types/Enrollment";
module {
  private stable var enrollments: [Types.Enrollment] = [];

  public func addEnrollment(e: Types.Enrollment): async () {
    enrollments := Array.append(enrollments, [e]);
  };

  public func getAllEnrollments(): async [Types.Enrollment] {
    return enrollments;
  };
}