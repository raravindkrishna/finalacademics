app.service("facultyService", function ($http) {
  this.fetchFaculties = function () {
    return $http.get("http://localhost:8080/api/faculty");
  };

  this.deleteFaculties = function (ids) {
    return $http({
      method: "DELETE",
      url: "http://localhost:8080/api/faculty",
      params: { id: ids },
    });
  };

  this.updateFaculty = function (id, faculty) {
    return $http.put("http://localhost:8080/api/faculty/" + id, faculty);
  };

  this.createFaculty = function (faculty) {
    return $http.post("http://localhost:8080/api/faculty", faculty);
  };
});
