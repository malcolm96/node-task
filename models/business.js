const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const businessSchema = new Schema({
                date: {type:String, default:''},
                title: {type:String, default:''},
                content: {type:String, default:''},
                imageUrl: {type:String, default:''},
                blogUrl: {type:String, default:''}

},{
        collection:'Business'
});

module.exports = mongoose.model('Business', businessSchema);
