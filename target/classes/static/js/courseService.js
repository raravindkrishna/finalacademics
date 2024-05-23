app.service("courseService", function ($http) {
  this.fetchCourses = function () {
    return $http.get("http://localhost:8080/api/course");
  };

  this.deleteCourses = function (ids) {
    return $http({
      method: "DELETE",
      url: "http://localhost:8080/api/course",
      params: { id: ids },
    });
  };

  this.updateCourse = function (id, course) {
    return $http.put("http://localhost:8080/api/course/" + id, course);
  };

  this.createCourse = function (course) {
    return $http.post("http://localhost:8080/api/course", course);
  };
});
