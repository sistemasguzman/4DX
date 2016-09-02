(function () {
    'use strict';
    angular
        .module('myapp')
        .controller('RegisterController',
        ['RegisterService', function (RegisterService) {
            var self = this;
            self.patternEmail = new RegExp(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);
            self.patternName = new RegExp(/^([a-z ñáéíóú]{2,60})$/i);
            self.cities = [];
            self.cinemas = [];
            self.selectedCinema = {};
            self.selectedCity = {};
            self.user = {
                Name: '',
                Email: '',
                City: '',
                Cinema: ''
            };
            self.message = '';

            self.users = [];
            self.save = function () {
                if (!self.patternName.test(self.user.Name)) {
                    self.message = 'El nombre no es correcto.<br>';
                }
                if (!self.patternEmail.test(self.user.Email)) {
                    self.message += 'El correo electrónico no es correo.<br>';
                }
                if (self.selectedCity === undefined || self.selectedCity === null) {
                    self.message += 'Debes seleccionar una Ciudad.<br>';
                }
                if (self.selectedCinema === undefined || self.selectedCinema === null) {
                    self.message += 'Debes seleccionar tu Cine favorito.<br>'
                }
                if (self.message !== '') {
                    alertify.alert(self.message);
                    self.message = '';
                    return;
                }
                console.log();

                if (self.selectedCity !== undefined && self.selectedCinema !== undefined) {
                    self.user.City = self.selectedCity.Nombre;
                    self.user.Cinema = self.selectedCinema.Nombre;
                    self.users.push(self.user);
                    self.user = {};
                    self.selectedCinema = {};
                    self.selectedCity = {};
                }
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