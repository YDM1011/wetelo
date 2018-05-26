angular
    .module('books')
    .directive('pgnt', pgnt);

function pgnt() {
    return {
        restrict: 'EA',
        templateUrl: '/directive/pagination/pgnt.view.html',
        scope: {
            pgntvm: '=content'
        }
    };
}