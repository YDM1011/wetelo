'use strict';

angular
    .module('Core')
    .service('Data', ['$resource', Data]);
function Data($resource) {

    return {
        page: $resource('books/:brif/:token/:sort/:vector',{brif: 1, token: '@id', sort: 'createdOn', vector: -1}),
        books:'',
        sort: 'createdOn',
        vector: '1',
        last: $resource('/allPage/:token', {token: '@id'}),
        nav: {
            user: $resource('/userEmail/:token', {token: '@id'})
        },
        delete: $resource('/delete/:id', {id: '@id'}),
        editB: $resource('/edit', {},  {
            edit: {
                method: 'POST',
                interceptor: {
                    request: function(config) {
                        config.requestTimestamp = Date.now();
                        return config;
                    },
                    response: function(response) {
                        const instance = response.resource;
                        instance.saveLatency = Date.now() - response.config.requestTimestamp;
                        return instance;
                    }
                }
            }
        }),
        search: $resource('/search', {},  {
            book: {
                method: 'POST',
                isArray: true,
                interceptor: {
                    request: function(config) {
                        config.requestTimestamp = Date.now();
                        return config;
                    },
                    response: function(response) {
                        const instance = response.resource;
                        instance.saveLatency = Date.now() - response.config.requestTimestamp;
                        return instance;
                    }
                }
            }
        }),
        status: $resource('/status', {id: '@id', sts: '@sts'}),
        rating: $resource('/rating', {id: '@id', rtng: '@rtng'}),
        download: $resource('/download/:id', {id: '@id'})
    }
}
