'use strict';
const status = angular.module('status', ['Core']);

function statusCtrl(Data, mf) {
    const sts = this;
    sts.mf = mf;
};

status
    .component('status', {
        templateUrl: '/status/status.view.html',
        controller: statusCtrl,
        controllerAs: 'sts'
    })
    .controller('statusCtrl', ['Data', 'mf', statusCtrl])
    .directive('valueStatus', ['Data', function(Data) {
        return {
            restrict: 'A',
            scope: false,
            link: function(scope, element, attrs) {
                const item = JSON.parse(attrs.valueStatus);
                $('.statusCheck')[item[1]].innerText = item[0];
                $('.statusCheck')[item[1]].setAttribute("date-id", item[2]);
                if((item[0]) == 'on') {
                    $('.statusCheck')[item[1]].classList.add('on');
                }
                element.on('click', (e)=>{
                    const elem = e.target;
                    const as = e.target.innerText;
                    if(as == 'on'){
                        e.target.innerText = 'off';
                        e.target.classList.remove('on');
                        Data.status.save({id: elem.getAttribute("date-id"), sts: "off"})
                    }else{
                        e.target.innerText = 'on';
                        e.target.classList.add('on');
                        Data.status.save({id: elem.getAttribute("date-id"), sts: "on"})
                    }
                })
            }
        };
    }]);
