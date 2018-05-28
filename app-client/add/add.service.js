'use strict';

angular
    .module('addBook')
    .service('addContent', ['$resource',
        function($resource) {
            return {
                send: $resource('/addBook', {}, {
                    save: {
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
                signup: $resource('/signup', {}, {
                    save: {
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
                signin: $resource('/signin', {}, {
                    send: {
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
                })
            }
        }
    ])