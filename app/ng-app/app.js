var app = angular.module('app', [
    // Angular modules
    'ngAnimate',
    'ngMessages',
    'ngSanitize',
    'ngTouch',
    // Custom modules
    // 3rd Party Modules
    'ui.router'
]);

var appConfigurator = ($httpProvider, $provide) => {
    $provide.factory('$routeProvider', function () {
        return $routeProvider;
    });
    $provide.decorator('$exceptionHandler', function ($delegate, $injector) {
        return function (exception, cause) {
            $delegate(exception, cause);
        };
    });
};
app.config(['$httpProvider', '$provide', appConfigurator]);

var run = ($http, $location, $rootScope, $injector) => {

};

app.run(['$http', '$location', '$rootScope', '$injector', run]);