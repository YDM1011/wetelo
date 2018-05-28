'use strict';

angular
    .module('signUp')
    .component('signUp', {
        templateUrl: '/auth/SignIn/in.view.html',
        controller: upCtrl
    })
    .controller('upCtrl', ['mf', 'addContent', '$location', 'pop', upCtrl])

function upCtrl(mf, addContent, $location, pop) {
    const vm = this;
    vm.mf = mf;
    vm.email = '';
    vm.pass = '';
    if (mf.getToken()){
        $location.path('/');
    }
    vm.signin = () => {
        if (!vm.email || !vm.pass){
            if (!vm.email)
                mf.error('.f-in-login')
            if (!vm.pass)
                mf.error('.f-in-pass')
            return
        }
        const mes = {
            "email": vm.email,
            "password": vm.pass};
        addContent.signup.save(mes).$promise.then(res=>{
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