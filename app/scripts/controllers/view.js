// ViewCtrl for the navigation bar and routing
app.controller("ViewCtrl", ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
  $scope.$on("$routeChangeSuccess", function(event, current, previous) {
    if (current.$$route){
      $scope.navigationClass = current.$$route.navigationClass;
    };
    if (!$rootScope.currentUser && current.$$route && current.$$route.originalPath !== '/register'){
      $location.path('/login');
    };
  });
}]);
