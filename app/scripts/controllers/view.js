// ViewCtrl for the navigation bar and routing
app.controller("ViewCtrl", ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
  $scope.$on("$routeChangeStart", function(event, next, current) {
    if (next.$$route){
      $scope.navigationClass = next.$$route.navigationClass;
    };
    if (!$rootScope.currentUser && next.$$route && next.$$route.originalPath !== '/register'){
      $location.path('/login');
    };
  });
}]);
