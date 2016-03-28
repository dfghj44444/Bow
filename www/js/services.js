angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])
.factory('Auth', function () {
    if (window.localStorage['session']) {
        var _user = JSON.parse(window.localStorage['session']);
    }
    var setUser = function (session) {
        _user = session;
        window.localStorage['session'] = JSON.stringify(_user);
    }
                                   
    return {
        setUser: setUser,
        isLoggedIn: function () {
           return _user ? true : false;
        },
        getUser: function () {
            return _user;
        },
        logout: function () {
            window.localStorage.removeItem("session");
            window.localStorage.removeItem("list_dependents");
            _user = null;
        }
    }
})


.service('BlankService', [function(){

}]);

