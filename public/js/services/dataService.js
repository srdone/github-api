angular.module('githubAPI').factory('dataService',
  ['secretService', function (secretService) {

    return {
      clientId: secretService.clientId,
      clientSecret: secretService.clientSecret
    }

  }]);