angular.module('alurapic').controller('FotoControllerOld02', function ($scope, recursoFoto, $routeParams) {

  $scope.foto = {};
  $scope.mensagem = '';

  if ($routeParams.fotoId) {

    recursoFoto.get({fotoId: $routeParams.fotoId}, function(foto) {
      $scope.foto = foto;
    }, function(error) {
      console.log(error);
      $scope.mensagem = "Não foi possível obter a foto";
    });

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

        } else {

          recursoFoto.save($scope.foto, function() {
            $scope.foto = {};
            $scope.mensagem = 'Foto incluida com sucesso!!!';

          }, function(error) {
            $scope.mensagem = 'Não foi possível incluir a foto';
            console.log(error);
          });

        }
      }
  };

});
