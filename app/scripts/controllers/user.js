'use strict';

/**
 * @ngdoc function
 * @name wrnApp.controller:MainCtrl
 * @description
 * # UserCtrl
 * Controller of the wrnApp
 */

app.controller('UserCtrl', ['UserService', 'SessionService', 'Data', 'Stats', '$location', '$rootScope', function (UserService, SessionService, Data, Stats, $location, $rootScope) {
  
  var ctrl = this;
  
  $rootScope.currentUser = Data.loadUser();

  var success = function(rsp){
    Data.setUser(rsp);
    $rootScope.currentUser = rsp;
    $location.path('/entries');
  };

  var error = function(rsp){
    console.log('Error' + JSON.stringify(rsp));
  };
  
  ctrl.logout = function(){
    Data.clear();
    $rootScope.currentUser = null;
    $location.path('/login');
  };

  ctrl.login = function(){
    Data.clear();
    SessionService.login(ctrl.info, success, error);
  };

  ctrl.register = function(){
    // Have to send the info back with a user key, otherwise the password and password_confirmation doesn't get saved
    UserService.users.save({user: ctrl.info}, success, error);
  };

  ctrl.updateGoal = function(){
    Data.updateUser($rootScope.currentUser);
  }

}]);
  