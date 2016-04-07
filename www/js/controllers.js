angular.module('app.controllers', [])
     
.controller('page1Ctrl', function($scope) {

})
   
.controller('page2Ctrl', function($scope) {

})
   
.controller('page3Ctrl', function($scope) {

})
   
.controller('page4Ctrl', function($scope) {

})
   
.controller('page6Ctrl', function($scope) {

})
   
.controller('page7Ctrl', function($scope) {

})
   
.controller('page8Ctrl', function($scope) {

})
   
.controller('NewScoreCtrl', function($scope) {
	
    $scope.recordNew = function() {
	window.localStorage['name'] = 'Max';

	var name = window.localStorage['name'] || 'you';
	alert('Hello, ' + name);
    }
})
   
.controller('page10Ctrl', function($scope) {

})
   
.controller('page12Ctrl', function($scope) {


})
 