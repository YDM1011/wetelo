angular
    .module('books')
    .directive('book', book);

function book() {
    return {
        restrict: 'EA',
        templateUrl: '/directive/book/book.view.html',
        scope: {
            bookvm: '=content'
        }
    };
}