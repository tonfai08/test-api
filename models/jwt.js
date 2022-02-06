const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jwtSchema = new Schema({
        jwtId: { type: String, required: false},
        jwtSecret: { type: String, required: false },
        create_date : { type: Date, default : Date.now },
        deleted: { type: String, required: false},
})

module.exports = mongoose.model('jwt',jwtSchema)