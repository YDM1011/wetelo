'use strict';
angular
    .module('popup')
    .component('popup', {
        templateUrl: '/popup/popup.view.html',
        controller: function () {
            this.close = () =>{
                $('#popup').css({"display":"none"});
            }
        }
    })
    .service('pop', function(){
        const p = this;
        p.mes = '';
        p.class = '';
        p.popup = (mes, c) => {
            $('#popup').css({"display":"flex"});
            p.class ? $('#popup .mes')[0].classList.remove(p.class) : '';
            $('#popup .mes')[0].classList.add(c);
            $('#popup .mes').text(mes);
            p.mes = mes;
            p.class = c;
        };
        return p;
    });
