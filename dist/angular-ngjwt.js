/**
* angular-ngjwt
* @version v1.0.0
* @link https://github.com/coduxe/angular-ngjwt
* @author Coduxe, https://github.com/coduxe
* @license MIT License, http://www.opensource.org/licenses/MIT
*/

'use strict';

if (!angular) throw new TypeError("AngularJs is required");

angular.module("angular-ngjwt", [])

.config(['$httpProvider', 'ngJwtProvider', function($httpProvider, ngJwtProvider) {
  $httpProvider.interceptors.push(['$q', '$rootScope', function ($q, $rootScope) {
    return {
      'request': function(config) {
        config.headers = config.headers || {};
        var token = ngJwtProvider.$get().getToken();
        config.headers.Authorization = token ? ("Bearer " + token) : null;
        return config;
      },
      'responseError': function(response) {
        if (ngJwtProvider.defaults.errorCodes.indexOf(response.status) !== -1) {
          if (ngJwtProvider.defaults.removeTokenOnError) ngJwtProvider.$get().removeToken();
          $rootScope.$emit('$errorCode', response);
        }
        return $q.reject(response);
      },
      'response': function(response) {
        return response;
      }
    };
  }]);
}])

.provider('ngJwt', function() {
  var self = this;

  this.defaults = {
    localStorageKey: '$ngJwt_token',
    separatedCharacter: '.',
    errorCodes: [401, 403],
    removeTokenOnError: true
  };

  this.$get = function() {
    var ngJwtFunctions = {
      'setToken': function(token) {
        if (typeof token !== 'string') throw new TypeError("The token must be a string");
        if (token.indexOf('Bearer') !== -1) token = token.replace('Bearer', '');
        window.localStorage[self.defaults.localStorageKey] = token.trim();
      },
      'getToken': function() {
        return window.localStorage[self.defaults.localStorageKey];
      },
      'getDecodedInfo': function() {
        try {
          return angular.fromJson(atob(ngJwtFunctions.getToken().split(self.defaults.separatedCharacter)[1]));
        } catch(e) {
          return null;
        }
      },
      'removeToken': function(callback) {
        window.localStorage.removeItem(self.defaults.localStorageKey);
        if (typeof callback === 'function') callback.call();
      }
    };

    return ngJwtFunctions;
  }
});
