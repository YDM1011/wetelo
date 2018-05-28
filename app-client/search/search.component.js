'use strict';
const search = angular.module('search', ['Core']);
function searchCtrl (Data, mf, $rootScope, $location)  {
    const srch = this;
    srch.mf = mf;
    srch.is = Data.srch;
    srch.delFilter = () => {
        srch.is = '';
        Data.srch = srch.is;
        $location.path('/books');
        $rootScope.$broadcast('updataBooks');
    };
    srch.clearSearch = () => {
        srch.query = '';
    };
    srch.search = () => {
        if (!srch.query){
            mf.error('.f-search');
            return
        }
        // {brif: tablevm.brif, token: mf.getToken(), sort: tablevm.sortType, vector: tablevm.vector}
        $location.path('/books');
        const mes = {
            "search": srch.query,
            "token": mf.getToken()
        };
        Data.srch = srch.query;
        srch.is = srch.query;

        Data.search.book(mes).$promise.then(res=>{
            Data.books = res.docs;
            Data.taken = res.taken;
            Data.last = res.pages;

            $rootScope.$broadcast('updataBooks');
        });
        srch.clearSearch();
    }
};
search
    .component('search', {
        templateUrl: '/search/search.view.html',
        controller: searchCtrl,
        controllerAs: 'srch'
    })
    .controller('searchCtrl', ['Data', 'mf', searchCtrl]);
