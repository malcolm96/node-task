const Tech = require('../models/tech');
const mongoose = require('mongoose');
const P = mongoose.Promise = require('bluebird');

exports.saveTechData = (techData) => {
    P.all(techData.map(i => new Tech(i).save()))
        .then(() => console.log('Technology news saved'))
        .catch((err) => console.log('Error saving technology: ' + err));
}
