angular.module('app.controllers', ['ngCordova' ])
     
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
.controller('pageSetCtrl', function($scope,DataService) {

    $scope.tabs = [{value :1,label:'1支箭'},
             {
                value: 6,
                label: '6支箭'
            }, {
                value: 12,
                label: '12支箭'
            }, {
                value: 36,
                label: '36支箭'
            }];
            
    $scope.tabs2 = [{
                value: '1',
                label: 'X视为十环'
            }, {
                value: '2',
                label: 'X为10,其他环减一'
            }, {
                value: '3',
                label: 'X视为特殊十环'
            }];
            
    $scope.tabs3 = [
                {
                value: 0,
                label: '不固定长'
            },{
                value: 1,
                label: '5米'
            }, {
                value: 2,
                label: '10米'
            }, {
                value: 3,
                label: '18米'
            },{
                value: 4,
                label: '25米'
            }, {
                value: 5,
                label: '50米'
            }, {
                value: 6,
                label: '70米'
            }];
            
    $scope.tabs4 = [{
                index: 0,
                label: '60全靶'
            }, {
                index: 1,
                label: '60半靶'
            }, {
                index: 2,
                label: '三联靶'
            }]; 

    $scope.topicsDatatab=1;
    $scope.arrowsCount = 1000;//留待完善

    $scope.topicP =0;
    $scope.topicD = 0;

    $scope.data = {availableOptions: [
      {id: '1', name: '传统弓'},
      {id: '2', name: '竞技反曲弓'},
      {id: '3', name: '复合弓'},
      {id: '4', name: '美猎'},
      {id: '5', name: '直拉弓'},
    ],
    selectedOption: {id: '2', name: '竞技反曲弓'}
    }; //This sets the default value of the select in the ui
    
    if(localStorage.getItem("setting")!=null)
		storedScores = JSON.parse(window.localStorage.getItem("scores"));
    else
    {
        var setting ={
			'tejianshu':1,
			'mishu':1,
			'bazhi':1,
			'gongzhong':1,
			'shihuan':1
        };
    }

    $scope.changeJianShu = function(selectedValue){
        var e = document.getElementById("selJianShu");
        var strUser = e.options[e.selectedIndex].value;
        
    };
    // storedScores.push(result);

    // window.localStorage.setItem('scores', JSON.stringify(storedScores));
   $scope.updatePaper = function() {
       DataService.setDefaultPaper($scope.tabs4[$scope.topicP]);
   }

    $scope.updateDistance = function (){
        DataService.setDefaultDistance($scope.tabs3[$scope.topicD]);
    }

    $scope.updateBowType = function (){
        DataService.setBowType($scope.data.selectedOption.name);
    }
})

//视频录制  
.controller('VideoCtrl',  function($scope,$cordovaCapture,VideoService) {

    $scope.clip = '';
    
    $scope.captureVideo = function() {
        $cordovaCapture.captureVideo().then(function(videoData) {
            VideoService.saveVideo(videoData).success(function(data) {
                $scope.clip = data;
                $scope.$apply();
            }).error(function(data) {
                console.log('ERROR: ' + data);
            });
        });
    };

    $scope.urlForClipThumb = function(clipUrl) {
        var name = clipUrl.substr(clipUrl.lastIndexOf('/') + 1);
        var trueOrigin = cordova.file.dataDirectory + name;
        var sliced = trueOrigin.slice(0, -4);
        return sliced + '.png';
    }
    
    $scope.showClip = function(clip) {
        console.log('show clip: ' + clip);
    }
})
 
   
.controller('pageAboutCtrl', function($scope) {

})

.controller('pageGraduationCtrl', function($scope) {
    $scope.graduations = [];  

    $scope.Info = {};
	if(localStorage.getItem("graduations")!=null)
	{
		var storedgraduations = JSON.parse(localStorage.getItem("graduations"));
	
		for (var i=0 ; i< storedgraduations.length ; i++)
		{ 
			var iter = storedgraduations[i];//倒数十个
            $scope.graduations.push(iter);
		} 	
	}
    
    $scope.AddGraduation=function(infodata)
    {
        var newgrad= {
            "x":infodata.x_input,
            "y":infodata.y_input,
            "z":infodata.z_input,
            "d":infodata.d_input,
            "type":infodata.type_input,
            "other":infodata.other_input
        }
        $scope.graduations.push(newgrad);
        window.localStorage.setItem('graduations', JSON.stringify($scope.graduations));
           $scope.Info = {};//清空
    }

    $scope.delete=function(index)
    {
        $scope.graduations.splice(index,1);
        window.localStorage.setItem('graduations', JSON.stringify($scope.graduations));
    }
})

.controller('RecordNewCtrl2',function($scope,$state){

    //上拉加载
    $scope.items = [];
	$scope.loadMore = function() {
		$http.get('/more-items').success(function(items) {
		useItems(items);
		$scope.$broadcast('scroll.infiniteScrollComplete');
		});
	};

	$scope.$on('stateChangeSuccess', function() {
		$scope.loadMore();
	});
	$scope.moreDataCanBeLoaded = function() {
		return true;
	};
})
// 