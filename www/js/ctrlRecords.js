angular.module('app.controllers').controller('pageRecordsCtrl', function($scope,$stateParams,DateService) 
{
	$scope.series = [' 环数 ','散布(越小越好)'];
	$scope.labels = [];//横轴内容
	$scope.data = [[],[]];
	$scope.images = [];   
	$scope.gone = 0;

	var myDate = new Date();

	if(localStorage.getItem("scores")!=null)
	{
		var storedScores = JSON.parse(localStorage.getItem("scores"));
		var lastItem = storedScores[storedScores.length-1];
		if(typeof(lastItem.date) != 'undefined' &&  lastItem.date!=0){
			var deltaTime = myDate.getTime()/1000 - lastItem.date;
			$scope.gone= parseInt(deltaTime/24/3600);
		}
		
		for (var i=0, len = storedScores.length; i < len && i<10; i++)
		{ 
			var index  =i;
			if(len>10)
			index  =len-10+i;
			var result = storedScores[index];//倒数十个

			console.log( "=" + result['total']);
			$scope.data[0].push(parseInt(result['total']));//
			var DateTime = '未知日期';
			if( typeof(result.date) != 'undefined' &&  result.date!=0){
				$scope.labels.push(DateService('m月d日',result.date));
				DateTime = DateService('m月d日H时i分',result.date);
			}
			else
				$scope.labels.push('某日');
			var theData ={'score':parseInt(result['total']),'img':result['img'],'date':DateTime};
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
		if( typeof($stateParams.total)=='undefined')
			return;
		if($stateParams.total<1 && typeof($stateParams.img) == "undefined")
			return;
			
		$scope.gone = 0;//今天射了,清空
		
		var result = $stateParams;
		//开始加内容
		$scope.data[0].push(parseInt(result['total']));//
		var DateTime = '未知日期';
		if( typeof(result.date) != 'undefined' &&  result.date!=0){
			$scope.labels.push(DateService('m月d日',result.date));
			DateTime = DateService('m月d日H时i分',result.date);
		}
		else
			$scope.labels.push('某日');
		var theData ={'score':parseInt(result['total']),'img':result['img'],'date':DateTime};
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

		storedScores.push(result);

		window.localStorage.setItem('scores', JSON.stringify(storedScores));
		//var retrievedObject = localStorage.getItem('testObject');
		//console.log('retrievedObject: ', JSON.parse(retrievedObject));
		$scope.count = window.localStorage['count'] || 0;
		$scope.count++;
		window.localStorage['count']=$scope.count;
		
				
		$scope.$apply();
    }

}) 
