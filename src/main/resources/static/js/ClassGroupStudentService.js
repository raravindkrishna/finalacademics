app.service("classGroupStudentService", function ($http) {
  this.getStudents = function (classGroupId) {
    return $http.get(
      "http://localhost:8080/api/classGroup/" + classGroupId + "/students"
    );
  };

  this.addStudent = function (classGroupId, studentId) {
    return $http.post(
      "http://localhost:8080/api/classGroup/" +
        classGroupId +
        "/students/" +
        studentId
    );
  };

  this.removeStudents = function (classGroupId, studentIds) {
    return $http({
      method: "DELETE",
      url: "http://localhost:8080/api/classGroup/" + classGroupId + "/students",
      params: { id: studentIds },
    });
  };

  this.updateFaculty = function (classGroupId, facultyId) {
    return $http.put(
      "http://localhost:8080/api/classGroup/" +
        classGroupId +
        "/faculty/" +
        facultyId
    );
  };
});
