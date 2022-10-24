const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
        price: { type: String, required: false },
        food_id: { type: [], required: false},
        status: { type: String, required: false},
        create_date : { type: Date, default : Date.now },
        deleted: { type: String, required: false},
})

module.exports = mongoose.model('order',orderSchema)