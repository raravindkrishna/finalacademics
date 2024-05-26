var app = angular.module('myApp', []);

app.component('searchBarTwoComponent', {
    bindings: {
        searchModel: '='
    },
    template: `
    <span class="search-bar searchcrctn">
      <i class="fa-solid fa-magnifying-glass fa-lg searchi"></i>
      <input placeholder="Search" type="text" ng-model="$ctrl.searchModel" class="search-input" />
    </span>
  `
});
