app.service("homeService", function ($http) {
  this.getClassGroups = function () {
    return $http.get("http://localhost:8080/api/classGroup");
  };

  this.createClassGroup = function (classGroup) {
    return $http.post("http://localhost:8080/api/classGroup", classGroup);
  };

  this.getClassGroupDetails = function (classGroupId) {
    return $http.get("http://localhost:8080/api/classGroup/" + classGroupId);
  };

  this.updateClassGroup = function (classGroupId, updatedClassGroup) {
    return $http.put(
      "http://localhost:8080/api/classGroup/" + classGroupId,
      updatedClassGroup
    );
  };

  this.deleteClassGroup = function (classGroupId) {
    return $http({
      method: "DELETE",
      url: "http://localhost:8080/api/classGroup",
      params: { id: classGroupId },
    });
  };
});
