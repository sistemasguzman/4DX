(function () {
    'use strict';
    angular
        .module('myapp')
        .factory('RegisterService', ['$http',
            function ($http) {
                var service = {
                    getCinemasByCityId: function (cinemas, cityId) {
                        for (var i = 0; i < cinemas.length; i++) {
                            if (cinemas[i].Clave === cityId) {
                                return cinemas[i].Complejos;
                            }
                        }
                    },
                    getCities: function () {
                        return $http
                            .get('app/register/cities.json')
                            .then(function (response) {
                                return response.data;
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    },
                    save: function (user) {

                    }
                };
                return service;
            }]);
})();