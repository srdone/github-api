angular.module('githubAPI').controller('MainController',
  ['$scope', 'dataService', function($scope, dataService) {

    $scope.test = 'Main Controller';
    $scope.clientId = dataService.clientId;

  }]);