const Business =  require('../models/business');
const mongoose = require('mongoose');
const P = mongoose.Promise = require('bluebird');


(async () => {
    mongoose.connect("mongodb+srv://arfan:qr2heELwW5qeIcbZ@cluster0.8eqtk.mongodb.net/test-task?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(() => console.log('Connected to Database'))
        .catch((err) => {
            console.log(err);
        });
})()

exports.saveBusinessData = (businessData) =>{
    P.all(businessData.map(i => new Business(i).save()))
        .then(() =>{
            console.log('Business news saved');
            mongoose.connection.close().then(()=>{
                console.log('Disconnected from database');
                process.exit(0);
            })
        })
        .catch((err) => console.log('Error saving business data: ' + err));
}



