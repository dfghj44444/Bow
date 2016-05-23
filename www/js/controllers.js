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
.controller('pageSetCtrl', function($scope) {
    $scope.tabs = [{
                value: '1',
                label: '1支箭'
            }, {
                value: '6',
                label: '6支箭'
            }, {
                value: '12',
                label: '12支箭'
            }, {
                value: '36',
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
            
    $scope.tabs3 = [{
                value: '1',
                label: '5米'
            }, {
                value: '2',
                label: '10米'
            }, {
                value: '3',
                label: '18米'
            },{
                value: '4',
                label: '25米'
            }, {
                value: '5',
                label: '50米'
            }, {
                value: '6',
                label: '70米'
            }];
            
    $scope.tabs4 = [{
                value: '1',
                label: '传统弓'
            }, {
                value: '2',
                label: '竞技反曲'
            }, {
                value: '3',
                label: '复合弓'
            },{
                value: '4',
                label: '美猎'
            }, {
                value: '5',
                label: '直拉弓'
            }]; 
    // 默认值
    $scope.topicsDatatab='share';
    $scope.arrowsCount = 1000;//留待完善
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