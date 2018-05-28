'use strict';

angular
    .module('signIn')
    .component('signIn', {
        templateUrl: '/auth/SignIn/in.view.html',
        controller: inCtrl
    })
    .controller('inCtrl', ['mf', 'addContent', '$location', 'pop', inCtrl]);

function inCtrl(mf, addContent, $location, pop) {
    const vm = this;
    vm.mf = mf;
    vm.email = '';
    vm.pass = '';
    vm.signin = () => {

        if (!vm.email || !vm.pass){
            if (!vm.email)
                mf.error('.f-in-login');
            if (!vm.pass)
                mf.error('.f-in-pass');
            return
        }

        const mes = {
            "email": vm.email,
            "password": vm.pass};
        addContent.signin.send(mes).$promise.then(res=>{
            if (res.message){
                pop.popup(res.message, 'err');
                return
            }
            if (res.token){
                mf.setToken(res.token);
                mf.setName(res.email);
                $location.path('/');
            }

        });
    };

    vm.auth = {
        placeholder: {
            email: 'Email Address',
            pass: 'Password'
        },
        label: {
            email: 'Login',
            pass: 'Pass'
        },
        btn: {
            sgnup: 'Sign up',
            sgnin: 'Sign in'
        }
    }
}