angular.module('githubAPI').controller('MainController',
  ['$scope', 'dataService', function($scope, dataService) {

    $scope.test = 'Main Controller';

    $scope.getData = function () {
      dataService.getData($scope.search.username).then(function (userData) {
        $scope.userData = userData;
        console.log(userData);
      });
    }

  }]);