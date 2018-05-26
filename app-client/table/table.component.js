angular
    .module('tableD', ['Core', 'ngRoute', 'search', 'status'])
    .component('tableD', {
        templateUrl: '/table/table.view.html',
        controller: tablevm,
        controllerAs: 'tablevm'
    })
    .controller('tablevm', tablevm);

tablevm.$inject = ['Data', '$routeParams', 'mf', '$location']
function tablevm(Data, $routeParams, mf, $location){
    const tablevm = this;
    tablevm.mf = mf;
    tablevm.frst = 1;
    tablevm.row = 3;
    console.log(tablevm.last);
    tablevm.brif = $routeParams.brif ? parseInt($routeParams.brif) : 1;
    tablevm.page = parseInt(tablevm.brif);
    tablevm.id = 'empty';

    tablevm.getBook = id =>{
        tablevm.id = id;
    };
    tablevm.sort = id => {
        if (tablevm.sortType == id){
            tablevm.sortReverse = !tablevm.sortReverse;
        } else {
            console.log(tablevm.sortType)
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

    tablevm.getPage = (i, auto, sort) =>{
        if(tablevm.vector){
            Data.vector = tablevm.vector;
            tablevm.vector = tablevm.vector == 1 ? -1 : 1;
        } else {
            tablevm.vector = Data.vector;
        }
        if(sort && (sort == tablevm.sortType)){
            tablevm.sortType = sort;
            console.log(sort, "   ",tablevm.vector)
        } else if (sort){
            tablevm.sortType = sort;
            Data.sort = sort;
        }else{
            tablevm.sortType = Data.sort;
            tablevm.vector = Data.vector;
        }
        tablevm.brif = parseInt(i);
        tablevm.page = parseInt(i);
        $location.path(`/books/${tablevm.brif}`);
        Data.page.get({brif: tablevm.brif, token: mf.getToken(), sort: tablevm.sortType, vector: tablevm.vector}).$promise.then(page=>{
            console.log(page);
            tablevm.last = page.pages;
            tablevm.books = page.docs;
            Data.books = tablevm.books;
        });
        console.log("init");


    };
    tablevm.getPage(tablevm.page, true);

    tablevm.setRating = (id, rating) => {
        const idx = tablevm.books.indexOf(id);
        if (idx >= 0) {
            console.log(id.id, rating);
            Data.rating.save({id: id.id, rtng: rating});
            tablevm.books[idx].rating = rating
        }
    };

    tablevm.download = book => {
        console.log("ok");
        Data.download.get({id: book.src});
    }
}