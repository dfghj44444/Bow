app.controllers.controller('pageRecordsCtrl', function($scope,$stateParams) 
{
    $scope.series = [' ���� ','ɢ��(ԽСԽ��)'];
   
    //var index = $stateParams.index;
    //var anotherKey = $stateParams.anotherKey;
	
	$scope.urlForImage = function(imageName) {
        if(imageName == null)
            return "img/noicon.png";
		var name = imageName.substr(imageName.lastIndexOf('/') + 1);
		var trueOrigin = cordova.file.dataDirectory + name;
		return trueOrigin;
	};

   
    $scope.$on('$ionicView.enter', function() {
        activate();
    });
	
    function activate()
    {
        $scope.labels = [];//��������
        $scope.data = [[],[]];
        $scope.images = [];
        var myDate = new Date();
        for(var i =0;i<10;i++)
        {
            var date = (myDate.getMonth()+1)+"��";
            date += (parseInt(myDate.getDate()-i))+"��";
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
                var result = storedScores[index];//����ʮ��

                console.log( "=" + result['total']);
                $scope.data[0].push(parseInt(result['total']));
                var theData ={'score':parseInt(result['total']),'img':result['img']};
                $scope.images.push(theData);
   
            } 	
        } 

        console.log('Activating');
    }
    
}) 