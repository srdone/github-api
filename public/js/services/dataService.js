angular.module('githubAPI').factory('dataService',
  ['secretService', '$http', '$q', function (secretService, $http, $q) {

    var auth = '?client_id=' + secretService.clientId + '&client_secret=' + secretService.clientSecret;

    var _getData = function (username) {
      var promises = [];
      var data = {};

      promises.push($http.get('https://api.github.com/users/' + username + auth).then(function (response) {
        data.summary = response.data;
      }));

      promises.push($http.get('http://api.github.com/users/' + username + '/events' + auth).then(function (response) {
        data.events = response.data;
      }));

      return $q.all(promises).then(function () {
        return data;
      });
    };

    return {
      getData: _getData
    }

  }]);