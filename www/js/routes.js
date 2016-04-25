angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

  
      
    .state('side-menu21', {
      url: '/side-menu',
      abstract:true,
      templateUrl: 'templates/side-menu21.html'
    })
      
    
      
        
    .state('page1', {
      url: '/page1',
      templateUrl: 'templates/page1.html'
    })
        
      
    
      
        
    .state('side-menu21.pageEquip', {
      url: '/pageEquip',
      views: {
        'side-menu21': {
          templateUrl: 'templates/pageEquip.html'
        }
      },
      onEnter: function($state, Auth) {
        if(!Auth.isLoggedIn()) {
              $state.go('page1');
           }
        }
      
    }) 
      
        
    .state('side-menu21.page3', {
      url: '/pageMap',
      views: {
        'side-menu21': {
          templateUrl: 'templates/page3.html'
        }
      }
    })
    
      
        
    .state('page4', {
      url: '/pageNavi',
      templateUrl: 'templates/page4.html'
    })
        
        
    .state('page6', {
      url: '/pageScore1',
      templateUrl: 'templates/page6.html'
    })
    
        
    .state('page7', {
      url: '/pageScore2',
      templateUrl: 'templates/page7.html'
    })
        
        
    .state('page8', {
      url: '/page8',
      templateUrl: 'templates/page8.html'
    })
    
    .state('side-menu21.pageVideo', {
      url: '/pageVideo',
      views: {
        'side-menu21': {
          templateUrl: 'templates/pageVideo.html',
          controller:'VideoCtrl'
        }
      }
    })    
    
        
    .state('side-menu21.pageCamera', {
      url: '/pageCamera',
      views: {
        'side-menu21': {
          templateUrl: 'templates/pageCamera.html',
          controller:'CameraCtrl'
        }
      }
    })    
        
    .state('pageNewScore', {
      url: '/pageNewScore',
      templateUrl: 'templates/pageNewScore.html',
      controller:'NewScoreCtrl'
    })
        
      
    .state('side-menu21.pageAbout', {
      url: '/pageAbout',
      views: {
        'side-menu21': {
          templateUrl: 'templates/pageAbout.html',
		  controller:'pageAboutCtrl'
        }
      },
	
    })
        
        
    .state('side-menu21.pageRecords', {
      url: '/pageRecords',
      views: {
        'side-menu21': {
          templateUrl: 'templates/pageRecords.html',
		  controller:'pageRecordsCtrl'
        }
      } , 
    })
  
    ;

  // if none of the above states are matched, use this as the fallback
  
  $urlRouterProvider.otherwise('/side-menu/pageRecords');
  

  

});