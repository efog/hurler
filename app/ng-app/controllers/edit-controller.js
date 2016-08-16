/**
 * Edit controller
 * @constructor
 * @param {any} UrlService url service
 */
function EditController(UrlService) {
    return this;
}

angular
    .module('app')
    .controller('EditController', EditController);

EditController.$inject = ['UrlService'];