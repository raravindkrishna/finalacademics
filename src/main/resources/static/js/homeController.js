app.controller(
  "HomeController",
  function (
    $scope,

    $location,
    homeService,
    facultyService,
    courseService
  ) {
    $scope.getClassGroups = function () {
      homeService
        .getClassGroups()
        .then(function (response) {
          $scope.classGroups = response.data;
        })
        .catch(function (error) {
          console.error("Error fetching class groups:", error);
        });
      let theClassGroupId;
      $scope.selectClassGroup = function (classGroupId) {
        this.classGroupId = theClassGroupId;
        $location.path("/classGroup/" + classGroupId + "/students");
      };
      console.log(theClassGroupId);

      $scope.addCg = function () {
        $scope.showCgCreateModal = true;
        $scope.newClassGroup = {};
        $scope.fetchCourses = function () {
          courseService
            .fetchCourses()
            .then(function (response) {
              $scope.courses = response.data;
            })
            .catch(function (error) {
              console.error("Error fetching courses:", error);
            });
        };
        $scope.fetchCourses();

        $scope.fetchFaculties = function () {
          facultyService
            .fetchFaculties()
            .then(function (response) {
              $scope.faculties = response.data;
            })
            .catch(function (error) {
              console.error("Error fetching faculties:", error);
            });
        };
        $scope.fetchFaculties();
      };

      $scope.addClassGroup = function () {
        homeService
          .createClassGroup($scope.newClassGroup)
          .then(function (response) {
            $scope.getClassGroups();
          })
          .catch(function (error) {
            console.error("Error creating faculty:", error);
          });
      };

      $scope.closeCgCreateModal = function () {
        $scope.showCgCreateModal = false;
      };
    };

    $scope.getClassGroups();
  }
);
