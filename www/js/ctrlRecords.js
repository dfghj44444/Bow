angular.module('app.controllers').controller('pageRecordsCtrl', function($scope,$state,$stateParams) 
{
    $scope.series = [' 环数 ','散布(越小越好)'];
   
		var index = $stateParams.total;

	$scope.urlForImage = function(imageName) {
        if(imageName == null)
            return "img/noicon.png";
		var name = imageName.substr(imageName.lastIndexOf('/') + 1);
		var trueOrigin = cordova.file.dataDirectory + name;
		return trueOrigin;
	};

   
    $scope.$on('$ionicView.enter', function(event, data) {
		var index = $state.params;
        activate(data.stateParams);
    });
	
    function activate($stateParams)
    {
		
		index = $stateParams;
	
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
                $scope.data[0].push(parseInt(result['total']));
                var theData ={'score':parseInt(result['total']),'img':result['img']};
                $scope.images.push(theData);
   
            } 	
        } 

        console.log('Activating');
    }
    
}) 
