'use strict';

/**
 * @ngdoc function
 * @name defaultApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the defaultApp
 */
angular.module('defaultApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
