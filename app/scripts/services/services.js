'use strict';

app.factory('EntryService', ['$resource', function($resource){
  return $resource("http://localhost:3000/api/entries/:id", {}, {
    get: {method: 'GET', cache: false, isArray: true},
    getEntry: {method: 'GET', cache: false, isArray: false},
    update: {method: 'PUT', cache: false, isArray: true},
  });
}]);

app.factory('UserService', ['$resource', function($resource){
  return {
    users: $resource('http://localhost:3000/api/users', {}, {
    save: {method: 'POST', cache: false, isArray: false},
  }),
    user: $resource('http://localhost:3000/api/user', {}, {
    update: {method: 'PUT', cache: false, isArray: false},
  }) 
  }
}]);

app.factory('SessionService', ['$resource', function($resource){
return $resource('http://localhost:3000/api/session', {}, {
    login: {method: 'POST', cache: false, isArray: false},
    logout: {method: 'DELETE', cache: false, isArray: false}
  });
}]);

app.factory('Data', ['EntryService', 'UserService', 'localStorageService', 'Stats', function (EntryService, UserService, localStorageService, Stats) {

  var days = localStorageService.get('days');

  function getEntries(complete) {
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

  function lsUpdateEntry(entry){
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
  
  return {
    loadEntries: function(complete){
      if(days) {
        complete(days);
      } else {
        getEntries(complete);
      }
    },
    loadUser: function(){
      return localStorageService.get('user');;
    },
    clear: function(){
      localStorageService.clearAll();
      days = null;
    },
    setUser: function(user){
      localStorageService.set('user', user);
    },
    getEntry: EntryService.getEntry,
    saveEntry: function(entry){
      lsUpdateEntry(entry);
      EntryService.update({id: entry.id},{entry: entry},
        function success(rsp){
          rsp.forEach(function(el, i, arr){
            lsUpdateEntry(el);
          });
        },
        function error(rsp){
          console.log('Error' + JSON.stringify(rsp) );
      });
    },
    updateUser: function(user){
      localStorageService.set('user', user);
      UserService.user.update({user: user},
        function success(rsp){
          console.log('user updated' + JSON.stringify(rsp));
        },
        function error(rsp){
          console.log('Error' + JSON.stringify(rsp) );
        });
    }
  };

}]);