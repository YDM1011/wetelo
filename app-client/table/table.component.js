angular
    .module('tableD', ['Core', 'ngRoute', 'search', 'status'])
    .component('tableD', {
        templateUrl: '/table/table.view.html',
        controller: tablevm,
        controllerAs: 'tablevm'
    })
    .controller('tablevm', tablevm);

tablevm.$inject = ['Data', '$routeParams', 'mf', '$location', '$scope'];

function tablevm(Data, $routeParams, mf, $location, $scope){
    const tablevm = this;
    tablevm.mf = mf;
    tablevm.frst = 1;
    tablevm.row = 3;
    tablevm.brif = $routeParams.brif ? parseInt($routeParams.brif) : 1;
    tablevm.page = parseInt(tablevm.brif);
    tablevm.id = 'empty';

    tablevm.getData = () =>{
        tablevm.last = Data.last;
        tablevm.books = Data.books;
        tablevm.total = Data.total;
    };

    tablevm.getBook = id =>{
        tablevm.id = id;
    };
    tablevm.sort = id => {
        if (tablevm.sortType == id){
            tablevm.sortReverse = !tablevm.sortReverse;
        } else {
            tablevm.sortType = id;
            tablevm.sortReverse = false;
        }
    };
    tablevm.delete = id => {
        const idx = tablevm.books.indexOf(id);
        if (idx >= 0) {
            tablevm.books.splice(idx, 1);
        }
        Data.delete.delete({id: id.id}).$promise.then((res)=>{});
        Data.books = tablevm.books;
    };
    tablevm.gatData = () =>{
        tablevm.last = Data.last;
        tablevm.books = Data.books;
        tablevm.total = Data.total;
        $location.path('/books');
    };
    tablevm.getPage = (i, auto, sort) =>{
        if(tablevm.vector){
            Data.vector = tablevm.vector;
            tablevm.vector = tablevm.vector == 1 ? -1 : 1;
        } else {
            tablevm.vector = Data.vector;
        }
        if(sort && (sort == tablevm.sortType)){
            tablevm.sortType = sort;
        } else if (sort){
            tablevm.sortType = sort;
            Data.sort = sort;
        }else{
            tablevm.sortType = Data.sort;
            tablevm.vector = Data.vector;
        }
        $location.path(`/books/${parseInt(i)}`);
        tablevm.brif = parseInt(i);
        tablevm.page = parseInt(i);
        if(!Data.srch){
            Data.page.save({brif: tablevm.brif, token: mf.getToken(), sort: tablevm.sortType, vector: tablevm.vector}).$promise.then(page=>{
                tablevm.last = page.pages;
                tablevm.books = page.docs;
                tablevm.total = page.total;
                Data.books = tablevm.books;
            });
        }else{
            Data.page.save({brif: tablevm.brif, token: mf.getToken(), sort: tablevm.sortType, vector: tablevm.vector, search: Data.srch}).$promise.then(page=>{
                tablevm.last = page.pages;
                tablevm.books = page.docs;
                tablevm.total = page.total;
                Data.books = tablevm.books;
            });
        }

    };
    tablevm.getPage(tablevm.page, true);

    tablevm.setRating = (id, rating) => {
        const idx = tablevm.books.indexOf(id);
        if (idx >= 0) {
            Data.rating.save({id: id.id, rtng: rating});
            tablevm.books[idx].rating = rating
        }
    };

    $scope.$on('updataBooks',tablevm.getData);
}