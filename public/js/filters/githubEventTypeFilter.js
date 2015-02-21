angular.module('githubAPI').filter('githubEventType', function () {

  var eventNames = {
    PushEvent: 'pushed',
    CreateEvent: 'created',
    WatcthEvent: 'starred'
  };

  return function (event) {

    return eventNames[event];

  }

});