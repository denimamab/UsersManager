
angular.module('app.services', [])
    .service('usersService', function(){
        this.users = [
            {
                name : 'Mohammed amine BERRICHI',
                username : 'denimamab',
                email: 'ma.berrichi@gmail.com',
                age: 23,
            },
            {
                name : 'Mohammed-Tarik BENHAFOUNE',
                username : 'papyrus',
                email: 'mt.benhafoune@gmail.com',
                age: 23,
            },
            {
                name : 'Nouha BELKHATIR',
                username : 'nouhabel',
                email: 'nouha.belkhatir@gmail.com',
                age: 23,
            },
            {
                name : 'Mounia DRARI',
                username : 'mdrari',
                email: 'mounia.drari@gmail.com',
                age: 23,
            },
        ]
        this.initUser = function (){
            return {
                username:'',
                name: '',
                age: '',
                email: '',
            }
        }

        this.sayHello = function(name){
            return 'Hello '+ name + " !"
        }
    })
    .factory('usersFactory', function(){
        return {
            get: function(users, username){
                var user = false
                user = users.find(function(item, key){
                    if(item.username === username)
                        return item
                })
                return user
            },
            add : function(users, user){
                users.push(user)
                return users
            },
            update: function(users, user, useredited){
                user.name = useredited.name
                user.email = useredited.email
                user.age = useredited.age
                return users
            },
            delete: function(users, user){
                if(users.indexOf(user)>=0)
                    users.splice(users.indexOf(user), 1)
            }
        }
    })