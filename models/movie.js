/**
 * Created by kollice on 2015/2/18.
 */
var mongoose = require('mongoose')
var MovieSchema = require('../schemas/movie')
var Movie = mongoose.model('Movie',MovieSchema)
module.exports = Movie