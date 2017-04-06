
angular.module('app.databind', [
    'ngRoute',
    'app.services'
])
    .controller('usersController', ['$scope', '$routeParams', 'usersService', 'usersFactory', function($scope, $routeParams, usersService, usersFactory){
        $scope.users = usersService.users;
        if($routeParams.username){
            $scope.user = usersFactory.get($scope.users, $routeParams.username)
            $scope.welcomeMessage = usersService.sayHello($scope.user.name)
        }
        else
        {
            //Initialisations
            $scope.userForm = {};
            $scope.userForm.data = usersService.initUser();
            $scope.userForm.errors = {};
            $scope.userForm.inputs={};

            $('#FormModal').on('hide.bs.modal', function(){
                $scope.userForm.data = usersService.initUser();
            })

            //Default ageOperator
            $scope.ageOperator = 'lte';

            //Edit user
            $scope.edit = function(user){
                $scope.userForm.inputs = {
                    username: {
                        disabled: true,
                        required: true,
                    }
                }
                $scope.userForm.data = angular.copy(user)
                $scope.save = function(){
                    if($scope.userForm.$valid)
                    {
                        usersFactory.update($scope.users, user, $scope.userForm.data);
                        $scope.userForm.data = usersService.initUser();

                        $('#FormModal').modal("hide")
                    }
                }

            }

            //Create user and add it to the list
            $scope.create = function(){
                $scope.userForm.inputs = {
                    username: {
                        disabled: false,
                        required: true,
                    }
                }
                $scope.save = function(){
                    if($scope.userForm.$valid){
                        var uniqUsername = []
                        uniqUsername = $scope.users.filter(function(item){
                            if(item.username === $scope.userForm.data.username)
                                return item
                        })
                        if(uniqUsername.length>0)
                            $scope.userForm.$error.username = true
                        else {
                            usersFactory.add($scope.users, angular.copy($scope.userForm.data))
                            $scope.userForm.data = usersService.initUser();
                            $('#FormModal').modal("hide")
                        }
                    }
                }
            }

            //Delete user from list
            $scope.delete = function(username){
                $scope.confirmDelete = function(){
                    usersFactory.delete($scope.users, username)
                    $('#confirm-delete').modal('hide')
                }
            }
        }

    }])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/users', {
                templateUrl: 'views/users/index.html',
                controller: 'usersController'
            })
            .when('/user/:username', {
                templateUrl: 'views/users/single.html',
                controller: 'usersController'
            });
    }])