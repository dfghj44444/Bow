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
   
.controller('NewScoreCtrl', function($scope,$state, $timeout) {

	$scope.count = window.localStorage['count'] || 0;
	
    $scope.recordNew = function() {
		var resultObject={'ten':4,'nine':3,'eight':5,'total':107};
		window.localStorage.setItem('score'+$scope.count, JSON.stringify(resultObject));
		//var retrievedObject = localStorage.getItem('testObject');
		//console.log('retrievedObject: ', JSON.parse(retrievedObject));

		$scope.count++;
		window.localStorage['count']=$scope.count;
		//alert('Hello, ' + $scope.count);
		$state.go('side-menu21.page12');
    }
	

    $scope.data = { 'volume' : '5' };
    var timeoutId = null;
	$scope.$watch('data.volume', function() {
        
        console.log('Has changed');
        
        if(timeoutId !== null) {
            console.log('Ignoring this movement');
            return;
        }
        
        console.log('Not going to ignore this one');
        timeoutId = $timeout( function() {
            
            console.log('It changed recently!');
            
            $timeout.cancel(timeoutId);
            timeoutId = null;
            
            // Now load data from server 
        }, 1000); 
              
    });   
})
   
.controller('page10Ctrl', function($scope) {
alert(1);
})
   
.controller('page12Ctrl', function($scope) {

$scope.labels = [];
var myDate = new Date();
for(var i =0;i<8;i++){
	var date = myDate.getMonth()+"月";
	date += (parseInt(myDate.getDate()-i))+"日";
	$scope.labels.unshift(date);
}

$scope.series = [' 环数 ','散布(越小越好)'];
$scope.data = [[],[]];
var storage = window.localStorage;
for (var i=0, len = storage.length; i < len; i++)
{ 
    var key = storage.key(i);
    var value = storage.getItem(key);
	if(key.indexOf("score")!= -1)
	{
	var result = JSON.parse(value);
    console.log(key + "=" + result['total']);
	$scope.data[0].push(result['total']);
	}
	
	
 } 

})
 