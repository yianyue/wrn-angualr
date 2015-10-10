'use strict';

var APIURL = "http://wrn-api.herokuapp.com";

app.factory('EntryService', ['$resource', function($resource){
  return $resource(APIURL + "/api/entries/:id", {}, {
    get: {method: 'GET', cache: false, isArray: true},
    getEntry: {method: 'GET', cache: false, isArray: false},
    update: {method: 'PUT', cache: false, isArray: true},
  });
}]);

app.factory('UserService', ['$resource', function($resource){
  return {
    users: $resource(APIURL + '/api/users', {}, {
      save: {method: 'POST', cache: false, isArray: false},
    }),
    user: $resource(APIURL + '/api/user', {}, {
      update: {method: 'PUT', cache: false, isArray: false},
    }) 
  }
}]);

app.factory('SessionService', ['$resource', function($resource){
return $resource(APIURL + '/api/session', {}, {
    login: {method: 'POST', cache: false, isArray: false},
    logout: {method: 'DELETE', cache: false, isArray: false}
  });
}]);

app.factory('Data', ['EntryService', 'UserService', 'localStorageService', 'Stats', 
function (EntryService, UserService, localStorageService, Stats) {

  var days = localStorageService.get('days');

  var dataFactory = {};

  function _getEntries(complete) {
    EntryService.get({},
      function success(rsp){
        days = Stats.matchEntriesToDates(rsp);
        localStorageService.set('days', days);
        complete(days);
      },
      function error(rsp){
        console.log('Error' + JSON.stringify(rsp));
      }
    );
  };

  function _lsUpdateEntry(entry){
    var i = 0;
      do {
        if (days[i].entry && days[i].entry.id == entry.id){
          entry.progress = Math.round(entry.word_count/entry.goal*100);
          days[i].entry = entry;
        }
        i ++;
      } while (i < days.length);
    localStorageService.set('days', days);
  }


  dataFactory.loadEntries = loadEntries;
  dataFactory.loadUser = loadUser;
  dataFactory.clear = clear;
  dataFactory.setUser = setUser;
  dataFactory.saveEntry = saveEntry;
  dataFactory.updateUser = updateUser;
  dataFactory.getEntry = EntryService.getEntry;
  
  return dataFactory;
  
  function loadEntries (complete){
    if(days) {
      complete(days);
    } else {
      _getEntries(complete);
    }
  };

  function loadUser(){
    return localStorageService.get('user');;
  };

  function clear(){
    localStorageService.clearAll();
    days = null;
  };

  function setUser(user){
    localStorageService.set('user', user);
  };
  
  function saveEntry(entry){
    _lsUpdateEntry(entry);
    EntryService.update({id: entry.id},{entry: entry},
      function success(rsp){
        rsp.forEach(function(el, i, arr){
          _lsUpdateEntry(el);
        });
      },
      function error(rsp){
        console.log('Error' + JSON.stringify(rsp) );
    });
  };

  function updateUser(user){
    localStorageService.set('user', user);
    UserService.user.update({user: user},
      function success(rsp){
        console.log('user updated' + JSON.stringify(rsp));
      },
      function error(rsp){
        console.log('Error' + JSON.stringify(rsp) );
      });
  }

}]);