var app = angular.module('myApp', []);

app.controller('produtosController', function ($scope, $http) {

    $scope.fetchAllProdutos = function () {
        $http.get('http://localhost:8000/api/produtos').then(function (response) {
            $scope.produtos = response.data;
        });
    };

    $scope.fetchAllProdutos();

    $scope.storeProduto = function () {

        var dataObj = {
            nome: $scope.nome,
            valor: $scope.valor,
        }

        $http.post('http://localhost:8000/api/produtos', dataObj).then(function (response) {
            if (response.data.message) {

                $scope.storeProdutoResponse = response.data;
            } else {
                $scope.nome = "";
                $scope.valor = "";
                $scope.storeProdutoResponse = "";
                $scope.fetchAllProdutos();
            }

        });
    };

    $scope.showProduto = function (id) {
        $http.get('http://localhost:8000/api/produtos/' + id).then(function (response) {
            $scope.showNome = response.data.nome;
            $scope.showValor = response.data.valor;
            $scope.showId = response.data.id;
        });
    };

    $scope.updateProduto = function (id) {
        var dataObj = {
            nome: $scope.showNome,
            valor: $scope.showValor,
        }

        $http.put('http://localhost:8000/api/produtos/' + id, dataObj).then(function (response) {
            if (response.data.message) {
                $scope.updateProdutoResponse = response.data;
            } else {
                $('#myModal').modal('hide');
                $scope.fetchAllProdutos();
            }
        });
    };

    $scope.destroyProduto = function (id) {
        $http.delete('http://localhost:8000/api/produtos/' + id).then(function (response) {
            $scope.destroyProdutoResponse = response.data;
            console.log(response.data);
            $scope.fetchAllProdutos();
        });
    };


});