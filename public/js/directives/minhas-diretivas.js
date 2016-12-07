angular.module('minhasDiretivas', ['meusServicos'])
  .directive('meuPainel', function() {
    var ddo = {}; // Directive Definition Object

    ddo.restrict = "AE"; //usado como atributo (meu-painel) e elemento (<meu-elemento/>)

    ddo.scope = {
      titulo: '@'
    };

    ddo.transclude = true; //inserir html dentro do bloco especificado no template usando diretiva ng-transclude

    /*
    primeira forma
    ddo.template =
    '<div class="panel panel-default">'
    + '<div class="panel-heading">'
    + '<h3 class="panel-title">{{titulo}}</h3>'
    + '</div>'
    + '<div class="panel-body" ng-transclude></div>'
    + '</div>';
    */

    //segunda forma
    ddo.templateUrl = 'js/directives/meu-painel.html';

    return ddo; //retornar ddo obrigatóriamente
  })
  .directive('minhaFoto', function() {
    var ddo = {};

    ddo.restrict = "AE";

    ddo.scope = {
      url: '@url',
      foto: '@foto'
    }

    ddo.transclude = true;

    ddo.templateUrl = 'js/directives/minha-foto.html';

    return ddo;
  })
  .directive('meuBotaoPerigo', function() {
    var ddo = {};

    ddo.restrict = "E"; //usado somente como elemento exemplo: <meu-botao-perigo />

    ddo.scope = {
      nome: "@", //usado para enviar uma string somente (copia de valor)
      acao: "&" //usado para enviar uma expressão e não uma string
    };

    ddo.template = '<button class="btn btn-danger btn-block" ng-click="acao(foto)">{{nome}}</button>';

    return ddo;
  })
  .directive('meuFocus', function() {
    var ddo = {};

    ddo.restrict = "A"; //attribute only

    //sem usar watch, não precisa de scope e nem do atributo 'focado'
    /*
    ddo.scope = {
      focado: "=" //permite comunicação bidirecional, tanto o controle quanto a diretiva tem acesso a essa propriedade
    };*/

    //manipulação do DOM, link da acesso ao escopo e ao elemento que quero trabalhar
    //element é p elemento html da página
    ddo.link = function(scope, element) {

      //usando watch
      /*
      scope.$watch('focado', function() { //cuidado com a performance, não abusar dos watchers
        if (scope.focado) {
          element[0].focus(); //utiliza api 'jqlight' e não 'jquery' para dar foco
          scope.focado = false;
        }
      });
      */

      //usando evento
      scope.$on('fotoCadastrada', function() {
        element[0].focus();
      });
    };

    return ddo;
  })
  .directive('meusTitulos', function() { //diretiva que acessa diretamente os serviços
        var ddo = {};
        ddo.restrict = 'E';
        ddo.template = '<ul><li ng-repeat="titulo in titulos">{{titulo}}</li></ul>';
        ddo.controller = function($scope, recursoFoto) {
            recursoFoto.query(function(fotos) {
                $scope.titulos = fotos.map(function(foto) {
                    return foto.titulo;
                });
            });
        };
        return ddo;
    });
