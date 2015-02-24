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

      var _getLanguages = function (name, summary, url) {
        promises.push($http.get(url + auth).then(function (languagesResponse) {
          data.repos[name] = {};
          data.repos[name].summary = summary;
          data.repos[name].languages = languagesResponse.data;
        }));
      };

      promises.push($http.get('http://api.github.com/users/' + username + '/repos' + auth).then(function (response) {
        data.repos = {};
        data.repos.summary = response.data;
        debugger;
        for (var i = 0; i < response.data.length; i++) {
          debugger;
          _getLanguages(response.data[i].name, response.data[i], response.data[i].languages_url);
        }
      }));

      return $q.all(promises).then(function () {
        return data;
      });
    };

    return {
      getData: _getData
    }

  }]);