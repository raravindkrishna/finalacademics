

app.component('searchBarComponent', {
  bindings: {
    onSearchChange: '&'
  },
  template: `
    <span class="search-bar searchcrctn">
      <i class="fa-solid fa-magnifying-glass fa-lg searchi"></i>
      <input placeholder="Search" type="text" ng-model="$ctrl.searchInput" ng-change="$ctrl.handleSearchChange()" class="search-input" />
    </span>
  `,
  controller: function () {
    var ctrl = this;
    ctrl.searchInput = '';

    ctrl.handleSearchChange = function () {
      ctrl.onSearchChange({ search: ctrl.searchInput });
    };
  }
});

