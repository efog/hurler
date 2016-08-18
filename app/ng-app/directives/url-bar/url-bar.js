/**
 * Controller Constructor
 * @constructor
 *
 * @param {any} $mdToast toast service
 * @param {any} $rootScope root scope provider
 * @param {any} $state state provider
 * @param {any} UrlService url api service
 */
function UrlBarController($mdToast, $rootScope, $state, UrlService) {
    this.service = UrlService;
    this._urls = [];
    this._newUrl = new Url();
    this._category = null;

    var fetchCallback = (err, result) => {
        this.handleError(err);
        this._urls.length = 0;
        this._category = null;
        result.forEach(function (element) {
            var url = new Url();
            url.url = element._url;
            url.category = element._category;
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

    this.delete = (url) => {
        this.service.remove(url, (err, result) => {
            this.handleError(err);
            fetchAll();
        });
    };

    this.navigate = (url) => {
        console.log('ohnoes %s', url);
        $state.go(`edit`, {
            'url': encodeURIComponent(url)
        });
    };

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
                // /^(?:(?:https?)://)/i
                var regex = new RegExp('^(?:(?:https?)://)');
                if (regex.test(this._newUrl.url)) {
                    this._newUrl.category = this._category;
                    this.service.add(this._newUrl, (err) => {
                        this.handleError(err);
                        if (err === null) {
                            this._urls.push(this._newUrl);
                            console.log('added %s', this._newUrl.url);
                            $state.go('edit', {
                                'url': this._newUrl.url
                            });
                            this._newUrl = new Url();
                            this.filter();
                            $rootScope.$apply();
                        }
                    });
                }
            }
        },
        'category': {
            'get': () => {
                return this._category;
            },
            'set': (value) => {
                this._category = value;
                this.filter();
            }
        },
        'currentNew': {
            'get': () => {
                return this._newUrl;
            }
        },
        'filter': {
            'value': () => {
                this._urls.forEach(function (element) {
                    var matchUrl = element.url.indexOf(this._newUrl.url) >= 0;
                    if (this.category) {
                        var matchCategory = element.category ? this.category === element.category : true;
                        element.hide = this._newUrl.url && !matchUrl || !element.category || !matchCategory;
                    }
                    else {
                        element.hide = this._newUrl.url && !matchUrl;
                    }
                }, this);
            }
        }
    });

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


