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

        .when('/blogs/add-post/:id',{
            templateUrl:'partials/post-form.html',
            controller: 'AddPostCtrl'
        })
        .when('/blogs/viewpost/:id', {
            templateUrl: 'partials/viewpost.html',
            controller: 'ViewPostCtrl'
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
            $scope.posts = blog['post'];
        });

        var Blogs = $resource('/api/blogs/:id');
        Blogs.get({ id: $routeParams.id }, function(blog){
            $scope.blog = blog;
        });
        $scope.save = function(){
        var Blogs = $resource('/api/blogs/'+$routeParams.id);
        Blogs.save($scope.post, function(){
            $location.path('/');
            });
        };
        $scope.update = function(){
            var Blogs = $resource('/api/blogs/'+$routeParams.id);
            Blogs.save($scope.post, function(){
                location.reload();
            });
        };
        $scope.rate = function(){
        var Blogs = $resource('/api/blogs/'+$routeParams.rate);
        Blogs.save($scope.post, function(){
            $location.path('/');
            });
        };


}]);

app.controller('AddPostCtrl',['$scope', '$resource','$location','$routeParams',function($scope,$resource,$location,$routeParams){
    var Blogs = $resource('/api/blogs/:id');
    Blogs.get({ id: $routeParams.id }, function(blog){
        $scope.blog = blog;
    });
    
    $scope.save = function(){
        var Blogs = $resource('/api/blogs/'+$routeParams.id);
        Blogs.save($scope.post, function(){
            $location.path('/');
        });
    };
}]);







