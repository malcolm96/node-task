const Sports = require('../models/sports');
const mongoose = require('mongoose');
const P = mongoose.Promise = require('bluebird');


exports.saveSportsData = (sportsData) => {
    P.all(sportsData.map(i => new Sports(i).save()))
        .then(() => console.log('Sports news saved'))
        .catch((err) => console.log('Error saving Sports data: ' + err));
}
