angular
    .module('books')
    .directive('navigation', navigation);

function navigation() {
    return {
        restrict: 'EA',
        templateUrl: '/nav/nav.view.html',
        controller: 'navigationCtrl as navvm'
    };
}