angular
    .module('books')
    .controller('navigationCtrl', navigationCtrl);
navigationCtrl.$inject = ['$location', '$window'];
function navigationCtrl($location, $window) {
    const navvm = this;
    navvm.curenLink = $location.path().split("/")[1];
    navvm.nav = [
        {
            name: 'Books',
            link: `#!/books`
        },
        {
            name: 'Add',
            link: `#!/add`
        },
        {
            name: 'Edit',
            link: `#!/edit/${$window.id ? $window.id : 'search'}`
        }
    ]
}