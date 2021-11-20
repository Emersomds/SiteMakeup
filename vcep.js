(function() {
    angular
      .module('appCep', [])
      .controller('CepController', CepController);
  
    CepController.$inject = ['$http'];
  
    function CepController($http) {
      const FORMATO = /^[0-9]{8}$/;
      var vm = this;
      vm.pesquisar = _pesquisar;
  
      _inicializar();
  
      function _inicializar() {
        vm.contribuinte = {};
        vm.mensagem = {};
        vm.mensagem.visivel = false;
        _limpar();
      }
  
      function _pesquisar() {
        var cep = vm.contribuinte.cep.replace(/\D/g, '');
  
        if (FORMATO.test(cep)) {
          $http.jsonp('https://viacep.com.br/ws/' + cep + '/json/?callback=JSON_CALLBACK').success(_atribuir);
        } else {
          _limpar();
          vm.mensagem.visivel = true;
        }
      }
  
      function _atribuir(dados) {
        if (dados.erro) {
          _limpar();
          vm.mensagem.visivel = true;
        } else {
          vm.contribuinte.logradouro = dados.logradouro;
          vm.contribuinte.bairro = dados.bairro;
          vm.contribuinte.estado = dados.uf;
          vm.contribuinte.cidade = dados.localidade;
  
          vm.mensagem.visivel = false;
        }
      }
  
      function _limpar() {
        vm.contribuinte.logradouro = '...';
        vm.contribuinte.bairro = '...';
        vm.contribuinte.estado = '...';
        vm.contribuinte.cidade = '...';
      }
    };
  })();