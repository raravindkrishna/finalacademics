app.controller(
  "ClassGroupStudentController",
  function ($scope, $http, $window, $location, $routeParams) {
    let classGroupId = $routeParams.classGroupId;

    $scope.getStudents = function () {
      $http
        .get(
          "http://localhost:8080/api/classGroup/" + classGroupId + "/students"
        )
        .then(function (response) {
          $scope.joinStudents = response.data;
        })
        .catch(function (error) {
          console.error("Error fetching students:", error);
        });
    };
    $scope.getStudents();

    $scope.getClassgrpDetails = function () {
      $http
        .get("http://localhost:8080/api/classGroup/" + classGroupId)
        .then(function (response) {
          $scope.classGroup = response.data;
        })
        .catch(function (error) {
          console.error("Error fetching classGroup details:", error);
        });
    };
    $scope.getClassgrpDetails();

    $scope.changeFaculty = function () {
      $scope.showFacEditModal = true;
      $scope.fetchFaculties = function () {
        $http
          .get("http://localhost:8080/api/faculty")
          .then(function (response) {
            $scope.faculties = response.data;
          })
          .catch(function (error) {
            console.error("Error fetching faculties:", error);
          });
      };
      $scope.fetchFaculties();
    };

    $scope.updateFac = function () {
      $http
        .put(
          "http://localhost:8080/api/classGroup/" +
            classGroupId +
            "/faculty/" +
            $scope.selectedFaculty.id
        )
        .then(function (response) {
          $scope.getClassgrpDetails();

          $scope.closeFacEditModal();
        })
        .catch(function (error) {
          console.error("Error updating faculty:", error);
        });
    };

    $scope.closeFacEditModal = function () {
      $scope.showFacEditModal = false;
    };

    $scope.changeCgName = function () {
      $scope.showCgEditModal = true;
    };

    $scope.closeCgEditModal = function () {
      $scope.showCgEditModal = false;
    };

    $scope.updateCg = function () {
      console.log($scope.editedCg);
      $http
        .put(
          "http://localhost:8080/api/classGroup/" + classGroupId,
          $scope.editedCg
        )
        .then(function (response) {
          $scope.getClassgrpDetails();

          $scope.closeCgEditModal();
        })
        .catch(function (error) {
          console.error("Error updating faculty:", error);
        });
    };

    $scope.closeStudentCreateModal = function () {
      $scope.addStudentCreateModal = false;
    };

    $scope.showStudentCreateModal = function () {
      $scope.addStudentCreateModal = true;
      $scope.fetchStudents = function () {
        $http
          .get("http://localhost:8080/api/student")
          .then(function (response) {
            $scope.students = response.data;
          })
          .catch(function (error) {
            console.error("Error fetching students:", error);
          });
      };
      $scope.fetchStudents();
    };

    $scope.addStudent = function () {
      $http
        .post(
          "http://localhost:8080/api/classGroup/" +
            classGroupId +
            "/students/" +
            $scope.selectedStudent.id
        )
        .then(function (response) {
          if (response.data.id === null) {
            $scope.showadd();
          } else {
            $scope.showadd = false;
            $scope.getStudents();
          }
        })
        .catch(function (error) {
          console.error("Error adding student", error);
        });
    };

    // delte students
    $scope.showadd = function () {
      alert("Student already in the class");
    };
    $scope.toggleSelectAll = function () {
      angular.forEach($scope.joinStudents, function (joinStudent) {
        joinStudent.selected = $scope.selectAll;
      });
    };

    $scope.closeCgRemoveModal = function () {
      $scope.CgRemoveModal = false;
    };

    $scope.deleteCgConfirm = function () {
      $http({
        method: "DELETE",
        url: "http://localhost:8080/api/classGroup",
        params: { id: classGroupId },
      })
        .then(function (response) {
          $location.path("/home");
        })
        .catch(function (error) {
          alert("Cannot delete classGroup mapped with classGroup Students");
          console.error("Error deleting courses:", error);
        });
    };

    $scope.deleteCg = function () {
      $scope.CgRemoveModal = true;
    };

    $scope.closeStudentRemoveModal = function () {
      $scope.StudentRemoveModal = false;
    };

    $scope.deleteSelectedStudents = function () {
      var selectedjoinStudentIds = [];
      angular.forEach($scope.joinStudents, function (joinStudent) {
        if (joinStudent.selected) {
          selectedjoinStudentIds.push(joinStudent.id);
        }
      });
      if (selectedjoinStudentIds.length === 0) {
        alert("Please select at least one student to delete.");
        return;
      }

      $scope.StudentRemoveModal = true;
      $scope.selectedStudentIds = selectedjoinStudentIds;
    };

    $scope.deleteConfirm = function () {
      var selectedjoinStudentIds = $scope.selectedStudentIds;

      $http({
        method: "DELETE",
        url:
          "http://localhost:8080/api/classGroup/" + classGroupId + "/students",
        params: { id: selectedjoinStudentIds },
      })
        .then(function (response) {
          $scope.getStudents();
          $scope.selectAll = false;
          $scope.closeStudentRemoveModal();
        })
        .catch(function (error) {
          console.error("Error deleting Students:", error);
        });
    };
  }
);
