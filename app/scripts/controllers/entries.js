
'use strict';

/**
 * @ngdoc function
 * @name wrnApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wrnApp
 */

app.controller('EntriesCtrl', ['$location', 'Data', 'Stats', function($location, Data, Stats) {
  
  var ctrl = this;

  ctrl.days = [];

  ctrl.gotoEntry = gotoEntry;

  function _initialize(){

  }

  function gotoEntry(id){
    $location.path('/entries/' + id);
  };

  Data.loadEntries(function(days){
    ctrl.days = days;
  });

}]);