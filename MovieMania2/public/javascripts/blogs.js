var app = angular.module('Blogs', ['ngResource','ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
        .when('/add-blog', {
            templateUrl: 'partials/home.html',
            controller: 'AddBlogCtrl'
        })
        .when('/blogs/delete/:id', {
            templateUrl: 'partials/movie-delete.html',
            controller: 'DeleteBlogCtrl'
        })
        .when('/blogs/viewblog/:id', {
            templateUrl: 'partials/viewblog.html',
            controller: 'ViewBlogCtrl'
        })
        .when('/blogs/rate/:id', {
            templateUrl: 'partials/viewblog.html',
            controller: 'RateBlogCtrl'
        })

        .otherwise({
            redirectTo: '/'
        });
}]);

app.controller('HomeCtrl', ['$scope', '$resource', 
    function($scope, $resource){
        var Blogs = $resource('/api/blogs');
        Blogs.query(function(blogs){
            $scope.blogs = blogs;
        });
        $scope.save = function(){
            var Blogs = $resource('/api/blogs');
            Blogs.save($scope.blog, function(){
                location.reload();
            });
        };
}]);


app.controller('AddBlogCtrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location){
        $scope.save = function(){
            var Blogs = $resource('/api/blogs');
            Blogs.save($scope.blog, function(){
                $location.path('/');
            });
        };
}]);


app.controller('DeleteBlogCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams){
        var Blogs = $resource('/api/blogs/:id');
        Blogs.get({ id: $routeParams.id }, function(blog){
            $scope.blog = blog;
        });
    
        $scope.delete = function(){
            Blogs.delete({ id: $routeParams.id }, function(blog){
                $location.path('/');
            });
        };
}]);

app.controller('ViewBlogCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams){
        var Blogs = $resource('/api/blogs/:id');
        Blogs.get({ id: $routeParams.id }, function(blog){
            $scope.blog = blog;
        });
    
}]);






