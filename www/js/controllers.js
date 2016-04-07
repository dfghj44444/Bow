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
	$scope.count = 0;
    $scope.recordNew = function() {
	//var resultObject={'ten':4,'nine':3,'eight':5,'total':107};
	//window.localStorage.setItem('score101', JSON.stringify(testObject));
    //var retrievedObject = localStorage.getItem('testObject');
    //console.log('retrievedObject: ', JSON.parse(retrievedObject));
	
	window.localStorage['name'] = 'Max';

	var name = window.localStorage['name'] || 'you';
	$scope.count += 1;
	alert('Hello, ' + $scope.count);
    }
})
   
.controller('page10Ctrl', function($scope) {

})
   
.controller('page12Ctrl', function($scope) {


})
 