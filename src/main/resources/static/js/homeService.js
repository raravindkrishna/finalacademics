app.service("homeService", function ($http) {
  this.getClassGroups = function () {
    return $http.get("http://localhost:8080/api/classGroup");
  };

  this.createClassGroup = function (classGroup) {
    return $http.post("http://localhost:8080/api/classGroup", classGroup);
  };
});
