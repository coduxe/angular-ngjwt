# angular-jwt

A very basic module to manage JWT authentication.

## Quick start

+ Install angular-jwt with [Bower](https://github.com/bower/bower).

>
```bash
$ bower install angular-jwt --save
```

+ Include the required libraries in your `index.html`:

>
``` html
<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/angular-jwt/dist/angular-jwt.min.js"></script>
```

+ Inject the `angular-jwt` module into your app:

>
``` js
angular.module('myApp', ['angular-jwt']);
```

## Change default options:
+ You can override global defaults for the plugin with ngJwtProvider.defaults

>
``` js
angular.module('myApp', ['angular-jwt'])
.config(['ngJwtProvider', function(ngJwtProvider) {
  angular.extend(ngJwtProvider.defaults, {
    localStorageKey: '$ngJwt_token', // The localstorage key is where the JWT token is saved (string)
    separatedCharacter: '.', // The character that separates each part of the JWT token (string)
    errorCodes: [401, 403], // The array of status codes that you want the '$errorCode' event to be trigger with (array of integer)
    removeTokenOnError: true // If true, the JWT token will be removed when the '$errorCode' event is triggered (boolean)
  });
}]);
```

## '$errorCode' event listener:
+ This event will be triggered whenever a http error response contains any of the error codes provided within the ngJwtProvider errorCodes options

>
``` js
angular.module('myApp', ['angular-jwt'])
.run(['$rootScope', function($rootScope) {
  $rootScope.$on('$errorCode', function(event, response) {
    // [ your code here ]
  });
}]);
```

## Usage

>
``` js
angular.module('myApp', ['angular-jwt'])
.controller('SomeCtrl', ['ngJwt', function(ngJwt) {
  ngJwt.setToken("[ Your Token ]"); // This method sets the token that will be sent in all your http requests.
  ngJwt.getToken(); // This method return the stored token.
  ngJwt.getDecodedInfo(); // This method return the token encoded info.
  ngJwt.removeToken(); // This method remove the stored token.
}]);
```

## Authors

- [**Ibán Dominguez Noda**](https://github.com/ibandominguez)
- [**Dariel González Rodríguez**](https://github.com/DarielGonzalez)
- [**Óliver Grisha Lorenzo Felipe**](https://github.com/oliverGrisha)
- [**Ayoze Vera Arbelo**](https://github.com/AyozeVera)
