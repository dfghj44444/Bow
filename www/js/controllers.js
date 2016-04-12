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
	if(window.localStorage['count'] == null)
		window.localStorage['count'] = 0;
	$scope.count = window.localStorage['count'];
    $scope.recordNew = function() {
	//var resultObject={'ten':4,'nine':3,'eight':5,'total':107};
	//window.localStorage.setItem('score101', JSON.stringify(testObject));
    //var retrievedObject = localStorage.getItem('testObject');
    //console.log('retrievedObject: ', JSON.parse(retrievedObject));
	
	window.localStorage['name'] = 'Max';

	var name = window.localStorage['name'] || 'you';
	$scope.count++;
	alert('Hello, ' + $scope.count);
    }
})
   
.controller('page10Ctrl', function($scope) {

})
   
.controller('page12Ctrl', function($scope) {


})
 