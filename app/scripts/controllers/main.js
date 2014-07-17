'use strict';

/**
 * @ngdoc function
 * @name defaultApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the defaultApp
 */
angular.module('defaultApp')
    .controller('MainCtrl', function($scope) {
        $scope.awesomeThings = {
            SETUP: {
                "sfosedt.objectMaximum": 4000,
                "sfosedt.widthInches": 10.0,
                "sfosedt.heightInches": 7.5,
                "!sfosedt.waterfallSpacing": 0,
                "!sfosedt.filefilter": "* .sfos",
                "!sfosedt.initFile": "sfos_init",
                "!sfosedt.snapGrid": "Both",
                "!sfosedt.horizontalGrid": 20,
                "!sfosedt.verticalGrid": 20,
                "sfosedt*background": "Tan",
                "sfosedt*foreground": "black",
                "sfosedt*drawingArea.background": "LightBlue",
                "sfosedt*drawingArea.foreground": "black",
                "sfosedt*scrollWin.width": 1004,
                "sfosedt*scrollWin.height": 754,
                "sfosedt.maxWidth": 1150,
                "sfosedt.maxHeight": 870,
                "sfosedt*logFrame.marginWidth": 0,
                "sfosedt*logFrame.marginHeight": 0,
                "sfosedt*logFrame.shadowType": "SHADOW_IN",
                "sfosedt*logFrame.shadowThickness": 3,
                "sfosedt*logText.background": "LightSteelBlue",
                "sfosedt*logText.text.font": "fixed",
                "sfosedt*logText.text.lines": 4,
                "sfosedt*menuCursor": "hand1",
                "sfosedt*XmToggleButtonGadget.selectColor": "Red"
            }
        }
    });
