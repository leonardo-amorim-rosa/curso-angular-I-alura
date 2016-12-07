angular.module('meusServicos', ['ngResource'])
.factory('recursoFoto', function($resource) {

  return $resource('/v1/fotos/:fotoId', null, {
    'update' : {
      method : 'PUT'
    }
  });
})
//$rootScope é o pai de todos os scopes de todos os controllers
.factory('cadastroDeFotos', function(recursoFoto, $q, $rootScope) { //serviço para inclusão e atualização, injeta outro serviço 'recursoFoto', injeta $q que utiliza o padrão 'promise'

  var service = {};

  var evento = 'fotoCadastrada';

  service.cadastrar = function(foto) {

      return $q(function(resolve, reject) {

        if (foto._id) { //atualização

          recursoFoto.update({fotoId: foto._id}, foto, function() {

            $rootScope.$broadcast(evento); //event bus, disparando um evento, outra abordagem ao uso do watch

            resolve({
              mensagem: 'Foto ' + foto.titulo + ' atualizada com sucesso!',
              inclusao: false
            });

          }, function(error) {
            console.log(error);
            reject({
              mensagem: 'Não foi possível alterar a foto ' + foto.titulo
            });
          });

        } else { //inclusão

          recursoFoto.save(foto, function() {

            $rootScope.$broadcast(evento); //event bus, disparando um evento, outra abordagem ao uso do watch

            resolve({
              mensagem: 'Foto ' + foto.titulo + ' incluida com sucesso!',
              inclusao: true
            });

          }, function(error) {
            console.log(error);
            reject({
              mensagem: 'Não foi possível incluir a foto ' + foto.titulo
            });

          });
        }

      });
  };

  return service;
});
