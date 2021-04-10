const mongoose = require('mongoose');

const techSchema = mongoose.Schema({
    title : {type:String, default:''},
    url : {type:String, default:''},
    image: {type:String, default:''}
},{
    collection:'Technology'
});

module.exports = mongoose.model('Tech', techSchema);
