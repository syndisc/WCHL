import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Result "mo:base/Result";
import Debug "mo:base/Debug";
import Float "mo:base/Float";

actor LMS {
  // === EXISTING TYPES ===
  public type User = {
    user_id : Text;
    first_name : Text;
    last_name : Text;
    email : Text;
    bio : Text;
    profile_picture : Text;
    role : Text; // "student", "instructor", "admin"
    status : Text; // "active", "inactive"
    created : Int;
    updated : Int;
    last_login : Int;
    edoo_token : Int;
  };

  public type Student = {
    student_id : Text;
    user_id : Text;
  };

  public type Lecturer = {
    lecturer_id : Text;
    user_id : Text;
  };

  public type Course = {
    course_id : Text;
    course_name : Text;
    course_description : Text;
    course_status : Text;
    course_length : Text;
    course_thumbnail : Text;
    language : Text;
    instructor_id : Text;
    duration_days : Nat;
    rating : Float;
    student_count : Nat;
  };

  public type Class = {
    class_id : Text;
    course_id : Text;
    lecturer_id : Text;
  };

  public type Enrollment = {
    enrollment_id : Text;
    class_id : Text;
    student_id : Text;
    enrollment_status : Text;
    enrollment_grade : Text;
    progress_percentage : Nat;
    enrollment_date : Int;
  };

  public type Assignment = {
    assignment_id : Text;
    class_id : Text;
    student_id : Text;
    assignment_grade : Nat;
    submitted_date : Int;
    deadline_date : Int;
    status : Text; // "not_done", "submitted", "graded"
    submission_file : Text;
  };

  public type Certificate = {
    certificate_id : Text;
    course_id : Text;
    student_id : Text;
    created_at : Int;
  };

  public type Review = {
    review_id : Text;
    student_id : Text;
    course_id : Text;
    created_at : Int;
    description : Text;
    rating : Nat;
  };

  // === NEW TYPES ===
  public type AuthToken = {
    token : Text;
    user_id : Text;
    expires_at : Int;
  };

  public type FAQ = {
    faq_id : Text;
    question : Text;
    answer : Text;
    created_at : Int;
  };

  public type Help = {
    help_id : Text;
    title : Text;
    content : Text;
    category : Text;
    created_at : Int;
  };

  public type CourseMaterial = {
    material_id : Text;
    course_id : Text;
    material_name : Text;
    material_type : Text; // "file", "video", "text"
    material_content : Text; // file path or video link
    material_description : Text;
    order_index : Nat;
  };

  public type Quiz = {
    quiz_id : Text;
    course_id : Text;
    title : Text;
    created_at : Int;
  };

  public type QuizQuestion = {
    question_id : Text;
    quiz_id : Text;
    question_text : Text;
    question_type : Text; // "multiple_choice", "essay"
    answers : Text; // JSON stringified array for multiple choice
    correct_answer : Text;
    points : Nat;
  };

  public type QuizSubmission = {
    submission_id : Text;
    quiz_id : Text;
    student_id : Text;
    answers : Text; // JSON stringified
    score : Nat;
    submitted_at : Int;
    graded : Bool;
  };

  public type Discussion = {
    discussion_id : Text;
    class_id : Text;
    title : Text;
    question : Text;
    created_by : Text;
    created_at : Int;
    replies_count : Nat;
    likes_count : Nat;
  };

  public type StudentReport = {
    report_id : Text;
    student_id : Text;
    instructor_id : Text;
    course_id : Text;
    problem_description : Text;
    status : Text; // "pending", "resolved", "rejected"
    created_at : Int;
  };

  // === STORAGE ===
  stable var users : [User] = [];
  stable var students : [Student] = [];
  stable var lecturers : [Lecturer] = [];
  stable var courses : [Course] = [];
  stable var classes : [Class] = [];
  stable var enrollments : [Enrollment] = [];
  stable var assignments : [Assignment] = [];
  stable var certificates : [Certificate] = [];
  stable var reviews : [Review] = [];
  stable var auth_tokens : [AuthToken] = [];
  stable var faqs : [FAQ] = [];
  stable var helps : [Help] = [];
  stable var course_materials : [CourseMaterial] = [];
  stable var quizzes : [Quiz] = [];
  stable var quiz_questions : [QuizQuestion] = [];
  stable var quiz_submissions : [QuizSubmission] = [];
  stable var discussions : [Discussion] = [];
  stable var student_reports : [StudentReport] = [];

  // === AUTHENTICATION ===
  public func login(email : Text, password : Text) : async Result.Result<{ token : Text; user : User }, Text> {
    switch (Array.find(users, func(u : User) : Bool { u.email == email })) {
      case null { #err("User not found") };
      case (?user) {
        if (user.status == "inactive") {
          return #err("Account is inactive");
        };

        let token = generateToken(user.user_id);
        let authToken : AuthToken = {
          token = token;
          user_id = user.user_id;
          expires_at = Time.now() + 86400000000000; // 24 hours
        };
        auth_tokens := Array.append(auth_tokens, [authToken]);

        // Update last login
        let updatedUser = {
          user_id = user.user_id;
          first_name = user.first_name;
          last_name = user.last_name;
          email = user.email;
          bio = user.bio;
          profile_picture = user.profile_picture;
          role = user.role;
          status = user.status;
          created = user.created;
          updated = user.updated;
          last_login = Time.now();
          edoo_token = user.edoo_token;
        };
        users := Array.map(
          users,
          func(u : User) : User {
            if (u.user_id == user.user_id) updatedUser else u;
          },
        );

        #ok({ token = token; user = updatedUser });
      };
    };
  };

  public func register(
    userData : {
      first_name : Text;
      last_name : Text;
      email : Text;
      role : Text;
    }
  ) : async Result.Result<{ token : Text; user : User }, Text> {
    // Check if email already exists
    switch (Array.find(users, func(u : User) : Bool { u.email == userData.email })) {
      case (?_) { return #err("Email already exists") };
      case null {};
    };

    let userId = generateId("user");
    let user : User = {
      user_id = userId;
      first_name = userData.first_name;
      last_name = userData.last_name;
      email = userData.email;
      bio = "";
      profile_picture = "";
      role = userData.role;
      status = "active";
      created = Time.now();
      updated = Time.now();
      last_login = Time.now();
      edoo_token = 0;
    };

    users := Array.append(users, [user]);

    // Create role-specific records
    switch (userData.role) {
      case "student" {
        let student : Student = {
          student_id = generateId("student");
          user_id = userId;
        };
        students := Array.append(students, [student]);
      };
      case "instructor" {
        let lecturer : Lecturer = {
          lecturer_id = generateId("lecturer");
          user_id = userId;
        };
        lecturers := Array.append(lecturers, [lecturer]);
      };
      case _ {};
    };

    let token = generateToken(userId);
    let authToken : AuthToken = {
      token = token;
      user_id = userId;
      expires_at = Time.now() + 86400000000000;
    };
    auth_tokens := Array.append(auth_tokens, [authToken]);

    #ok({ token = token; user = user });
  };

  // === MIDDLEWARE ===
  public func validateStudent(token : Text) : async Result.Result<User, Text> {
    switch (await validateToken(token)) {
      case (#err(msg)) { #err(msg) };
      case (#ok(user)) {
        if (user.role == "student") {
          #ok(user);
        } else {
          #err("Access denied: Student role required");
        };
      };
    };
  };

  public func validateInstructor(token : Text) : async Result.Result<User, Text> {
    switch (await validateToken(token)) {
      case (#err(msg)) { #err(msg) };
      case (#ok(user)) {
        if (user.role == "instructor") {
          #ok(user);
        } else {
          #err("Access denied: Instructor role required");
        };
      };
    };
  };

  public func validateAdmin(token : Text) : async Result.Result<User, Text> {
    switch (await validateToken(token)) {
      case (#err(msg)) { #err(msg) };
      case (#ok(user)) {
        if (user.role == "admin") {
          #ok(user);
        } else {
          #err("Access denied: Admin role required");
        };
      };
    };
  };

  private func validateToken(token : Text) : async Result.Result<User, Text> {
    switch (Array.find(auth_tokens, func(t : AuthToken) : Bool { t.token == token })) {
      case null { #err("Invalid token") };
      case (?authToken) {
        // Check if token is expired
        let currentTime = Time.now();
        let expiresAt = authToken.expires_at;

        if (currentTime > expiresAt) {
          return #err("Token expired");
        };

        switch (Array.find(users, func(u : User) : Bool { u.user_id == authToken.user_id })) {
          case null { #err("User not found") };
          case (?user) { #ok(user) };
        };
      };
    };
  };

  // === USER ATTRIBUTES ===
  public func getUserAttribute(token : Text) : async Result.Result<{ name : Text; role : Text }, Text> {
    switch (await validateToken(token)) {
      case (#err(msg)) { #err(msg) };
      case (#ok(user)) {
        #ok({
          name = user.first_name # " " # user.last_name;
          role = user.role;
        });
      };
    };
  };

  // === FAQ & HELP ===
  public func getFAQs() : async [FAQ] {
    faqs;
  };

  public func getHelp(category : Text) : async [Help] {
    Array.filter(helps, func(h : Help) : Bool { h.category == category });
  };

  // === STUDENT DASHBOARD ===
  public func getStudentDashboard(token : Text) : async Result.Result<{ enrolled_courses : Nat; completed_courses : Nat; pending_assignments : Nat; certificates : Nat; half_progress_courses : [Course]; upcoming_deadlines : [Assignment]; recent_finished_courses : [Course] }, Text> {
    switch (await validateStudent(token)) {
      case (#err(msg)) { #err(msg) };
      case (#ok(user)) {
        let studentRecord = Array.find(students, func(s : Student) : Bool { s.user_id == user.user_id });
        switch (studentRecord) {
          case null { #err("Student record not found") };
          case (?student) {
            let studentEnrollments = Array.filter(enrollments, func(e : Enrollment) : Bool { e.student_id == student.student_id });
            let enrolledCount = Array.size(studentEnrollments);
            let completedCount = Array.size(Array.filter(studentEnrollments, func(e : Enrollment) : Bool { e.enrollment_status == "completed" }));

            let studentAssignments = Array.filter(assignments, func(a : Assignment) : Bool { a.student_id == student.student_id });
            let pendingAssignments = Array.size(Array.filter(studentAssignments, func(a : Assignment) : Bool { a.status == "not_done" }));

            let studentCertificates = Array.filter(certificates, func(c : Certificate) : Bool { c.student_id == student.student_id });
            let certificatesCount = Array.size(studentCertificates);

            // Half progress courses (40-60% progress)
            let halfProgressEnrollments = Array.filter(
              studentEnrollments,
              func(e : Enrollment) : Bool {
                e.progress_percentage >= 40 and e.progress_percentage <= 60
              },
            );
            let halfProgressCourses = Array.mapFilter(
              halfProgressEnrollments,
              func(e : Enrollment) : ?Course {
                let classObj = Array.find(classes, func(cl : Class) : Bool { cl.class_id == e.class_id });
                switch (classObj) {
                  case null { null };
                  case (?cl) {
                    Array.find(courses, func(c : Course) : Bool { c.course_id == cl.course_id });
                  };
                };
              },
            );

            // Upcoming deadlines (next 7 days)
            let currentTime = Time.now();
            let upcomingDeadlines = Array.filter(
              studentAssignments,
              func(a : Assignment) : Bool {
                let deadline = a.deadline_date;
                deadline > currentTime and deadline <= currentTime + 604800000000000;
              },
            );

            // Recent finished courses (last 30 days)
            let recentFinishedEnrollments = Array.filter(
              studentEnrollments,
              func(e : Enrollment) : Bool {
                if (e.enrollment_status == "completed") {
                  let date = e.enrollment_date;
                  currentTime - date <= 2592000000000000;
                } else {
                  false;
                };
              },
            );
            let recentFinishedCourses = Array.mapFilter(
              recentFinishedEnrollments,
              func(e : Enrollment) : ?Course {
                let classObj = Array.find(classes, func(cl : Class) : Bool { cl.class_id == e.class_id });
                switch (classObj) {
                  case null { null };
                  case (?cl) {
                    Array.find(courses, func(c : Course) : Bool { c.course_id == cl.course_id });
                  };
                };
              },
            );

            #ok({
              enrolled_courses = enrolledCount;
              completed_courses = completedCount;
              pending_assignments = pendingAssignments;
              certificates = certificatesCount;
              half_progress_courses = halfProgressCourses;
              upcoming_deadlines = upcomingDeadlines;
              recent_finished_courses = recentFinishedCourses;
            });
          };
        };
      };
    };
  };

  // === MY COURSES ===
  public func getMyCourses(token : Text) : async Result.Result<[{ course : Course; progress : Nat; enrollment_status : Text }], Text> {
    switch (await validateStudent(token)) {
      case (#err(msg)) { #err(msg) };
      case (#ok(user)) {
        let studentRecord = Array.find(students, func(s : Student) : Bool { s.user_id == user.user_id });
        switch (studentRecord) {
          case null { #err("Student record not found") };
          case (?student) {
            let studentEnrollments = Array.filter(enrollments, func(e : Enrollment) : Bool { e.student_id == student.student_id });
            let coursesWithProgress = Array.mapFilter(
              studentEnrollments,
              func(e : Enrollment) : ?{
                course : Course;
                progress : Nat;
                enrollment_status : Text;
              } {
                let classObj = Array.find(classes, func(cl : Class) : Bool { cl.class_id == e.class_id });
                switch (classObj) {
                  case null { null };
                  case (?cl) {
                    switch (Array.find(courses, func(c : Course) : Bool { c.course_id == cl.course_id })) {
                      case null { null };
                      case (?course) {
                        ?{
                          course = course;
                          progress = e.progress_percentage;
                          enrollment_status = e.enrollment_status;
                        };
                      };
                    };
                  };
                };
              },
            );
            #ok(coursesWithProgress);
          };
        };
      };
    };
  };

  // === MY ASSIGNMENTS ===
  public func getMyAssignments(token : Text) : async Result.Result<[Assignment], Text> {
    switch (await validateStudent(token)) {
      case (#err(msg)) { #err(msg) };
      case (#ok(user)) {
        let studentRecord = Array.find(students, func(s : Student) : Bool { s.user_id == user.user_id });
        switch (studentRecord) {
          case null { #err("Student record not found") };
          case (?student) {
            let studentAssignments = Array.filter(assignments, func(a : Assignment) : Bool { a.student_id == student.student_id });
            // Sort by status priority: not_done, submitted, graded
            let sortedAssignments = Array.sort(
              studentAssignments,
              func(a : Assignment, b : Assignment) : { #less; #equal; #greater } {
                let statusOrder = func(status : Text) : Nat {
                  switch (status) {
                    case "not_done" { 0 };
                    case "submitted" { 1 };
                    case "graded" { 2 };
                    case _ { 3 };
                  };
                };
                let aOrder = statusOrder(a.status);
                let bOrder = statusOrder(b.status);
                if (aOrder < bOrder) { #less } else if (aOrder > bOrder) {
                  #greater;
                } else { #equal };
              },
            );
            #ok(sortedAssignments);
          };
        };
      };
    };
  };

  // === BROWSE COURSES ===
  public func browseCourses(token : Text) : async Result.Result<[Course], Text> {
    switch (await validateStudent(token)) {
      case (#err(msg)) { #err(msg) };
      case (#ok(user)) {
        let studentRecord = Array.find(students, func(s : Student) : Bool { s.user_id == user.user_id });
        switch (studentRecord) {
          case null { #err("Student record not found") };
          case (?student) {
            let enrolledCourseIds = Array.map(
              Array.filter(enrollments, func(e : Enrollment) : Bool { e.student_id == student.student_id }),
              func(e : Enrollment) : Text { e.class_id },
            );

            // Get recommended courses (not enrolled)
            let recommendedCourses = Array.filter(
              courses,
              func(c : Course) : Bool {
                Array.find(enrolledCourseIds, func(id : Text) : Bool { id == c.course_id }) == null;
              },
            );

            #ok(recommendedCourses);
          };
        };
      };
    };
  };

  // === INSTRUCTOR DASHBOARD ===
  public func getInstructorDashboard(token : Text) : async Result.Result<{ total_students : Nat; total_active_courses : Nat; total_revenue : Nat; average_rating : Float; top_performing_course : ?Course; newest_course : ?Course; all_courses : [{ course : Course; student_count : Nat; rating : Float }] }, Text> {
    switch (await validateInstructor(token)) {
      case (#err(msg)) { #err(msg) };
      case (#ok(user)) {
        let instructorRecord = Array.find(lecturers, func(l : Lecturer) : Bool { l.user_id == user.user_id });
        switch (instructorRecord) {
          case null { #err("Instructor record not found") };
          case (?instructor) {
            let instructorCourses = Array.filter(courses, func(c : Course) : Bool { c.instructor_id == instructor.lecturer_id });
            let activeCourses = Array.filter(instructorCourses, func(c : Course) : Bool { c.course_status == "active" });

            // Calculate total students across all courses
            let totalStudents = Array.foldLeft(
              instructorCourses,
              0,
              func(acc : Nat, course : Course) : Nat {
                acc + course.student_count;
              },
            );

            // Calculate average rating
            let totalRating = Array.foldLeft(
              instructorCourses,
              0.0,
              func(acc : Float, course : Course) : Float {
                acc + course.rating;
              },
            );
            let natToInt = func(n : Nat) : Int { Int.abs(n) };
            let avgRating = if (Array.size(instructorCourses) > 0) totalRating / Float.fromInt(natToInt(Array.size(instructorCourses))) else 0.0;

            // Find top performing course (highest student count)
            let topCourse = Array.foldLeft(
              instructorCourses,
              null : ?Course,
              func(acc : ?Course, course : Course) : ?Course {
                switch (acc) {
                  case null { ?course };
                  case (?current) {
                    if (course.student_count > current.student_count) ?course else ?current;
                  };
                };
              },
            );

            // Find newest course
            let newestCourse = Array.foldLeft(
              instructorCourses,
              null : ?Course,
              func(acc : ?Course, course : Course) : ?Course {
                switch (acc) {
                  case null { ?course };
                  case (?current) { ?course }; // Simplified - would need created_at field
                };
              },
            );

            let coursesWithStats = Array.map(
              instructorCourses,
              func(c : Course) : {
                course : Course;
                student_count : Nat;
                rating : Float;
              } {
                {
                  course = c;
                  student_count = c.student_count;
                  rating = c.rating;
                };
              },
            );

            #ok({
              total_students = totalStudents;
              total_active_courses = Array.size(activeCourses);
              total_revenue = 0; // Would need revenue tracking
              average_rating = avgRating;
              top_performing_course = topCourse;
              newest_course = newestCourse;
              all_courses = coursesWithStats;
            });
          };
        };
      };
    };
  };

  // === ADMIN DASHBOARD ===
  public func getAdminDashboard(token : Text) : async Result.Result<{ student_count : Nat; instructor_count : Nat; course_count : Nat; revenue : Nat; role_distribution : { students : Nat; instructors : Nat; admins : Nat }; recent_events : { new_students : Nat; new_instructors : Nat; new_courses : Nat } }, Text> {
    switch (await validateAdmin(token)) {
      case (#err(msg)) { #err(msg) };
      case (#ok(user)) {
        let studentCount = Array.size(Array.filter(users, func(u : User) : Bool { u.role == "student" }));
        let instructorCount = Array.size(Array.filter(users, func(u : User) : Bool { u.role == "instructor" }));
        let adminCount = Array.size(Array.filter(users, func(u : User) : Bool { u.role == "admin" }));

        let currentTime = Time.now();
        let last24Hours = currentTime - 86400000000000; // 24 hours ago

        func createdWithinLast24Hours(u : User) : Bool {
          u.created > last24Hours;
        };

        let newStudents = Array.size(
          Array.filter(
            users,
            func(u : User) : Bool {
              u.role == "student" and createdWithinLast24Hours(u)
            },
          )
        );

        let newInstructors = Array.size(
          Array.filter(
            users,
            func(u : User) : Bool {
              u.role == "instructor" and createdWithinLast24Hours(u)
            },
          )
        );

        // Would need created_at field for courses
        let newCourses = 0;

        #ok({
          student_count = studentCount;
          instructor_count = instructorCount;
          course_count = Array.size(courses);
          revenue = 0; // Would need revenue tracking
          role_distribution = {
            students = studentCount;
            instructors = instructorCount;
            admins = adminCount;
          };
          recent_events = {
            new_students = newStudents;
            new_instructors = newInstructors;
            new_courses = newCourses;
          };
        });
      };
    };
  };

  // === UTILITY FUNCTIONS ===
  private func generateToken(userId : Text) : Text {
    userId # "_" # Int.toText(Time.now());
  };

  private func generateId(prefix : Text) : Text {
    prefix # "_" # Int.toText(Time.now());
  };

  // === EXISTING CRUD FUNCTIONS ===
  // User
  public func createUser(user : User) : async () {
    users := Array.append(users, [user]);
  };
  public func getUser(id : Text) : async ?User {
    Array.find(users, func(u : User) : Bool { u.user_id == id });
  };
  public func updateUser(user : User) : async () {
    users := Array.map(
      users,
      func(u : User) : User {
        if (u.user_id == user.user_id) user else u;
      },
    );
  };
  public func deleteUser(id : Text) : async () {
    users := Array.filter(users, func(u : User) : Bool { u.user_id != id });
  };

  // Student
  public func createStudent(s : Student) : async () {
    students := Array.append(students, [s]);
  };
  public func getStudent(id : Text) : async ?Student {
    Array.find(students, func(x : Student) : Bool { x.student_id == id });
  };
  public func updateStudent(s : Student) : async () {
    students := Array.map(
      students,
      func(x : Student) : Student {
        if (x.student_id == s.student_id) s else x;
      },
    );
  };
  public func deleteStudent(id : Text) : async () {
    students := Array.filter(students, func(x : Student) : Bool { x.student_id != id });
  };

  // Lecturer
  public func createLecturer(l : Lecturer) : async () {
    lecturers := Array.append(lecturers, [l]);
  };
  public func getLecturer(id : Text) : async ?Lecturer {
    Array.find(lecturers, func(x : Lecturer) : Bool { x.lecturer_id == id });
  };
  public func updateLecturer(l : Lecturer) : async () {
    lecturers := Array.map(
      lecturers,
      func(x : Lecturer) : Lecturer {
        if (x.lecturer_id == l.lecturer_id) l else x;
      },
    );
  };
  public func deleteLecturer(id : Text) : async () {
    lecturers := Array.filter(lecturers, func(x : Lecturer) : Bool { x.lecturer_id != id });
  };

  // Course
  public func createCourse(c : Course) : async () {
    courses := Array.append(courses, [c]);
  };
  public func getCourse(id : Text) : async ?Course {
    Array.find(courses, func(x : Course) : Bool { x.course_id == id });
  };
  public func updateCourse(c : Course) : async () {
    courses := Array.map(
      courses,
      func(x : Course) : Course {
        if (x.course_id == c.course_id) c else x;
      },
    );
  };
  public func deleteCourse(id : Text) : async () {
    courses := Array.filter(courses, func(x : Course) : Bool { x.course_id != id });
  };

  // Class
  public func createClass(c : Class) : async () {
    classes := Array.append(classes, [c]);
  };
  public func getClass(id : Text) : async ?Class {
    Array.find(classes, func(x : Class) : Bool { x.class_id == id });
  };
  public func updateClass(c : Class) : async () {
    classes := Array.map(
      classes,
      func(x : Class) : Class {
        if (x.class_id == c.class_id) c else x;
      },
    );
  };
  public func deleteClass(id : Text) : async () {
    classes := Array.filter(classes, func(x : Class) : Bool { x.class_id != id });
  };

  // Enrollment
  public func createEnrollment(e : Enrollment) : async () {
    enrollments := Array.append(enrollments, [e]);
  };
  public func getEnrollment(id : Text) : async ?Enrollment {
    Array.find(enrollments, func(x : Enrollment) : Bool { x.enrollment_id == id });
  };
  public func updateEnrollment(e : Enrollment) : async () {
    enrollments := Array.map(
      enrollments,
      func(x : Enrollment) : Enrollment {
        if (x.enrollment_id == e.enrollment_id) e else x;
      },
    );
  };
  public func deleteEnrollment(id : Text) : async () {
    enrollments := Array.filter(enrollments, func(x : Enrollment) : Bool { x.enrollment_id != id });
  };

  // Assignment
  public func createAssignment(a : Assignment) : async () {
    assignments := Array.append(assignments, [a]);
  };
  public func getAssignment(id : Text) : async ?Assignment {
    Array.find(assignments, func(x : Assignment) : Bool { x.assignment_id == id });
  };
  public func updateAssignment(a : Assignment) : async () {
    assignments := Array.map(
      assignments,
      func(x : Assignment) : Assignment {
        if (x.assignment_id == a.assignment_id) a else x;
      },
    );
  };
  public func deleteAssignment(id : Text) : async () {
    assignments := Array.filter(assignments, func(x : Assignment) : Bool { x.assignment_id != id });
  };

  // Certificate
  public func createCertificate(c : Certificate) : async () {
    certificates := Array.append(certificates, [c]);
  };
  public func getCertificate(id : Text) : async ?Certificate {
    Array.find(certificates, func(x : Certificate) : Bool { x.certificate_id == id });
  };
  public func updateCertificate(c : Certificate) : async () {
    certificates := Array.map(
      certificates,
      func(x : Certificate) : Certificate {
        if (x.certificate_id == c.certificate_id) c else x;
      },
    );
  };
  public func deleteCertificate(id : Text) : async () {
    certificates := Array.filter(certificates, func(x : Certificate) : Bool { x.certificate_id != id });
  };

  // Review
  public func createReview(r : Review) : async () {
    reviews := Array.append(reviews, [r]);
  };
  public func getReview(id : Text) : async ?Review {
    Array.find(reviews, func(x : Review) : Bool { x.review_id == id });
  };
  public func updateReview(r : Review) : async () {
    reviews := Array.map(
      reviews,
      func(x : Review) : Review {
        if (x.review_id == r.review_id) r else x;
      },
    );
  };
  public func deleteReview(id : Text) : async () {
    reviews := Array.filter(reviews, func(x : Review) : Bool { x.review_id != id });
  };

  // === ADDITIONAL FEATURES ===

  // === DISCUSSIONS ===
  public func getDiscussions(token : Text) : async Result.Result<[{ discussion : Discussion; course_name : Text; hours_ago : Nat }], Text> {
    switch (await validateStudent(token)) {
      case (#err(msg)) { #err(msg) };
      case (#ok(user)) {
        let studentRecord = Array.find(students, func(s : Student) : Bool { s.user_id == user.user_id });
        switch (studentRecord) {
          case null { #err("Student record not found") };
          case (?student) {
            let enrolledClasses = Array.map(
              Array.filter(enrollments, func(e : Enrollment) : Bool { e.student_id == student.student_id }),
              func(e : Enrollment) : Text { e.class_id },
            );

            let relevantDiscussions = Array.filter(
              discussions,
              func(d : Discussion) : Bool {
                Array.find(enrolledClasses, func(classId : Text) : Bool { classId == d.class_id }) != null;
              },
            );

            let discussionsWithCourse = Array.mapFilter(
              relevantDiscussions,
              func(d : Discussion) : ?{
                discussion : Discussion;
                course_name : Text;
                hours_ago : Nat;
              } {
                let classObj = Array.find(classes, func(cl : Class) : Bool { cl.class_id == d.class_id });
                switch (classObj) {
                  case null { null };
                  case (?cl) {
                    let course = Array.find(courses, func(c : Course) : Bool { c.course_id == cl.course_id });
                    switch (course) {
                      case null { null };
                      case (?c) {
                        let currentTime = Time.now();
                        let createdTime = d.created_at;
                        let hoursAgo = (currentTime - createdTime) / 3600000000000; // Convert to hours
                        let intToNat = func(x : Int) : Nat {
                          if (x < 0) 0 else Int.abs(x);
                        };
                        ?{
                          discussion = d;
                          course_name = c.course_name;
                          hours_ago = intToNat(hoursAgo);
                        };
                      };
                    };
                  };
                };
              },
            );

            #ok(discussionsWithCourse);
          };
        };
      };
    };
  };

  // === CLASSMATES ===
  public func getClassmates(token : Text) : async Result.Result<[{ course_name : Text; classmates : [{ name : Text; email : Text; profile_picture : Text }] }], Text> {
    switch (await validateStudent(token)) {
      case (#err(msg)) { #err(msg) };
      case (#ok(user)) {
        let studentRecord = Array.find(students, func(s : Student) : Bool { s.user_id == user.user_id });
        switch (studentRecord) {
          case null { #err("Student record not found") };
          case (?student) {
            let studentEnrollments = Array.filter(enrollments, func(e : Enrollment) : Bool { e.student_id == student.student_id });

            let classmatesByCourse = Array.mapFilter(
              studentEnrollments,
              func(enrollment : Enrollment) : ?{
                course_name : Text;
                classmates : [{
                  name : Text;
                  email : Text;
                  profile_picture : Text;
                }];
              } {
                let classObj = Array.find(classes, func(cl : Class) : Bool { cl.class_id == enrollment.class_id });
                switch (classObj) {
                  case null { null };
                  case (?cl) {
                    let course = Array.find(courses, func(c : Course) : Bool { c.course_id == cl.course_id });
                    switch (course) {
                      case null { null };
                      case (?c) {
                        let otherEnrollments = Array.filter(
                          enrollments,
                          func(e : Enrollment) : Bool {
                            e.class_id == enrollment.class_id and e.student_id != student.student_id
                          },
                        );

                        let classmates = Array.mapFilter(
                          otherEnrollments,
                          func(e : Enrollment) : ?{
                            name : Text;
                            email : Text;
                            profile_picture : Text;
                          } {
                            let classmateStudent = Array.find(students, func(s : Student) : Bool { s.student_id == e.student_id });
                            switch (classmateStudent) {
                              case null { null };
                              case (?cs) {
                                let classmateUser = Array.find(users, func(u : User) : Bool { u.user_id == cs.user_id });
                                switch (classmateUser) {
                                  case null { null };
                                  case (?cu) {
                                    ?{
                                      name = cu.first_name # " " # cu.last_name;
                                      email = cu.email;
                                      profile_picture = cu.profile_picture;
                                    };
                                  };
                                };
                              };
                            };
                          },
                        );

                        ?{
                          course_name = c.course_name;
                          classmates = classmates;
                        };
                      };
                    };
                  };
                };
              },
            );

            #ok(classmatesByCourse);
          };
        };
      };
    };
  };

  // === CERTIFICATES ===
  public func getStudentCertificates(token : Text) : async Result.Result<[{ course_title : Text; completion_date : Text; certificate_id : Text }], Text> {
    switch (await validateStudent(token)) {
      case (#err(msg)) { #err(msg) };
      case (#ok(user)) {
        let studentRecord = Array.find(students, func(s : Student) : Bool { s.user_id == user.user_id });
        switch (studentRecord) {
          case null { #err("Student record not found") };
          case (?student) {
            let studentCertificates = Array.filter(certificates, func(c : Certificate) : Bool { c.student_id == student.student_id });

            let certificatesWithCourse = Array.mapFilter(
              studentCertificates,
              func(cert : Certificate) : ?{
                course_title : Text;
                completion_date : Text;
                certificate_id : Text;
              } {
                let course = Array.find(courses, func(c : Course) : Bool { c.course_id == cert.course_id });
                switch (course) {
                  case null { null };
                  case (?c) {
                    ?{
                      course_title = c.course_name;
                      completion_date = Int.toText(cert.created_at);
                      certificate_id = cert.certificate_id;
                    };
                  };
                };
              },
            );

            #ok(certificatesWithCourse);
          };
        };
      };
    };
  };

  // === USER SETTINGS ===
  public func getUserSettings(token : Text) : async Result.Result<{ first_name : Text; last_name : Text; email : Text; bio : Text; profile_picture : Text }, Text> {
    switch (await validateToken(token)) {
      case (#err(msg)) { #err(msg) };
      case (#ok(user)) {
        #ok({
          first_name = user.first_name;
          last_name = user.last_name;
          email = user.email;
          bio = user.bio;
          profile_picture = user.profile_picture;
        });
      };
    };
  };

  public func updateUserSettings(
    token : Text,
    settings : {
      first_name : Text;
      last_name : Text;
      email : Text;
      bio : Text;
      profile_picture : Text;
    },
  ) : async Result.Result<Text, Text> {
    switch (await validateToken(token)) {
      case (#err(msg)) { #err(msg) };
      case (#ok(user)) {
        let updatedUser = {
          user_id = user.user_id;
          first_name = settings.first_name;
          last_name = settings.last_name;
          email = settings.email;
          bio = settings.bio;
          profile_picture = settings.profile_picture;
          role = user.role;
          status = user.status;
          created = user.created;
          updated = Time.now();
          last_login = user.last_login;
          edoo_token = user.edoo_token;
        };

        users := Array.map(
          users,
          func(u : User) : User {
            if (u.user_id == user.user_id) updatedUser else u;
          },
        );

        #ok("Settings updated successfully");
      };
    };
  };

  // === CREATE COURSE (INSTRUCTOR) ===
  public func createCourseWithMaterials(
    token : Text,
    courseData : {
      course_name : Text;
      course_description : Text;
      duration_days : Nat;
      language : Text;
      course_thumbnail : Text;
      materials : [{
        material_name : Text;
        material_type : Text;
        material_content : Text;
        material_description : Text;
      }];
    },
  ) : async Result.Result<Text, Text> {
    switch (await validateInstructor(token)) {
      case (#err(msg)) { #err(msg) };
      case (#ok(user)) {
        let instructorRecord = Array.find(lecturers, func(l : Lecturer) : Bool { l.user_id == user.user_id });
        switch (instructorRecord) {
          case null { #err("Instructor record not found") };
          case (?instructor) {
            let courseId = generateId("course");
            let course : Course = {
              course_id = courseId;
              course_name = courseData.course_name;
              course_description = courseData.course_description;
              course_status = "active";
              course_length = Nat.toText(courseData.duration_days);
              course_thumbnail = courseData.course_thumbnail;
              language = courseData.language;
              instructor_id = instructor.lecturer_id;
              duration_days = courseData.duration_days;
              rating = 0.0;
              student_count = 0;
            };

            courses := Array.append(courses, [course]);

            // Add materials
            var materialIndex = 0;
            for (materialData in courseData.materials.vals()) {
              let material : CourseMaterial = {
                material_id = generateId("material");
                course_id = courseId;
                material_name = materialData.material_name;
                material_type = materialData.material_type;
                material_content = materialData.material_content;
                material_description = materialData.material_description;
                order_index = materialIndex;
              };
              course_materials := Array.append(course_materials, [material]);
              materialIndex += 1;
            };

            #ok("Course created successfully");
          };
        };
      };
    };
  };

  // === QUIZ BUILDER ===
  public func createQuiz(
    token : Text,
    quizData : {
      course_id : Text;
      title : Text;
      questions : [{
        question_text : Text;
        question_type : Text;
        answers : Text;
        correct_answer : Text;
        points : Nat;
      }];
    },
  ) : async Result.Result<Text, Text> {
    switch (await validateInstructor(token)) {
      case (#err(msg)) { #err(msg) };
      case (#ok(user)) {
        let quizId = generateId("quiz");
        let quiz : Quiz = {
          quiz_id = quizId;
          course_id = quizData.course_id;
          title = quizData.title;
          created_at = Time.now();
        };

        quizzes := Array.append(quizzes, [quiz]);

        // Add questions
        for (questionData in quizData.questions.vals()) {
          let question : QuizQuestion = {
            question_id = generateId("question");
            quiz_id = quizId;
            question_text = questionData.question_text;
            question_type = questionData.question_type;
            answers = questionData.answers;
            correct_answer = questionData.correct_answer;
            points = questionData.points;
          };
          quiz_questions := Array.append(quiz_questions, [question]);
        };

        #ok("Quiz created successfully");
      };
    };
  };

  // === QUIZ CHECKER ===
  public func getCoursesWithQuizzes(token : Text) : async Result.Result<[{ course : Course; quiz_count : Nat }], Text> {
    switch (await validateInstructor(token)) {
      case (#err(msg)) { #err(msg) };
      case (#ok(user)) {
        let instructorRecord = Array.find(lecturers, func(l : Lecturer) : Bool { l.user_id == user.user_id });
        switch (instructorRecord) {
          case null { #err("Instructor record not found") };
          case (?instructor) {
            let instructorCourses = Array.filter(courses, func(c : Course) : Bool { c.instructor_id == instructor.lecturer_id });

            let coursesWithQuizzes = Array.map(
              instructorCourses,
              func(course : Course) : { course : Course; quiz_count : Nat } {
                let courseQuizzes = Array.filter(quizzes, func(q : Quiz) : Bool { q.course_id == course.course_id });
                { course = course; quiz_count = Array.size(courseQuizzes) };
              },
            );

            #ok(coursesWithQuizzes);
          };
        };
      };
    };
  };

  // === QUIZ CHECKER DETAIL ===
  public func getQuizSubmissions(token : Text, quizId : Text) : async Result.Result<[{ submission : QuizSubmission; student_name : Text; needs_grading : Bool }], Text> {
    switch (await validateInstructor(token)) {
      case (#err(msg)) { #err(msg) };
      case (#ok(user)) {
        let submissions = Array.filter(quiz_submissions, func(s : QuizSubmission) : Bool { s.quiz_id == quizId });

        let submissionsWithStudent = Array.mapFilter(
          submissions,
          func(sub : QuizSubmission) : ?{
            submission : QuizSubmission;
            student_name : Text;
            needs_grading : Bool;
          } {
            let student = Array.find(students, func(s : Student) : Bool { s.student_id == sub.student_id });
            switch (student) {
              case null { null };
              case (?s) {
                let studentUser = Array.find(users, func(u : User) : Bool { u.user_id == s.user_id });
                switch (studentUser) {
                  case null { null };
                  case (?u) {
                    ?{
                      submission = sub;
                      student_name = u.first_name # " " # u.last_name;
                      needs_grading = not sub.graded;
                    };
                  };
                };
              };
            };
          },
        );

        #ok(submissionsWithStudent);
      };
    };
  };

  // === STUDENT PAGE (INSTRUCTOR) ===
  public func getStudentsInCourses(token : Text) : async Result.Result<[{ student_name : Text; student_email : Text; profile_picture : Text; courses : Text; /* comma-separated course names */
  student_id : Text }], Text> {
    switch (await validateInstructor(token)) {
      case (#err(msg)) { #err(msg) };
      case (#ok(user)) {
        let instructorRecord = Array.find(lecturers, func(l : Lecturer) : Bool { l.user_id == user.user_id });
        switch (instructorRecord) {
          case null { #err("Instructor record not found") };
          case (?instructor) {
            let instructorCourses = Array.filter(courses, func(c : Course) : Bool { c.instructor_id == instructor.lecturer_id });
            let instructorCourseIds = Array.map(instructorCourses, func(c : Course) : Text { c.course_id });

            let relevantEnrollments = Array.filter(
              enrollments,
              func(e : Enrollment) : Bool {
                let classObj = Array.find(classes, func(cl : Class) : Bool { cl.class_id == e.class_id });
                switch (classObj) {
                  case null { false };
                  case (?cl) {
                    Array.find(instructorCourseIds, func(courseId : Text) : Bool { courseId == cl.course_id }) != null;
                  };
                };
              },
            );

            // Group enrollments by student
            let studentEnrollments = Array.foldLeft(
              relevantEnrollments,
              [],
              func(acc : [(Text, [Enrollment])], enrollment : Enrollment) : [(Text, [Enrollment])] {
                switch (Array.find(acc, func(item : (Text, [Enrollment])) : Bool { item.0 == enrollment.student_id })) {
                  case null {
                    Array.append(acc, [(enrollment.student_id, [enrollment])]);
                  };
                  case (?existing) {
                    // Array.map cannot be used to mutate accumulator, so we build a new array
                    var updatedAcc : [(Text, [Enrollment])] = [];
                    var found = false;
                    for (item in acc.vals()) {
                      if (item.0 == enrollment.student_id) {
                        updatedAcc := Array.append(updatedAcc, [(item.0, Array.append(item.1, [enrollment]))]);
                        found := true;
                      } else {
                        updatedAcc := Array.append(updatedAcc, [item]);
                      };
                    };
                    if (not found) {
                      updatedAcc := Array.append(updatedAcc, [(enrollment.student_id, [enrollment])]);
                    };
                    updatedAcc;
                  };
                };
              },
            );

            let studentsWithCourses = Array.mapFilter(
              studentEnrollments,
              func(item : (Text, [Enrollment])) : ?{
                student_name : Text;
                student_email : Text;
                profile_picture : Text;
                courses : Text;
                student_id : Text;
              } {
                let studentId = item.0;
                let studentEnrollments = item.1;

                let student = Array.find(students, func(s : Student) : Bool { s.student_id == studentId });
                switch (student) {
                  case null { null };
                  case (?s) {
                    let studentUser = Array.find(users, func(u : User) : Bool { u.user_id == s.user_id });
                    switch (studentUser) {
                      case null { null };
                      case (?u) {
                        let courseNames = Array.mapFilter(
                          studentEnrollments,
                          func(e : Enrollment) : ?Text {
                            let classObj = Array.find(classes, func(cl : Class) : Bool { cl.class_id == e.class_id });
                            switch (classObj) {
                              case null { null };
                              case (?cl) {
                                let course = Array.find(courses, func(c : Course) : Bool { c.course_id == cl.course_id });
                                switch (course) {
                                  case null { null };
                                  case (?c) { ?c.course_name };
                                };
                              };
                            };
                          },
                        );

                        let coursesText = Array.foldLeft(
                          courseNames,
                          "",
                          func(acc : Text, courseName : Text) : Text {
                            if (acc == "") courseName else acc # ", " # courseName;
                          },
                        );

                        ?{
                          student_name = u.first_name # " " # u.last_name;
                          student_email = u.email;
                          profile_picture = u.profile_picture;
                          courses = coursesText;
                          student_id = studentId;
                        };
                      };
                    };
                  };
                };
              },
            );

            #ok(studentsWithCourses);
          };
        };
      };
    };
  };

  // === USER MANAGEMENT (ADMIN) ===
  public func getUsersForManagement(token : Text, nameFilter : Text) : async Result.Result<[{ user_id : Text; name : Text; email : Text; role : Text; status : Text; profile_picture : Text }], Text> {
    switch (await validateAdmin(token)) {
      case (#err(msg)) { #err(msg) };
      case (#ok(user)) {
        let filteredUsers = if (nameFilter == "") {
          users;
        } else {
          Array.filter(
            users,
            func(u : User) : Bool {
              let fullName = u.first_name # " " # u.last_name;
              Text.contains(fullName, #text nameFilter);
            },
          );
        };

        let managementUsers = Array.map(
          filteredUsers,
          func(u : User) : {
            user_id : Text;
            name : Text;
            email : Text;
            role : Text;
            status : Text;
            profile_picture : Text;
          } {
            {
              user_id = u.user_id;
              name = u.first_name # " " # u.last_name;
              email = u.email;
              role = u.role;
              status = u.status;
              profile_picture = u.profile_picture;
            };
          },
        );

        #ok(managementUsers);
      };
    };
  };

  public func toggleUserStatus(token : Text, userId : Text) : async Result.Result<Text, Text> {
    switch (await validateAdmin(token)) {
      case (#err(msg)) { #err(msg) };
      case (#ok(user)) {
        switch (Array.find(users, func(u : User) : Bool { u.user_id == userId })) {
          case null { #err("User not found") };
          case (?targetUser) {
            let newStatus = if (targetUser.status == "active") "inactive" else "active";
            let updatedUser = {
              user_id = targetUser.user_id;
              first_name = targetUser.first_name;
              last_name = targetUser.last_name;
              email = targetUser.email;
              bio = targetUser.bio;
              profile_picture = targetUser.profile_picture;
              role = targetUser.role;
              status = newStatus;
              created = targetUser.created;
              updated = Time.now();
              last_login = targetUser.last_login;
              edoo_token = targetUser.edoo_token;
            };

            users := Array.map(
              users,
              func(u : User) : User {
                if (u.user_id == userId) updatedUser else u;
              },
            );

            #ok("User status updated to " # newStatus);
          };
        };
      };
    };
  };

  // === STUDENT REPORTING ===
  public func reportStudent(
    token : Text,
    reportData : {
      student_id : Text;
      course_id : Text;
      problem_description : Text;
    },
  ) : async Result.Result<Text, Text> {
    switch (await validateInstructor(token)) {
      case (#err(msg)) { #err(msg) };
      case (#ok(user)) {
        let instructorRecord = Array.find(lecturers, func(l : Lecturer) : Bool { l.user_id == user.user_id });
        switch (instructorRecord) {
          case null { #err("Instructor record not found") };
          case (?instructor) {
            let report : StudentReport = {
              report_id = generateId("report");
              student_id = reportData.student_id;
              instructor_id = instructor.lecturer_id;
              course_id = reportData.course_id;
              problem_description = reportData.problem_description;
              status = "pending";
              created_at = Time.now();
            };

            student_reports := Array.append(student_reports, [report]);
            #ok("Student report submitted successfully");
          };
        };
      };
    };
  };

  public func getStudentReports(token : Text) : async Result.Result<[{ report : StudentReport; student_name : Text; student_email : Text; profile_picture : Text; course_name : Text }], Text> {
    switch (await validateAdmin(token)) {
      case (#err(msg)) { #err(msg) };
      case (#ok(user)) {
        let reportsWithDetails = Array.mapFilter(
          student_reports,
          func(report : StudentReport) : ?{
            report : StudentReport;
            student_name : Text;
            student_email : Text;
            profile_picture : Text;
            course_name : Text;
          } {
            let student = Array.find(students, func(s : Student) : Bool { s.student_id == report.student_id });
            switch (student) {
              case null { null };
              case (?s) {
                let studentUser = Array.find(users, func(u : User) : Bool { u.user_id == s.user_id });
                let course = Array.find(courses, func(c : Course) : Bool { c.course_id == report.course_id });

                switch (studentUser, course) {
                  case (?u, ?c) {
                    ?{
                      report = report;
                      student_name = u.first_name # " " # u.last_name;
                      student_email = u.email;
                      profile_picture = u.profile_picture;
                      course_name = c.course_name;
                    };
                  };
                  case _ { null };
                };
              };
            };
          },
        );

        #ok(reportsWithDetails);
      };
    };
  };

  public func resolveStudentReport(token : Text, reportId : Text, action : Text) : async Result.Result<Text, Text> {
    switch (await validateAdmin(token)) {
      case (#err(msg)) { #err(msg) };
      case (#ok(user)) {
        switch (Array.find(student_reports, func(r : StudentReport) : Bool { r.report_id == reportId })) {
          case null { #err("Report not found") };
          case (?report) {
            let newStatus = if (action == "reject") "rejected" else "resolved";

            let updatedReport = {
              report_id = report.report_id;
              student_id = report.student_id;
              instructor_id = report.instructor_id;
              course_id = report.course_id;
              problem_description = report.problem_description;
              status = newStatus;
              created_at = report.created_at;
            };

            student_reports := Array.map(
              student_reports,
              func(r : StudentReport) : StudentReport {
                if (r.report_id == reportId) updatedReport else r;
              },
            );

            // If action is to inactivate student account
            if (action == "inactivate") {
              let student = Array.find(students, func(s : Student) : Bool { s.student_id == report.student_id });
              switch (student) {
                case (?s) {
                  let studentUser = Array.find(users, func(u : User) : Bool { u.user_id == s.user_id });
                  switch (studentUser) {
                    case (?u) {
                      let updatedUser = {
                        user_id = u.user_id;
                        first_name = u.first_name;
                        last_name = u.last_name;
                        email = u.email;
                        bio = u.bio;
                        profile_picture = u.profile_picture;
                        role = u.role;
                        status = "inactive";
                        created = u.created;
                        updated = Time.now();
                        last_login = u.last_login;
                        edoo_token = u.edoo_token;
                      };

                      users := Array.map(
                        users,
                        func(user : User) : User {
                          if (user.user_id == u.user_id) updatedUser else user;
                        },
                      );
                    };
                    case _ {};
                  };
                };
                case _ {};
              };
            };

            #ok("Report " # newStatus # " successfully");
          };
        };
      };
    };
  };

  // === CURRENCY ===
  public func addCurrency(userId : Text, amount : Nat) : async Bool {
    var updated = false;
    users := Array.map<User, User>(
      users,
      func(u : User) : User {
        if (u.user_id == userId) {
          updated := true;
          return {
            user_id = u.user_id;
            first_name = u.first_name;
            last_name = u.last_name;
            email = u.email;
            bio = u.bio;
            profile_picture = u.profile_picture;
            role = u.role;
            status = u.status;
            created = u.created;
            updated = u.updated;
            last_login = u.last_login;
            edoo_token = u.edoo_token + amount;
          };
        } else {
          return u;
        };
      },
    );
    return updated;
  };

  public func subtractCurrency(userId : Text, amount : Nat) : async Bool {
    var updated = false;
    users := Array.map<User, User>(
      users,
      func(u : User) : User {
        if (u.user_id == userId) {
          if (u.edoo_token >= amount) {
            updated := true;
            return {
              user_id = u.user_id;
              first_name = u.first_name;
              last_name = u.last_name;
              email = u.email;
              bio = u.bio;
              profile_picture = u.profile_picture;
              role = u.role;
              status = u.status;
              created = u.created;
              updated = u.updated;
              last_login = u.last_login;
              edoo_token = u.edoo_token - amount;
            };
          };
        };
        return u;
      },
    );
    return updated;
  };

  // === LOGOUT ===
  public func logout(token : Text) : async Result.Result<Text, Text> {
    auth_tokens := Array.filter(auth_tokens, func(t : AuthToken) : Bool { t.token != token });
    #ok("Logged out successfully");
  };
};
