angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
      
    .state('side-menu', {
      url: '/side-menu',
      abstract:true,
      templateUrl: 'templates/side-menu.html'
    })
         
    .state('pageLogin', {
      url: '/pageLogin',
      templateUrl: 'templates/pageLogin.html'
    })
        
    .state('side-menu.pageEquip', {
      url: '/pageEquip',
      views: {
        'side-menu': {
          templateUrl: 'templates/pageEquip.html'
        }
      },
      onEnter: function($state, Auth) {
        if(!Auth.isLoggedIn()) {
              $state.go('pageLogin');
           }
        }
    }) 
     
    .state('side-menu.pageMap', {
      url: '/pageMap',
      views: {
        'side-menu': {
          templateUrl: 'templates/pageMap.html'
        }
      }
    })
       
    .state('pageNavi', {
      url: '/pageNavi',
      templateUrl: 'templates/pageNavi.html'
    })
        
        
    .state('pageScores1', {
      url: '/pageScores1',
      templateUrl: 'templates/pageScores1.html'
    })
    
    .state('pageScores2', {
      url: '/pageScores2',
      templateUrl: 'templates/pageScores2.html'
    })
  
    .state('pageScores3', {
      url: '/pageScores3',
      templateUrl: 'templates/pageScores3.html'
    })
    
    .state('side-menu.pageVideo', {
      url: '/pageVideo',
      views: {
        'side-menu': {
          templateUrl: 'templates/pageVideo.html',
          controller:'VideoCtrl'
        }
      }
    })    
        
    .state('pageNewScore', {
      url: '/pageNewScore',
      templateUrl: 'templates/pageNewScore.html',
      controller:'NewScoreCtrl'
    })
 
    .state('side-menu.pageAbout', {
      url: '/pageAbout',
      views: {
        'side-menu': {
          templateUrl: 'templates/pageAbout.html',
		  controller:'pageAboutCtrl'
        }
      },
    })
          
    .state('side-menu.pageRecords', {
      url: '/pageRecords',
      views: {
        'side-menu': {
          templateUrl: 'templates/pageRecords.html',
		  controller:'pageRecordsCtrl'

        },
	    params:{	'ten':0,'nine':0,'eight':0,'seven':0,
			'six':0,'five':0,'four':0,'three':0,
			'two':0,'one':0,'zero':0,'total':0,'img':''}
      } , 
    })
	
	 
    .state('side-menu.pageSet', {
      url: '/pageSet',
      views: {
        'side-menu': {
          templateUrl: 'templates/pageSet.html',
		  controller:'pageSetCtrl'
        }
      },
    })
	
	
    ;
  // if none of the above states are matched, use this as the fallback
  
  $urlRouterProvider.otherwise('/side-menu/pageRecords');
});