angular.module('app.controllers').controller('NewScoreCtrl', function($scope,$state,$cordovaCamera,DateService,DataService,$ionicHistory) {

	$scope.items = [
	{ id: '10',volume:0 },
	{ id: '9',volume:0 },
	{ id: '8',volume:0 },
	{ id: '7',volume:0 },
	{ id: '6',volume:0 },
	{ id: '5',volume:0 },
	{ id: '4',volume:0 },
	{ id: '3',volume:0 },
	{ id: '2',volume:0 },
	{ id: '1',volume:0 },
	{ id: '0',volume:0 }
	];
	Array.prototype.sum = function (prop) {
    var total = 0;
    for ( var i = 0, _len = this.length; i < _len; i++ ) 
        total += this[i][prop];
    
    return total;
	}
	var myDate = new Date();
	//记录一组新
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
			'total':$scope.totalScore|0,//总分
            'img':$scope.theImage,
            'variance':0,//方差
			'count':0,//箭数总计
			'date':myDate.getTime()/1000,
			'distance':DataService.getDefaultDistance(),
            'type':DataService.getDefaultBowType(),//弓种
            'paper':DataService.getDefaultPaper()
        };
		var test1 = DataService.getDefaultDistance();
		var test2 = DataService.getDefaultBowType();
		//calccount
		resultObject.count = $scope.items.reduce( function(a, b){
        return a + parseInt(b["volume"]);
    }, 0);
		//平均值和方差
		var arrows = 0;

		for( x in $scope.items) 
			arrows += x.value;
        
		var average = $scope.totalScore/arrows;
		var variance=0;//方差
		for( x in $scope.items ){
			for( var i = 0 ; i < x.value ; i++ ){
				variance += pow(average-$scope.items[x].id,2);
			}
        }  
		resultObject.variance = variance/arrows;

		var entryViewId = _.find($ionicHistory.viewHistory().views, {url : "/随便给个正确的url"});
		if(entryViewId) 
		$ionicHistory.backView(entryViewId);
		//-----------------------我是分割线
		$ionicHistory.backView().stateParams = resultObject;
		$ionicHistory.nextViewOptions({   disableBack: true });
		$ionicHistory.goBack();
    }
	$scope.recordCancel = function() {	
		$ionicHistory.goBack();
	}
    
    $scope.$on('$ionicView.enter', function() {
        $scope.totalScore =  0;
        $scope.theImage = null;
		$scope.haveImg = false;
		document.getElementById('ctrlInputScore').value = '';
		for( x in $scope.items)
			$scope.items[x].volume=0;; //don't forget to add the base

        $scope.$apply();
    });


	$scope.setLevelText = function() {
		 
		var sum = 0;
		for( var i = 0; i < $scope.items.length; i++ ){
			sum += parseInt( $scope.items[i].volume)*parseInt( $scope.items[i].id); //don't forget to add the base
		}
		if(sum>0){
			$scope.totalScore = sum;
			document.getElementById('ctrlInputScore').value = sum;//更新输入框
		}
    };
            
    $scope.onScoreChange=function() {
           // var input = angular.element(by.model('ctrlInputScore'));
		$scope.totalScore=document.getElementById('ctrlInputScore').value ;
    };
	

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
                    $scope.theImage = entry.nativeURL;//多拍几次也是这张
                    // if(window.localStorage.getItem("images")!=null)
                    // {
                    //     var images = JSON.parse(window.localStorage.getItem("images"));
                    //     images.push();
                    //     //and storage
                    //     window.localStorage.setItem('images', JSON.stringify(images));
                    // }
					$scope.haveImg =true;
				});
			}
	 
			function fail(error) {
				console.log("fail: " + error.code);
				$scope.haveImg =false;
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
        if(imageName == null)
            return null;
		var name = imageName.substr(imageName.lastIndexOf('/') + 1);
		var trueOrigin = cordova.file.dataDirectory + name;
		return trueOrigin;
	};
})