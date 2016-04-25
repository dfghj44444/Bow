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
			
		var storedScores=[];
		if(localStorage.getItem("scores")!=null)
		    storedScores = JSON.parse(window.localStorage.getItem("scores"));

		storedScores.push(resultObject);

		window.localStorage.setItem('scores', JSON.stringify(storedScores));
		//var retrievedObject = localStorage.getItem('testObject');
		//console.log('retrievedObject: ', JSON.parse(retrievedObject));

		$scope.count++;
		window.localStorage['count']=$scope.count;
		//alert('Hello, ' + $scope.count);
		$state.go('side-menu21.pageRecords');
    }
	$scope.recordCancel = function() {	
		$state.go('side-menu21.pageRecords');
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
    };
            
    $scope.onScoreChange=function() {
           // var input = angular.element(by.model('ctrlInputScore'));
        $scope.totalScore=document.getElementById('ctrlInputScore').value ;
    };
	

	
})
   
.controller('pageAboutCtrl', function($scope) {
alert(1);
})
// 
.controller('pageRecordsCtrl', function($scope) 
{
    $scope.series = [' 环数 ','散布(越小越好)'];
   
    $scope.$on('$ionicView.enter', function() {
        activate();
    });
    function activate()
    {
        $scope.labels = [];//横轴内容
        $scope.data = [[],[]];
        var myDate = new Date();
        for(var i =0;i<10;i++)
        {
            var date = myDate.getMonth()+"月";
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
            } 	
        } 
        console.log('Activating');
    }
})

