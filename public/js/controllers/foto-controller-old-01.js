//angular.module('alurapic').controller('FotoController', function ($scope, $http, $routeParams) {
angular.module('alurapic').controller('FotoControllerOld01', function ($scope, recursoFoto, $routeParams) {

  $scope.foto = {};
  $scope.mensagem = '';

  /*
  var recursoFoto = $resource('/v1/fotos/:fotoId', null, {
    'update' : {
      method: 'PUT'
    }
  });
  */

  if ($routeParams.fotoId) {

    recursoFoto.get({fotoId: $routeParams.fotoId}, function(foto) {
      $scope.foto = foto;
    }, function(error) {
      console.log(error);
      $scope.mensagem = "Não foi possível obter a foto";
    });

    /*
    $http.get('v1/fotos/' + $routeParams.fotoId).success(function(foto) {
      $scope.foto = foto;
    })
    .error(function(error) {
      console.log(error);
      $scope.mensagem = "Não foi possível obter a foto";
    });
    */
  }

  $scope.submeter = function() {
      console.log($scope.foto);
      if ($scope.formulario.$valid) {

        if ($scope.foto._id) {

          recursoFoto.update({fotoId: $scope.foto._id}, $scope.foto, function() {
            $scope.mensagem = 'Foto ' + $scope.foto.titulo + ' alterada com sucesso!!!';
          }, function(error) {
            $scope.mensagem = 'Não foi possível alterar a foto ' + $scope.foto._id;
            console.log(error);
          });

          /*
          $http.put('v1/fotos/' + $scope.foto._id, $scope.foto).success(function() {
            $scope.mensagem = 'Foto ' + $scope.foto.titulo + ' alterada com sucesso!!!';
            $scope.foto = {};
          })
          .error(function(error) {
            $scope.mensagem = 'Não foi possível alterar a foto ' + $scope.foto._id;
            console.log(error);
          });
          */

        } else {

          recursoFoto.save($scope.foto, function() {
            $scope.foto = {};
            $scope.mensagem = 'Foto incluida com sucesso!!!';

          }, function(error) {
            $scope.mensagem = 'Não foi possível incluir a foto';
            console.log(error);
          });

          /*
          $http.post('v1/fotos', $scope.foto).success(function() {
            $scope.foto = {};
            $scope.mensagem = 'Foto incluida com sucesso!!!';
          })
          .error(function(error) {
            $scope.mensagem = 'Não foi possível incluir a foto';
            console.log(error);
          });
          */
        }
      }
  };

});
