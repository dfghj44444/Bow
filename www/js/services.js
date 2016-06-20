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

}])

.service('DataService', [function(){
    function getDefaultDistance() {
        return window.localStorage['distance']||10;
    }

    function getDefaultArrowNubmer() {
        return window.localStorage['arrowNumber']||12;
    }

    function getDefaultBowType() {
        return window.localStorage['bowType']||'';
    }
}])

.service('VideoService', function($q) {
    var deferred = $q.defer();
    var promise = deferred.promise;
    
    promise.success = function(fn) {
        promise.then(fn);
        return promise;
    }
    promise.error = function(fn) {
        promise.then(null, fn);
        return promise;
    }

    // Resolve the URL to the local file
    // Start the copy process
    function createFileEntry(fileURI) {
        window.resolveLocalFileSystemURL(fileURI, function(entry) {
            return copyFile(entry);
        }, fail);
    }
    
    // Create a unique name for the videofile
    // Copy the recorded video to the app dir
    function copyFile(fileEntry) {
        var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
        var newName = makeid() + name;
    
        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
                fileEntry.copyTo(fileSystem2, newName, function(succ) {
                    return onCopySuccess(succ);
                }, fail);
            },
            fail
        );
    }
    
    // Called on successful copy process
    // Creates a thumbnail from the movie
    // The name is the moviename but with .png instead of .mov
    function onCopySuccess(entry) {
        var name = entry.nativeURL.slice(0, -4);
        window.PKVideoThumbnail.createThumbnail (entry.nativeURL, name + '.png', function(prevSucc) {
            return prevImageSuccess(prevSucc);
        }, fail);
    }
    
    // Called on thumbnail creation success
    // Generates the currect URL to the local moviefile
    // Finally resolves the promies and returns the name
    function prevImageSuccess(succ) {
        var correctUrl = succ.slice(0, -4);
        correctUrl += '.MOV';
        deferred.resolve(correctUrl);
    }
    
    // Called when anything fails
    // Rejects the promise with an Error
    function fail(error) {
        console.log('FAIL: ' + error.code);
        deferred.reject('ERROR');
    }
    
    // Function to make a unique filename
    function makeid() {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for ( var i=0; i < 5; i++ ) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
    
    // The object and functions returned from the Service
    return {
        // This is the initial function we call from our controller
        // Gets the videoData and calls the first service function
        // with the local URL of the video and returns the promise
        saveVideo: function(data) {
            createFileEntry(data[0].localURL);
            return promise;
        }
    }
})

.value('DateService', function($format, $timestamp) {  
    var a, jsdate=(($timestamp) ? new Date($timestamp*1000) : new Date());  
    var pad = function(n, c){  
        if((n = n + "").length < c){  
            return new Array(++c - n.length).join("0") + n;  
        } else {  
            return n;  
        }  
    };  
    var txt_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];  
    var txt_ordin = {1:"st", 2:"nd", 3:"rd", 21:"st", 22:"nd", 23:"rd", 31:"st"};  
    var txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];   
    var f = {  
        // Day  
        d: function(){return pad(f.j(), 2)},  
        D: function(){return f.l().substr(0,3)},  
        j: function(){return jsdate.getDate()},  
        l: function(){return txt_weekdays[f.w()]},  
        N: function(){return f.w() + 1},  
        S: function(){return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th'},  
        w: function(){return jsdate.getDay()},  
        z: function(){return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0},  
        
        // Week  
        W: function(){  
            var a = f.z(), b = 364 + f.L() - a;  
            var nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;  
            if(b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b){  
                return 1;  
            } else{  
                if(a <= 2 && nd >= 4 && a >= (6 - nd)){  
                    nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");  
                    return date("W", Math.round(nd2.getTime()/1000));  
                } else{  
                    return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0);  
                }  
            }  
        },  
        
        // Month  
        F: function(){return txt_months[f.n()]},  
        m: function(){return pad(f.n(), 2)},  
        M: function(){return f.F().substr(0,3)},  
        n: function(){return jsdate.getMonth() + 1},  
        t: function(){  
            var n;  
            if( (n = jsdate.getMonth() + 1) == 2 ){  
                return 28 + f.L();  
            } else{  
                if( n & 1 && n < 8 || !(n & 1) && n > 7 ){  
                    return 31;  
                } else{  
                    return 30;  
                }  
            }  
        },  
        
        // Year  
        L: function(){var y = f.Y();return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0},  
        //o not supported yet  
        Y: function(){return jsdate.getFullYear()},  
        y: function(){return (jsdate.getFullYear() + "").slice(2)},  
        
        // Time  
        a: function(){return jsdate.getHours() > 11 ? "pm" : "am"},  
        A: function(){return f.a().toUpperCase()},  
        B: function(){  
            // peter paul koch:  
            var off = (jsdate.getTimezoneOffset() + 60)*60;  
            var theSeconds = (jsdate.getHours() * 3600) + (jsdate.getMinutes() * 60) + jsdate.getSeconds() + off;  
            var beat = Math.floor(theSeconds/86.4);  
            if (beat > 1000) beat -= 1000;  
            if (beat < 0) beat += 1000;  
            if ((String(beat)).length == 1) beat = "00"+beat;  
            if ((String(beat)).length == 2) beat = "0"+beat;  
            return beat;  
        },  
        g: function(){return jsdate.getHours() % 12 || 12},  
        G: function(){return jsdate.getHours()},  
        h: function(){return pad(f.g(), 2)},  
        H: function(){return pad(jsdate.getHours(), 2)},  
        i: function(){return pad(jsdate.getMinutes(), 2)},  
        s: function(){return pad(jsdate.getSeconds(), 2)},  
        //u not supported yet  
        
        // Timezone  
        //e not supported yet  
        //I not supported yet  
        O: function(){  
            var t = pad(Math.abs(jsdate.getTimezoneOffset()/60*100), 4);  
            if (jsdate.getTimezoneOffset() > 0) t = "-" + t; else t = "+" + t;  
            return t;  
        },  
        P: function(){var O = f.O();return (O.substr(0, 3) + ":" + O.substr(3, 2))},  
        //T not supported yet  
        //Z not supported yet  
        
        // Full Date/Time  
        c: function(){return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P()},  
        //r not supported yet  
        U: function(){return Math.round(jsdate.getTime()/1000)}  
    };  

    return $format.replace(/[\\]?([a-zA-Z])/g, function(t, s){  
        if( t!=s ){  
            // escaped  
            ret = s;  
        } else if( f[s] ){  
            // a date function exists  
            ret = f[s]();  
        } else{  
            // nothing special  
            ret = s;  
        }  
        return ret;  
    }); 

}  );