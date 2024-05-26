app.controller(
  "ClassGroupStudentController",
  function (
    $scope,
    $location,
    $routeParams,
    classGroupStudentService,
    homeService,
    facultyService,
    studentService
  ) {
    let classGroupId = $routeParams.classGroupId;

    $scope.getStudents = function () {
      $scope.showadd = function () {
        alert("Student already in the class");
      };
      classGroupStudentService
        .getStudents(classGroupId)
        .then(function (response) {
          if (response.status === 200) {
            $scope.joinStudents = response.data;
          }
          else {
            console.error("Error fetching Students:", response);
          }
        })
        .catch(function (error) {
          console.error("Error fetching students:", error);
        });
    };
    $scope.getStudents();

    $scope.search = '';

    $scope.handleSearchChange = function (search) {
      $scope.search = search;
    };

    $scope.getClassgrpDetails = function () {
      homeService
        .getClassGroupDetails(classGroupId)
        .then(function (response) {
          if (response.status === 200) {
            $scope.classGroup = response.data;
          }
          else {
            console.error("Error fetching ClassGroup Details:", response);
          }
        })

        .catch(function (error) {
          console.error("Error fetching classGroup details:", error);
        });
    };
    $scope.getClassgrpDetails();

    $scope.changeFaculty = function () {
      $scope.showFacEditModal = true;
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

    $scope.updateFac = function () {
      classGroupStudentService
        .updateFaculty(classGroupId, $scope.selectedFaculty.id)
        .then(function (response) {

          if (response.status === 200) {
            $scope.getClassgrpDetails();

            $scope.closeFacEditModal();
          }
          else {
            console.error("Error updating faculty:", response);
          }
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
      homeService
        .updateClassGroup(classGroupId, $scope.editedCg)
        .then(function (response) {
          if (response.status === 200) {
            $scope.getClassgrpDetails();

            $scope.closeCgEditModal();
          }
          else {
            console.error("Error updating Classgroup:", response);
          }
        })
        .catch(function (error) {
          console.error("Error updating classgroup:", error);
        });
    };

    $scope.closeStudentCreateModal = function () {
      $scope.addStudentCreateModal = false;
    };

    $scope.showStudentCreateModal = function () {
      $scope.addStudentCreateModal = true;
      $scope.fetchStudents = function () {
        studentService
          .fetchStudents()
          .then(function (response) {
            if (response.status === 200) {
              $scope.students = response.data;
            }
            else {
              console.error("Error fetching Students:", response);
            }
          })
          .catch(function (error) {
            console.error("Error fetching students:", error);
          });
      };
      $scope.fetchStudents();
    };


    $scope.addStudent = function () {
      classGroupStudentService
        .addStudent(classGroupId, $scope.selectedStudent.id)
        .then(function (response) {
          if (response.status === 201) {
            $scope.showadd = false;
            $scope.getStudents();
          }
          else if (response.status === 209) {
            $scope.showadd();
          }
          else {
            console.error("Error deleting Courses:", response);
          }
        })
        .catch(function (error) {
          console.error("Error adding student", error);
        });
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
      homeService
        .deleteClassGroup(classGroupId)
        .then(function (response) {
          if (response.status === 200) {
            $location.path("/home");
          }
          else {
            console.error("Error fetching Courses:", response);
          }
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

      classGroupStudentService
        .removeStudents(classGroupId, selectedjoinStudentIds)
        .then(function (response) {
          if (response.status === 200) {
            $scope.getStudents();
            $scope.selectAll = false;
            $scope.closeStudentRemoveModal();
          }
          else {
            console.error("Error removing students:", response);
          }
        })
        .catch(function (error) {
          console.error("Error deleting Students:", error);
        });
    };
  }
);
