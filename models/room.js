const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
        roomId: { type: String, required: false },
        name: { type: String, required: false},
        password: { type: String, required: false},
        player: { type: [], required: false},
})

module.exports = mongoose.model('room',roomSchema)