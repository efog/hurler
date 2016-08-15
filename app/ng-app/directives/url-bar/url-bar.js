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

    return this;
};

/**
 * Controller Constructor
 * @constructor
 *
 * @param {any} $mdToast toast service
 * @param {any} $rootScope root scope provider
 * @param {any} UrlService url api service
 */
function UrlBarController($mdToast, $rootScope, UrlService) {
    this.service = UrlService;
    this._urls = [];
    this._newUrl = new Url();
    Object.defineProperties(this, {
        'handleError': {
            'value': (error) => {
                if (error) {
                    var pinTo = 'top right';
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent(`Error while storing object: ${error.target.error}`)
                            .position(pinTo)
                            .hideDelay(1000)
                    );
                }
            }
        },
        'urls': {
            'get': () => {
                return this._urls;
            }
        },
        'add': {
            'value': (urlObject) => {
                this.service.add(this._newUrl, (err) => {
                    this.handleError(err);
                    if (err === null) {
                        this._urls.push(this._newUrl);
                        console.log('added %s', this._newUrl.url);
                        this._newUrl = new Url();
                        $rootScope.$apply();
                    }
                });
            }
        },
        'currentNew': {
            'get': () => {
                return this._newUrl;
            }
        }
    });

    var fetchCallback = (err, result) => {
        this.handleError(err);
        result.forEach(function (element) {
            var url = new Url();
            url.url = element._url;
            this._urls.push(url);
        }, this);
        $rootScope.$apply();
    };
    var fetchAll = () => {
        if (this.service.database) {
            this.service.all(fetchCallback);
        }
        else {
            setTimeout(fetchAll, 100);
        }
    };
    fetchAll();

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


