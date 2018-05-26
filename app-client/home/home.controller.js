angular
	.module('books')
	.controller('homeCtrl', homeCtrl);

function homeCtrl(){
    const vm = this;
    vm.about = {
        title: 'It is app for books',
        des: ''
    }
}