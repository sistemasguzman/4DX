(function () {
    'use strict';
    angular
        .module('myapp')
        .controller('RegisterController',
        ['RegisterService', function (RegisterService) {
            var self = this;
            self.cities = [];
            self.cinemas = [];
            self.user = {
                Name: '',
                Email: '',
                Description: '',
                City: '',
                Cinema: ''
            };

            self.users = [];
            self.save = function () {
                self.user.City = self.selectedCity.Nombre;
                self.user.Cinema = self.selectedCinema.Nombre;
                self.users.push(self.user);
                self.user = {};
            }

            self.getCinemas = function (key) {
                self.cinemas = RegisterService.getCinemasByCityId(self.cities, key);
            }

            self.getCities = function () {
                RegisterService
                    .getCities()
                    .then(function (data) {
                        self.cities = data.cities;
                    });
            }
            self.init = function () {
                self.getCities();
            }

            self.init();
        }]);
})();