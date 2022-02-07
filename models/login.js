const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empSchema = new Schema({
        email: { type: String, required: false },
        user: { type: String, required: false},
        create_date : { type: Date, default : Date.now },
        deleted: { type: String, required: false},
})

module.exports = mongoose.model('emp',empSchema)