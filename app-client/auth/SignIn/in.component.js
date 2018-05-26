'use strict';

angular
    .module('signIn')
    .component('signIn', {
        templateUrl: '/auth/SignIn/in.view.html',
        controller: inCtrl
    })
    .controller('inCtrl', ['mf', inCtrl])

function inCtrl(mf) {
    const vm = this;
    vm.mf = mf;
    vm.login = '';
    vm.pass = '';
    vm.signin = () => {

        if (!vm.login || !vm.pass){
            if (!vm.login)
                mf.error('.f-in-login')
            if (!vm.pass)
                mf.error('.f-in-pass')
            return
        }

        alert(`${vm.login}\n${vm.pass}`);
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