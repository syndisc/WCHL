import Types "../types/Class";
module {
  private stable var classes: [Types.Class] = [];

  public func addClass(c: Types.Class): async () {
    classes := Array.append(classes, [c]);
  };

  public func getAllClasses(): async [Types.Class] {
    return classes;
  };
}
