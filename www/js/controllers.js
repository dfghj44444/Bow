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
   
.controller('NewScoreCtrl', function($scope,$state) {

	$scope.count = window.localStorage['count'] || 0;
	
    $scope.recordNew = function() {
		var resultObject={
			'ten':$scope.items[0].volume,
			'nine':$scope.items[1].volume,
			'eight':$scope.items[2].volume,
			'seven':$scope.items[3].volume,
			'six':$scope.items[4].volume,
			'five':$scope.items[5].volume,
			'four':$scope.items[6].volume,
			'three':$scope.items[7].volume,
			'two':$scope.items[8].volume,
			'one':$scope.items[9].volume,
			'zero':$scope.items[10].volume,
			'total':$scope.totalScore|0};
		window.localStorage.setItem('score'+$scope.count, JSON.stringify(resultObject));
		//var retrievedObject = localStorage.getItem('testObject');
		//console.log('retrievedObject: ', JSON.parse(retrievedObject));

		$scope.count++;
		window.localStorage['count']=$scope.count;
		//alert('Hello, ' + $scope.count);
		$state.go('side-menu21.page12');
    }
	
	$scope.items = [
	{ id: '10',volume:'0' },
	{ id: '9',volume:'0' },
	{ id: '8',volume:'0' },
	{ id: '7',volume:'0' },
	{ id: '6',volume:'0' },
	{ id: '5',volume:'0' },
	{ id: '4',volume:'0' },
	{ id: '3',volume:'0' },
	{ id: '2',volume:'0' },
	{ id: '1',volume:'0' },
	{ id: '0',volume:'0' }
	];

	$scope.setLevelText = function() {
		 
		var sum = 0;
		for( var i = 0; i < $scope.items.length; i++ ){
			sum += parseInt( $scope.items[i].volume)*parseInt( $scope.items[i].id); //don't forget to add the base
		}
		if(sum>0){
			$scope.totalScore = sum;
			$scope.scoreText = "环"
		}
			
		
	}
	
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
 