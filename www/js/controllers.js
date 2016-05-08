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
// 