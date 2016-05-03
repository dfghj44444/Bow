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
.controller('page8Ctrl', function($scope) {

})
.controller('CameraCtrl', function($scope,$cordovaCamera) {
//-------------------------------
    // 1
    $scope.images = [];
  //camera
	$scope.addImage = function() {
		// 2
		var options = {
			destinationType : Camera.DestinationType.FILE_URI,
			sourceType : Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
			allowEdit : false,
			encodingType: Camera.EncodingType.JPEG,
			popoverOptions: CameraPopoverOptions,
		};
		
		// 3
		$cordovaCamera.getPicture(options).then(function(imageData) {
	 
			// 4
			onImageSuccess(imageData);
	 
			function onImageSuccess(fileURI) {
				createFileEntry(fileURI);
			}
	 
			function createFileEntry(fileURI) {
				window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
			}
	 
			// 5
			function copyFile(fileEntry) {
				var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
				var newName = makeid() + name;
	 
				window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
					fileEntry.copyTo(
						fileSystem2,
						newName,
						onCopySuccess,
						fail
					);
				},
				fail);
			}
			
			// 6
			function onCopySuccess(entry) {
				$scope.$apply(function () {
					$scope.images.push(entry.nativeURL);
					//and storage
					window.localStorage.setItem('images', JSON.stringify($scope.images));
				});
			}
	 
			function fail(error) {
				console.log("fail: " + error.code);
			}
	 
			function makeid() {
				var text = "";
				var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	 
				for (var i=0; i < 5; i++) {
					text += possible.charAt(Math.floor(Math.random() * possible.length));
				}
				return text;
			}
	 
		}, function(err) {
			console.log(err);
		});
	};
	
	$scope.urlForImage = function(imageName) {
		var name = imageName.substr(imageName.lastIndexOf('/') + 1);
		var trueOrigin = cordova.file.dataDirectory + name;
		return trueOrigin;
	};
	//刷新
	$scope.$on('$ionicView.enter', function() {
        if(window.localStorage.getItem("images")!=null)
        {
            var storedImgs = JSON.parse(window.localStorage.getItem("images"));
            $scope.images =storedImgs;
        } 
    });

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
// 

   
.controller('pageAboutCtrl', function($scope) {
alert(1);
})
// 

