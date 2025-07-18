import Types "../types/User";
module {
  private stable var users: [Types.User] = [];

  public func createUser(user: Types.User): async () {
    users := Array.append(users, [user]);
  };

  public func getUsers(): async [Types.User] {
    return users;
  };
}
