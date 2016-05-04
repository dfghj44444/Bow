angular.module('app.controllers').controller('pageRecordsCtrl', function($scope,$stateParams) 
{
	$scope.series = [' 环数 ','散布(越小越好)'];
	$scope.labels = [];//横轴内容
	$scope.data = [[],[]];
	$scope.images = [];   
	var myDate = new Date();
	for(var i =0;i<10;i++)
	{
		var date = (myDate.getMonth()+1)+"月";
		date += (parseInt(myDate.getDate()-i))+"日";
		$scope.labels.unshift(date);
	}
	 
	if(localStorage.getItem("scores")!=null)
	{
		var storedScores = JSON.parse(localStorage.getItem("scores"));
		
		for (var i=0, len = storedScores.length; i < len && i<10; i++)
		{ 
			var index  =i;
			if(len>10)
			index  =len-10+i;
			var result = storedScores[index];//倒数十个

			console.log( "=" + result['total']);
			$scope.data[0].push(parseInt(result['total']));//
			var theData ={'score':parseInt(result['total']),'img':result['img']};
			$scope.images.unshift(theData);
		} 	
	}

	$scope.urlForImage = function(imageName) {
        if(imageName == null || imageName == 0)
            return "img/noicon.png";
		var name = imageName.substr(imageName.lastIndexOf('/') + 1);
		var trueOrigin = cordova.file.dataDirectory + name;
		return trueOrigin;
	};

    $scope.$on('$ionicView.enter', function(event, data) {
		
        activate(data.stateParams);
    });
	
    function activate($stateParams)
    {
		if(index<1 || typeof($stateParams.img) == "undefined")
			return;
		
		//开始加内容
		$scope.data[0].push(parseInt(result['total']));//

		var theData ={'score':parseInt($stateParams['total']),'img':$stateParams['img']};
		$scope.images.unshift(theData);	
		if($scope.data[0].length>10){
			$scope.data[0].splice(0,1);
			$scope.images.splice(0,1);
		}
			
        console.log('Activating');
		//save to local
		var storedScores=[];
		if(localStorage.getItem("scores")!=null)
		    storedScores = JSON.parse(window.localStorage.getItem("scores"));

		storedScores.push(resultObject);

		window.localStorage.setItem('scores', JSON.stringify(storedScores));
		//var retrievedObject = localStorage.getItem('testObject');
		//console.log('retrievedObject: ', JSON.parse(retrievedObject));
		$scope.count = window.localStorage['count'] || 0;
		$scope.count++;
		window.localStorage['count']=$scope.count;
    }
    
}) 
