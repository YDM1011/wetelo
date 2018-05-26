angular
    .module('books')
    .controller('editCtrl', editCtrl)
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

editCtrl.$inject = ['Data', '$routeParams', '$location', '$window', 'pop'];
function editCtrl(Data, $routeParams, $location, $window, pop) {
    const vm = this;
    vm.id = $routeParams.id;
    vm.books = Data.books;
    vm.id == 'search' ? $location.path('/books') : $window.id = vm.id;
console.log(vm.file);
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

    vm.edit = (book) =>{
        // console.log(vm.file);
        // Data.books = vm.books;
        // $window.history.back();

        if(!vm.file){
            const mes = {
                "src": book.src,
                "name": book.name,
                "title": book.title,
                "des": book.des,
                "status": book.status,
                "id": vm.id
            };

            Data.editB.edit(mes).$promise.then(res=>{
                console.log(`edit ${res}`);
                pop.popup('book was success edit', 'scs');
            });
        }else{
            vm.editBook(book);
        }

    };

    vm.editBook = (book) => {

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
                console.log(response);
                let mes = {
                    "src": response.src,
                    "name": book.name,
                    "title": book.title,
                    "des": book.des,
                    "status": book.status,
                    "id": vm.id};
                console.log(mes);
                Data.editB.edit(mes).$promise.then(res=>{
                    console.log(`edit ${res}`);
                    pop.popup('book was success edit', 'scs');
                });
            }
        });
    };

}
