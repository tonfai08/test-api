const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishTypeSchema = new Schema({
        id_type: { type: String, required: false },
        type_dish: { type: String, required: false },
        size: { type: String, required: false},
        create_date : { type: Date, default : Date.now },
        deleted: { type: String, required: false},
})

module.exports = mongoose.model('dishType',dishTypeSchema)