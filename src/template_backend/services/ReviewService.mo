import Types "../types/Review";
module {
  private stable var reviews: [Types.Review] = [];

  public func addReview(r: Types.Review): async () {
    reviews := Array.append(reviews, [r]);
  };

  public func getAllReviews(): async [Types.Review] {
    return reviews;
  };
}