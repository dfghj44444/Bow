angular.module('app.controllers', [ ])
     
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

	$scope.count = window.localStorage['count'] || 0;
    $scope.recordNew = function() {
	var resultObject={'ten':4,'nine':3,'eight':5,'total':107};
	window.localStorage.setItem('score'+$scope.count, JSON.stringify(testObject));
    //var retrievedObject = localStorage.getItem('testObject');
    //console.log('retrievedObject: ', JSON.parse(retrievedObject));
	
	var name = window.localStorage['name'] || 'you';
	$scope.count++;
	alert('Hello, ' + $scope.count);
    }
})
   
.controller('page10Ctrl', function($scope) {
alert(1);
})
   
.controller('page12Ctrl', function($scope) {

$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
$scope.series = ['Series A', 'Series B'];
$scope.data = [
[65, 59, 80, 81, 56, 55, 40],
[28, 48, 40, 19, 86, 27, 90]
];

})
 