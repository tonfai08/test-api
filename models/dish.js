const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishSchema = new Schema({
        dish_id: { type: String, required: false },
        type_id: { type: String, required: false},
        create_date : { type: Date, default : Date.now },
        deleted: { type: String, required: false},
})

module.exports = mongoose.model('dish',dishSchema)