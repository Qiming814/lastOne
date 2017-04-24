var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/blogs');

router.get('/', function(req, res) {
    var collection = db.get('blogs');
    collection.find({}, function(err, blogs){
        if (err) throw err;
        res.json(blogs);
    });
});


router.get('/:id', function(req, res) {
    var collection = db.get('blogs');
    collection.findOne({ _id: req.params.id }, function(err, blogs){
        if (err) throw err;

        res.json(blogs);
    });
});


router.delete('/:id', function(req, res){
    var collection = db.get('blogs');
    collection.remove({ _id: req.params.id }, function(err, blogs){
        if (err) throw err;

        res.json(blogs);
    });
});

router.delete('/:id/:postid', function(req, res){
    var collection = db.get('blogs');
    collection.findOne({ _id: req.params.id }, function(err, blogs){
        if (err) throw err;
        blog=blogs;
        var jslength=0;
        var newposts=[];
        var length=0;
        for(var posts in blog['post']){
            length++;
        }
        for(var i=0;i<length;i++){
            if(blog['post'][i]['postid']!=req.params.postid){
                newposts.push(blog['post'][i]);
            }
        }
        blog['post']=newposts;
        var whereStr={_id: req.params.id};
        collection.update(whereStr,blog, function(err, blogs){
            if(err) throw err;
            res.json(blogs);
        });
    });
});



router.post('/:id',function(req,res){
    var collection = db.get('blogs');
    var blog;
    collection.findOne({ _id: req.params.id }, function(err, blogs){
        if (err) throw err;
        blog=blogs;
        var jslength=0;
        for(var js2 in blog['post']){
            jslength++;
        }
        var postid=jslength+1;

        blog['post'].push({
            postid:postid,
            date:req.body.date,
            heading:req.body.heading,
            body:req.body.body
        });
        var whereStr={_id: req.params.id};
        collection.update(whereStr,blog, function(err, blogs){
            if(err) throw err;
            res.json(blogs);
        });
    });

});

router.post('/', function(req, res){
    var collection = db.get('blogs');
    collection.insert({
        title: req.body.title,
        author: req.body.author,
        rating: 0,
        post:[]
    }, function(err, blogs){
        if (err) throw err;

        res.json(blogs);
    });
});



module.exports = router;

