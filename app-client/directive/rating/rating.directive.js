angular
    .module('books')
    .directive('rating', function() {
        return {
            restrict: 'E',
            scope: {book: '=item', tablevm: '=ctrl'},
            templateUrl: '/directive/rating/rating.view.html',
        }
    });