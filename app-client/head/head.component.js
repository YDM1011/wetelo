'use strict';

angular
    .module('headD')
    .component('headD', {
        templateUrl: '/head/head.view.html',
        controller: headCtrl,
        controllerAs: 'vm'
    })
    .controller('headCtrl', ['Data', 'mf', headCtrl]);

function headCtrl(Data, mf) {
    const vm = this
    vm.data = Data;
    vm.mf = mf;
    if (!mf.getToken() && !mf.getName()){
        Data.nav.user.get({token: mf.getToken()}).$promise.then(user =>{this.user = user.email});
    } else {
        this.user = mf.getName();
    }

}