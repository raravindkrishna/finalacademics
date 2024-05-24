app.controller("FacultyController", function ($scope, facultyService) {
  $scope.selectedAction = "";

  $scope.fetchFaculties = function () {
    facultyService
      .fetchFaculties()
      .then(function (response) {
        if(response.status===200){
        $scope.faculties = response.data;
        }
        else {
            console.error("Error fetching Faculties:", response);
          }
      })
      .catch(function (error) {
        console.error("Error fetching faculties:", error);
      });
  };
  $scope.fetchFaculties();

  $scope.toggleSelectAll = function () {
    angular.forEach($scope.faculties, function (faculty) {
      faculty.selected = $scope.selectAll;
    });
  };

  $scope.closeFacultyRemoveModal = function () {
    $scope.FacultyRemoveModal = false;
  };

  $scope.deleteSelectedFaculties = function () {
    var selectedFacultyIds = [];
    angular.forEach($scope.faculties, function (faculty) {
      if (faculty.selected) {
        selectedFacultyIds.push(faculty.id);
      }
    });
    if (selectedFacultyIds.length === 0) {
      alert("Please select at least one faculty to delete.");
      return;
    }

    $scope.FacultyRemoveModal = true;
    $scope.selectedFacultyIds = selectedFacultyIds;
  };

  $scope.deleteFacultyConfirm = function () {
    var selectedFacultyIds = $scope.selectedFacultyIds;

    facultyService
      .deleteFaculties(selectedFacultyIds)
      .then(function (response) {
        if(response.status===200){
        $scope.fetchFaculties();
        $scope.closeFacultyRemoveModal();
        $scope.selectAll = false;
        }
        else {
            console.error("Error deleting faculties:", response);
          }
      })
      .catch(function (error) {
        alert("Cannot delete faculties mapped with classGroups");
        console.error("Error deleting faculties:", error);
      });
  };
  $scope.editFaculty = function () {
    var selectedFaculties = $scope.faculties.filter(function (faculty) {
      return faculty.selected;
    });
    if (selectedFaculties.length !== 1) {
      alert("Please select exactly one faculty to edit.");
      return;
    }
    $scope.editedFaculty = angular.copy(selectedFaculties[0]);
    $scope.showFacultyEditModal = true;
  };

  $scope.updateFaculty = function () {
    facultyService
      .updateFaculty($scope.editedFaculty.id, $scope.editedFaculty)
      .then(function (response) {
        if(response.status===200){
        $scope.fetchFaculties();

        $scope.closeFacultyEditModal();
        }
        else {
            console.error("Error updating Faculty:", response);
          }
        
      })
      .catch(function (error) {
        console.error("Error updating faculty:", error);
      });
  };

  $scope.closeFacultyEditModal = function () {
    $scope.showFacultyEditModal = false;
    $scope.editedFaculty = null;
  };

  $scope.createFaculty = function () {
    $scope.newFaculty = {};
    $scope.showFacultyCreateModal = true;
  };

  $scope.addFaculty = function () {
    facultyService
      .createFaculty($scope.newFaculty)
      .then(function (response) {
        if(response.status===201){
        $scope.fetchFaculties();
        }
        else {
            console.error("Error adding Faculty:", response);
          }
      })
      .catch(function (error) {
        console.error("Error creating faculty:", error);
      });
  };

  $scope.closeFacultyCreateModal = function () {
    $scope.showFacultyCreateModal = false;
    $scope.newFaculty = null;
  };
});
