module {
  public type Review = {
    review_id: Text;
    student_id: Text;
    course_id: Text;
    created_at: Text;
    description: Text;
    rating: Nat;
  };
}