
'use strict';

/**
 * @ngdoc function
 * @name wrnApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wrnApp
 */

app.controller('MainCtrl', ['Data','Stats', function (Data, Stats) {
  
  var ctrl = this;

  Data.loadEntries(function(days){
    ctrl.days = days;
  });

}]);