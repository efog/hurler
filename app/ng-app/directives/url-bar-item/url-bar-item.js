/**
 * Controller Constructor
 * @constructor
 *
 * @param {any} $mdToast material design toast service
 * @param {any} $scope scope of directive
 */
function UrlBarItemController($mdToast, $scope) {
    this._hover = true;
    Object.defineProperties(this, {
        'url': {
            'get': () => {
                return this.urlitem.url;
            },
            'set': (value) => {
                this.urlitem.url = value;
            }
        },
        'hover': {
            'get': () => {
                return this._hover;
            },
            'set': (value) => {
                this._hover = value;
            }
        },
        'copyToClipboard': {
            'value': () => {
                const {clipboard} = require('electron');
                clipboard.writeText(this.url);

                var pinTo = 'top right';
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Copied')
                        .position(pinTo)
                        .hideDelay(1000)
                );
            }
        }
    });

    return this;
}

/**
 * Directive setup
 *
 * @param {any} $http $http service
 * @param {any} urlService url service
 * @returns {undefined}
 */
function urlBarItem($http) {

    /**
     * links directive to scope
     *
     * @param {any} scope directive scope
     * @param {any} element html element rendering the directive
     * @param {any} attrs attributes of the element
     * @returns {undefined}
     */
    function link(scope, element, attrs) {
        // $('.tooltipped').tooltip({
        //     'delay': 50
        // });
    }

    // Usage:
    //  <url-bar-item></url-bar-item>
    // Creates:
    //
    var directive = {
        'bindToController': true,
        'controller': UrlBarItemController,
        'controllerAs': 'vm',
        'link': link,
        'restrict': 'E',
        'scope': {
            'urlitem': '=?'
        },
        'templateUrl': 'ng-app/directives/url-bar-item/url-bar-item.html'
    };

    return directive;
}

urlBarItem.$inject = ['$http'];

angular
    .module('app')
    .directive('urlBarItem', urlBarItem);


