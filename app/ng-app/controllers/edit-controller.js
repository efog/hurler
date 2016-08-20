/**
 * Edit controller
 * @constructor
 * @param {any} $mdToast toast service
 * @param {any} $state state service
 * @param {any} $stateParams parameters object
 * @param {any} $window url service
 * @param {any} UrlService url service
 */
function EditController($mdToast, $state, $stateParams, $window, UrlService) {

    this.tabs = [];
    this._target = new Url();
    this._target.url = decodeURIComponent($stateParams.url);
    var getUrlCallback = (err, result) => {
        if (err) {
            return this.handleError(err);
        }
        this.target.category = result._category;

        return this;
    };
    Object.defineProperties(this, {
        'goHome': {
            'value': () => {
                $state.transitionTo('home');
            }
        },
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
        'target': {
            'get': () => {
                return this._target;
            }
        },
        'url': {
            'get': () => {
                return this._target.url;
            }
        }
    });
    UrlService.query(this._target.url, getUrlCallback);

    return this;
}

angular
    .module('app')
    .controller('EditController', EditController);

EditController.$inject = ['$mdToast', '$state', '$stateParams', '$window', 'UrlService'];