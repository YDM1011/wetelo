'use strict';
const
    homeTmp = '/home/home.view.html',
    addTmp = '/add/add.view.html',
    inTmp = '/auth/SignIn/in.view.html',
    upTmp = '/auth/SignUp/up.view.html',
    editTmp = '/edit/edit.view.html',
    booksTmp = '/books/books.view.html',
    notfound = '/notfound/notfound.view.html';

const config = ($routeProvider, $locationProvider, $resourceProvider) => {
    $routeProvider
        .when('/', {
            templateUrl: homeTmp,
            controller: 'homeCtrl',
            controllerAs: 'vm'
        })
        .when('/login', {
            templateUrl: inTmp,
            controller: 'inCtrl',
            controllerAs: 'vm'
        })
        .when('/registr', {
            templateUrl: upTmp,
            controller: 'upCtrl',
            controllerAs: 'vm'
        })
        .when('/edit/:id', {
            templateUrl: editTmp,
            controller: 'editCtrl',
            controllerAs: 'vm'
        })
        .when('/edit/search', {
            redirectTo: '/login'
        })
        .when('/books/:brif', {
            templateUrl: booksTmp,
            controller: 'booksCtrl',
            controllerAs: 'vm'
        })
        .when('/books/', {
            templateUrl: booksTmp,
            controller: 'booksCtrl',
            controllerAs: 'vm'
        })
        .when('/add', {
            templateUrl: addTmp,
            controller: 'addCtrl',
            controllerAs: 'vm'
        })
        .when('/notfound', {
            templateUrl: notfound
        })
        .otherwise({redirectTo: '/notfound'});
    $locationProvider.hashPrefix('!');
    $resourceProvider.defaults.stripTrailingSlashes = false;
}

angular
    .module('books')
    .config(['$routeProvider', '$locationProvider', '$resourceProvider', config])
    .service('mf', mainfunk)
    .run(function($rootScope, $location, mf){
        $rootScope.$on('$routeChangeStart', (event, current, previous, reject)=>{
           if (current.$$route){
               const root = current.$$route.originalPath;
               if (
                   (
                   root == '/books/:brif' ||
                   root == '/edit/:id' ||
                   root == '/edit/search' ||
                   root == '/books/' ||
                   root =='/add'
                   ) &&
                   !mf.getToken()
               ){
                   console.log($location)
                   $location.path('/login')
               }
           }

        })
    });

mainfunk.$inject = ['$window', '$location']
function mainfunk( $window, $location) {
    const m = this;
    $window.start = true;
    m.login = (user, pass) => {
        $window.localStorage['token'] = 'qweasdaszxc';
    };
    m.getToken = () => {
        console.log($window.localStorage['token']);
        return $window.localStorage['token'];
    };
    m.getName = () => {
        console.log($window.localStorage['name']);
        return $window.localStorage['name'];
    };
    m.setToken = (token) => {
        $window.localStorage['token'] = token;
    };
    m.setName = (name) => {
        $window.localStorage['name'] = name;
    };
    m.deleteToken = () => {
        $window.localStorage['token'] = '';
        $location.path('/login')
    };
    m.error = tag => {
        $(tag).each(i => {
            $(tag)[i].classList.add('error')
        })
    };
    m.defoult = tag => {
        $(tag).each(i => {
            $(tag)[i].classList.remove('error')
        })
    };
    // m.deleteToken();
    return m;
};
