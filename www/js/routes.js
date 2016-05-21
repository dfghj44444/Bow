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
      url: '/pageRecords?ten&nine&eight&seven&six&five&four&three&two&one&zero&total&img&variance&date',
      cached:true,
	  views: {
        'side-menu': {
          templateUrl: 'templates/pageRecords.html',
		  controller:'pageRecordsCtrl'

        }
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
    
    .state('side-menu.pageIntro', {
      url: '/pageIntro',
      views: {
        'side-menu': {
          templateUrl: 'templates/pageIntro.html',
		  //controller:'pageIntroCtrl'
        }
      },
    })
    
    .state('side-menu.day1',{
      url: '/day1',
      views: {
        'side-menu': {
          templateUrl: 'templates/book/day1.html'

        }
      }
    })
    
   .state('side-menu.day2',{
      url: '/day2',
      views: {
        'side-menu': {
          templateUrl: 'templates/book/day2.html',
        }
      }
    })
    
   .state('side-menu.day3',{
      url: '/day3',
      views: {
        'side-menu': {
          templateUrl: 'templates/book/day3.html',
        }
      }
    })
	
    // // setup an abstract state for the tabs directive
    .state('side-menu.tab', {
      url: "/tab",
      views: {
        'side-menu': {
          templateUrl: "templates/pageAddScoreTab.html"
        }
      },
    })
    // // setup an abstract state for the tabs directive
    .state('side-menu.canvas', {
      url: "/canvas",
      views: {
        'side-menu': {
          templateUrl: "templates/pageAddScoreByCanvas.html"
        }
      },
    })
    // Each tab has its own nav history stack:

    .state('side-menu.tab.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
               templateUrl: 'templates/pageAddScoreByTouch.html',
               controller: 'RecordNewCtrl2'
          }
      }
    })
    
    .state('side-menu.tab.friends', {
      url: '/friends',
      views: {
        'tab-friends': {
          templateUrl: 'templates/pageNewScore.html',
          controller: 'NewScoreCtrl'
        }
      }
    })
    ;
  // if none of the above states are matched, use this as the fallback
  
  $urlRouterProvider.otherwise('/side-menu/pageRecords',{'total':-1});
});