var app = angular.module('app', [
    // Angular modules
    'ngAnimate',
    'ngMaterial',
    'ngMessages',
    'ngSanitize',
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

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');
    $stateProvider.state('home', {
        'url': '/home',
        'templateUrl': 'ng-app/views/partials/home.html'
    })
    .state('edit', {
        'edit': '/edit/{url}',
        'templateUrl': 'ng-app/views/partials/edit.html',
        'params': {'url': ''}
    })
    .state('about', {
    });

});

var run = ($http, $location, $rootScope, $injector) => {

};

app.run(['$http', '$location', '$rootScope', '$injector', run]);