
'use strict';

/**
 * @ngdoc function
 * @name wrnApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wrnApp
 */

app.controller('StatsCtrl', ['Data','Stats','$scope', function (Data, Stats, $scope) {
  
  var ctrl = this;

  Data.loadEntries(function(days){
    ctrl.dt = Stats.getStats(days);
    console.log(ctrl.dt);
  });


}]);