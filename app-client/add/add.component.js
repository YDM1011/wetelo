'use strict';

angular
    .module('addBook')
    .component('addBook', {
        templateUrl: '/add/add.view.html',
        controller: addCtrl
    })
    .controller('addCtrl', ['addContent', 'mf', 'pop', '$window', addCtrl])
    .directive('onReadFile', function($parse) {
        return {
            restrict: 'A',
            scope: false,
            link: function(scope, element, attrs) {
                var fn = $parse(attrs.onReadFile);
                element.on('change', function(onChangeEvent) {
                    var reader = new FileReader();

                    reader.onload = function(onLoadEvent) {
                        scope.$apply(function() {
                            fn(scope, {
                                $fileContent: onLoadEvent.target.result,
                                $file: element[0].files[0]
                            });
                        });
                    };

                    reader.readAsDataURL((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
                });
            }
        };
    });

function addCtrl(addContent, mf, pop, $window) {
    const vm = this;
    vm.mf = mf;
    vm.token = mf.getToken();
    vm.status = 'on';
    vm.showContent = (fileContent, file) => {
        if (file.type == 'application/pdf'){
            vm.src = fileContent;
            vm.file = file;
        }else{
            pop.popup('you can select only *.pdf', 'err')
        }
    };

    vm.gobeak = () =>{
        $window.history.back()
    };
    vm.addBook = () => {
        if (!vm.file || !vm.autor || !vm.title || !vm.des){
            if (!vm.file)
                mf.error('.flabelFile');
            if (!vm.autor)
                mf.error('.fautor');
            if (!vm.title)
                mf.error('.ftitle');
            if (!vm.des)
                mf.error('.fdes');
            return
        }

        var data = new FormData();
        data.append('uploadFile', vm.file);
        $.ajax({
            url: '/uploadFile',
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            success: function (response) {
                const mes = {
                    "src": response.src,
                    "name": vm.autor,
                    "title": vm.title,
                    "des": vm.des,
                    "status": vm.status,
                    "token": vm.token};
                addContent.send.save(mes).$promise.then(res=>{
                    pop.popup('book was success added', 'scs');
                });
            }
        });
    };

}