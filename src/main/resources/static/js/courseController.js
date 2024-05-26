app.controller("CourseController", function ($scope, courseService) {
  $scope.fetchCourses = function () {
    courseService
      .fetchCourses()
      .then(function (response) {
        if (response.status === 200) {
          $scope.courses = response.data;
        }
        else {
          console.error("Error fetching Courses:", response);
        }
      })
      .catch(function (error) {
        console.error("Error fetching courses:", error);
      });
  };
  $scope.fetchCourses();


  $scope.search = '';

  $scope.updateSearchTerm = function (search) {
    $scope.searchTerm = search;
  };

  $scope.toggleSelectAll = function () {
    angular.forEach($scope.courses, function (course) {
      course.selected = $scope.selectAll;
    });
  };

  $scope.closeCourseRemoveModal = function () {
    $scope.CourseRemoveModal = false;
  };

  $scope.deleteSelectedCourses = function () {
    var selectedCourseIds = [];
    angular.forEach($scope.courses, function (course) {
      if (course.selected) {
        selectedCourseIds.push(course.id);
      }
    });
    if (selectedCourseIds.length === 0) {
      alert("Please select at least one course to delete.");
      return;
    }

    $scope.CourseRemoveModal = true;
    $scope.selectedCourseIds = selectedCourseIds;
  };

  $scope.deleteCourseConfirm = function () {
    var selectedCourseIds = $scope.selectedCourseIds;

    courseService
      .deleteCourses(selectedCourseIds)
      .then(function (response) {
        if (response.status === 200) {
          $scope.fetchCourses();
          $scope.closeCourseRemoveModal();
          $scope.selectAll = false;
        }
        else {
          console.error("Error deleting Courses:", response);
        }
      })
      .catch(function (error) {
        alert("Cannot delete courses mapped with classGroups");
        console.error("Error deleting courses:", error);
      });
  };

  $scope.editCourse = function () {
    var selectedCourses = $scope.courses.filter(function (course) {
      return course.selected;
    });
    if (selectedCourses.length !== 1) {
      alert("Please select exactly one course to edit.");
      return;
    }
    $scope.editedCourse = angular.copy(selectedCourses[0]);
    $scope.showCourseEditModal = true;
  };

  $scope.updateCourse = function () {
    if (!$scope.editedCourse.description) {
      $scope.editedCourse.description = "-";
    }

    courseService
      .updateCourse($scope.editedCourse.id, $scope.editedCourse)
      .then(function (response) {
        if (response.status === 200) {
          $scope.fetchCourses();
          $scope.closeCourseEditModal();
        }
        else {
          console.error("Error updating courses:", response);
        }
      })
      .catch(function (error) {
        console.error("Error updating course:", error);
      });
  };

  $scope.closeCourseEditModal = function () {
    $scope.showCourseEditModal = false;
    $scope.editedCourse = null;
  };

  $scope.createCourse = function () {
    $scope.newCourse = {};
    $scope.showCourseCreateModal = true;
  };

  $scope.addCourse = function () {
    if (!$scope.newCourse.description) {
      $scope.newCourse.description = "-";
    }

    courseService
      .createCourse($scope.newCourse)
      .then(function (response) {
        if (response.status === 201) {
          $scope.fetchCourses();
        }
        else {
          console.error("Error adding courses:", response);
        }
      })
      .catch(function (error) {
        console.error("Error creating course:", error);
      });
  };

  $scope.closeCourseCreateModal = function () {
    $scope.showCourseCreateModal = false;
    $scope.newCourse = null;
  };
});
