
'use strict';

/**
 * @ngdoc function
 * @name wrnApp.controller:EntryCtrl
 * @description
 * # EntryCtrl
 * Controller of the wrnApp
 */

// TODO: figure out why document.element.requestFullscreen etc. didn't work
// array ensures angular can still find the dependencies after minification
app.controller('EntryCtrl', ['$routeParams', '$location','$scope', 'Data', 'Fullscreen', 
  function($routeParams, $location, $scope, Data, Fullscreen) {

    var ctrl = this;
    ctrl.editor = {};
    ctrl.entry = {};

    // ACCESSIBLE FUNCTIONS

    ctrl.updateEntry = updateEntry;
    ctrl.toggleFullscreen = toggleFullscreen;


    // FUNCTION DEFINITIONS

    function updateEntry(){
      // TODO: handle error
      ctrl.entry.word_count = _countWords();
      ctrl.entry.progress = Math.round(ctrl.entry.word_count/ctrl.entry.goal* 100);
      if (ctrl.entry.progress >= 100 && ctrl.displayModal ){
        $('#successModal').modal('show');
        ctrl.displayModal = false;
      } else if (ctrl.entry.progress < 100){
        ctrl.displayModal = true;
      };
      Data.saveEntry(ctrl.entry);
    };

    function toggleFullscreen(){
      if (Fullscreen.isEnabled()){
        Fullscreen.cancel();
      } else {
        Fullscreen.all();
      }
      ctrl.editor.quill.setSelection(ctrl.editor.length, ctrl.editor.length);
    };

    // "PRIVATE" FUNCTION
    function _countWords() {
      // replace all html tags with space
      var words = ctrl.entry.content.replace(/<.*?>/g, ' ');
      // match all non-whitespace
      console.log('editor length in _countWords', ctrl.editor.length);
      return words.match(/\S+/g) ? words.match(/\S+/g).length : 0;
    };

    Data.getEntry({id: $routeParams.id},
      function success(rsp){
        ctrl.entry = rsp;
        ctrl.entry.progress = Math.round(ctrl.entry.word_count/ctrl.entry.goal* 100);
        ctrl.displayModal = ctrl.entry.progress < 100;
        var today = new Date();
        var entryDate = new Date(ctrl.entry.created_at);
    // TODO: check if user can game this by changing their computer's date
        if (entryDate.setHours(0,0,0,0) == today.setHours(0,0,0,0)){
          ctrl.editor.enable();
          // focus the editor and go to the end of the text
          ctrl.editor.quill.setSelection(ctrl.editor.length, ctrl.editor.length);
          console.log("editor length", ctrl.editor.length);
        };
      },
      function error(rsp){
        console.log('Error' + JSON.stringify(rsp) );
      }
    );
            
    $scope.$on('editorCreated', function (event, args) {
      ctrl.editor = args.editor;

    });
}]);