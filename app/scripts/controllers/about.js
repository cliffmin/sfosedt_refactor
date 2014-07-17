'use strict';

/**
 * @ngdoc function
 * @name defaultApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the defaultApp
 */
angular.module('defaultApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
