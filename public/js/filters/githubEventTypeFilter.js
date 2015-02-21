angular.module('githubAPI').filter('githubEventType', function () {

  var eventNames = {
    PushEvent: 'pushed',
    CreateEvent: 'created'
  };

  return function (event) {

    return eventNames[event];

  }

});