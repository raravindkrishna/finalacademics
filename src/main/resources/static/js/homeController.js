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
          if (response.status === 200) {
            $scope.classGroups = response.data;
          } else {
            console.error("Error fetching ClassGroups:", response);
          }
        })
        .catch(function (error) {
          console.error("Error fetching class groups:", error);
        });
      let theClassGroupId;
      $scope.selectClassGroup = function (classGroupId) {
        this.classGroupId = theClassGroupId;
        $location.path("/classGroup/" + classGroupId + "/students");
      };

      $scope.search = '';

      $scope.handleSearchChange = function (search) {
        $scope.search = search;
      };

      $scope.addCg = function () {
        $scope.showCgCreateModal = true;
        $scope.newClassGroup = {};
        $scope.fetchCourses = function () {
          courseService
            .fetchCourses()
            .then(function (response) {
              if (response.status === 200) {
                $scope.courses = response.data;
              }
              else {
                console.error("Error fetching courses:", response);
              }
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
              if (response.status === 200) {
                $scope.faculties = response.data;
              }
              else {
                console.error("Error fetching faculties:", response);
              }
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
            if (response.status === 201) {
              $scope.getClassGroups();
            } else {
              console.error("Error Creating ClassGroup:", error);
            }
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
