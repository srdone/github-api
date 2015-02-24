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

      var _getCommits = function (name, url) {
        promises.push($http.get(url + auth).then(function (response) {
          var commitsResponse = response.data;
          var personalCommitCount = 0;
          for (var i = 0; i < commitsResponse; i++) {
            if (commitsResponse[i].commit.author === username) {
              personalCommitCount++;
            }
          };
          data.repos[name].personalCommitCount = personalCommitCount;
          data.repos[name].commits = commitsResponse;
        }));
      };

      promises.push($http.get('http://api.github.com/users/' + username + '/repos' + auth).then(function (response) {
        data.repos = {};
        data.repos.summary = response.data;
        for (var i = 0; i < response.data.length; i++) {
          _getLanguages(response.data[i].name, response.data[i], response.data[i].languages_url);
          //_getCommits(response.data[i].name, response.data[i].commits_url);
        }
      }));

      var _summarizeData = function () {
        var summarizedRepoData = [];
        for (var i = 0; i < data.repos.summary.length; i++) {
          summarizedRepoData.push({
            name: data.repos.summary[i].full_name,
            url: data.repos.summary[i],
            fork: data.repos.summary[i].fork,
            forkCount: data.repos.summary[i].forks_count,
            age: Date.now() - new Date(data.repos.summary[i].created_at), //milliseconds
            size: data.repos.summary[i].size,
            watchers: data.repos.summary[i].watchers_count,
            staleness: Date.now() - new Date(data.repos.summary[i].updated_at) //milliseconds
            //languages: _summarizeLanguages(data.repos[key])
          });
        }
        data.summarizedRepoData = summarizedRepoData;
      };

      return $q.all(promises).then(function (result) {
        _summarizeData();
        return data;
      });
    };

    return {
      getData: _getData
    }

  }]);