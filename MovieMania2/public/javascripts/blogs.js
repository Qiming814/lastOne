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
        .when('/blogs/post/delete/:id/:postid', {
            templateUrl: 'partials/post-delete.html',
            controller: 'DeletePostCtrl'
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

app.controller('DeletePostCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams){
        var Blogs = $resource('/api/blogs/:id');
        Blogs.get({ id: $routeParams.id }, function(blog){
            var post={};
            var length=0;
            for(var posts in blog['post']){
                length++;
            }
            for(var i=0;i<length;i++){
                if(blog['post'][i]['postid']==$routeParams.postid){
                    $scope.post=blog['post'][i];
                }
            }
            $scope.backid=$routeParams.id;
        });
        
        $scope.delete = function(){
            Blogs = $resource('/api/blogs/:id/:postid');
            Blogs.delete({ id: $routeParams.id ,postid: $routeParams.postid}, function(blog){
                var path='/blogs/viewblog/'+$routeParams.id;
                $location.path(path);
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
        
        $scope.update = function(){
            var Blogs = $resource('/api/blogs/'+$routeParams.id);
            Blogs.save($scope.post, function(){
                location.reload(); 
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







