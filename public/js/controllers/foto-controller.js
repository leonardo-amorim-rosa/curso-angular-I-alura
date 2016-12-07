/*
Se protegendo da minificação, pois ela altera os nomes das variaveis e nada mais passa a funcionar, deve-se substituir todas as
assinaturas de controllers, services e diretivas por esta para impedir que isso ocorra, esse processo tem o nome de 'annotation system'
angular.module('alurapic')
    .controller('FotoController', ['$scope', 'recursoFoto', '$routeParams', 'cadastroDeFotos', function($scope, recursoFoto, $routeParams, cadastroDeFotos) {
            // código omitido
    }]);
*/

angular.module('alurapic').controller('FotoController', function ($scope, recursoFoto, cadastroDeFotos, $routeParams) {

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

      if ($scope.formulario.$valid) {
        cadastroDeFotos.cadastrar($scope.foto)
        .then(function(dados) {
            $scope.mensagem = dados.mensagem;
            if (dados.inclusao) $scope.foto = {};
            //$scope.focado = true; //usando watch
            //$scope.$broadcast('fotoCadastrada'); //event bus, disparando um evento, outra abordagem ao uso do watch
        })
        .catch(function(error) {
          $scope.mensagem = error.mensagem;
        });
      }
  };

});
