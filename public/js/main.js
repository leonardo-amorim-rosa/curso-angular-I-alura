angular.module('alurapic', ['minhasDiretivas', 'ngAnimate', 'ngRoute', 'meusServicos'])
.config(function($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true); //backend precisa estar preparado e configurado no servidor

  //configurando uma rota para uma partial
  $routeProvider.when('/fotos', {
    templateUrl: 'partials/principal.html',
    controller: 'FotosController'
  });

  $routeProvider.when('/fotos/new', {
    templateUrl: 'partials/foto.html',
    controller: 'FotoController'
  });

  $routeProvider.when('/fotos/edit/:fotoId', {
    templateUrl: 'partials/foto.html',
    controller: 'FotoController'
  });

  /*
  $routeProvider.when('/grupos', {
    templateUrl: 'partials/foto.html',
    controller: 'GruposController'
  });*/

  //rota padrão quando acessamos uma rota que não existe ou quando não
  //especificamos nenhuma rota na url
  $routeProvider.otherwise({ redirectTo: '/fotos' });

});
