//angular.module('alurapic').controller('FotosController', function ($scope, $http, $resource) {
angular.module('alurapic').controller('FotosController', function ($scope, recursoFoto) {

  $scope.fotos = [];
  $scope.filtro = '';
  $scope.mensagem = '';

  //promise pattern
  /*
  var promise = $http.get('/v1/fotos');
  promise.then(function(retorno) {
    $scope.fotos = retorno.data;
  }).catch(function(error) {
    console.log(error);
  });
  */

  //var recursoFoto = $resource('/v1/fotos/:fotoId');

  recursoFoto.query(function(fotos) {
    $scope.fotos = fotos;
  }, function(error) {
    console.log(error);
  });

  $scope.remover = function(foto) {
    recursoFoto.delete({fotoId: foto._id}, function() {
      var indiceFoto = $scope.fotos.indexOf(foto);
      $scope.fotos.splice(indiceFoto, 1); //removendo da lista a foto deletada
      $scope.mensagem = "Foto " + foto.titulo + " removida com sucesso!";

    }, function(error) {
      $scope.mensagem = "Não foi possível remover a foto " + foto.titulo;
      console.log(error);
      console.log("Não foi possível remover a foto " + foto.titulo);
    });
  };

  /*
  $http.get('/v1/fotos').success(function(fotos){
    $scope.fotos = fotos;

  }).error(function(error) {
    console.log(error);
  });
  */

  /*
  $scope.remover = function (foto) {
    $http.delete('v1/fotos/' + foto._id).success(function() {
      var indiceFoto = $scope.fotos.indexOf(foto);
      $scope.fotos.splice(indiceFoto, 1); //removendo da lista a foto deletada
      $scope.mensagem = "Foto " + foto.titulo + " removida com sucesso!";

      console.log("Foto " + foto.titulo + " foi removida com sucesso");

    }).error(function(error) {
      $scope.mensagem = "Não foi possível remover a foto " + foto.titulo;
      console.log(error);
      console.log("Não foi possível remover a foto " + foto.titulo);
    })
  };
  */

  /*
  $scope.fotos = [
    {
      titulo: "Leão",
      url: "http://www.fundosanimais.com/Minis/leoes.jpg"
    },
    {
      titulo: "Leão 2",
      url: "http://www.fundosanimais.com/Minis/leoes.jpg"
    },
    {
      titulo: "Leão 3",
      url: "http://www.fundosanimais.com/Minis/leoes.jpg"
    }
  ];
  */

  /*
  $scope.foto = {
    titulo: "Leão",
    url: "http://www.fundosanimais.com/Minis/leoes.jpg"
  }*/

});
