'use strict';
const search = angular.module('search', ['Core']);
function searchCtrl (Data, mf)  {
    const srch = this;
    srch.mf = mf;

    srch.clearSearch = () => {
        srch.query = '';
    };
    srch.search = () => {
        if (!srch.query){
            mf.error('.f-search');
            return
        }
        const mes = {
            "search": srch.query,
            "token": mf.getToken()
        };
        Data.search.book(mes).$promise.then(res=>{
            console.log(`search ${res.length}`);
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
