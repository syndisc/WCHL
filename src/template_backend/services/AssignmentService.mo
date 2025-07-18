import Types "../types/Assignment";
module {
  private stable var assignments: [Types.Assignment] = [];

  public func addAssignment(a: Types.Assignment): async () {
    assignments := Array.append(assignments, [a]);
  };

  public func getAllAssignments(): async [Types.Assignment] {
    return assignments;
  };
}