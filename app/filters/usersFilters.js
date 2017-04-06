angular.module('app.filters', [])
    .filter('usersAgeFilter', function(){
        return function(input,age, op){
            var output = [];
            var operators = {
                e : function(item) {
                    return item.age == age
                },
                lt : function(item) {
                    return item.age < age
                },
                lte : function(item) {
                    return item.age <= age
                },
                gt: function(item) {
                    return item.age > age
                },
                gte: function(item) {
                    return item.age >= age
                },
            }
            if(age){
                input.forEach(function(item){
                   if(operators[op](item))
                       output.push(item)
                })
                return output
            }
            return input
        }
    })

    .filter('usersAgeDecorator', function(){
        return function(input){
            return input + ' ans'
        }
    })