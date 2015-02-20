var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Movie = require('../models/Movie')
var _ = require('underscore')
mongoose.connect('mongodb://localhost/MyBlog')
/* GET home page. */
router.get('/', function (req, res, next) {
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err)
        }
        res.render('./pages/index', {title: '首页', movies: movies});
    })
});

router.get('/movie/:id', function (req, res, next) {
    var id = req.params.id;
    Movie.findById(id, function (err, movie) {
        res.render('./pages/detail', {title: '详情页', movie: movie});
    })
});


router.get('/admin/movie', function (req, res, next) {
    res.render('./pages/admin', {
        title: '后台录入页', movie: {
            title: '',
            doctor: '',
            country: '',
            year: '',
            poster: '',
            flash: '',
            summary: '',
            language: ''
        }
    });
});

router.get('/admin/update/:id', function (req, res, next) {
    var id = req.params.id;
    if (id) {
        Movie.findById(id, function (err, movie) {
            res.render('./pages/admin', {
                title: '我的后台更新页',
                movie: movie
            })
        })
    }
})

router.post('/admin/movie/new', function (req, res, next) {
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;
    if (id !== 'undefined') {
        Movie.findById(id, function (err, movie) {
            if (err) {
                console.log(err);
            }
            _movie = _.extend(movie, movieObj);
            _movie.save(function (err, movie) {
                if (err) {
                    console.log(err);
                }
                res.redirect("/movie/" + movie._id);
            })
        })
    } else {
        _movie = new Movie({
            doctor: movieObj.doctor,
            title: movieObj.title,
            country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
            summary: movieObj.summary,
            flash: movieObj.flash
        })
        _movie.save(function (err, movie) {
            if (err) {
                console.log(err);
            }
            res.redirect("/movie/" + movie._id);
        })
    }
})

router.get('/admin/list', function (req, res, next) {
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err)
        }
        res.render('./pages/list', {title: '列表页', movies: movies});
    })
});

router.delete('/admin/list', function (req,res) {
    var id = req.query.id;
    if (id) {
        Movie.remove({_id:id},function (err,movie) {
            if (err) {
                console.log(err)
            } else {
                res.json({success:1})
            }
        })
    }
})


module.exports = router;
