const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
        email: { type: String, required: false },
        password: { type: String, required: false},
        first_name: { type: String, required: false },
        last_name: { type: String, required: false},
        role: { type: String, required: false},
        position: { type: String, required: false},
        avatar: { type: String, required: false },
        create_date : { type: Date, default : Date.now },
        deleted: { type: String, required: false},
})

module.exports = mongoose.model('player',playerSchema)