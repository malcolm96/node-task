const mongoose = require('mongoose');

const sportsSchema = mongoose.Schema({
    date: {type:String, default:''},
    title: {type:String, default:''},
    content:{type:String, default:''},
    imageUrl:{type:String, default:''},
    blogUrl :{type:String, default:''}
},{
    collection:'Sports'
});

module.exports = mongoose.model('Sports', sportsSchema);
