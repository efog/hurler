var Url = function () {
    this._url = '';
    Object.defineProperties(this, {
        'url': {
            'get': () => {
                return this._url;
            },
            'set': (value) => {
                this._url = value;
            }
        }
    });
};

/**
 * Controller Constructor
 * @constructor
 */
function UrlBarController() {
    this._urls = [];
    this._newUrl = new Url();
    Object.defineProperties(this, {
        'urls': {
            'get': () => {
                return this._urls;
            }
        },
        'add': {
            'value': (urlObject) => {
                this._urls.push(this._newUrl);
                console.log('added %s', this._newUrl.url);
                this._newUrl = new Url();
            }
        },
        'currentNew': {
            'get': () => {
                return this._newUrl;
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
function urlBar($http, urlService) {

    /**
     * links directive to scope
     *
     * @param {any} scope directive scope
     * @param {any} element html element rendering the directive
     * @param {any} attrs attributes of the element
     * @returns {undefined}
     */
    function link(scope, element, attrs) {
    }

    // Usage:
    //  <url-bar></url-bar>
    // Creates:
    //
    var directive = {
        'bindToController': true,
        'controller': UrlBarController,
        'controllerAs': 'vm',
        'link': link,
        'restrict': 'E',
        'scope': {
        },
        'templateUrl': 'ng-app/directives/url-bar/url-bar.html'
    };

    return directive;
}

urlBar.$inject = ['$http', 'UrlService'];

angular
    .module('app')
    .directive('urlBar', urlBar);


