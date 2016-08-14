
/**
 * Controller Constructor
 * @constructor
 */
function ControllerController() {

}

/**
 * Directive setup
 *
 * @param {any} $http $http service
 * @returns {undefined}
 */
function urlBar($http) {

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
    //
    // Creates:
    //
    var directive = {
        'bindToController': true,
        'controller': ControllerController,
        'controllerAs': 'vm',
        'link': link,
        'restrict': 'E',
        'scope': {
        }
    };

    return directive;
}

urlBar.$inject = ['$http'];

angular
    .module('app')
    .directive('urlBar', urlBar);


