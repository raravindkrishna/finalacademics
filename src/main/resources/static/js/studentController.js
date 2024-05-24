app.controller("StudentController", function ($scope, studentService) {
  $scope.selectedAction = "";

  $scope.fetchStudents = function () {
    studentService
      .fetchStudents()
      .then(function (response) {
        if(response.status===200){
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

  $scope.toggleSelectAll = function () {
    angular.forEach($scope.students, function (student) {
      student.selected = $scope.selectAll;
    });
  };

  $scope.closeStudentRemoveModal = function () {
    $scope.StudentRemoveModal = false;
  };

  $scope.deleteSelectedStudents = function () {
    var selectedStudentIds = [];
    angular.forEach($scope.students, function (student) {
      if (student.selected) {
        selectedStudentIds.push(student.id);
      }
    });
    if (selectedStudentIds.length === 0) {
      alert("Please select at least one student to delete.");
      return;
    }

    $scope.StudentRemoveModal = true;
    $scope.selectedStudentIds = selectedStudentIds;
  };

  $scope.deleteStudentConfirm = function () {
    var selectedStudentIds = $scope.selectedStudentIds;
    studentService
      .deleteStudents(selectedStudentIds)
      .then(function (response) {
        if(response.status===200){
        $scope.fetchStudents();
        $scope.closeStudentRemoveModal();
        $scope.selectAll = false;
        }
        else {
            console.error("Error deleting students:", response);
          }
      })
      .catch(function (error) {
        alert("Cannot delete students mapped with classGroup Students");
        console.error("Error deleting students:", error);
      });
  };

  $scope.editStudent = function () {
    var selectedStudents = $scope.students.filter(function (student) {
      return student.selected;
    });
    if (selectedStudents.length !== 1) {
      alert("Please select exactly one student to edit.");
      return;
    }
    $scope.editedStudent = angular.copy(selectedStudents[0]);
    $scope.showStudentEditModal = true;
  };

  $scope.updateStudent = function () {
    studentService
      .updateStudent($scope.editedStudent.id, $scope.editedStudent)
      .then(function (response) {
        if(response.status===200){
        $scope.fetchStudents();

        $scope.closeStudentEditModal();
        }
        else {
            console.error("Error updating Students:", response);
          }
      })
      .catch(function (error) {
        console.error("Error updating student:", error);
      });
  };

  $scope.closeStudentEditModal = function () {
    $scope.showStudentEditModal = false;
    $scope.editedStudent = null;
  };

  $scope.createStudent = function () {
    $scope.newStudent = {};
    $scope.showStudentCreateModal = true;
  };

  $scope.addStudent = function () {
    studentService
      .createStudent($scope.newStudent)
      .then(function (response) {
        if(response.status===201){
        $scope.fetchStudents();
        }
        else {
            console.error("Error creating Student:", response);
          }
      })
      .catch(function (error) {
        console.error("Error creating student:", error);
      });
  };

  $scope.closeStudentCreateModal = function () {
    $scope.showStudentCreateModal = false;
    $scope.newStudent = null;
  };
});
