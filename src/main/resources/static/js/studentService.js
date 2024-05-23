app.service("studentService", function ($http) {
  this.fetchStudents = function () {
    return $http.get("http://localhost:8080/api/student");
  };

  this.deleteStudents = function (ids) {
    return $http({
      method: "DELETE",
      url: "http://localhost:8080/api/student",
      params: { id: ids },
    });
  };

  this.updateStudent = function (id, student) {
    return $http.put("http://localhost:8080/api/student/" + id, student);
  };

  this.createStudent = function (student) {
    return $http.post("http://localhost:8080/api/student", student);
  };
});
